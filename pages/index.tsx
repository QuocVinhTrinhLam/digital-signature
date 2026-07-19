import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head'
import { Shield, Lock, FileCheck, Key, Command, Search, Fingerprint, Database, Check } from 'lucide-react'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>DigiSign — Secure Digital Signatures</title>
        <meta name="description" content="Sign and verify documents with military-grade cryptography." />
      </Head>

      <Layout>
        {/* --- Hero Section with Stripe Band --- */}
        <section className="relative pt-[96px] pb-[96px] px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden min-h-[85vh]">
          {/* Raycast signature red stripe gradient behind the headline */}
          <div className="absolute top-0 left-0 w-full h-[400px] opacity-80 pointer-events-none overflow-hidden flex justify-center">
            <div 
              className="w-[120%] h-[300px] absolute -top-[100px]"
              style={{
                background: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255, 87, 87, 0.1) 40px, rgba(255, 87, 87, 0.1) 80px), linear-gradient(135deg, #ff5757 0%, #a1131a 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)'
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-[1080px] mx-auto flex flex-col items-center">
            <h1 className="hero-headline mb-6 max-w-[800px] mx-auto text-white">
              Cryptographic security. <br className="hidden sm:block" />
              <span className="text-body">Made beautifully simple.</span>
            </h1>
            
            <p className="text-[18px] text-body mb-10 max-w-[600px] mx-auto leading-[1.6]">
              Sign and verify documents using military-grade RSA-2048 encryption. A lightning-fast, secure workflow designed for modern teams.
            </p>
            
            <div className="flex items-center gap-4 mb-16">
              <Link href="/sign" className="button-primary h-[40px] px-6 text-[15px]">
                Start Signing
              </Link>
              <Link href="/sign" className="button-secondary h-[40px] px-6 text-[15px]">
                Learn more
              </Link>
            </div>

            {/* --- Command Palette Mockup (The "Product Screenshot") --- */}
            <div className="w-full max-w-[840px] mx-auto cmd-mockup-container text-left flex flex-col bg-surface shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)]">
              {/* Header / Search */}
              <div className="h-[52px] border-b border-hairline flex items-center px-4 gap-3 bg-surface relative">
                <Search className="w-5 h-5 text-mute absolute left-4" />
                <input 
                  type="text" 
                  placeholder="Search or type a command..." 
                  className="bg-transparent border-none outline-none text-[16px] text-on-dark flex-1 h-full pl-8 pr-4 placeholder:text-body focus:ring-0 w-full"
                />
                <div className="rc-keycap">DigiSign</div>
              </div>
              
              {/* Content Rows */}
              <div className="p-2 space-y-1">
                <div className="px-3 py-2 text-[12px] font-medium text-mute tracking-[0.4px]">ACTIONS</div>
                
                <div className="cmd-mockup-row" data-active="true">
                  <div className="w-8 h-8 rounded-md bg-accent-blue-soft border border-hairline flex items-center justify-center">
                    <FileCheck className="w-4 h-4 text-accent-blue" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[14px] font-medium text-on-dark leading-tight">Sign Document</span>
                    <span className="text-[12px] text-mute leading-tight mt-0.5">Generate RSA signature for file</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="rc-keycap">⌘</span>
                    <span className="rc-keycap">S</span>
                  </div>
                </div>

                <div className="cmd-mockup-row">
                  <div className="w-8 h-8 rounded-md bg-accent-green-soft border border-hairline flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent-green" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[14px] font-medium text-on-dark leading-tight">Verify Signature</span>
                    <span className="text-[12px] text-mute leading-tight mt-0.5">Check document integrity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="rc-keycap">⌘</span>
                    <span className="rc-keycap">V</span>
                  </div>
                </div>

                <div className="cmd-mockup-row">
                  <div className="w-8 h-8 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center">
                    <Key className="w-4 h-4 text-body" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[14px] font-medium text-on-dark leading-tight">Generate Key Pair</span>
                    <span className="text-[12px] text-mute leading-tight mt-0.5">Create new RSA-2048 keys</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section className="py-[96px] px-6 md:px-12 max-w-[1240px] mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-semibold text-on-dark tracking-tight mb-4">
              Built for security teams.
            </h2>
            <p className="text-[18px] text-body max-w-[600px] mx-auto">
              Everything you need to integrate digital signatures into your workflow, without the complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rc-card-surface p-[24px] flex flex-col">
              <div className="w-10 h-10 rounded-md bg-surface-card border border-hairline flex items-center justify-center mb-6">
                <Lock className="w-5 h-5 text-body" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-dark mb-2 tracking-[0.2px]">RSA-2048 Encryption</h3>
              <p className="text-[14px] text-body leading-[1.6] mb-6 flex-1">
                Industry-standard asymmetric cryptography ensures your signatures cannot be forged or duplicated.
              </p>
              <div className="flex">
                <Link href="/sign" className="text-[14px] font-medium text-on-dark flex items-center gap-1 hover:text-body transition-colors">
                  Learn more <span className="text-mute">→</span>
                </Link>
              </div>
            </div>

            {/* Feature 2 - Elevated */}
            <div className="rc-card-elevated p-[24px] flex flex-col relative overflow-hidden">
              <div className="w-10 h-10 rounded-md bg-accent-green-soft border border-hairline flex items-center justify-center mb-6">
                <Fingerprint className="w-5 h-5 text-accent-green" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-dark mb-2 tracking-[0.2px]">Document Integrity</h3>
              <p className="text-[14px] text-body leading-[1.6] mb-6 flex-1">
                SHA-256 hashing detects even a single byte change in the original document after signing.
              </p>
              <div className="flex">
                <Link href="/sign" className="text-[14px] font-medium text-on-dark flex items-center gap-1 hover:text-body transition-colors">
                  Try it out <span className="text-mute">→</span>
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rc-card-surface p-[24px] flex flex-col">
              <div className="w-10 h-10 rounded-md bg-surface-card border border-hairline flex items-center justify-center mb-6">
                <Database className="w-5 h-5 text-body" />
              </div>
              <h3 className="text-[18px] font-semibold text-on-dark mb-2 tracking-[0.2px]">Non-repudiation</h3>
              <p className="text-[14px] text-body leading-[1.6] mb-6 flex-1">
                Create a mathematically provable audit trail linking a specific identity to a specific document.
              </p>
              <div className="flex">
                <Link href="/sign" className="text-[14px] font-medium text-on-dark flex items-center gap-1 hover:text-body transition-colors">
                  Learn more <span className="text-mute">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- Bottom CTA --- */}
        <section className="py-[96px] px-6 md:px-12 flex flex-col items-center justify-center text-center">
          <div className="rc-card-surface p-12 max-w-[800px] w-full flex flex-col items-center">
            <h2 className="text-[32px] md:text-[40px] font-semibold text-on-dark tracking-tight mb-4">
              Ready to secure your files?
            </h2>
            <p className="text-[18px] text-body mb-8 max-w-[500px]">
              No registration required. Generate keys and start signing immediately directly in your browser.
            </p>
            <Link href="/sign" className="button-primary h-[40px] px-8 text-[15px]">
              Start Signing Now
            </Link>
          </div>
        </section>
      </Layout>
    </>
  )
}
