"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MoreHorizontal,
  Plus,
  RefreshCw,
  X,
  ChevronDown,
  Search,
  Filter,
  Clock,
  BarChart3,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Shield,
  Globe,
  Github,
  Eye,
} from "lucide-react"

export default function DashboardPage() {
  const [selectedDeployment, setSelectedDeployment]: any = useState(null)
  const [searchQuery, setSearchQuery]: any = useState("")
  const [filterStatus, setFilterStatus]: any = useState("all")
  const [sortBy, setSortBy]: any = useState("newest")
  const [showFilters, setShowFilters]: any = useState(false)
  const [mousePosition, setMousePosition]: any = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab]: any = useState("overview")

  const chartRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const deployments = [
    {
      id: 1,
      name: "my-nft-marketplace",
      status: "success",
      url: "nft-marketplace.solynx.io",
      lastDeployed: "2 hours ago",
      branch: "main",
      commit: "feat: add marketplace search",
      buildTime: "45s",
      memory: "256 MB",
      storage: "1.2 GB",
      uptime: "99.9%",
      region: "Global",
      framework: "Next.js",
    },
    {
      id: 2,
      name: "defi-dashboard",
      status: "success",
      url: "defi-dashboard.solynx.io",
      lastDeployed: "1 day ago",
      branch: "main",
      commit: "fix: token balance display",
      buildTime: "38s",
      memory: "192 MB",
      storage: "0.9 GB",
      uptime: "100%",
      region: "Global",
      framework: "React",
    },
    {
      id: 3,
      name: "web3-social",
      status: "building",
      url: "web3-social.solynx.io",
      lastDeployed: "Just now",
      branch: "develop",
      commit: "feat: add profile page",
      buildTime: "In progress",
      memory: "320 MB",
      storage: "1.5 GB",
      uptime: "N/A",
      region: "Global",
      framework: "Vue.js",
    },
    {
      id: 4,
      name: "crypto-wallet",
      status: "failed",
      url: "crypto-wallet.solynx.io",
      lastDeployed: "3 days ago",
      branch: "feature/new-ui",
      commit: "refactor: wallet connection",
      buildTime: "Failed after 28s",
      memory: "224 MB",
      storage: "1.1 GB",
      uptime: "98.7%",
      region: "Global",
      framework: "React Native Web",
    },
    {
      id: 5,
      name: "dao-governance",
      status: "success",
      url: "dao-governance.solynx.io",
      lastDeployed: "5 days ago",
      branch: "main",
      commit: "feat: voting mechanism",
      buildTime: "52s",
      memory: "288 MB",
      storage: "1.7 GB",
      uptime: "99.8%",
      region: "Global",
      framework: "Next.js",
    },
    {
      id: 6,
      name: "token-swap",
      status: "success",
      url: "token-swap.solynx.io",
      lastDeployed: "1 week ago",
      branch: "main",
      commit: "perf: optimize swap algorithm",
      buildTime: "41s",
      memory: "240 MB",
      storage: "1.3 GB",
      uptime: "99.9%",
      region: "Global",
      framework: "Svelte",
    },
  ]

  const filteredDeployments = deployments
    .filter((deployment) => {
      // Filter by search query
      if (searchQuery && !deployment.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Filter by status
      if (filterStatus !== "all" && deployment.status !== filterStatus) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected option
      if (sortBy === "newest") {
        return deployments.indexOf(a) - deployments.indexOf(b) // Using the original order as a proxy for "newest"
      } else if (sortBy === "oldest") {
        return deployments.indexOf(b) - deployments.indexOf(a)
      } else if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name)
      }
      return 0
    })

  const getStatusColor = (status: any) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "building":
        return "bg-yellow-500 animate-pulse"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "building":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#7e22ce] rounded-full filter blur-[150px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#a855f7] rounded-full filter blur-[150px] opacity-10 animate-pulse delay-1000"></div>
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

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <Link href="/" className="inline-block mb-4">
              <motion.div
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.div>
            </Link>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#d8b4fe]">
                Your Deployments
              </span>
            </h1>
          </div>

          <Link href="/deploy">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl font-medium flex items-center gap-2 relative overflow-hidden group shadow-[0_0_15px_rgba(126,34,206,0.3)]"
            >
              <span className="relative z-10">New Deployment</span>
              <Plus className="relative z-10 w-5 h-5" />
              <motion.div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#7e22ce] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <motion.div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            </motion.button>
          </Link>
        </div>

        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "Total Deployments", value: "6", icon: <BarChart3 className="w-6 h-6 text-[#a855f7]" /> },
            { label: "Active Deployments", value: "5", icon: <Activity className="w-6 h-6 text-[#a855f7]" /> },
            { label: "Average Build Time", value: "42s", icon: <Clock className="w-6 h-6 text-[#a855f7]" /> },
            { label: "Total Storage Used", value: "7.7 GB", icon: <Shield className="w-6 h-6 text-[#a855f7]" /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-2xl p-6 group hover:border-[#7e22ce] transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] to-[#a855f7]">
                    {stat.value}
                  </h3>
                </div>
                <div className="p-3 bg-[#252525] rounded-xl">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative group/search flex-1 max-w-md">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl blur opacity-30 group-hover/search:opacity-100 transition duration-1000 group-hover/search:duration-200"></div>
              <div className="relative bg-[#1a1a1a] rounded-xl flex items-center overflow-hidden">
                <div className="bg-[#252525] p-3 flex items-center justify-center">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search deployments..."
                  className="flex-1 bg-transparent border-0 outline-none p-3 text-gray-300"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-xl hover:border-[#7e22ce] transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
                />
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-xl hover:border-[#7e22ce] transition-colors pr-10 focus:outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-xl p-4">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Status</p>
                      <div className="flex gap-2">
                        {[
                          { value: "all", label: "All" },
                          { value: "success", label: "Success" },
                          { value: "building", label: "Building" },
                          { value: "failed", label: "Failed" },
                        ].map((status) => (
                          <button
                            key={status.value}
                            onClick={() => setFilterStatus(status.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm ${
                              filterStatus === status.value
                                ? "bg-[#7e22ce] text-white"
                                : "bg-[#252525] text-gray-300 hover:bg-[#333333]"
                            } transition-colors`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Deployments Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDeployments.length > 0 ? (
            filteredDeployments.map((deployment: any, index: any) => (
              <motion.div
                key={deployment.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedDeployment(deployment)}
                className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-2xl p-6 cursor-pointer hover:border-[#7e22ce] transition-colors group/card relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#7e22ce]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${getStatusColor(deployment.status)} rounded-full`}></div>
                      <h3 className="font-bold text-xl truncate">{deployment.name}</h3>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#252525] rounded-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-sm">{deployment.url}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Framework</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{deployment.framework}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Branch</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{deployment.branch}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Build Time</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{deployment.buildTime}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Last Deployed</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{deployment.lastDeployed}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 truncate max-w-[70%]">{deployment.commit}</span>

                    <button className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#252525] rounded-lg">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-2xl p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#252525] flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium">No deployments found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedDeployment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDeployment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-[#333333] rounded-3xl w-full max-w-4xl overflow-hidden"
              onClick={(e: any) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#333333]">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${getStatusColor(selectedDeployment.status)} rounded-full`}></div>
                  <h3 className="font-bold text-2xl">{selectedDeployment.name}</h3>
                </div>

                <button
                  onClick={() => setSelectedDeployment(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#252525] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex border-b border-[#333333] mb-6">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-6 py-3 font-medium relative ${
                      activeTab === "overview" ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Overview
                    {activeTab === "overview" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7e22ce] to-[#a855f7]"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("logs")}
                    className={`px-6 py-3 font-medium relative ${
                      activeTab === "logs" ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Logs
                    {activeTab === "logs" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7e22ce] to-[#a855f7]"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-6 py-3 font-medium relative ${
                      activeTab === "settings" ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Settings
                    {activeTab === "settings" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7e22ce] to-[#a855f7]"
                      />
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-4">
                          <p className="text-xs text-gray-400 mb-1">Status</p>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(selectedDeployment.status)}
                            <span className="capitalize">{selectedDeployment.status}</span>
                          </div>
                        </div>
                        <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-4">
                          <p className="text-xs text-gray-400 mb-1">URL</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm truncate">{selectedDeployment.url}</span>
                            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          </div>
                        </div>
                        <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-4">
                          <p className="text-xs text-gray-400 mb-1">Branch</p>
                          <span>{selectedDeployment.branch}</span>
                        </div>
                        <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-4">
                          <p className="text-xs text-gray-400 mb-1">Last Deployed</p>
                          <span>{selectedDeployment.lastDeployed}</span>
                        </div>
                      </div>

                      <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-6">
                        <h4 className="text-lg font-medium mb-4">Deployment Stats</h4>

                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">Build Time</span>
                              <span>{selectedDeployment.buildTime}</span>
                            </div>
                            <div className="w-full bg-[#333333] rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-[#7e22ce] to-[#a855f7] h-2.5 rounded-full"
                                style={{ width: selectedDeployment.status === "building" ? "60%" : "100%" }}
                              ></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-gray-400 mb-2">Memory Usage</p>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-[#333333] rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-[#7e22ce] to-[#a855f7] h-2 rounded-full"
                                    style={{ width: "65%" }}
                                  ></div>
                                </div>
                                <span className="text-sm whitespace-nowrap">{selectedDeployment.memory}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-2">Storage</p>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-[#333333] rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-[#7e22ce] to-[#a855f7] h-2 rounded-full"
                                    style={{ width: "70%" }}
                                  ></div>
                                </div>
                                <span className="text-sm whitespace-nowrap">{selectedDeployment.storage}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-6">
                        <h4 className="text-lg font-medium mb-4">Deployment Details</h4>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Framework</p>
                            <div className="flex items-center gap-2">
                              <span>{selectedDeployment.framework}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Region</p>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-[#a855f7]" />
                              <span>{selectedDeployment.region}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Uptime</p>
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-[#a855f7]" />
                              <span>{selectedDeployment.uptime}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Repository</p>
                            <div className="flex items-center gap-2">
                              <Github className="w-4 h-4 text-[#a855f7]" />
                              <span className="truncate">github.com/username/{selectedDeployment.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "logs" && (
                    <motion.div
                      key="logs"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Deployment Logs</h4>
                          <div className="flex gap-2">
                            <button className="p-1.5 bg-[#1a1a1a] rounded-lg text-gray-400 hover:text-white transition-colors">
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 bg-[#1a1a1a] rounded-lg text-gray-400 hover:text-white transition-colors">
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-sm h-64 overflow-auto">
                          <div className="text-green-500">● Build started</div>
                          <div className="text-gray-400">$ npm install</div>
                          <div className="text-gray-400">added 1232 packages in 24s</div>
                          <div className="text-gray-400">$ npm run build</div>
                          <div className="text-gray-400">{">"} build</div>
                          <div className="text-gray-400">{">"} next build</div>
                          <div className="text-gray-400">info - Loaded env from .env</div>
                          <div className="text-gray-400">info - Linting and checking validity of types</div>
                          <div className="text-gray-400">info - Creating an optimized production build</div>
                          <div className="text-gray-400">info - Compiled successfully</div>
                          <div className="text-gray-400">info - Collecting page data</div>
                          <div className="text-gray-400">info - Generating static pages (8/8)</div>
                          <div className="text-gray-400">info - Finalizing page optimization</div>
                          <div className="text-green-500">● Build completed</div>
                          <div className="text-gray-400">$ npm run start</div>
                          <div className="text-gray-400">{">"} start</div>
                          <div className="text-gray-400">{">"} next start</div>
                          <div className="text-gray-400">
                            ready - started server on 0.0.0.0:3000, url: http://localhost:3000
                          </div>
                          <div className="text-green-500">● Deployment complete</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "settings" && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-6">
                        <h4 className="text-lg font-medium mb-4">Domain Settings</h4>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                            <div className="flex items-center gap-3">
                              <Globe className="w-5 h-5 text-[#a855f7]" />
                              <span>{selectedDeployment.url}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full">
                                Active
                              </span>
                              <button className="p-1.5 bg-[#252525] rounded-lg text-gray-400 hover:text-white transition-colors">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <button className="text-[#a855f7] hover:text-[#7e22ce] transition-colors text-sm flex items-center gap-1">
                            <Plus className="w-4 h-4" />
                            <span>Add Custom Domain</span>
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-6">
                        <h4 className="text-lg font-medium mb-4">Environment Variables</h4>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                            <div>
                              <span className="text-sm font-medium">API_KEY</span>
                              <div className="text-xs text-gray-400">••••••••••••••••</div>
                            </div>
                            <button className="p-1.5 bg-[#252525] rounded-lg text-gray-400 hover:text-white transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                            <div>
                              <span className="text-sm font-medium">DATABASE_URL</span>
                              <div className="text-xs text-gray-400">••••••••••••••••</div>
                            </div>
                            <button className="p-1.5 bg-[#252525] rounded-lg text-gray-400 hover:text-white transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>

                          <button className="text-[#a855f7] hover:text-[#7e22ce] transition-colors text-sm flex items-center gap-1">
                            <Plus className="w-4 h-4" />
                            <span>Add Environment Variable</span>
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#252525]/80 backdrop-blur-xl rounded-xl p-6">
                        <h4 className="text-lg font-medium mb-4">Danger Zone</h4>

                        <div className="space-y-4">
                          <button className="w-full p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium">
                            Delete Deployment
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-end gap-4 p-6 border-t border-[#333333]">
                <button className="px-5 py-2.5 bg-[#252525] rounded-xl text-gray-300 hover:bg-[#333333] transition-colors">
                  View Logs
                </button>

                <button className="px-5 py-2.5 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl flex items-center gap-2 group relative overflow-hidden">
                  <span className="relative z-10">Visit Site</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#7e22ce] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
