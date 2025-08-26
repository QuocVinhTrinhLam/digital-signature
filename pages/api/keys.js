import { generateKeyPair } from './sign.js'

/**
 * API endpoint for retrieving public and private keys
 * 
 * Note: In production, private keys should NEVER be exposed.
 * This is for educational purposes only.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get the key pair (generates if doesn't exist)
    const keys = generateKeyPair()
    
    // Extract key information for display
    const publicKeyInfo = {
      key: keys.publicKey,
      format: 'PEM',
      type: 'RSA Public Key',
      usage: 'Used for signature verification',
      keySize: '2048 bits'
    }
    
    const privateKeyInfo = {
      key: keys.privateKey,
      format: 'PEM', 
      type: 'RSA Private Key',
      usage: 'Used for document signing',
      keySize: '2048 bits',
      warning: '⚠️ Private keys should never be shared in production!'
    }
    
    res.status(200).json({
      success: true,
      algorithm: 'RSA',
      keySize: 2048,
      publicKey: publicKeyInfo,
      privateKey: privateKeyInfo,
      generatedAt: new Date().toISOString(),
      note: 'These keys are generated for demonstration purposes only. In production, private keys must be kept secure and never transmitted.'
    })

  } catch (error) {
    console.error('Keys retrieval error:', error)
    res.status(500).json({ 
      error: 'Failed to retrieve keys',
      details: error.message 
    })
  }
}
