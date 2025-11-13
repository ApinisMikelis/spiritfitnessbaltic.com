# Project UI

A modern, monorepo-based UI project built with Next.js, TypeScript, and Tailwind CSS. This project uses Turborepo for managing the monorepo structure and pnpm as the package manager.

## 🚀 Project Structure

The project is organized as a monorepo with the following structure:

### Apps

- `docs`: Documentation and Storybook
- `web`: Main web application
- `studio`: Sanity Studio configuration
- `web-sanity-embed`: Sanity Studio embed application

### Packages

- `ui`: Shared UI components
- `environment-config`: Environment configuration
- `eslint-config`: Shared ESLint configuration
- `tailwind-config`: Shared Tailwind CSS configuration
- `typescript-config`: Shared TypeScript configuration

## 🛠️ Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

## 🏗️ Installation

1. Clone the repository:

```bash
git clone https://github.com/designer-rxk/project-ui.git
cd project-ui
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
```

## 🚀 Development

The project uses Turborepo for managing the monorepo. Here are the available scripts:

- `pnpm dev`: Start all applications in development mode
- `pnpm dev:web`: Start only the web application
- `pnpm dev:docs`: Start only the documentation
- `pnpm dev:studio`: Start only the Sanity Studio
- `pnpm dev:web-sanity-embed`: Start the Sanity Studio embed application

## 🧪 Available Scripts

- `pnpm build`: Build all applications and packages
- `pnpm lint`: Run linting across all packages
- `pnpm format`: Format all TypeScript and Markdown files
- `pnpm check-types`: Run type checking across all packages

## 📚 Documentation

The project uses Storybook for component documentation. You can access it by running:

```bash
pnpm dev:docs
```

## 🎨 UI Components

The project includes a shared UI component library with various components, including:

- TypewriterText: A component that creates a typewriter effect for text
- And more components available in the UI package

## 🔧 Configuration

The project uses several shared configurations:

- TypeScript configuration
- ESLint configuration
- Tailwind CSS configuration
- Environment configuration

## 📦 Package Management

This project uses pnpm as the package manager. The workspace is configured in `pnpm-workspace.yaml`.

## 🔄 CI/CD

The project uses Turborepo for efficient builds and caching. The configuration can be found in `turbo.json`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

---

For more information about specific components or features, please refer to the documentation in the `docs` application.
