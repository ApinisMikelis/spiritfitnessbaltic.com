# @mono/web

The main web application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Sanity CMS integration
- Responsive design
- SEO optimized

## 🛠️ Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

## 🏗️ Installation

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
```

## 🚀 Development

Start the development server:

```bash
pnpm dev:web
```

The application will be available at `http://localhost:3000`.

## 🧪 Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm type-check`: Run TypeScript type checking

## 📁 Project Structure

```
apps/web/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # Global styles
```

## 🔧 Configuration

- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

## 📚 Documentation

For component documentation, visit our Storybook:

```bash
pnpm dev:docs
```

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## 📝 License

This project is private and proprietary.
