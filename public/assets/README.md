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

Each source PNG was optimized with `sharp` to AVIF (q60), WebP (q80), and an
optimized PNG fallback. Rendered via a `<picture>` element so browsers pick the
smallest supported format with a PNG fallback.
