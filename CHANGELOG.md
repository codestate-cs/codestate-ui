# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Contributing guidelines
- Open source documentation

## [1.0.2] - 2024-12-19

### Changed
- **UI Improvements**: Enhanced lifecycle event descriptions in Create Script and Create Terminal Collection dialogs
- **User Experience**: Added professional, clear descriptions for lifecycle options:
  - Open: "Automatically executes when VSCode opens a workspace with the matching project root"
  - None: "Manual execution only - script/terminal collection will not run automatically and must be explicitly added to a session"
- **Default Behavior**: Changed default lifecycle for terminal collections from 'open' to 'none' for better user control

### Removed
- **Deprecated Feature**: Hidden "resume" lifecycle option from UI (temporarily disabled pending future implementation)

### Fixed
- **Accessibility**: Improved lifecycle option presentation with better visual hierarchy and descriptions
- **Consistency**: Standardized lifecycle option styling across Create Script and Create Terminal Collection dialogs

## [1.0.0] - 2024-09-15

### Added
- Initial release of CodeState UI
- VS Code webview application for managing development sessions, scripts, and terminal collections
- Modern design system with glassmorphism effects
- Three theme modes: Light, Dark, and Match IDE
- Session management with real-time updates
- Script management and execution
- Terminal collection management
- Configuration management with persistent storage
- Responsive design with accessibility support
- Built with Preact, Zustand, and TypeScript
- MIT License for open source distribution
- Comprehensive documentation and changelog
- npm package ready for distribution

### Features
- **Session Management**: Create, view, and manage development sessions
- **Script Management**: Organize and execute scripts within sessions
- **Terminal Collections**: Group and manage terminal instances
- **Theme System**: Dynamic theme switching with CSS custom properties
- **Component Library**: Reusable UI components (Accordion, Card, Tabs, Dialog, etc.)
- **State Management**: Centralized state with Zustand
- **Type Safety**: Full TypeScript support

### Technical
- Preact-based architecture for optimal performance
- Vite build system with watch mode
- CSS custom properties for theming
- Provider pattern for clean separation of concerns
- Event handling for VS Code extension communication
- Modular component architecture
- npm package configuration with proper entry points