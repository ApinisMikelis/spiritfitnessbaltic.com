# @mono/ui

A shared UI component library for the project, built with React, TypeScript, and Tailwind CSS.

## 🎨 Features

- Modern, reusable React components
- Fully typed with TypeScript
- Styled with Tailwind CSS
- Storybook documentation
- Customizable and themeable

## 📦 Installation

```bash
pnpm add @mono/ui
```

## 🚀 Usage

```tsx
import { TypewriterText } from "@mono/ui";

export default function MyComponent() {
  return (
    <TypewriterText
      text="Hello, World!"
      speed={50}
      delay={0}
      showCursor={true}
    />
  );
}
```

## 🧩 Available Components

### TypewriterText

A component that creates a typewriter effect for text.

Props:

- `text`: The text to be typed out
- `speed`: Speed of typing in milliseconds (default: 50)
- `delay`: Initial delay before typing starts in milliseconds (default: 0)
- `showCursor`: Whether to show the blinking cursor (default: true)
- `onComplete`: Callback function that is called when typing is completed
- `className`: Additional CSS classes to apply

## 📚 Documentation

For detailed documentation and examples, visit our Storybook:

```bash
pnpm dev:docs
```

## 🔧 Development

1. Install dependencies:

```bash
pnpm install
```

2. Start development:

```bash
pnpm dev
```

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## 📝 License

This package is private and proprietary.
