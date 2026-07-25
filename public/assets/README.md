# Site image assets — provenance & usage constraints

These images are illustrative editorial assets. They are **not** documentary
evidence, real customer records, case studies, or authentic portraits. Preserve
the labeling constraints below wherever they are rendered.

## founder-origin-collage.{avif,webp,png}

- Source: `livingry_founder_origin_collage.png` (1774×887), resized to 1600px wide.
- An **editorial illustration** of the three credential-loss failure modes
  (destroyed records, undocumented know-how, scattered custody) resolving into
  owner-controlled custody. It is a stylized collage, **not** a documentary
  photograph or an authentic founder portrait.
- An authentic founder portrait remains an optional future replacement.

## hvac-field-context.{avif,webp,png}

- Source: `livingry_hvac_field_context.png` (1727×911), resized to 1600px wide.
- **Illustrative field context** showing a fictional, non-identifiable HVAC
  technician. It must **not** be described as a real client, customer, or case
  study.

## insights/ai-for-hvac-companies-hero.{avif,webp,png} + -og.png

- Hero for `/insights/ai-for-hvac-companies` (1536×1024). An **editorial
  illustration** of an HVAC operation with one AI-assisted workflow running
  through it. The people in it are fictional and non-identifiable; it is not a
  client, a case study, or a documentary photograph.
- `-og.png` is a 1200×630 attention-cropped variant used only for Open Graph and
  Twitter cards, where the wide frame is what renders.

## insights/hvac-{customer-lifecycle,ai-autonomy-ceiling,ai-90-day-roadmap}.{avif,webp,png}

- Informational diagrams for the same guide, resized to 1600px wide. Every label
  is rendered text, so these are encoded at higher quality than the photographic
  assets (AVIF q80 with 4:4:4 chroma, WebP q92) to keep small type legible.
- They restate content that also appears as body copy and tables on the page, so
  the article does not depend on the images to be readable.

Each photographic source PNG was optimized with `sharp` to AVIF (q60), WebP (q80), and an
optimized PNG fallback. Rendered via a `<picture>` element so browsers pick the
smallest supported format with a PNG fallback.
