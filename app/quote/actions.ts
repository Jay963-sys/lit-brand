"use server";

import { Resend } from "resend";
import QuoteRequestEmail from "@/emails/quote-request";
import QuoteConfirmationEmail from "@/emails/quote-confirmation";
import { quoteSchema, type QuoteInput, type QuoteState } from "@/lib/quote-schema";
import { site } from "@/lib/site";

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const raw = {
    name: formData.get("name"),
    organisation: formData.get("organisation"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventType: formData.get("eventType"),
    eventDate: formData.get("eventDate"),
    venue: formData.get("venue"),
    guests: formData.get("guests"),
    products: formData.getAll("products"),
    message: formData.get("message"),
    website: formData.get("website"),
  };

  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: QuoteState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof QuoteInput;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Check the highlighted fields.", errors };
  }

  // Honeypot filled — accept silently so bots don't learn anything.
  if (parsed.data.website) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL ?? site.email;
  const from = process.env.QUOTE_FROM_EMAIL ?? `Lit Brand <no-reply@${new URL(site.url).hostname}>`;

  if (!apiKey) {
    console.error("[quote] RESEND_API_KEY is not set. Request was:", parsed.data);
    return {
      status: "error",
      message: "We couldn't send that just now. Email us directly and we'll pick it up.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `Quote request — ${parsed.data.eventType}, ${parsed.data.guests} guests`,
      react: QuoteRequestEmail({ quote: parsed.data }),
    });

    if (error) throw new Error(error.message);

    // Confirmation to the requester. A failure here must not fail the request.
    await resend.emails
      .send({
        from,
        to: parsed.data.email,
        subject: "We have your event details — Lit Brand",
        react: QuoteConfirmationEmail({
          name: parsed.data.name.split(" ")[0],
          eventType: parsed.data.eventType,
        }),
      })
      .catch((e) => console.error("[quote] confirmation email failed", e));

    return {
      status: "success",
      message: "Got it. We'll come back within one working day with a quote and a cue list.",
    };
  } catch (e) {
    console.error("[quote] send failed", e);
    return {
      status: "error",
      message: "We couldn't send that just now. Email us directly and we'll pick it up.",
    };
  }
}
