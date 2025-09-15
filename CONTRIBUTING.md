# Contributing to CodeState UI

Thank you for your interest in contributing to CodeState UI! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- Git

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/codestate-ui.git
   cd codestate-ui
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Run type checking:
   ```bash
   npm run type-check
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards below

3. Test your changes thoroughly

4. Update documentation if necessary

5. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add new component for session management"
   ```

6. Push your branch and create a pull request

### Coding Standards

- **TypeScript**: Use TypeScript for all new code
- **Preact**: Follow Preact best practices and patterns
- **CSS**: Use the existing design system patterns and CSS custom properties
- **Components**: Follow the existing component structure and naming conventions
- **State Management**: Use Zustand for state management
- **Code Style**: Use consistent formatting and naming conventions

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add session creation dialog
fix: resolve theme switching issue
docs: update README with new features
```

## Pull Request Process

1. Ensure your code follows the coding standards
2. Update the CHANGELOG.md with your changes
3. Add tests if applicable
4. Update documentation if needed
5. Ensure all checks pass
6. Request review from maintainers

### Pull Request Template

When creating a pull request, please include:

- **Description**: Clear description of what the PR does
- **Type**: Feature, Bug Fix, Documentation, etc.
- **Testing**: How you tested the changes
- **Breaking Changes**: Any breaking changes (if applicable)
- **Screenshots**: If UI changes are involved

## Issue Reporting

When reporting issues, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, Node.js version, browser, etc.
- **Screenshots**: If applicable

## Feature Requests

For feature requests, please:

- Check existing issues first
- Provide a clear description of the feature
- Explain the use case and benefits
- Consider the impact on existing functionality

## Code of Conduct

This project follows a code of conduct. Please be respectful and constructive in all interactions.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions about contributing, please:

- Open an issue with the `question` label
- Check existing issues and discussions
- Contact the maintainers

Thank you for contributing to CodeState UI! 🎉