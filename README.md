# 📐 eslint-plugin-tailwind-logical-properties

An ESLint plugin to help you transition from **physical** to **logical** properties in [Tailwind CSS](https://tailwindcss.com/). Future-proof your layouts and support RTL (Right-to-Left) languages with ease.

## 🚀 Overview

This plugin enforces the use of **CSS Logical Properties** (like `margin-inline-start`) instead of their physical counterparts (like `margin-left`). It automatically detects and offers to fix Tailwind CSS utility classes in your JSX and standard utility functions.

### ✨ Key Features
- 🛠️ **Automatic Fixing**: Uses `--fix` to instantly update your codebase.
- 🧩 **Deep Integration**: Supports `className` attributes and popular utilities like `cn`, `clsx`, and `cva`.
- 🌍 **RTL Ready**: Building for international audiences becomes a breeze.
- ⚡ **Zero Configuration**: Sensible defaults that work out of the box.

## 📦 Installation

Install the plugin as a dev dependency via npm:

```bash
npm install -D liamfiddler/eslint-plugin-tailwind-logical-properties
```

## ⚙️ Configuration

Add the plugin to your ESLint configuration. 

e.g. in your `eslint.config.mjs`:

```javascript
import logicalProperties from 'eslint-plugin-tailwind-logical-properties';

export default [
    {
        plugins: {
            'tailwind-logical-properties': logicalProperties,
        },
        rules: {
            'tailwind-logical-properties/no-physical-properties': 'warn',
        },
    },
];
```

## 💡 Why Logical Properties?

Physical properties (Top, Bottom, Left, Right) are tied to the physical orientation of the screen. **Logical properties** (Start, End, Block, Inline) are tied to the flow of the content.

| Physical | Logical Equivalent | Benefit |
| :------- | :----------------- | :------ |
| `ml-4`   | `ms-4`             | Correct margin in both LTR and RTL. |
| `pr-2`   | `pe-2`             | Padding stays on the "end" regardless of direction. |
| `mt-6`   | `mbs-6`            | margin-block-start is consistent across writing modes. |

## 🔧 Supported Mappings

The following Tailwind utilities are currently covered:

| Physical Utility | Logical Utility | Property |
| :--------------- | :-------------- | :------- |
| `mt-`            | `mbs-`          | margin-top → margin-block-start |
| `mb-`            | `mbe-`          | margin-bottom → margin-block-end |
| `ml-`            | `ms-`           | margin-left → margin-inline-start |
| `mr-`            | `me-`           | margin-right → margin-inline-end |
| `pt-`            | `pbs-`          | padding-top → padding-block-start |
| `pb-`            | `pbe-`          | padding-bottom → padding-block-end |
| `pl-`            | `ps-`           | padding-left → padding-inline-start |
| `pr-`            | `pe-`           | padding-right → padding-inline-end |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
