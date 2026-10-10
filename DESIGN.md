# Alex / After-hours sketchbook

An artwork-first, dark editorial portfolio for anime fans considering a personal commission. The site should feel like an independent artist's small printed art book, not a subscription product or an agency.

**Direction:** ENERGY 3 / RHYTHM 3 / MOTION 2. Bold introductory typography, staggered full-piece artwork, compact price rows, a quieter personal note, and a spacious closing contact spread. One-time section entrances and a restrained pointer-driven artwork tilt; nothing floats or pulses forever.

## Decisions

Graphite (#18191b) frames the colorful physical drawings without tinting them. Warm paper (#f2efe8) relates to the original medium and provides readable contrasting sections. Muted lilac (#c7b9e3) provides a distinct editorial accent, rather than competing with the characters' marker colors. Green is reserved for the actual Open state, never decoration.

Bricolage Grotesque carries confident, irregularly proportioned headings and compact readable UI. Instrument Serif italic is a small human gesture in the headline and personal note, not the font of every section. Use proper case for body/UI copy and modestly tracked small labels only for artwork numbering and section indices.

The hero shows supplied Ai Hoshino and Aquamarine artwork, rather than a generated studio scene. Full pieces remain visible in the gallery with captions outside the image. The first screen and gallery use paper mounting rather than glossy cards. Shadows are limited to mounted hero drawings, where they separate physical layers.

The commission menu uses three real finish options in rows, with Full Color selected initially because these five pieces demonstrate that medium. No popularity badge or invented testimonials. Selecting an option updates its inquiry subject and delivery details.

The artist is one person with a flexible schedule. State this clearly without manufacturing rush availability, a response-time SLA, fixed completion times, slot counts, or professional-client statistics. Keep all existing pricing/payment/cancellation/use conditions unchanged in meaning.

Use a low-emphasis Terms link near contact and in the footer. No public wallet address or website checkout. Payment remains an agreed direct-message process with 50% upfront, watermarked preview, balance, then high-resolution delivery.

Navigation uses real section anchors. A modal gallery uses Radix focus management, keyboard arrows, Escape, previous/next controls, and optional zoom. Reduced-motion and touch users receive the same content and controls without tilt. Copy actions report success or a useful manual fallback.

## Sources applied

[Anti Slop](https://github.com/miqdadbadjuber/anti-slop), inspected at local checkout, supplied the honesty, purpose, mobile, accessibility, and composition checks. Its installation wizard is not part of this project; the source is used as a design reference for this authorized upgrade.

[React Bits Tilted Card](https://reactbits.dev/components/tilted-card), [source](https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/TiltedCard), adapted to the existing framer-motion dependency with smaller rotation, no floating tooltip, semantic controls, responsive sizing, and reduced-motion/pointer guards. The full upstream license is retained in `THIRD_PARTY_NOTICES.md`.

The gallery's five works are Alex's supplied traditional artworks. Their colors, framing, and content are not regenerated. Optimized WebP copies reduce download weight without cropping; original files remain available for the full-screen viewer.
