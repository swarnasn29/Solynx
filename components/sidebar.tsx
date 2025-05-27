"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useWallet } from "./wallet-provider"
import {
  ArrowRightIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  CubeTransparentIcon,
  DocumentTextIcon,
  HomeIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export function Sidebar() {
  const pathname = usePathname()
  const { isConnected, address } = useWallet()
  const [time, setTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Deploy", href: "/deploy", icon: RocketLaunchIcon },
    { name: "Dashboard", href: "/dashboard", icon: Square3Stack3DIcon },
    { name: "Documentation", href: "#", icon: DocumentTextIcon },
    { name: "Settings", href: "#", icon: Cog6ToothIcon },
  ]

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 z-30 h-screen w-64 flex-col glassmorphism border-r border-white/5"
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-center border-b border-white/5 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-700 to-purple-500 shadow-lg">
            <CubeTransparentIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold purple-gradient-text">Solynx</span>
        </Link>
      </div>

      {/* Network Status */}
      <div className="mt-6 px-4">
        <div className="rounded-lg bg-black/40 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">Network Status</span>
            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Solana Devnet</span>
            <span className="text-xs text-gray-400">Block 18245631</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-900/70 to-purple-800/30 text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive ? "text-purple-400" : "text-gray-400 group-hover:text-purple-400"
                  }`}
                />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]"
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Decorative Element */}
      <div className="mx-4 my-6">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/40 to-black/40 p-4">
          <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-purple-700/20 blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-purple-600/10 blur-xl"></div>

          <div className="relative z-10">
            <h4 className="mb-1 text-sm font-medium">Deploy Faster</h4>
            <p className="mb-3 text-xs text-gray-400">Upgrade to Solynx Pro for enhanced features</p>
            <button className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-purple-700 to-purple-500 py-1.5 text-xs font-medium text-white shadow-lg transition-all hover:shadow-[0_0_15px_rgba(126,34,206,0.3)]">
              Upgrade Now <ArrowRightIcon className="ml-1 h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="border-t border-white/5 p-4">
        {isConnected ? (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-700 to-purple-500">
              <CommandLineIcon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{address}</p>
              <p className="text-xs text-gray-400">Connected</p>
            </div>
          </div>
        ) : (
          
            <WalletMultiButton className="flex w-full items-center justify-center gap-2 rounded-lg border border-purple-700/50 bg-purple-900/20 py-2 text-sm font-medium text-white transition-all hover:bg-purple-900/40"/>
          
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>
      </div>
    </motion.aside>
  )
}
