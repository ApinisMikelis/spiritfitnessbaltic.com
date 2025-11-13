# @mono/web-sanity-embed

A Next.js application that embeds Sanity Studio within the main web application, providing a seamless content management experience

## 🚀 Features

- Next.js 14 with App Router
- Embedded Sanity Studio
- TypeScript for type safety
- Tailwind CSS for styling
- Custom studio configuration
- Responsive design

## 🛠️ Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0
- Sanity account and project
- Access to the main web application

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
pnpm dev:web-sanity-embed
```

The embedded Sanity Studio will be available at `http://localhost:3000/studio`.

## 🧪 Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm type-check`: Run TypeScript type checking

## 📁 Project Structure

```
apps/web-sanity-embed/
├── app/              # Next.js app directory
│   └── studio/       # Sanity Studio route
├── components/       # React components
├── lib/             # Utility functions
│   └── sanity/      # Sanity client configuration
└── public/          # Static assets
```

## 🔧 Configuration

- `next.config.js`: Next.js configuration
- `sanity.config.ts`: Sanity Studio configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

## 🔒 Security

This application requires proper authentication and authorization:

- Uses Sanity's built-in authentication
- Implements proper CORS policies
- Secures API routes
- Manages environment variables securely

## 📚 Documentation

For more information about Sanity Studio embedding, visit:

- [Sanity Studio Embedding](https://www.sanity.io/docs/studio-embedding)
- [Sanity Authentication](https://www.sanity.io/docs/authentication)

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## 📝 License

This project is private and proprietary.
