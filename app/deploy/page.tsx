'use client';

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Github, Loader2, ChevronDown, Check, X, ExternalLink, Code, Terminal, Server } from "lucide-react"
import { toast } from "react-hot-toast"

export default function DeployPage() {
  const router = useRouter()
  const [repoUrl, setRepoUrl] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStep, setDeploymentStep] = useState(0)
  const [selectedConfig, setSelectedConfig] = useState("production")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [arweaveKeyFile, setArweaveKeyFile] = useState<File | null>(null)
  const [deployError, setDeployError] = useState<string | null>(null)
  const [deployResult, setDeployResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const deploymentSteps = [
    "Initializing deployment",
    "Cloning repository",
    "Installing dependencies",
    "Building project",
    "Optimizing assets",
    "Deploying to network",
    "Configuring CDN",
    "Finalizing deployment",
  ]

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleArweaveKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArweaveKeyFile(e.target.files[0])
    }
  }

  const handleDeploy = async () => {
    if (!repoUrl || !arweaveKeyFile) {
      setDeployError("Please provide both a repo URL and Arweave wallet file.")
      return
    }
    setIsDeploying(true)
    setDeployError(null)
    setDeployResult(null)
    setDeploymentStep(0)

    try {
      // Simulate step progress
      const steps = deploymentSteps.length
      let step = 0
      const stepInterval = setInterval(() => {
        setDeploymentStep((prev) => (prev < steps - 1 ? prev + 1 : prev))
      }, 1200)

      // Prepare FormData
      const formData = new FormData()
      formData.append("repoUrl", repoUrl)
      formData.append("arweaveKeyFile", arweaveKeyFile)

      // Call the API
      const res = await fetch("/api/deploy", {
        method: "POST",
        body: formData,
      })
      clearInterval(stepInterval)
      setDeploymentStep(steps - 1)

      const data = await res.json()
      if (data.success) {
        setDeployResult(data.arweave)
        setIsDeploying(false)
        toast.success("Deployment successful!")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setDeployError(data.error || "Deployment failed")
        setIsDeploying(false)
        toast.error(data.error || "Deployment failed")
      }
    } catch (err: any) {
      setDeployError(err.message || "Deployment failed")
      setIsDeploying(false)
      toast.error(err.message || "Deployment failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0d0d0d]">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#7e22ce] rounded-full filter blur-[150px] opacity-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#a855f7] rounded-full filter blur-[150px] opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>

      {/* Mouse follower gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(126, 34, 206, 0.15) 0%, rgba(13, 13, 13, 0) 50%)`,
        }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <Link href="/" className="inline-block mb-12">
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-3xl p-10 md:p-16 relative overflow-hidden group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 tracking-tighter"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#d8b4fe]">
                Deploy Your Project
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-gray-300 mb-12"
            >
              Enter your GitHub repository URL and Arweave wallet to start the deployment process.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="relative group/input">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl blur opacity-70 group-hover/input:opacity-100 transition duration-1000 group-hover/input:duration-200 animate-pulse"></div>
                <div className="relative bg-[#1a1a1a] rounded-xl flex items-center overflow-hidden">
                  <div className="bg-[#252525] p-5 flex items-center justify-center">
                    <Github className="w-7 h-7 text-[#a855f7]" />
                  </div>
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="flex-1 bg-transparent border-0 outline-none p-5 text-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Arweave Wallet Key File
                </label>
                <input
                  type="file"
                  accept=".json,application/json"
                  ref={fileInputRef}
                  onChange={handleArweaveKeyChange}
                  className="block w-full text-gray-300 bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 focus:border-[#7e22ce] outline-none"
                />
                {arweaveKeyFile && (
                  <span className="text-green-400 text-xs mt-1 block">
                    Wallet loaded: {arweaveKeyFile.name}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-white">Configuration Options</h3>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Advanced Options
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "production", label: "Production", icon: <Server className="w-5 h-5" /> },
                    { id: "preview", label: "Preview", icon: <Code className="w-5 h-5" /> },
                    { id: "development", label: "Development", icon: <Terminal className="w-5 h-5" /> },
                  ].map((config) => (
                    <div
                      key={config.id}
                      onClick={() => setSelectedConfig(config.id)}
                      className={`bg-[#252525]/80 backdrop-blur-xl rounded-xl p-5 border-2 transition-all duration-300 cursor-pointer group/config relative overflow-hidden ${
                        selectedConfig === config.id
                          ? "border-[#7e22ce] shadow-[0_0_15px_rgba(126,34,206,0.3)]"
                          : "border-[#333333] hover:border-[#7e22ce]/50"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-[#7e22ce]/10 to-transparent opacity-0 ${
                          selectedConfig === config.id ? "opacity-100" : "group-hover/config:opacity-50"
                        } transition-opacity duration-300`}
                      />

                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedConfig === config.id ? "bg-[#7e22ce]/20" : "bg-[#333333]"
                          } transition-colors duration-300`}
                        >
                          {config.icon}
                        </div>
                        <span className="font-medium text-lg">{config.label}</span>
                        <div className="ml-auto">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedConfig === config.id ? "border-[#7e22ce] bg-[#7e22ce]/20" : "border-[#333333]"
                            } transition-colors duration-300`}
                          >
                            {selectedConfig === config.id && <Check className="w-4 h-4 text-[#a855f7]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-5 border border-[#333333]">
                            <h4 className="font-medium mb-3">Framework Preset</h4>
                            <select className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 text-gray-300 focus:border-[#7e22ce] outline-none">
                              <option>Next.js</option>
                              <option>React</option>
                              <option>Vue</option>
                              <option>Angular</option>
                              <option>Svelte</option>
                            </select>
                          </div>

                          <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-5 border border-[#333333]">
                            <h4 className="font-medium mb-3">Node.js Version</h4>
                            <select className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 text-gray-300 focus:border-[#7e22ce] outline-none">
                              <option>18.x (Default)</option>
                              <option>16.x</option>
                              <option>14.x</option>
                              <option>20.x</option>
                            </select>
                          </div>

                          <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-5 border border-[#333333]">
                            <h4 className="font-medium mb-3">Build Command</h4>
                            <input
                              type="text"
                              placeholder="npm run build"
                              className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 text-gray-300 focus:border-[#7e22ce] outline-none"
                            />
                          </div>

                          <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-5 border border-[#333333]">
                            <h4 className="font-medium mb-3">Output Directory</h4>
                            <input
                              type="text"
                              placeholder="dist"
                              className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 text-gray-300 focus:border-[#7e22ce] outline-none"
                            />
                          </div>
                        </div>

                        <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-5 border border-[#333333]">
                          <h4 className="font-medium mb-3">Environment Variables</h4>
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <input
                                type="text"
                                placeholder="KEY"
                                className="flex-1 bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 text-gray-300 focus:border-[#7e22ce] outline-none"
                              />
                              <input
                                type="text"
                                placeholder="VALUE"
                                className="flex-1 bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 text-gray-300 focus:border-[#7e22ce] outline-none"
                              />
                              <button className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-3 text-gray-300 hover:border-[#7e22ce] hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            <button className="text-[#a855f7] hover:text-[#7e22ce] transition-colors text-sm flex items-center gap-1">
                              <span>+ Add Environment Variable</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeploy}
                disabled={!repoUrl || !arweaveKeyFile || isDeploying}
                className={`w-full py-5 rounded-xl font-medium text-xl flex items-center justify-center gap-3 ${
                  !repoUrl || !arweaveKeyFile
                    ? "bg-[#333333] text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#7e22ce] to-[#a855f7] text-white"
                } relative overflow-hidden group`}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>{deploymentSteps[deploymentStep]}...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Deploy Now</span>
                    <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <motion.div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-0" />
                  </>
                )}
              </motion.button>
              {deployError && <div className="text-red-500 mt-4">{deployError}</div>}
              {deployResult && (
                <div className="mt-4">
                  {deployResult.success ? (
                    <div className="space-y-2">
                      <div className="text-green-400">
                        Deployment successful! Your site is available at:{" "}
                        <a href={deployResult.url} target="_blank" rel="noopener noreferrer" className="underline">
                          {deployResult.url}
                        </a>
                      </div>
                      <div className="text-sm text-gray-400">
                        Note: It may take a few minutes for the site to be fully accessible as the transaction is confirmed on the Arweave network.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-yellow-400">
                        Partial deployment completed. Files are being confirmed on the Arweave network:
                      </div>
                      <div className="space-y-1">
                        {deployResult.fileUrls?.map((file: any) => (
                          <div key={file.path} className="text-sm">
                            <span className="text-gray-400">{file.path}: </span>
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                              {file.url}
                            </a>
                            <span className="text-gray-500 ml-2">(May take a few minutes to be accessible)</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        You can check the transaction status at:{" "}
                        <a 
                          href={`https://viewblock.io/arweave/tx/${deployResult.transactionId}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-400 hover:underline"
                        >
                          ViewBlock
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-2xl p-8 relative overflow-hidden group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] to-[#a855f7]">
              Recent Deployments
            </h3>

            <div className="space-y-4">
              {[
                {
                  name: "my-nft-marketplace",
                  status: "success",
                  time: "2 hours ago",
                  url: "nft-marketplace.solynx.io",
                },
                { name: "defi-dashboard", status: "success", time: "1 day ago", url: "defi-dashboard.solynx.io" },
                { name: "web3-social", status: "building", time: "Just now", url: "web3-social.solynx.io" },
              ].map((deployment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5 bg-[#252525]/80 backdrop-blur-xl rounded-xl border border-[#333333] hover:border-[#7e22ce]/50 transition-colors duration-300 group/deployment relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7e22ce]/10 to-transparent opacity-0 group-hover/deployment:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        deployment.status === "success"
                          ? "bg-green-500"
                          : deployment.status === "building"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium text-lg">{deployment.name}</span>
                  </div>

                  <div className="relative z-10 flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span>{deployment.url}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="text-gray-400 text-sm">{deployment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 