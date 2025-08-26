# Digital Signature Demo

A modern, educational web application demonstrating digital signature functionality using RSA cryptography. Built with Next.js and Node.js with a cybersecurity-themed dark UI.

## 🚀 Features

- **Digital Signing**: Upload documents and generate RSA digital signatures
- **Signature Verification**: Verify document integrity using digital signatures
- **Key Management**: View RSA public/private key pairs (educational purposes)
- **Modern UI**: Dark cybersecurity theme with smooth animations
- **Responsive Design**: Works on desktop and mobile devices
- **Educational**: Clear explanations of cryptographic processes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express API routes
- **Crypto**: Built-in Node.js crypto module (RSA-2048, SHA-256)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Upload**: Formidable

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## 🚀 Quick Start

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo>
   cd signature
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
signature/
├── components/           # Reusable React components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── FileUpload.tsx   # File upload component
│   ├── SignatureDisplay.tsx
│   ├── VerificationSection.tsx
│   └── KeysSection.tsx
├── pages/               # Next.js pages
│   ├── index.tsx        # Homepage
│   ├── sign.tsx         # Signature tool page
│   ├── _app.tsx         # App wrapper
│   └── api/             # API routes
│       ├── sign.js      # Document signing endpoint
│       ├── verify.js    # Signature verification
│       └── keys.js      # Key retrieval
├── styles/
│   └── globals.css      # Global styles and Tailwind
├── public/              # Static assets
└── README.md
```

## 🔐 How It Works

### Digital Signing Process
1. **File Upload**: User uploads a document (PDF, TXT, DOC, etc.)
2. **Hash Generation**: SHA-256 hash is created from file content
3. **Signature Creation**: Hash is encrypted using RSA private key
4. **Download**: Signature file (.sig) is generated for download

### Verification Process
1. **File Upload**: User uploads original document + signature file
2. **Hash Verification**: Original file is hashed again
3. **Signature Verification**: Signature is decrypted using public key
4. **Comparison**: Hashes are compared to verify integrity

## 🎨 UI Features

- **Dark Cybersecurity Theme**: Modern dark UI with cyber-blue accents
- **Smooth Animations**: Framer Motion page transitions and hover effects
- **Responsive Design**: Mobile-friendly layout
- **Interactive Components**: Drag-and-drop file uploads, copy-to-clipboard
- **Visual Feedback**: Loading states, success/error indicators

## 🔒 Security Notes

⚠️ **Educational Purpose Only**
- Private keys are exposed for demonstration
- In production, private keys must be kept secure
- This demo uses session-based key generation
- Not suitable for production cryptographic operations

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 📚 Learning Resources

This project demonstrates:
- **RSA Cryptography**: Public/private key encryption
- **Digital Signatures**: Authentication and integrity verification  
- **Hash Functions**: SHA-256 for data integrity
- **File Processing**: Secure file upload and processing
- **Modern Web Development**: Next.js, TypeScript, Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Use responsibly and never expose private keys in production environments.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)
- [RSA Algorithm](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
- [Digital Signatures](https://en.wikipedia.org/wiki/Digital_signature)

---

Built with ❤️ for cybersecurity education
