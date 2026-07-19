import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle, XCircle, ShieldCheck, FileText, FileSignature, RotateCcw } from 'lucide-react'
import FileUpload from './FileUpload'

interface VerificationResult {
  isValid: boolean
  status: string
  message: string
  originalFilename: string
  signatureFilename: string
  verificationTimestamp: string
  signatureMetadata?: {
    originalFilename: string
    signatureTimestamp: string
    algorithm: string
  }
}

export default function VerificationSection() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [signatureFile, setSignatureFile] = useState<File | null>(null)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string>('')

  const handleVerification = async () => {
    if (!originalFile || !signatureFile) {
      setError('Please provide both the original document and the signature file.')
      return
    }

    setIsVerifying(true)
    setError('')
    setVerificationResult(null)

    try {
      const formData = new FormData()
      formData.append('originalFile', originalFile)
      formData.append('signatureFile', signatureFile)

      const response = await fetch('/api/verify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Verification request failed.')

      const result = await response.json()
      setVerificationResult(result)
    } catch (err) {
      console.error('Verification error:', err)
      setError('An error occurred during verification. Please ensure files are valid.')
    } finally {
      setIsVerifying(false)
    }
  }

  const resetVerification = () => {
    setOriginalFile(null)
    setSignatureFile(null)
    setVerificationResult(null)
    setError('')
  }

  return (
    <div className="space-y-6">
      
      {!verificationResult && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* Original File */}
          <div className="rc-card-surface p-[24px]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-md bg-accent-blue-soft border border-hairline flex items-center justify-center">
                <FileText className="w-4 h-4 text-accent-blue" />
              </div>
              <div>
                <h3 className="text-[16px] font-medium text-on-dark leading-tight">Original Document</h3>
                <p className="text-[13px] text-mute leading-tight mt-0.5">The file that was signed</p>
              </div>
            </div>
            <FileUpload
              onFileSelect={setOriginalFile}
              accept=".txt,.pdf,.doc,.docx"
              maxSize={10 * 1024 * 1024}
            />
          </div>

          {/* Signature File */}
          <div className="rc-card-surface p-[24px]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-md bg-accent-blue-soft border border-hairline flex items-center justify-center">
                <FileSignature className="w-4 h-4 text-accent-blue" />
              </div>
              <div>
                <h3 className="text-[16px] font-medium text-on-dark leading-tight">Signature File</h3>
                <p className="text-[13px] text-mute leading-tight mt-0.5">The .sig file generated earlier</p>
              </div>
            </div>
            <FileUpload
              onFileSelect={setSignatureFile}
              accept=".sig,.json,.txt"
              maxSize={1024 * 1024}
            />
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && !verificationResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-accent-red-soft border border-hairline rounded-md p-4 flex items-start space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-accent-red mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-[14px] font-medium text-on-dark">Verification Failed</h4>
              <p className="text-[13px] text-mute mt-1">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verify Action */}
      {!verificationResult && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-2"
        >
          <button
            onClick={handleVerification}
            disabled={!originalFile || !signatureFile || isVerifying}
            className={`button-primary px-8 flex items-center gap-2 ${
              (!originalFile || !signatureFile || isVerifying) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isVerifying ? 'Verifying...' : 'Verify Signature'}</span>
          </button>
        </motion.div>
      )}

      {/* Verification Result */}
      <AnimatePresence mode="wait">
        {verificationResult && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rc-card-elevated p-[32px]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 border border-hairline ${
                  verificationResult.isValid 
                    ? 'bg-accent-green-soft' 
                    : 'bg-accent-red-soft'
                }`}>
                  {verificationResult.isValid ? (
                    <CheckCircle className="w-6 h-6 text-accent-green" />
                  ) : (
                    <XCircle className="w-6 h-6 text-accent-red" />
                  )}
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold text-on-dark mb-1 tracking-[0.2px]">
                    {verificationResult.status}
                  </h3>
                  <p className="text-[14px] text-mute">{verificationResult.message}</p>
                </div>
              </div>
              
              <button
                onClick={resetVerification}
                className="button-secondary gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Verify Another</span>
              </button>
            </div>

            {/* Data Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-surface border border-hairline rounded-md p-[24px]">
                <h4 className="text-[12px] uppercase tracking-[0.2px] text-mute font-medium mb-4 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>File Details</span>
                </h4>
                <div className="space-y-4 text-[13px]">
                  <div>
                    <span className="block text-mute mb-1">Original File</span>
                    <p className="font-mono text-on-dark truncate">{verificationResult.originalFilename}</p>
                  </div>
                  <div>
                    <span className="block text-mute mb-1">Signature File</span>
                    <p className="font-mono text-on-dark truncate">{verificationResult.signatureFilename}</p>
                  </div>
                  <div>
                    <span className="block text-mute mb-1">Verification Time</span>
                    <p className="text-on-dark">{new Date(verificationResult.verificationTimestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {verificationResult.signatureMetadata && (
                <div className="bg-surface border border-hairline rounded-md p-[24px]">
                  <h4 className="text-[12px] uppercase tracking-[0.2px] text-mute font-medium mb-4 flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Signature Metadata</span>
                  </h4>
                  <div className="space-y-4 text-[13px]">
                    <div>
                      <span className="block text-mute mb-1">Signed Origin File</span>
                      <p className="font-mono text-on-dark truncate">{verificationResult.signatureMetadata.originalFilename}</p>
                    </div>
                    <div>
                      <span className="block text-mute mb-1">Signing Time</span>
                      <p className="text-on-dark">{new Date(verificationResult.signatureMetadata.signatureTimestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="block text-mute mb-1">Cryptographic Algorithm</span>
                      <p className="text-on-dark font-medium">{verificationResult.signatureMetadata.algorithm}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
