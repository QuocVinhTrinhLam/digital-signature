import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Shield } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sign', label: 'Sign & Verify' },
    { href: '/keys', label: 'Keys' }, // We'll move Keys to a separate tab in sign.tsx, but let's keep it simple for now or just link to /sign
  ]

  return (
    <div className="min-h-screen bg-canvas text-body flex flex-col font-sans selection:bg-surface-elevated selection:text-white">
      {/* Primary Nav */}
      <nav className="h-[56px] bg-canvas border-b border-hairline flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-surface-card border border-hairline flex items-center justify-center group-hover:bg-surface-elevated transition-colors">
              <Shield className="w-3.5 h-3.5 text-on-dark" />
            </div>
            <span className="text-on-dark font-medium text-[16px] tracking-tight">
              DigiSign
            </span>
          </Link>

          {/* Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-[14px] font-medium tracking-[0.2px] transition-colors ${router.pathname === '/' ? 'text-on-dark' : 'text-body hover:text-on-dark'}`}
            >
              Overview
            </Link>
            <Link 
              href="/sign" 
              className={`text-[14px] font-medium tracking-[0.2px] transition-colors ${router.pathname === '/sign' ? 'text-on-dark' : 'text-body hover:text-on-dark'}`}
            >
              Sign Document
            </Link>
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/QuocVinhTrinhLam/digital-signature"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-[14px] font-medium text-body hover:text-on-dark transition-colors tracking-[0.2px]"
          >
            GitHub
          </a>
          <Link href="/sign" className="button-primary">
            Start Signing
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer Section */}
      <footer className="bg-canvas border-t border-hairline pt-16 pb-16 px-6 md:px-12 mt-auto">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-mute" />
                <span className="text-on-dark font-medium text-[14px] tracking-tight">DigiSign</span>
              </div>
              <p className="text-mute text-[13px] leading-[1.6] max-w-xs">
                A cryptographic tool for signing and verifying digital documents using RSA-2048 and SHA-256.
              </p>
            </div>
            
            <div>
              <h4 className="text-on-dark text-[14px] font-medium tracking-[0.2px] mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-body text-[14px] hover:text-on-dark transition-colors">Overview</Link></li>
                <li><Link href="/sign" className="text-body text-[14px] hover:text-on-dark transition-colors">Sign</Link></li>
                <li><Link href="/sign" className="text-body text-[14px] hover:text-on-dark transition-colors">Verify</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-on-dark text-[14px] font-medium tracking-[0.2px] mb-4">Security</h4>
              <ul className="space-y-3">
                <li><span className="text-body text-[14px]">RSA-2048</span></li>
                <li><span className="text-body text-[14px]">SHA-256</span></li>
                <li><span className="text-body text-[14px]">PKCS#1 PSS</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-on-dark text-[14px] font-medium tracking-[0.2px] mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-body text-[14px] hover:text-on-dark transition-colors">About</a></li>
                <li><a href="#" className="text-body text-[14px] hover:text-on-dark transition-colors">Blog</a></li>
                <li><a href="#" className="text-body text-[14px] hover:text-on-dark transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-hairline text-[13px] text-mute">
            <p>© {new Date().getFullYear()} DigiSign. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="https://github.com/QuocVinhTrinhLam/digital-signature" target="_blank" rel="noopener noreferrer" className="hover:text-on-dark transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
