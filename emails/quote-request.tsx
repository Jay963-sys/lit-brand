import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { QuoteInput } from "@/lib/quote-schema";

const dark = "#05050a";
const haze = "#f2ecff";
const mist = "#b7b2cb";
const line = "#22202e";

export default function QuoteRequestEmail({ quote }: { quote: QuoteInput }) {
  const rows: [string, string][] = [
    ["Name", quote.name],
    ["Organisation", quote.organisation || "—"],
    ["Email", quote.email],
    ["Phone", quote.phone],
    ["Event type", quote.eventType],
    ["Date", quote.eventDate],
    ["Venue / city", quote.venue],
    ["Expected guests", String(quote.guests)],
    ["Products", quote.products.join(", ")],
  ];

  return (
    <Html>
      <Head />
      <Preview>{`New quote request — ${quote.eventType} for ${quote.guests} guests`}</Preview>
      <Body style={{ backgroundColor: dark, fontFamily: "Helvetica, Arial, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "560px", padding: "32px 24px" }}>
          <Text style={{ color: mist, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
            Lit Brand — new quote request
          </Text>
          <Heading style={{ color: haze, fontSize: "26px", margin: "8px 0 24px" }}>
            {quote.eventType} · {quote.guests} guests
          </Heading>

          <Section>
            {rows.map(([label, value]) => (
              <table key={label} width="100%" style={{ borderBottom: `1px solid ${line}` }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px 0", width: "40%" }}>
                      <Text style={{ color: mist, fontSize: "12px", margin: 0 }}>{label}</Text>
                    </td>
                    <td style={{ padding: "10px 0" }}>
                      <Text style={{ color: haze, fontSize: "14px", margin: 0 }}>{value}</Text>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </Section>

          {quote.message ? (
            <>
              <Hr style={{ borderColor: line, margin: "24px 0" }} />
              <Text style={{ color: mist, fontSize: "12px", margin: "0 0 6px" }}>Message</Text>
              <Text style={{ color: haze, fontSize: "14px", lineHeight: "22px", margin: 0 }}>
                {quote.message}
              </Text>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}
