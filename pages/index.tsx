import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head'
import { Shield, Key, Lock, FileCheck, ArrowRight } from 'lucide-react'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Digital Signature Demo - Cybersecurity Portfolio</title>
        <meta name="description" content="Educational digital signature demonstration for cybersecurity learning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-cyber-green rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyber-purple rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-cyber-blue rounded-full animate-pulse delay-700"></div>
          </div>

          <div className="container mx-auto px-6 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Main Title */}
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Digital Signature Demo
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Explore the fundamentals of digital signatures and cryptographic security
                <br />
                <span className="text-cyber-blue">Learn • Sign • Verify • Secure</span>
              </motion.p>

              {/* Feature highlights */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Shield className="w-8 h-8 text-cyber-blue" />
                  <span className="text-sm text-gray-400">Secure</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Key className="w-8 h-8 text-cyber-green" />
                  <span className="text-sm text-gray-400">Encrypted</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Lock className="w-8 h-8 text-cyber-purple" />
                  <span className="text-sm text-gray-400">Authentic</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <FileCheck className="w-8 h-8 text-cyber-blue" />
                  <span className="text-sm text-gray-400">Verified</span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/sign" className="inline-block">
                  <motion.button 
                    className="cyber-button text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Try it Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What are Digital Signatures Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                What are Digital Signatures?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Digital signatures are cryptographic mechanisms that provide authentication, 
                integrity, and non-repudiation for digital documents and communications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="cyber-card">
                  <div className="flex items-start space-x-4">
                    <Shield className="w-8 h-8 text-cyber-blue mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-cyber-blue">Authentication</h3>
                      <p className="text-gray-300">
                        Verify the identity of the sender and ensure the message came from a trusted source.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="cyber-card">
                  <div className="flex items-start space-x-4">
                    <FileCheck className="w-8 h-8 text-cyber-green mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-cyber-green">Integrity</h3>
                      <p className="text-gray-300">
                        Detect any unauthorized changes or tampering with the original document.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="cyber-card">
                  <div className="flex items-start space-x-4">
                    <Lock className="w-8 h-8 text-cyber-purple mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-cyber-purple">Non-repudiation</h3>
                      <p className="text-gray-300">
                        Prevent the sender from denying they signed the document at a later time.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Process Diagram */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="cyber-card"
              >
                <h3 className="text-2xl font-semibold mb-6 text-center text-cyber-blue">
                  Signing Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-cyber-dark rounded-lg">
                    <div className="w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span>Document is hashed using SHA-256</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-cyber-dark rounded-lg">
                    <div className="w-8 h-8 bg-cyber-green rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span>Hash is encrypted with private key</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-cyber-dark rounded-lg">
                    <div className="w-8 h-8 bg-cyber-purple rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span>Signature is attached to document</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-cyber-dark rounded-lg">
                    <div className="w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <span>Verified using public key</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Digital Signatures Matter */}
        <section className="py-20 px-6 bg-gradient-to-r from-cyber-dark to-cyber-gray">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-white">
                Why Digital Signatures Matter in Cybersecurity
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="cyber-card text-center">
                  <Key className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Legal Validity</h3>
                  <p className="text-gray-300">
                    Legally binding in most jurisdictions, equivalent to handwritten signatures.
                  </p>
                </div>
                <div className="cyber-card text-center">
                  <Shield className="w-12 h-12 text-cyber-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Security</h3>
                  <p className="text-gray-300">
                    Protect against forgery, tampering, and unauthorized access to documents.
                  </p>
                </div>
                <div className="cyber-card text-center">
                  <FileCheck className="w-12 h-12 text-cyber-purple mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
                  <p className="text-gray-300">
                    Streamline document workflows and eliminate paper-based processes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  )
}
