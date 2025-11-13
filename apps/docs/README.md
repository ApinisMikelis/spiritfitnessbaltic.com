# @mono/docs

Documentation and Storybook for the project's UI components and features.

## 🚀 Features

- Storybook 7
- Component documentation
- Interactive examples
- TypeScript support
- Tailwind CSS integration
- Responsive design

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
pnpm dev:docs
```

The documentation will be available at `http://localhost:6006`.

## 🧪 Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm type-check`: Run TypeScript type checking

## 📁 Project Structure

```
apps/docs/
├── src/
│   ├── stories/      # Storybook stories
│   ├── components/   # Documentation components
│   └── pages/        # Documentation pages
├── .storybook/       # Storybook configuration
└── public/           # Static assets
```

## 🔧 Configuration

- `.storybook/main.ts`: Storybook main configuration
- `.storybook/preview.ts`: Storybook preview configuration
- `tsconfig.json`: TypeScript configuration

## 📚 Documentation

For more information about Storybook, visit:

- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## 📝 License

This project is private and proprietary.
