import { z } from "zod";
import { eventTypes } from "./site";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  organisation: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a phone number we can reach you on"),
  eventType: z.enum(eventTypes, { message: "Pick the closest event type" }),
  eventDate: z.string().trim().min(1, "Enter the event date, or 'not set' if it isn't fixed"),
  venue: z.string().trim().min(2, "Enter the venue or city"),
  guests: z.coerce
    .number({ message: "Enter roughly how many guests you expect" })
    .int()
    .min(1, "Enter at least 1 guest")
    .max(500_000, "That's more guests than we can quote online — send us an email"),
  products: z.array(z.string()).min(1, "Pick at least one product"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — real people never fill this in.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof QuoteInput, string>>;
};
