# CodeState UI

A modern VS Code webview application for managing development sessions, scripts, and terminal collections. Built with Preact and featuring a minimal design system inspired by codestate.dev with glassmorphism effects and three theme modes.

## Features

### Core Functionality
- **Session Management**: Create, view, and manage development sessions
- **Script Management**: Organize and execute scripts within sessions
- **Terminal Collections**: Group and manage terminal instances
- **Configuration Management**: Customize settings and preferences
- **Real-time Updates**: Live data synchronization with VS Code

### Design System
- **Three Theme Modes**: Match IDE (inherits VS Code theme), Light (soft grays), Dark (codestate.dev inspired)
- **Glassmorphism Effects**: Restrained transparency and blur for depth and layering
- **Smooth Animations**: Subtle micro-animations with purposeful transitions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Adapts to different screen sizes
- **Modular Components**: Easy to scale and customize

## Components

### Accordion
Minimal headers with soft hover/focus glow, smooth expand/collapse with easing.

```tsx
import { Accordion } from './components';

<Accordion 
  items={[
    { id: 'item1', title: 'Title', content: 'Content', defaultOpen: true }
  ]} 
/>
```

### Card
Rounded corners, subtle glassmorphism with blurred background, soft shadows.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from './components';

<Card variant="elevated" padding="md">
  <CardHeader>
    <h2>Title</h2>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <button className="btn-primary">Action</button>
  </CardFooter>
</Card>
```

### Tabs
Simple pill-style or underline-style tabs with smooth transitions.

```tsx
import { Tabs } from './components';

<Tabs 
  items={[
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' }
  ]}
  variant="underline"
/>
```

### ThemeSwitcher
Switch between the three theme modes with visual previews.

```tsx
import { ThemeSwitcher } from './components';

<ThemeSwitcher 
  currentTheme="dark"
  onThemeChange={(theme) => setTheme(theme)}
/>
```

## Design Principles

- **Muted Dark Neutrals**: Base colors inspired by codestate.dev
- **Subtle Gradients**: Light depth effects without heaviness
- **Single Accent Color**: Consistent interactivity (links, buttons, focus states)
- **Generous Spacing**: Breathable, balanced layout
- **Soft Rounded Corners**: Consistent across all components
- **Clean Typography**: Professional readability, native to VS Code
- **Calm Precision**: Understated elegance without distraction

## Color Palette

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

## Usage

### Development
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Build with watch mode
npm run build:watch

# Type checking
npm run type-check
```

### Installation
```bash
npm install @codestate/ui
```

### Integration

#### Option 1: ES Modules (Recommended)
```javascript
// Import the JavaScript
import '@codestate/ui'

// Import the CSS
import '@codestate/ui/css'
// or
import '@codestate/ui/style'
```

#### Option 2: HTML Direct Import
```html
<link rel="stylesheet" href="node_modules/@codestate/ui/dist/codesate-ui.css">
<script src="node_modules/@codestate/ui/dist/codesate-ui.iife.js"></script>
```

#### Option 3: Using the global object
```javascript
// After including the script, the UI will be available as window.CodeStateUI
const app = new CodeStateUI({
  // configuration options
});
```

### For VS Code Extensions
```typescript
// In your VS Code extension
import * as vscode from 'vscode';

const panel = vscode.window.createWebviewPanel(
  'codestate-ui',
  'CodeState UI',
  vscode.ViewColumn.One,
  {
    enableScripts: true,
    localResourceRoots: [
      vscode.Uri.joinPath(context.extensionUri, 'node_modules', '@codestate', 'ui', 'dist')
    ]
  }
);

// Set the HTML content
panel.webview.html = `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="${panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'node_modules', '@codestate', 'ui', 'dist', 'codesate-ui.css'))}">
    </head>
    <body>
      <div id="app"></div>
      <script src="${panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'node_modules', '@codestate', 'ui', 'dist', 'codesate-ui.iife.js'))}"></script>
    </body>
  </html>
`;

// Or using ES modules in your extension code:
// import '@codestate/ui'
// import '@codestate/ui/css'
```

## Main Application Features

### Session Management
- Create and manage development sessions
- Session cards with status indicators
- Real-time session updates and synchronization

### Script Management
- Organize scripts within sessions
- Script execution and monitoring
- Script configuration and settings

### Terminal Collections
- Group terminal instances
- Terminal collection management
- Integrated terminal workflows

### Configuration
- Theme customization (Light, Dark, Match IDE)
- Extension settings management
- Persistent configuration storage

## Browser Support

- Modern browsers with CSS custom properties support
- Webkit browsers for backdrop-filter (glassmorphism)
- Responsive design for mobile and desktop
- Optimized for VS Code webview environment