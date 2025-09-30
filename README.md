# velvet-app

Velvet - Neurodivergent AI Assistant

## 🌟 About Velvet

<div align="center">

> **"Soft support for sharp minds"** - An AI-powered assistant designed specifically for neurodivergent individuals, providing gentle guidance and intelligent support.

</div>

## 🛠️ Tech Stack

<div align="center">

<!-- Skill Icons Table -->
<table>
  <tr>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=js" width="40" height="40" alt="JavaScript" />
      <br>
      <strong>JavaScript</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=electron" width="40" height="40" alt="Electron" />
      <br>
      <strong>Electron</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=python" width="40" height="40" alt="Python" />
      <br>
      <strong>Python</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=rust" width="40" height="40" alt="Rust" />
      <br>
      <strong>Rust</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=fastapi" width="40" height="40" alt="FastAPI" />
      <br>
      <strong>FastAPI</strong>
    </td>
  </tr>
  <tr>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=opencv" width="40" height="40" alt="OpenCV" />
      <br>
      <strong>OpenCV</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=tesseract" width="40" height="40" alt="Tesseract" />
      <br>
      <strong>Tesseract</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=ai" width="40" height="40" alt="AI/ML" />
      <br>
      <strong>AI/ML</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=nodejs" width="40" height="40" alt="Node.js" />
      <br>
      <strong>Node.js</strong>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=webpack" width="40" height="40" alt="Webpack" />
      <br>
      <strong>Webpack</strong>
    </td>
  </tr>
</table>

</div>

## ✨ Features

<div align="center">

<!-- Features Table with Icons -->
<table>
  <tr>
    <td align="center">
      <img src="https://img.icons8.com/fluency/48/000000/brain.png" width="48" height="48" alt="AI Assistant"/>
      <br>
      <strong>Neurodivergent AI Assistant</strong>
      <br>
      <span style="color: #666;">Intelligent support tailored for unique minds</span>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/48/000000/screen.png" width="48" height="48" alt="Screen Capture"/>
      <br>
      <strong>Screen Capture</strong>
      <br>
      <span style="color: #666;">Real-time context awareness</span>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/48/000000/audio.png" width="48" height="48" alt="Audio Processing"/>
      <br>
      <strong>Audio Processing</strong>
      <br>
      <span style="color: #666;">OpenAI Whisper integration</span>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.icons8.com/fluency/48/000000/ocr.png" width="48" height="48" alt="OCR"/>
      <br>
      <strong>OCR Technology</strong>
      <br>
      <span style="color: #666;">Tesseract-powered text recognition</span>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/48/000000/multitask.png" width="48" height="48" alt="Multi-service"/>
      <br>
      <strong>Multi-service Architecture</strong>
      <br>
      <span style="color: #666;">Rust + Python + Electron</span>
    </td>
    <td align="center">
      <img src="https://img.icons8.com/fluency/48/000000/security-checked.png" width="48" height="48" alt="Crash Resistant"/>
      <br>
      <strong>Crash Resistant</strong>
      <br>
      <span style="color: #666;">SIGSEGV fix implemented</span>
    </td>
  </tr>
</table>

</div>

## 🚀 Installation

<div align="center">

```bash

# Clone the repository
git clone https://github.com/Fayeq-qamar/velvet-app.git

# Navigate to project directory
cd velvet-app

# Install dependencies
npm install

# Start development mode
npm run dev

# Or start minimal version
npm run dev-minimal
```

</div>

## 📦 Project Structure

```
velvet-app/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── index-main-working.js
│   │   ├── index-safe.js
│   │   └── index-minimal.js
│   ├── renderer/            # Electron renderer process
│   │   └── stores/          # State management
│   └── services/            # Backend services
│       ├── preproc-worker/  # Python preprocessing
│       └── capture-service/ # Rust capture service
├── package.json
└── CRASH-FIX-README.md      # Crash analysis & solution
```

## 🛡️ Crash Fix Implementation

<div align="center">

![Fixed](https://img.shields.io/badge/Status-Fixed-success?style=for-the-badge&logo=check-circle&logoColor=white)
![SIGSEGV](https://img.shields.io/badge/Issue-SIGSEGV-critical?style=for-the-badge&logo=bug&logoColor=white)

</div>

**Root Cause**: Complex module loading causing memory corruption

**Solution**: Simplified module architecture with proper error handling and safe initialization patterns.

## 🤝 Contributing

<div align="center">

We welcome contributions! Please read our contributing guidelines and help us make Velvet better for neurodivergent communities.

![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge&logo=github&logoColor=white)

</div>

## 📄 License

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)

</div>

## 📞 Support

<div align="center">

For support and questions, please open an issue on GitHub or contact the development team.

![Support](https://img.shields.io/badge/Support-GitHub_Issues-8A2BE2?style=for-the-badge&logo=github&logoColor=white)

</div>

---

<div align="center">

<!-- Footer Gradient Wave -->
<img src="https://capsule-render.vercel.app/api?type=wave&color=gradient&height=120&section=footer&text=Thank+You&fontSize=40&fontColor=ffffff&animation=fadeIn" alt="Footer Banner" />

**Made with ❤️ for the neurodivergent community**

![Stars](https://img.shields.io/github/stars/Fayeq-qamar/velvet-app?style=social)
![Forks](https://img.shields.io/github/forks/Fayeq-qamar/velvet-app?style=social)

</div>

