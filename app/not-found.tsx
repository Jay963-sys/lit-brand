import { GhostButton, GlowButton, Wrap } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center py-40">
      <Wrap>
        <p className="label">Blackout</p>
        <h1 className="mt-4 text-[clamp(28px,4.6vw,58px)]">Nothing lit up here.</h1>
        <p className="mt-5 max-w-[46ch] text-mist">
          That page doesn&apos;t exist. Head back to the products, or tell us about your event.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GlowButton href="/">Back to home</GlowButton>
          <GhostButton href="/products">See the products</GhostButton>
        </div>
      </Wrap>
    </section>
  );
}
