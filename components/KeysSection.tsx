import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, Eye, EyeOff, Copy, Check, ShieldAlert, Lock, Unlock } from 'lucide-react'

interface KeyData {
  publicKey: {
    key: string
    format: string
    type: string
    usage: string
    keySize: string
  }
  privateKey: {
    key: string
    format: string
    type: string
    usage: string
    keySize: string
    warning: string
  }
  algorithm: string
  keySize: number
  generatedAt: string
}

export default function KeysSection() {
  const [keyData, setKeyData] = useState<KeyData | null>(null)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copiedKey, setCopiedKey] = useState<'public' | 'private' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchKeys()
  }, [])

  const fetchKeys = async () => {
    try {
      const response = await fetch('/api/keys')
      const data = await response.json()
      setKeyData(data)
    } catch (error) {
      console.error('Error fetching keys:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, keyType: 'public' | 'private') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(keyType)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy key:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-6 h-6 border-2 border-hairline border-t-body rounded-full animate-spin" />
        <p className="text-[14px] text-mute">Loading Keys...</p>
      </div>
    )
  }

  if (!keyData) {
    return (
      <div className="rc-card-surface border-accent-red-soft bg-surface text-center py-10">
        <ShieldAlert className="w-8 h-8 text-accent-red mx-auto mb-3" />
        <p className="text-[14px] font-medium text-on-dark">Failed to load cryptographic keys.</p>
        <p className="text-[13px] text-mute mt-1">Please check your connection and try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rc-card-surface p-[24px] flex items-center justify-between">
          <div>
            <p className="text-[12px] font-medium text-mute tracking-[0.2px] uppercase mb-1">Algorithm</p>
            <p className="text-[16px] font-medium text-on-dark flex items-center gap-2">
              <Key className="w-4 h-4 text-mute" />
              {keyData.algorithm}-{keyData.keySize}
            </p>
          </div>
          <div className="w-10 h-10 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center">
            <Lock className="w-4 h-4 text-body" />
          </div>
        </div>
        <div className="rc-card-surface p-[24px] flex items-center justify-between">
          <div>
            <p className="text-[12px] font-medium text-mute tracking-[0.2px] uppercase mb-1">Generated</p>
            <p className="text-[14px] font-medium text-body mt-1">
              {new Date(keyData.generatedAt).toLocaleString()}
            </p>
          </div>
          <div className="w-10 h-10 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-body" />
          </div>
        </div>
      </div>

      {/* Public Key Card */}
      <div className="rc-card-surface p-[24px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-accent-green-soft border border-hairline flex items-center justify-center">
              <Unlock className="w-4 h-4 text-accent-green" />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-on-dark leading-tight">Public Key</h3>
              <p className="text-[13px] text-mute leading-tight mt-0.5">Used for verifying signatures ({keyData.publicKey.format})</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(keyData.publicKey.key, 'public')}
            className="button-secondary h-[32px] px-3 text-[13px] flex items-center gap-1.5"
          >
            {copiedKey === 'public' ? (
              <><Check className="w-3.5 h-3.5 text-accent-green" /><span>Copied</span></>
            ) : (
              <><Copy className="w-3.5 h-3.5 text-mute" /><span>Copy</span></>
            )}
          </button>
        </div>
        <textarea
          value={keyData.publicKey.key}
          readOnly
          className="w-full h-32 rc-input font-mono text-[12px] text-body resize-none py-3"
          spellCheck="false"
        />
      </div>

      {/* Private Key Card */}
      <div className="rc-card-surface p-[24px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-accent-yellow-soft border border-hairline flex items-center justify-center">
              <Lock className="w-4 h-4 text-accent-yellow" />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-on-dark leading-tight">Private Key</h3>
              <p className="text-[13px] text-mute leading-tight mt-0.5">Used for generating signatures ({keyData.privateKey.format})</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="button-tertiary h-[32px] px-3 text-[13px] flex items-center gap-1.5"
            >
              {showPrivateKey ? (
                <><EyeOff className="w-3.5 h-3.5 text-mute" /><span>Hide</span></>
              ) : (
                <><Eye className="w-3.5 h-3.5 text-mute" /><span>Reveal</span></>
              )}
            </button>
            {showPrivateKey && (
              <button
                onClick={() => copyToClipboard(keyData.privateKey.key, 'private')}
                className="button-secondary h-[32px] px-3 text-[13px] flex items-center gap-1.5"
              >
                {copiedKey === 'private' ? (
                  <><Check className="w-3.5 h-3.5 text-accent-green" /><span>Copied</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5 text-mute" /><span>Copy</span></>
                )}
              </button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            {showPrivateKey ? (
              <motion.textarea
                key="visible"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                value={keyData.privateKey.key}
                readOnly
                className="w-full h-32 rc-input font-mono text-[12px] text-accent-yellow resize-none py-3"
                spellCheck="false"
              />
            ) : (
              <motion.div
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-32 rounded-md bg-surface-elevated border border-hairline flex flex-col items-center justify-center cursor-pointer hover:bg-surface-card transition-colors group"
                onClick={() => setShowPrivateKey(true)}
              >
                <div className="w-10 h-10 rounded-md bg-surface border border-hairline flex items-center justify-center mb-3">
                  <Eye className="w-4 h-4 text-mute group-hover:text-on-dark transition-colors" />
                </div>
                <p className="text-[14px] font-medium text-body group-hover:text-on-dark transition-colors">Click to reveal private key</p>
                <p className="text-[12px] font-medium text-accent-yellow mt-1 tracking-[0.2px] uppercase">Highly Confidential</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
