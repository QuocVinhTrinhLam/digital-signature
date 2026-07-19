import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  maxSize = 10 * 1024 * 1024,
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
    if (file.size > maxSize) {
      alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`)
      return
    }
    // basic extension validation omitted for brevity if accept=*
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
      <div
        className={`relative border rounded-lg p-8 text-center transition-colors flex flex-col items-center justify-center min-h-[200px] ${
          dragActive 
            ? 'border-hairline-strong bg-surface-card' 
            : isLoading
            ? 'border-hairline bg-surface-elevated'
            : 'border-hairline border-dashed bg-surface hover:bg-surface-elevated'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={isLoading || selectedFile !== null}
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Loader2 className="w-6 h-6 text-on-dark animate-spin mb-3" />
              <p className="text-[14px] font-medium text-on-dark">Processing Document</p>
            </motion.div>
          ) : selectedFile ? (
            <motion.div 
              key="file"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center z-20 relative"
            >
              <div className="w-12 h-12 rounded-md bg-surface-card border border-hairline flex items-center justify-center mb-3">
                <File className="w-5 h-5 text-on-dark" />
              </div>
              <p className="text-[14px] font-medium text-on-dark mb-1 truncate max-w-[200px]">{selectedFile.name}</p>
              <p className="text-[13px] text-mute mb-4">{formatFileSize(selectedFile.size)}</p>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  clearFile()
                }}
                className="button-tertiary h-[32px] px-3 text-[13px]"
              >
                Remove File
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center pointer-events-none"
            >
              <div className="w-10 h-10 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center mb-4">
                <Upload className="w-5 h-5 text-mute" />
              </div>
              <p className="text-[14px] font-medium text-on-dark mb-1">
                {dragActive ? 'Drop file to upload' : 'Click or drag file here'}
              </p>
              <p className="text-[13px] text-mute">
                Max size: {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
