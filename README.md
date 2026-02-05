> [!NOTE]
> **Forked from [openclaw.ai](https://openclaw.ai)** website repository.  
> This project maintains the original design and structure while serving the OpenAGI community.

<div align="center">
  <img src="./openagi-logo-text.png" alt="OpenAGI" width="400">
  
  # OpenAGI - Open Source AI Agent Framework
  
  **Building the Future of Autonomous AI Agents Together**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![GitHub Stars](https://img.shields.io/github/stars/openagi/openagi?style=social)](https://github.com/openagi/openagi)
  [![Discord](https://img.shields.io/discord/community?color=7289da&label=Discord&logo=discord&logoColor=white)](https://discord.gg/openagi)
  
  [Website](https://openagi.ai) • [Documentation](https://docs.openagi.ai) • [Community](https://discord.gg/openagi) • [Contributing](#contributing)
</div>

---

## 🌟 About OpenAGI

**OpenAGI** is a community-driven, open-source framework for building powerful autonomous AI agents. We believe in democratizing AI agent technology, making it accessible, extensible, and community-owned.

### 🎯 Our Mission

To empower developers, researchers, and organizations to build intelligent AI agents that can reason, learn, and act autonomously — all within an open, collaborative ecosystem.

---

## 🚀 Landing Page

This repository hosts the official **OpenAGI landing page** — your gateway to the OpenAGI ecosystem.

**Live Site**: [openagi.ai](https://openagi.ai)

### 📄 Pages

- **`/`** — Main landing page featuring Quick Start guide, key features, and community testimonials
- **`/integrations`** — Comprehensive grid of supported chat providers, AI models, platforms, and development tools
- **`/shoutouts`** — Community love, testimonials, and project mentions

---

## 🛠️ Tech Stack

- **[Astro](https://astro.build/)** — Lightning-fast static site generator
- **GitHub Pages / Vercel** — Hosting and deployment
- **Custom CSS** — Pure, handcrafted styling with modern aesthetics
- **Lucide Icons** — Beautiful, consistent iconography

---

## 💻 Development

### Prerequisites

- Node.js 18+ or Bun 1.0+

### Local Setup

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

The site will be available at `http://localhost:4321/`

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```

---

## 🚢 Deployment

### GitHub Pages

This repository includes automated GitHub Actions workflow for deployment:

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site goes live at your GitHub Pages URL

Manual deployment trigger:
- Go to `Actions` tab → `Deploy to GitHub Pages` → `Run workflow`

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openagi/landing)

1. Connect your GitHub repository to Vercel
2. Each push automatically triggers deployment
3. Instant preview deployments for PRs

---

## 📦 Installation Scripts

The landing page hosts official OpenAGI installer scripts for seamless installation:

### macOS / Linux

```bash
# Full installation with onboarding
curl -fsSL --proto '=https' --tlsv1.2 https://openagi.ai/install.sh | bash

# CLI-only installation (no interactive onboarding)
curl -fsSL --proto '=https' --tlsv1.2 https://openagi.ai/install-cli.sh | bash
```

### Windows

```powershell
# PowerShell installation
iwr -useb https://openagi.ai/install.ps1 | iex
```

### What the Installer Does

1. ✅ Installs package manager (Homebrew on macOS, detects on Windows)
2. ✅ Ensures Node.js 22+ is installed
3. ✅ Installs `openclaw` globally via npm
4. ✅ Runs migration checks (`openclaw doctor --non-interactive`)
5. ✅ Prompts for interactive onboarding (new installations)

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's:

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 Design enhancements

### How to Contribute

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🔗 Ecosystem

| Resource | Description |
|----------|-------------|
| **[Main Repository](https://github.com/openagi/openagi)** | Core OpenAGI framework |
| **[Documentation](https://docs.openagi.ai)** | Comprehensive guides and API reference |
| **[Discord Community](https://discord.gg/openagi)** | Join discussions, get help, share ideas |
| **[GitHub Discussions](https://github.com/openagi/openagi/discussions)** | Community forum |
| **[Blog](https://openagi.ai/blog)** | Latest news and updates |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 💖 Community

Built with ❤️ by the OpenAGI community.

**Join us in shaping the future of AI agents!**

- 🌐 [Website](https://openagi.ai)
- 💬 [Discord](https://discord.gg/openagi)
- 🐦 [Twitter](https://twitter.com/openagi)
- 📧 [Email](mailto:community@openagi.ai)

---

<div align="center">
  <sub>Making AI agents accessible to everyone, everywhere.</sub>
</div>
