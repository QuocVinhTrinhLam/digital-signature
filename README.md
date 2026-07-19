# DigiSign 🛡️

A developer-focused, high-performance web application for secure digital signature operations using military-grade RSA-2048 cryptography. 

[🔗 View GitHub Repository](https://github.com/QuocVinhTrinhLam/digital-signature)

<br/>
<div align="center">
  <img src="./public/preview.png" alt="DigiSign Command Palette Interface Preview" width="100%"/>
  <p><i>The sleek, Raycast-inspired interface for cryptographic operations.</i></p>
</div>
<br/>

## ✨ Key Features
- **Sign Documents**: Generate mathematically secure RSA-2048 digital signatures for any file using SHA-256 hashing.
- **Verify Integrity**: Instantly verify document integrity and authenticity against provided signatures. 
- **Key Management**: Generate and inspect public/private key pairs directly in your browser.
- **Anti-Slop Design**: A clean, premium developer-tool aesthetic inspired by the Raycast design system.

## 🚀 Quick Start
```bash
git clone https://github.com/QuocVinhTrinhLam/digital-signature.git
cd digital-signature
npm install
npm run dev
```
Open `http://localhost:3000` to start signing.

## 🛠️ Tech Stack
- **Framework**: Next.js (React, TypeScript)
- **Styling**: Tailwind CSS (Custom Raycast Design System)
- **Cryptography**: Node.js Native Crypto Module

## 🔒 Under the Hood
DigiSign leverages a robust combination of **SHA-256 hashing** and **RSA-2048 asymmetric cryptography**. When you sign a document, the system generates a unique digital fingerprint (hash) of the file using SHA-256, which is then encrypted using your mathematically generated RSA-2048 Private Key with PKCS#1 PSS padding.

## 📄 License
MIT
