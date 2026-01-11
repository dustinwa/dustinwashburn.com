# Dustin Washburn - Modern Landing Page

A modern, responsive landing page built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ Built with Next.js 14 App Router
- 🎨 Modern, responsive design with Tailwind CSS
- 🌙 Dark mode support
- ✨ Smooth animations and transitions
- 📱 Fully responsive across all devices
- 🔥 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Features section
│   ├── About.tsx       # About section
│   ├── CTA.tsx         # Call-to-action section
│   └── Footer.tsx      # Footer component
└── public/             # Static assets
```

## Customization

The landing page is fully customizable. You can:

- Update content in each component file
- Modify colors and styling in `tailwind.config.ts`
- Add new sections by creating components in the `components/` directory
- Update the mockup reference image (`landingpageidea.jpg`) to match your design

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library
