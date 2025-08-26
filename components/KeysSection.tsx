import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Key, Eye, EyeOff, Copy, Check, AlertTriangle } from 'lucide-react'

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
      <div className="cyber-card text-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyber-blue border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading cryptographic keys...</p>
      </div>
    )
  }

  if (!keyData) {
    return (
      <div className="cyber-card text-center text-cyber-red">
        <p>Failed to load keys. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="cyber-card">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="w-6 h-6 text-cyber-blue" />
          <h2 className="text-2xl font-semibold">RSA Key Pair</h2>
        </div>
        <p className="text-gray-300 mb-4">
          View the RSA key pair used for digital signatures. The public key verifies signatures, 
          while the private key creates them.
        </p>
        <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-cyber-red mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-cyber-red">Educational Purpose Only</h4>
            <p className="text-sm text-gray-300 mt-1">
              In production environments, private keys must never be exposed or transmitted. 
              This demonstration shows both keys for educational purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Key Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="cyber-card">
          <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Algorithm Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Algorithm:</span>
              <span className="text-white">{keyData.algorithm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Key Size:</span>
              <span className="text-white">{keyData.keySize} bits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Generated:</span>
              <span className="text-white">{new Date(keyData.generatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="cyber-card">
          <h3 className="text-lg font-semibold mb-3 text-cyber-green">Security Features</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• RSA-2048 encryption strength</li>
            <li>• SHA-256 hash algorithm</li>
            <li>• PKCS#1 PSS padding</li>
            <li>• PEM format encoding</li>
          </ul>
        </div>
      </div>

      {/* Public Key */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-cyber-green">Public Key</h3>
          <button
            onClick={() => copyToClipboard(keyData.publicKey.key, 'public')}
            className="flex items-center space-x-2 text-cyber-green hover:text-green-400 transition-colors"
          >
            {copiedKey === 'public' ? (
              <><Check className="w-4 h-4" /><span>Copied!</span></>
            ) : (
              <><Copy className="w-4 h-4" /><span>Copy</span></>
            )}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Usage: {keyData.publicKey.usage}</p>
          <p className="text-sm text-gray-400">Format: {keyData.publicKey.format}</p>
        </div>
        <textarea
          value={keyData.publicKey.key}
          readOnly
          className="w-full h-40 cyber-input font-mono text-xs resize-none"
        />
      </div>

      {/* Private Key */}
      <div className="cyber-card border-cyber-red/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-cyber-red">Private Key</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="flex items-center space-x-2 text-cyber-red hover:text-red-400 transition-colors"
            >
              {showPrivateKey ? (
                <><EyeOff className="w-4 h-4" /><span>Hide</span></>
              ) : (
                <><Eye className="w-4 h-4" /><span>Show</span></>
              )}
            </button>
            {showPrivateKey && (
              <button
                onClick={() => copyToClipboard(keyData.privateKey.key, 'private')}
                className="flex items-center space-x-2 text-cyber-red hover:text-red-400 transition-colors"
              >
                {copiedKey === 'private' ? (
                  <><Check className="w-4 h-4" /><span>Copied!</span></>
                ) : (
                  <><Copy className="w-4 h-4" /><span>Copy</span></>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Usage: {keyData.privateKey.usage}</p>
          <p className="text-sm text-gray-400 mb-2">Format: {keyData.privateKey.format}</p>
          <p className="text-sm text-cyber-red">⚠️ {keyData.privateKey.warning}</p>
        </div>
        {showPrivateKey ? (
          <textarea
            value={keyData.privateKey.key}
            readOnly
            className="w-full h-40 cyber-input font-mono text-xs resize-none"
          />
        ) : (
          <div className="w-full h-40 bg-cyber-dark border border-gray-600 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Eye className="w-8 h-8 mx-auto mb-2" />
              <p>Click &quot;Show&quot; to reveal private key</p>
              <p className="text-xs mt-1">⚠️ For educational purposes only</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
