import crypto from 'crypto'
import formidable from 'formidable'
import fs from 'fs'

// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

// Generate RSA key pair (in production, these should be stored securely)
let keyPair = null

function generateKeyPair() {
  if (!keyPair) {
    keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    })
    console.log('RSA Key pair generated successfully')
  }
  return keyPair
}

/**
 * API endpoint for signing documents
 * 
 * Process:
 * 1. Parse uploaded file
 * 2. Generate SHA-256 hash of file content
 * 3. Sign the hash using RSA private key
 * 4. Return Base64 encoded signature
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Generate or get existing key pair
    const keys = generateKeyPair()

    // Parse form data with file upload
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      keepExtensions: true,
    })

    const [fields, files] = await form.parse(req)
    
    // Get the uploaded file
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file
    
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Read file content
    const fileContent = fs.readFileSync(uploadedFile.filepath)
    
    // Sign the content using RSA private key
    const signature = crypto.sign('sha256', fileContent, {
      key: keys.privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    })
    
    // Convert signature to Base64 for easy transmission
    const signatureBase64 = signature.toString('base64')
    
    // Clean up temporary file
    fs.unlinkSync(uploadedFile.filepath)
    
    // Return signature and metadata
    res.status(200).json({
      success: true,
      signature: signatureBase64,
      filename: uploadedFile.originalFilename,
      fileSize: uploadedFile.size,
      algorithm: 'RSA-SHA256',
      timestamp: new Date().toISOString(),
      hashAlgorithm: 'SHA-256'
    })

  } catch (error) {
    console.error('Signing error:', error)
    res.status(500).json({ 
      error: 'Failed to sign document',
      details: error.message 
    })
  }
}

// Export the key generation function for use in other API routes
export { generateKeyPair }
