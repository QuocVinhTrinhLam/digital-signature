import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download, Check, FileSignature, Calendar, Hash } from 'lucide-react'

interface SignatureDisplayProps {
  signature: string
  filename: string
  onDownload: () => void
}

export default function SignatureDisplay({ signature, filename, onDownload }: SignatureDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(signature)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy signature:', err)
    }
  }

  // Truncate signature for display
  const truncatedSignature = signature.length > 100 
    ? `${signature.substring(0, 50)}...${signature.substring(signature.length - 50)}`
    : signature

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="cyber-card"
    >
      <div className="flex items-center space-x-2 mb-6">
        <FileSignature className="w-6 h-6 text-cyber-green" />
        <h2 className="text-2xl font-semibold text-cyber-green">Digital Signature Generated</h2>
      </div>

      {/* Signature Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Document</label>
            <p className="font-mono text-white bg-cyber-dark p-2 rounded border">{filename}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Algorithm</label>
            <p className="text-cyber-blue font-semibold">RSA-SHA256</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Generated</label>
            <div className="flex items-center space-x-2 text-white">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleString()}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Signature Length</label>
            <div className="flex items-center space-x-2 text-cyber-purple">
              <Hash className="w-4 h-4" />
              <span>{signature.length} characters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Display */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Digital Signature (Base64)</label>
        <div className="relative">
          <textarea
            value={signature}
            readOnly
            className="w-full h-32 cyber-input font-mono text-xs resize-none"
            placeholder="Signature will appear here..."
          />
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-2 hover:bg-cyber-blue/20 rounded transition-colors"
            title="Copy signature"
          >
            {copied ? (
              <Check className="w-4 h-4 text-cyber-green" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
        {copied && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyber-green text-sm mt-2"
          >
            Signature copied to clipboard!
          </motion.p>
        )}
      </div>

      {/* Signature Preview */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Signature Preview</label>
        <div className="bg-cyber-dark p-4 rounded border font-mono text-xs text-gray-300 break-all">
          {truncatedSignature}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          onClick={onDownload}
          className="cyber-button flex items-center justify-center space-x-2 flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          <span>Download Signature File (.sig)</span>
        </motion.button>
        
        <motion.button
          onClick={copyToClipboard}
          className="bg-cyber-gray hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Signature</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
        <h4 className="font-semibold text-cyber-blue mb-2">Security Information</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• This signature proves the document&apos;s integrity and authenticity</li>
          <li>• Anyone can verify this signature using the corresponding public key</li>
          <li>• If the document is modified, the signature verification will fail</li>
          <li>• Keep the original document and signature file together</li>
        </ul>
      </div>
    </motion.div>
  )
}
