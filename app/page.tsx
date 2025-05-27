"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Github, Globe, Zap, ExternalLink, Shield, Cpu } from "lucide-react"

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])


  const heroRef = useRef(null)
  const featureRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const isFeatureInView = useInView(featureRef, { once: false, amount: 0.3 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })
  const isTestimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 })

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateMouseAngle = (x: any, y: any, centerX: any, centerY: any) => {
    return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI)
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"
          style={{ transform: `translateY($}px)` }}
        ></div>
        
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#7e22ce]/10 to-[#a855f7]/5"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(126, 34, 206, 0.15) 0%, rgba(13, 13, 13, 0) 50%)`,
          }}
        ></div>


        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isHeroInView ? 1 : 0,
              scale: isHeroInView ? 1 : 0.9,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex justify-center"
          >
            <div className="px-4 py-1.5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-full border border-[#333333] flex items-center gap-2 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></span>
              <span className="text-gray-300">Introducing Solynx Beta</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl xl:text-9xl font-bold mb-6 tracking-tighter leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: isHeroInView ? 1 : 0,
              y: isHeroInView ? 0 : 40,
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#d8b4fe]">
                Deploy to the
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-transparent"></div>
            </div>
            <br />
            <div className="inline-block relative mt-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d8b4fe] via-[#a855f7] to-[#7e22ce]">
                Decentralized Future
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-[#7e22ce]"></div>
            </div>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl xl:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: isHeroInView ? 1 : 0,
              y: isHeroInView ? 0 : 40,
            }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            The next generation <span className="text-white font-semibold">decentralized deployment platform</span> for
            Web3 developers. Build, deploy, and scale with unparalleled speed and security.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: isHeroInView ? 1 : 0,
              y: isHeroInView ? 0 : 40,
            }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/deploy" className="group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-10 py-5 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl font-medium text-xl flex items-center gap-3 overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.5)]"
              >
                <span className="relative z-10">Start Deploying</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#7e22ce] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                <motion.div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </motion.button>
            </Link>

            <Link href="/dashboard" className="group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-xl font-medium text-xl flex items-center gap-3 relative overflow-hidden"
              >
                <span className="relative z-10">View Dashboard</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#7e22ce]/20 to-[#a855f7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        

        {/* 3D Rotating Cube */}
        <div className="absolute right-10 bottom-20 hidden lg:block">
          <motion.div className="w-32 h-32 relative" style={{ rotateX: rotation, rotateY: rotation }}>
            <div className="absolute w-full h-full transform-style-3d">
              <div className="absolute inset-0 border-2 border-[#7e22ce] bg-[#1a1a1a]/30 backdrop-blur-md transform rotate-x-0 rotate-y-0 translate-z-16 opacity-80"></div>
              <div className="absolute inset-0 border-2 border-[#7e22ce] bg-[#1a1a1a]/30 backdrop-blur-md transform rotate-x-180 translate-z-16 opacity-80"></div>
              <div className="absolute inset-0 border-2 border-[#7e22ce] bg-[#1a1a1a]/30 backdrop-blur-md transform rotate-y-90 translate-z-16 opacity-80"></div>
              <div className="absolute inset-0 border-2 border-[#7e22ce] bg-[#1a1a1a]/30 backdrop-blur-md transform rotate-y-270 translate-z-16 opacity-80"></div>
              <div className="absolute inset-0 border-2 border-[#7e22ce] bg-[#1a1a1a]/30 backdrop-blur-md transform rotate-x-90 translate-z-16 opacity-80"></div>
              <div className="absolute inset-0 border-2 border-[#7e22ce] bg-[#1a1a1a]/30 backdrop-blur-md transform rotate-x-270 translate-z-16 opacity-80"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featureRef} className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: isFeatureInView ? 1 : 0,
              y: isFeatureInView ? 0 : 60,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-24"
          >
            <div className="inline-block px-4 py-1.5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-full border border-[#333333] text-sm text-gray-300 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] to-[#a855f7]">
                Revolutionary Features
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold mb-8 tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#d8b4fe]">
                Cutting-Edge Technology
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Solynx combines cutting-edge technology with intuitive design to deliver a seamless deployment experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-12 h-12 text-[#a855f7]" />,
                title: "Lightning Fast",
                description:
                  "Deploy your applications in seconds with our optimized infrastructure and parallel processing technology.",
                delay: 0,
              },
              {
                icon: <Globe className="w-12 h-12 text-[#a855f7]" />,
                title: "Global Network",
                description:
                  "Access a worldwide network of decentralized nodes for maximum reliability and minimal latency.",
                delay: 0.2,
              },
              {
                icon: <Github className="w-12 h-12 text-[#a855f7]" />,
                title: "Git Integration",
                description:
                  "Seamless integration with your GitHub repositories for continuous deployment and version control.",
                delay: 0.4,
              },
              {
                icon: <Shield className="w-12 h-12 text-[#a855f7]" />,
                title: "Enhanced Security",
                description:
                  "Military-grade encryption and decentralized architecture ensures your deployments are secure.",
                delay: 0.6,
              },
              {
                icon: <Cpu className="w-12 h-12 text-[#a855f7]" />,
                title: "Smart Scaling",
                description:
                  "Automatically scales your deployments based on traffic patterns and resource utilization.",
                delay: 0.8,
              },
              {
                icon: <ExternalLink className="w-12 h-12 text-[#a855f7]" />,
                title: "Custom Domains",
                description: "Connect your own domains with one-click SSL certificate provisioning and DNS management.",
                delay: 1,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: isFeatureInView ? 1 : 0,
                  y: isFeatureInView ? 0 : 60,
                }}
                transition={{
                  duration: 0.8,
                  delay: feature.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-2xl p-8 h-full group-hover:border-[#7e22ce] transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7e22ce]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  <div className="relative z-10">
                    <div className="mb-6 p-4 bg-[#252525]/80 rounded-xl inline-block">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 px-4 relative z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7e22ce] rounded-full filter blur-[200px] opacity-2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: isStatsInView ? 1 : 0,
              y: isStatsInView ? 0 : 60,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#d8b4fe]">
                Trusted by Developers
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of developers who have already made the switch to decentralized deployments.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Deployments", delay: 0 },
              { value: "5K+", label: "Developers", delay: 0.2 },
              { value: "99.9%", label: "Uptime", delay: 0.4 },
              { value: "150ms", label: "Avg. Latency", delay: 0.6 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: isStatsInView ? 1 : 0,
                  y: isStatsInView ? 0 : 40,
                }}
                transition={{
                  duration: 0.8,
                  delay: stat.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-2xl p-8 text-center group hover:border-[#7e22ce] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] to-[#a855f7]">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-lg">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: isTestimonialsInView ? 1 : 0,
              y: isTestimonialsInView ? 0 : 60,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-1.5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-full border border-[#333333] text-sm text-gray-300 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] to-[#a855f7]">
                Testimonials
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#d8b4fe]">
                What Developers Say
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Solynx has completely transformed our deployment workflow. The speed and reliability are unmatched.",
                author: "Alex Chen",
                role: "CTO at BlockFi",
                delay: 0,
              },
              {
                quote:
                  "The decentralized architecture gives us peace of mind. No more worrying about single points of failure.",
                author: "Sarah Johnson",
                role: "Lead Developer at Ethereum Foundation",
                delay: 0.2,
              },
              {
                quote:
                  "Setting up custom domains and SSL certificates used to be a pain. With Solynx, it's just one click.",
                author: "Michael Rodriguez",
                role: "Founder at DeFi Labs",
                delay: 0.4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: isTestimonialsInView ? 1 : 0,
                  y: isTestimonialsInView ? 0 : 60,
                }}
                transition={{
                  duration: 0.8,
                  delay: testimonial.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-2xl p-8 group hover:border-[#7e22ce] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                <div className="relative z-10">
                  <div className="text-5xl text-[#7e22ce] mb-6">"</div>
                  <p className="text-gray-300 text-lg mb-6">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#7e22ce] to-[#a855f7]"></div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7e22ce] rounded-full filter blur-[200px] opacity-2"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#333333] rounded-3xl p-16 text-center relative overflow-hidden group"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce]/30 to-[#a855f7]/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

            <div className="relative z-10">
              <motion.h2
                className="text-5xl md:text-6xl xl:text-7xl font-bold mb-8 tracking-tighter"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                Ready to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#d8b4fe]">
                  transform
                </span>{" "}
                your deployment workflow?
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl xl:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                Join thousands of developers who have already made the switch to decentralized deployments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <Link href="/deploy" className="group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-12 py-6 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl font-medium text-2xl flex items-center gap-3 mx-auto overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                  >
                    <span className="relative z-10">Get Started Now</span>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#7e22ce] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <ArrowRight className="relative z-10 w-7 h-7 group-hover:translate-x-1 transition-transform duration-300" />
                    <motion.div className="absolute -inset-1 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-xl blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-[#333333] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7e22ce] to-[#a855f7] mb-6">
                Solynx
              </h3>
              <p className="text-gray-400 mb-6">
                The future of decentralized deployments. Build, deploy, and scale with confidence.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7e22ce] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7e22ce] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7e22ce] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Product</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#333333] text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Solynx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
