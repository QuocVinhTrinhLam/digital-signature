import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Download, Check, FileSignature } from 'lucide-react'

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rc-card-elevated p-[24px] mt-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded-md bg-accent-green-soft border border-hairline flex items-center justify-center">
          <FileSignature className="w-4 h-4 text-accent-green" />
        </div>
        <div>
          <h3 className="text-[16px] font-medium text-on-dark leading-tight">Signature Generated</h3>
          <p className="text-[13px] text-mute leading-tight mt-0.5">RSA-2048 with SHA-256</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface border border-hairline rounded-md p-3">
          <span className="block text-[12px] font-medium text-mute mb-1">Document</span>
          <p className="font-mono text-[13px] text-on-dark truncate">{filename}</p>
        </div>
        <div className="bg-surface border border-hairline rounded-md p-3">
          <span className="block text-[12px] font-medium text-mute mb-1">Length</span>
          <p className="text-[13px] text-on-dark">{signature.length} characters</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[14px] font-medium text-on-dark">Digital Signature (Base64)</label>
        </div>
        <div className="relative group">
          <textarea
            value={signature}
            readOnly
            className="w-full h-32 rc-input bg-surface font-mono text-[13px] text-body resize-none py-3 pr-10"
            spellCheck="false"
          />
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-surface-elevated text-mute hover:text-on-dark transition-colors"
            title="Copy signature"
          >
            {copied ? (
              <Check className="w-4 h-4 text-accent-green" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onDownload}
          className="button-primary flex-1 gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download .sig</span>
        </button>
        
        <button
          onClick={copyToClipboard}
          className="button-tertiary flex-1 gap-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-green" />
                <span>Copied</span>
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}
