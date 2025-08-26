import React, { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, FileSignature, Github, Shield } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cyber-gray/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-cyber-blue" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                DigiSign Demo
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-gray-300 hover:text-cyber-blue transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:block">Home</span>
              </Link>
              <Link 
                href="/sign" 
                className="flex items-center space-x-2 text-gray-300 hover:text-cyber-blue transition-colors"
              >
                <FileSignature className="w-4 h-4" />
                <span className="hidden sm:block">Sign & Verify</span>
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-cyber-blue transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:block">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-cyber-gray border-t border-gray-700 py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-6 h-6 text-cyber-blue" />
            <span className="text-lg font-semibold">Digital Signature Demo</span>
          </div>
          <p className="text-gray-400 mb-4">
            Educational cybersecurity demonstration built with Next.js and Node.js
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>RSA-2048 Encryption</span>
            <span>•</span>
            <span>SHA-256 Hashing</span>
            <span>•</span>
            <span>Educational Use Only</span>
          </div>
        </div>
      </footer>

      {/* Background Matrix Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-transparent to-cyber-purple/10"></div>
      </div>
    </div>
  )
}
