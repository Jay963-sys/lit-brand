import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

const dark = "#05050a";
const haze = "#f2ecff";
const mist = "#b7b2cb";

export default function QuoteConfirmationEmail({
  name,
  eventType,
}: {
  name: string;
  eventType: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>We have your event details — Lit Brand</Preview>
      <Body style={{ backgroundColor: dark, fontFamily: "Helvetica, Arial, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "560px", padding: "32px 24px" }}>
          <Text style={{ color: mist, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
            Lit Brand
          </Text>
          <Heading style={{ color: haze, fontSize: "26px", margin: "8px 0 20px" }}>
            We have your details, {name}.
          </Heading>
          <Text style={{ color: mist, fontSize: "15px", lineHeight: "24px" }}>
            Thanks for telling us about your {eventType.toLowerCase()}. Someone from the team will
            come back to you within one working day with a quote and a suggested cue list.
          </Text>
          <Text style={{ color: mist, fontSize: "15px", lineHeight: "24px" }}>
            If the date is close, reply to this email or message us on WhatsApp and we will move
            faster.
          </Text>
          <Text style={{ color: haze, fontSize: "13px", marginTop: "28px" }}>
            Lit the moment forever.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
