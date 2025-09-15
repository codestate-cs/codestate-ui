# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in CodeState UI, please report it responsibly:

### How to Report

1. **Do not** create a public GitHub issue
2. Email us at: security@codestate.dev (if you have this email) or create a private security advisory
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- We will acknowledge receipt of your report within 48 hours
- We will provide regular updates on our progress
- We will work with you to understand and resolve the issue
- We will credit you in our security advisories (unless you prefer to remain anonymous)

### Response Timeline

- **Critical vulnerabilities**: Within 24 hours
- **High severity**: Within 72 hours  
- **Medium/Low severity**: Within 1 week

## Security Best Practices

When using CodeState UI:

1. **Keep dependencies updated**: Regularly update your dependencies
2. **Use HTTPS**: Always use HTTPS in production environments
3. **Validate inputs**: Ensure all user inputs are properly validated
4. **Follow VS Code security guidelines**: When integrating with VS Code extensions

## Security Considerations

CodeState UI is designed for VS Code webview environments and includes:

- **No external network requests**: The UI doesn't make external API calls
- **Sandboxed environment**: Runs within VS Code's webview sandbox
- **Type safety**: Built with TypeScript for additional safety
- **Minimal dependencies**: Uses only essential, well-maintained packages

## Contact

For security-related questions or concerns, please contact us through the methods mentioned above.

Thank you for helping keep CodeState UI secure!