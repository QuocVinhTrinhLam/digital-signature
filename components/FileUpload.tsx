import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, File, X, Loader2 } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number
  isLoading?: boolean
}

export default function FileUpload({ 
  onFileSelect, 
  accept = "*", 
  maxSize = 10 * 1024 * 1024, // 10MB default
  isLoading = false 
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleFileSelection = (file: File) => {
    // Validate file size
    if (file.size > maxSize) {
      alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`)
      return
    }

    // Validate file type if accept is specified
    if (accept !== "*") {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const isAccepted = acceptedTypes.some(type => 
        type === fileExtension || 
        type === file.type ||
        (type.startsWith('.') && fileExtension === type)
      )
      
      if (!isAccepted) {
        alert(`File type not supported. Accepted types: ${accept}`)
        return
      }
    }

    setSelectedFile(file)
    onFileSelect(file)
  }

  const clearFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full">
      {/* File Upload Area */}
      <motion.div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-cyber-blue bg-cyber-blue/10' 
            : isLoading
            ? 'border-gray-600 bg-gray-800/50'
            : 'border-gray-600 hover:border-cyber-blue hover:bg-cyber-blue/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-cyber-blue animate-spin" />
            <p className="text-lg font-medium text-cyber-blue">Processing file...</p>
            <p className="text-sm text-gray-400">Generating digital signature</p>
          </div>
        ) : selectedFile ? (
          <div className="flex flex-col items-center space-y-4">
            <File className="w-12 h-12 text-cyber-green" />
            <div>
              <p className="text-lg font-medium text-cyber-green">File Selected</p>
              <p className="text-sm text-gray-300">{selectedFile.name}</p>
              <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                clearFile()
              }}
              className="flex items-center space-x-1 text-cyber-red hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium">
                {dragActive ? 'Drop file here' : 'Upload a file'}
              </p>
              <p className="text-sm text-gray-400">
                Drag and drop or click to select
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <p>Max size: {Math.round(maxSize / 1024 / 1024)}MB</p>
              {accept !== "*" && <p>Accepted: {accept}</p>}
            </div>
          </div>
        )}
      </motion.div>

      {/* File Info */}
      {selectedFile && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 cyber-card"
        >
          <h4 className="font-semibold mb-2 text-cyber-blue">File Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Name:</span>
              <p className="font-mono text-white break-all">{selectedFile.name}</p>
            </div>
            <div>
              <span className="text-gray-400">Size:</span>
              <p className="text-white">{formatFileSize(selectedFile.size)}</p>
            </div>
            <div>
              <span className="text-gray-400">Type:</span>
              <p className="text-white">{selectedFile.type || 'Unknown'}</p>
            </div>
            <div>
              <span className="text-gray-400">Modified:</span>
              <p className="text-white">{new Date(selectedFile.lastModified).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
