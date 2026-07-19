import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { FileCheck, ShieldCheck, Key, Settings2 } from 'lucide-react'
import Layout from '../components/Layout'
import FileUpload from '../components/FileUpload'
import SignatureDisplay from '../components/SignatureDisplay'
import VerificationSection from '../components/VerificationSection'
import KeysSection from '../components/KeysSection'

export default function SignPage() {
  const [activeTab, setActiveTab] = useState<'sign' | 'verify' | 'keys'>('sign')
  const [signedFile, setSignedFile] = useState<File | null>(null)
  const [signature, setSignature] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileSign = async (file: File) => {
    setIsLoading(true)
    setSignedFile(file)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/sign', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to sign file')

      const data = await response.json()
      setSignature(data.signature)
    } catch (error) {
      console.error('Error signing file:', error)
      alert('Error signing file. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadSignature = () => {
    if (!signature || !signedFile) return

    const signatureData = {
      filename: signedFile.name,
      signature,
      timestamp: new Date().toISOString(),
      algorithm: 'RSA-SHA256',
    }

    const blob = new Blob([JSON.stringify(signatureData, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${signedFile.name}.sig`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { id: 'sign', label: 'Sign Document', icon: FileCheck },
    { id: 'verify', label: 'Verify Signature', icon: ShieldCheck },
    { id: 'keys', label: 'Manage Keys', icon: Key },
  ]

  return (
    <>
      <Head>
        <title>DigiSign — Cryptographic Tools</title>
        <meta name="description" content="Sign and verify documents using RSA-2048." />
      </Head>

      <Layout>
        <div className="py-[64px] px-6 md:px-12 flex flex-col items-center min-h-[80vh]">
          <div className="w-full max-w-[800px] flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-10 w-full">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Settings2 className="w-5 h-5 text-mute" />
                <span className="text-[14px] font-medium text-mute tracking-[0.2px]">CRYPTOGRAPHIC TOOLS</span>
              </div>
              <h1 className="text-[32px] md:text-[40px] font-semibold text-on-dark tracking-tight mb-3">
                {activeTab === 'sign' && 'Sign a Document'}
                {activeTab === 'verify' && 'Verify a Signature'}
                {activeTab === 'keys' && 'Key Management'}
              </h1>
              <p className="text-[16px] text-body max-w-[500px] mx-auto">
                {activeTab === 'sign' && 'Generate an RSA-2048 signature for any file to guarantee its authenticity and integrity.'}
                {activeTab === 'verify' && 'Upload a document and its signature file to cryptographically verify it hasn\'t been tampered with.'}
                {activeTab === 'keys' && 'View the current RSA-2048 key pair used by the system for cryptographic operations.'}
              </p>
            </div>

            {/* Pill Tabs (Raycast Style) */}
            <div className="flex items-center gap-1 bg-transparent mb-8">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className="rc-pill-tab flex items-center gap-2 relative"
                    data-active={isActive}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content Container */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {activeTab === 'sign' && (
                    <div className="space-y-6">
                      <div className="rc-card-surface p-[24px]">
                        <h2 className="text-[16px] font-medium text-on-dark mb-4">Upload file to sign</h2>
                        <FileUpload
                          onFileSelect={handleFileSign}
                          accept=".txt,.pdf,.doc,.docx"
                          maxSize={10 * 1024 * 1024}
                          isLoading={isLoading}
                        />
                      </div>

                      {signature && signedFile && (
                        <SignatureDisplay
                          signature={signature}
                          filename={signedFile.name}
                          onDownload={handleDownloadSignature}
                        />
                      )}
                    </div>
                  )}

                  {activeTab === 'verify' && <VerificationSection />}
                  {activeTab === 'keys' && <KeysSection />}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </Layout>
    </>
  )
}
