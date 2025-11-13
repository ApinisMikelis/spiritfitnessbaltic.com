# @mono/studio

Sanity Studio configuration for the project's content management system.

## 🚀 Features

- Sanity Studio v3
- Custom schema definitions
- Custom input components
- Custom document actions
- Custom document badges
- Custom document views

## 🛠️ Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0
- Sanity account and project

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
pnpm dev:studio
```

The Sanity Studio will be available at `http://localhost:3333`.

## 🧪 Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm type-check`: Run TypeScript type checking

## 📁 Project Structure

```
apps/studio/
├── schemas/          # Sanity schema definitions
├── components/       # Custom components
├── plugins/         # Sanity plugins
└── config/          # Studio configuration
```

## 🔧 Configuration

- `sanity.config.ts`: Sanity Studio configuration
- `tsconfig.json`: TypeScript configuration

## 📚 Documentation

For more information about Sanity Studio, visit:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## 📝 License

This project is private and proprietary.
