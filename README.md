# JAZTON portfolio

Personal engineering portfolio for Jazton Teoh Wee Kuan, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide.

## Run locally

Requires Node.js 20.9+ and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

Keep the checkout outside iCloud-managed folders so source/configuration reads cannot stall during compilation.

## Content

- `lib/data.ts`: project descriptions, technical skills, social links and resume path.
- `app/page.tsx`: homepage, education, experience and contact.
- `app/projects/[slug]/page.tsx`: individual project studies.
- `components/liquid-glass.tsx`: animated WebGL ribbons, cursor/touch deformation, pause control, reduced-motion support and static CSS fallback.
- `components/header.tsx`: fixed header, section tracking and mobile navigation.
- `components/copy-email.tsx`: copy-email action and accessible feedback.
- `components/whatsapp.tsx`: WhatsApp shortcut.
- `public/brand/`: supplied JT and JAZTON assets. The black wordmark is displayed in white with CSS inversion as requested.
- `app/fonts/`: supplied Aeonik Regular, Medium and Bold, self-hosted using next/font/local.
- `public/Jazton_Teoh_Wee_Kuan_Resume.pdf`: original supplied resume, publicly downloadable.

The project illustrations are conceptual, not original project screenshots. No measured outcomes or matching source repositories have been invented. The GitHub section loads public repositories directly and handles loading, empty and unavailable states. Contact links open email, social profiles and WhatsApp; no message is sent automatically.

## Deploy

Import this repository into Vercel as a Next.js project. Install with `pnpm install` and build with `pnpm build`. No environment variables or API keys are required.

Original project photos, screenshots, circuit diagrams and a portrait can be added when supplied. Preserve the existing brand assets and personal introduction.
