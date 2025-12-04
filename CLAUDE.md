# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Start development server (http://localhost:3000)
pnpm build         # Build for production (also runs next-sitemap postbuild)
pnpm lint          # Run ESLint
pnpm start         # Start production server
```

## Architecture

This is a Next.js 15 portfolio/blog site using the App Router with MDX content.

### Content System

- **Posts**: MDX files in `content/posts/` with frontmatter (title, summary, image, author, publishedAt)
- **Projects**: MDX files in `content/projects/` with the same frontmatter structure
- Content is read via `lib/posts.ts` and `lib/projects.ts` using `gray-matter` for frontmatter parsing
- Posts use `next-mdx-remote/rsc` with `compileMDX` for server-side rendering; projects use client-side `MDXRemote`
- Reading time is calculated automatically for posts

### MDX Components

Custom MDX components are defined in `lib/mdx-components.tsx`:
- `code`: Syntax highlighting via `sugar-high`
- `Counter`: Interactive React component example
- `img`/`Image`: Styled Next.js Image wrapper

### Key Patterns

- **Server Actions**: `lib/actions.ts` handles contact form (email via Resend) and newsletter subscription
- **Form Validation**: Zod schemas in `lib/schemas.ts`
- **Theme**: `next-themes` provider in `components/providers.tsx` with system/light/dark modes
- **Path Aliases**: `@/*` maps to project root

### Route Structure

```
app/
├── page.tsx              # Home (intro, recent posts, recent projects)
├── posts/
│   ├── page.tsx          # Posts listing
│   └── [slug]/page.tsx   # Individual post (with generateStaticParams)
├── projects/
│   ├── page.tsx          # Projects listing
│   └── [slug]/page.tsx   # Individual project (with generateStaticParams)
└── contact/page.tsx      # Contact form
```

### Environment Variables

- `RESEND_API_KEY`: For sending emails
- `RESEND_AUDIENCE_ID`: For newsletter subscriptions
