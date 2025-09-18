# Development Guide

This document contains development-related information for the CodeState UI library.

## Architecture

### Technology Stack
- **Preact**: Lightweight React alternative for optimal performance
- **Zustand**: State management for data and UI state
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **CSS Custom Properties**: Dynamic theming system

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── SessionCard.tsx  # Session display component
│   ├── ScriptList.tsx   # Script management interface
│   ├── MainTabs.tsx     # Main navigation tabs
│   └── ...
├── providers/           # Context providers and data management
├── hooks/              # Custom React hooks
├── managers/           # Business logic managers
├── store/              # Zustand state stores
├── types/              # TypeScript type definitions
└── styles/             # CSS and design system
```

### Key Features
- **Provider Pattern**: Clean separation between UI and data logic
- **Context Management**: Centralized state and configuration
- **Event Handling**: Robust communication with VS Code extension
- **Theme System**: Dynamic theme switching with CSS custom properties

## Development Setup

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn package manager

### Getting Started
```bash
# Clone the repository
git clone https://github.com/codestate-cs/codestate-ui.git
cd codestate-ui

# Install dependencies
npm install

# Build the application
npm run build

# Build with watch mode for development
npm run build:watch

# Type checking
npm run type-check
```

### Available Scripts
- `npm run build` - Build the production bundle
- `npm run build:watch` - Build with watch mode for development
- `npm run type-check` - Run TypeScript type checking
- `npm run prepublishOnly` - Automatically runs before publishing to npm

## Design System

### Design Principles
- **Muted Dark Neutrals**: Base colors inspired by codestate.dev
- **Subtle Gradients**: Light depth effects without heaviness
- **Single Accent Color**: Consistent interactivity (links, buttons, focus states)
- **Generous Spacing**: Breathable, balanced layout
- **Soft Rounded Corners**: Consistent across all components
- **Clean Typography**: Professional readability, native to VS Code
- **Calm Precision**: Understated elegance without distraction

### Color Palette
Based on codestate.dev colors:

```css
--background: hsl(240, 10%, 3.9%);
--foreground: hsl(0, 0%, 98%);
--muted: hsl(240, 3.7%, 15.9%);
--muted-foreground: hsl(240, 5%, 64.9%);
--primary: hsl(207, 90%, 54%);
--border: hsl(240, 3.7%, 15.9%);
--radius: 0.5rem;
```

## Component Development

### Creating New Components
1. Create the component file in `src/components/`
2. Add corresponding CSS file with component-specific styles
3. Export the component from `src/components/index.ts`
4. Follow the existing patterns for props, styling, and accessibility

### Component Guidelines
- Use TypeScript for all components
- Follow the design system principles
- Ensure accessibility with proper ARIA attributes
- Use CSS custom properties for theming
- Include hover and focus states
- Test across different theme modes

## Building and Publishing

### Build Process
The project uses Vite for building with the following configuration:
- Production build outputs to `dist/` directory
- Generates both CSS and JavaScript bundles
- Optimized for VS Code webview environment

### Publishing to npm
```bash
# Update version in package.json
npm version patch  # or minor, major

# Build the project
npm run build

# Publish to npm
npm publish
```

### Package Contents
The published package includes:
- `dist/codesate-ui.iife.js` - Main JavaScript bundle
- `dist/codesate-ui.css` - CSS styles
- `README.md` - User documentation
- `LICENSE` - MIT license
- `CHANGELOG.md` - Version history

## Testing

### Type Checking
```bash
npm run type-check
```

### Manual Testing
- Test components in different theme modes
- Verify accessibility with keyboard navigation
- Test responsive behavior
- Validate VS Code webview integration

## Contributing

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use Preact hooks for state management
- Maintain consistent CSS structure

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with a clear description

### Issues and Bug Reports
- Use GitHub issues for bug reports and feature requests
- Provide clear reproduction steps
- Include relevant system information
- Test with the latest version before reporting

## Browser Support

- Modern browsers with CSS custom properties support
- Webkit browsers for backdrop-filter (glassmorphism)
- Responsive design for mobile and desktop
- Optimized for VS Code webview environment