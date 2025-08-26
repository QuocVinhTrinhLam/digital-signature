import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, XCircle, Upload, Loader2 } from 'lucide-react'
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
      setError('Please select both the original file and signature file')
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

      if (!response.ok) {
        throw new Error('Failed to verify signature')
      }

      const result = await response.json()
      setVerificationResult(result)
    } catch (err) {
      console.error('Verification error:', err)
      setError('Failed to verify signature. Please try again.')
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
    <div className="space-y-8">
      {/* Instructions */}
      <div className="cyber-card">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="w-6 h-6 text-cyber-blue" />
          <h2 className="text-2xl font-semibold">Verify Digital Signature</h2>
        </div>
        <p className="text-gray-300 mb-4">
          Upload both the original document and its signature file to verify authenticity and integrity.
        </p>
        <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4">
          <h4 className="font-semibold text-cyber-blue mb-2">How Verification Works:</h4>
          <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
            <li>The original document is hashed using SHA-256</li>
            <li>The signature is decrypted using the public key</li>
            <li>Both hashes are compared for authenticity</li>
            <li>Result shows whether the document is unchanged</li>
          </ol>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original File Upload */}
        <div className="cyber-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Upload className="w-5 h-5 text-cyber-green" />
            <span>Original Document</span>
          </h3>
          <FileUpload
            onFileSelect={setOriginalFile}
            accept=".txt,.pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024}
          />
          {originalFile && (
            <div className="mt-3 p-3 bg-cyber-green/10 border border-cyber-green/30 rounded">
              <p className="text-cyber-green text-sm">
                ✓ Original file: {originalFile.name}
              </p>
            </div>
          )}
        </div>

        {/* Signature File Upload */}
        <div className="cyber-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Upload className="w-5 h-5 text-cyber-purple" />
            <span>Signature File</span>
          </h3>
          <FileUpload
            onFileSelect={setSignatureFile}
            accept=".sig,.json,.txt"
            maxSize={1024 * 1024} // 1MB for signature files
          />
          {signatureFile && (
            <div className="mt-3 p-3 bg-cyber-purple/10 border border-cyber-purple/30 rounded">
              <p className="text-cyber-purple text-sm">
                ✓ Signature file: {signatureFile.name}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="cyber-card border-cyber-red/50 bg-cyber-red/10"
        >
          <div className="flex items-center space-x-2 text-cyber-red">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Error</span>
          </div>
          <p className="text-gray-300 mt-2">{error}</p>
        </motion.div>
      )}

      {/* Verify Button */}
      <div className="text-center">
        <motion.button
          onClick={handleVerification}
          disabled={!originalFile || !signatureFile || isVerifying}
          className={`cyber-button text-lg px-8 py-4 flex items-center space-x-2 mx-auto ${
            (!originalFile || !signatureFile) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          whileHover={originalFile && signatureFile ? { scale: 1.05 } : {}}
          whileTap={originalFile && signatureFile ? { scale: 0.95 } : {}}
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5" />
              <span>Verify Signature</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`cyber-card border-2 ${
            verificationResult.isValid 
              ? 'border-cyber-green bg-cyber-green/10' 
              : 'border-cyber-red bg-cyber-red/10'
          }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            {verificationResult.isValid ? (
              <CheckCircle className="w-8 h-8 text-cyber-green" />
            ) : (
              <XCircle className="w-8 h-8 text-cyber-red" />
            )}
            <div>
              <h3 className={`text-2xl font-bold ${
                verificationResult.isValid ? 'text-cyber-green' : 'text-cyber-red'
              }`}>
                {verificationResult.status}
              </h3>
              <p className="text-gray-300">{verificationResult.message}</p>
            </div>
          </div>

          {/* Verification Details */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Verification Details</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Original File:</span>
                  <p className="font-mono text-white">{verificationResult.originalFilename}</p>
                </div>
                <div>
                  <span className="text-gray-400">Signature File:</span>
                  <p className="font-mono text-white">{verificationResult.signatureFilename}</p>
                </div>
                <div>
                  <span className="text-gray-400">Verified At:</span>
                  <p className="text-white">{new Date(verificationResult.verificationTimestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {verificationResult.signatureMetadata && (
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Signature Metadata</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Original Filename:</span>
                    <p className="font-mono text-white">{verificationResult.signatureMetadata.originalFilename}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Signed At:</span>
                    <p className="text-white">{new Date(verificationResult.signatureMetadata.signatureTimestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Algorithm:</span>
                    <p className="text-cyber-blue">{verificationResult.signatureMetadata.algorithm}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div className="mt-6 text-center">
            <motion.button
              onClick={resetVerification}
              className="bg-cyber-gray hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Verify Another File
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Security Information */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold mb-4 text-cyber-blue">Security Notes</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• A valid signature confirms the document hasn&apos;t been tampered with</p>
          <p>• An invalid signature indicates potential document modification</p>
          <p>• Signature files contain metadata about the signing process</p>
          <p>• This demo uses RSA-2048 with SHA-256 hashing</p>
          <p>• In production, always verify signatures from trusted sources</p>
        </div>
      </div>
    </div>
  )
}
