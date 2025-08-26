import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { Upload, Download, FileCheck, AlertCircle, Key, Eye, EyeOff } from 'lucide-react'
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

  // Handle file signing
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

      if (!response.ok) {
        throw new Error('Failed to sign file')
      }

      const data = await response.json()
      setSignature(data.signature)
    } catch (error) {
      console.error('Error signing file:', error)
      alert('Error signing file. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle signature download
  const handleDownloadSignature = () => {
    if (!signature || !signedFile) return

    const signatureData = {
      filename: signedFile.name,
      signature: signature,
      timestamp: new Date().toISOString(),
      algorithm: 'RSA-SHA256'
    }

    const blob = new Blob([JSON.stringify(signatureData, null, 2)], {
      type: 'application/json'
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
    { id: 'verify', label: 'Verify Signature', icon: AlertCircle },
    { id: 'keys', label: 'View Keys', icon: Key },
  ]

  return (
    <>
      <Head>
        <title>Digital Signature Tool - Sign & Verify Documents</title>
        <meta name="description" content="Sign and verify documents using RSA digital signatures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="min-h-screen py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                Digital Signature Tool
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Sign documents securely or verify existing signatures using RSA cryptography
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="flex space-x-1 bg-cyber-gray p-1 rounded-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-cyber-blue text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-cyber-dark'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:block">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              {activeTab === 'sign' && (
                <div className="space-y-8">
                  {/* File Upload Section */}
                  <div className="cyber-card">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                      <Upload className="w-6 h-6 text-cyber-blue" />
                      <span>Upload Document to Sign</span>
                    </h2>
                    <FileUpload
                      onFileSelect={handleFileSign}
                      accept=".txt,.pdf,.doc,.docx"
                      maxSize={10 * 1024 * 1024} // 10MB
                      isLoading={isLoading}
                    />
                    <p className="text-sm text-gray-400 mt-4">
                      Supported formats: TXT, PDF, DOC, DOCX (max 10MB)
                    </p>
                  </div>

                  {/* Signature Display */}
                  {signature && signedFile && (
                    <SignatureDisplay
                      signature={signature}
                      filename={signedFile.name}
                      onDownload={handleDownloadSignature}
                    />
                  )}

                  {/* How it Works */}
                  <div className="cyber-card">
                    <h3 className="text-xl font-semibold mb-4 text-cyber-blue">How Digital Signing Works</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-cyber-green">1. Hash Generation</h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Your document is processed through SHA-256 to create a unique fingerprint (hash).
                        </p>
                        
                        <h4 className="font-semibold mb-2 text-cyber-purple">2. Signature Creation</h4>
                        <p className="text-gray-300 text-sm">
                          The hash is encrypted using our private RSA key to create the digital signature.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-cyber-blue">3. Verification</h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Anyone can verify the signature using our public key to ensure document integrity.
                        </p>
                        
                        <h4 className="font-semibold mb-2 text-cyber-green">4. Security</h4>
                        <p className="text-gray-300 text-sm">
                          Any tampering with the document will result in signature verification failure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'verify' && (
                <VerificationSection />
              )}

              {activeTab === 'keys' && (
                <KeysSection />
              )}
            </motion.div>
          </div>
        </div>
      </Layout>
    </>
  )
}
