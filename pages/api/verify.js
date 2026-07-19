import crypto from 'crypto'
import formidable from 'formidable'
import fs from 'fs'
import { generateKeyPair } from './sign.js'

// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

/**
 * API endpoint for verifying digital signatures
 * 
 * Process:
 * 1. Parse uploaded original file and signature file
 * 2. Generate SHA-256 hash of original file
 * 3. Verify signature using RSA public key
 * 4. Return verification result
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get the key pair (this ensures consistency with signing)
    const keys = generateKeyPair()

    // Parse form data with file uploads
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true,
      multiples: true, // Allow multiple files
    })

    const [fields, files] = await form.parse(req)
    
    // Get the uploaded files
    const originalFile = Array.isArray(files.originalFile) ? files.originalFile[0] : files.originalFile
    const signatureFile = Array.isArray(files.signatureFile) ? files.signatureFile[0] : files.signatureFile
    
    // Check if both files are provided
    if (!originalFile || !signatureFile) {
      return res.status(400).json({ 
        error: 'Both original file and signature file are required' 
      })
    }

    // Read original file content
    const originalContent = fs.readFileSync(originalFile.filepath)
    
    // Read signature file content
    const signatureContent = fs.readFileSync(signatureFile.filepath, 'utf8')
    
    let signatureData
    let signatureBase64
    
    try {
      // Try to parse as JSON (our signature format)
      signatureData = JSON.parse(signatureContent)
      signatureBase64 = signatureData.signature
    } catch (parseError) {
      // If not JSON, treat the entire content as the signature
      signatureBase64 = signatureContent.trim()
    }
    
    // Convert Base64 signature back to buffer
    const signatureBuffer = Buffer.from(signatureBase64, 'base64')
    
    // Verify the signature using RSA public key
    const isValid = crypto.verify('sha256', originalContent, {
      key: keys.publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }, signatureBuffer)
    
    // Clean up temporary files
    fs.unlinkSync(originalFile.filepath)
    fs.unlinkSync(signatureFile.filepath)
    
    // Prepare response with verification details
    const response = {
      success: true,
      isValid: isValid,
      originalFilename: originalFile.originalFilename,
      signatureFilename: signatureFile.originalFilename,
      originalFileSize: originalFile.size,
      algorithm: 'RSA-SHA256',
      hashAlgorithm: 'SHA-256',
      verificationTimestamp: new Date().toISOString(),
      status: isValid ? 'VALID' : 'INVALID',
      message: isValid 
        ? 'Signature is valid - document has not been tampered with'
        : 'Signature is invalid - document may have been modified or signature is incorrect'
    }
    
    // Include signature metadata if available
    if (signatureData) {
      response.signatureMetadata = {
        originalFilename: signatureData.filename,
        signatureTimestamp: signatureData.timestamp,
        algorithm: signatureData.algorithm
      }
    }
    
    res.status(200).json(response)

  } catch (error) {
    console.error('Verification error:', error)
    res.status(500).json({ 
      error: 'Failed to verify signature',
      details: error.message 
    })
  }
}
