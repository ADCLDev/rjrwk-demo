'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, Globe, Package, Shield, MousePointer2 } from 'lucide-react'


const features = [
  { 
    title: "Global Sourcing",
    icon: Globe,
    description: "Access manufacturers worldwide",
    gradient: "from-indigo-500 to-violet-500"
  },
  {
    title: "Quality Assured",
    icon: Star,
    description: "Premium materials and craftsmanship",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    title: "Secure Orders",
    icon: Shield,
    description: "Protected transactions and shipping",
    gradient: "from-purple-500 to-fuchsia-500"
  },
  {
    title: "Fast Delivery",
    icon: Package,
    description: "Efficient worldwide logistics",
    gradient: "from-fuchsia-500 to-pink-500"
  }
]

const collections = [
  {
    title: "Summer 2025",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    category: "Seasonal",
    description: "Experience the future of summer fashion"
  },
  {
    title: "Sustainable",
    image: "https://images.unsplash.com/photo-1603001088226-17762b4ea534",
    category: "Eco-Friendly",
    description: "Fashion that cares for our planet"
  },
  {
    title: "Essentials",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
    category: "Basics",
    description: "Timeless pieces redefined"
  }
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [cursorVariant, setCursorVariant] = useState("default")

  // Smooth spring animation for cursor
  const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 50 })
  const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 50 })

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.98])

  const heroTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-4 w-4 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-white"
          variants={{
            default: { scale: 1 },
            hover: { scale: 2 }
          }}
          animate={cursorVariant}
        />
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity, scale }}
        className="relative h-screen perspective-1000"
      >
        {/* 3D Floating Elements */}
        <div className="absolute inset-0">
          {mounted && Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-4 w-4 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20"
              initial={{ z: 0 }}
              animate={{
                z: [-100, 100],
                x: ['0%', '100%'],
                y: ['0%', '100%'],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-4">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.h1
              variants={heroTextVariants}
              className="text-center text-6xl font-bold md:text-8xl"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <span className="relative inline-block">
                <span className="absolute -inset-2 block h-full w-full animate-text-shimmer bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-violet-600/20 bg-[length:200%_100%] dark:from-violet-400/20 dark:via-indigo-400/20 dark:to-violet-400/20" />
                <span className="relative bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                  ELEVATE
                </span>
              </span>
              <br />
              <span className="relative">
                YOUR FASHION
              </span>
            </motion.h1>

            <motion.p
              variants={heroTextVariants}
              className="mt-6 max-w-2xl text-center text-xl text-neutral-600 dark:text-neutral-300"
            >
              Premium garment sourcing for forward-thinking brands
            </motion.p>

            <motion.div
              variants={heroTextVariants}
              className="mt-8 flex space-x-4"
            >
              <button className="group relative overflow-hidden rounded-full bg-violet-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600">
                <span className="relative z-10">Start Sourcing</span>
                <motion.div
                  className="absolute inset-0 z-0 bg-gradient-to-r from-violet-500 to-indigo-500"
                  animate={{
                    x: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear',
                  }}
                />
              </button>
              <button className="group flex items-center rounded-full border border-neutral-300 px-8 py-3 font-semibold text-neutral-900 transition-all hover:border-violet-500 hover:bg-violet-500/10 dark:border-neutral-700 dark:text-white dark:hover:border-violet-400 dark:hover:bg-violet-400/10">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <MousePointer2 className="mb-2 h-6 w-6 animate-bounce text-neutral-400" />
          <span className="text-sm text-neutral-400">Scroll to explore</span>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative bg-neutral-50 py-24 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold">Why Choose Us</h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Premium service for premium brands
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all dark:bg-neutral-800"
              >
                <div className="relative z-10">
                  <feature.icon className={`h-8 w-8 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                  <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                </div>
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold">Latest Collections</h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Discover trending styles
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative h-[600px] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800"
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60 transition-opacity group-hover:opacity-70" />
                <motion.div
                  className="absolute bottom-0 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm font-medium text-violet-400">{collection.category}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{collection.title}</h3>
                  <p className="mt-2 max-w-xs text-neutral-300">{collection.description}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-4 flex items-center text-sm font-medium text-white"
                  >
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.1),_rgba(99,102,241,0.1))]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
       <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          ><h2 className="text-4xl font-bold">Ready to Transform Your Brand?</h2>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-300">
            Join the future of fashion sourcing today
          </p>
          <motion.div
            className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full bg-violet-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              <span className="relative z-10">Get Started Now</span>
              <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-violet-500 to-indigo-500"
                animate={{
                  x: ['0%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 rounded-full border-2 border-neutral-300 bg-transparent px-8 py-4 font-semibold text-neutral-900 transition-colors hover:border-violet-500 hover:bg-violet-50 dark:border-neutral-700 dark:text-white dark:hover:border-violet-400 dark:hover:bg-violet-900/30"
            >
              <span>Schedule Demo</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Badges */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1, 0.8],
                x: ['0%', '100%'],
                y: ['0%', '100%'],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="rounded-full bg-violet-500/10 p-4">
                <Shield className="h-6 w-6 text-violet-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="relative border-t border-neutral-200 bg-neutral-50 py-24 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {[
            { label: "Global Partners", value: "500+" },
            { label: "Products Sourced", value: "10K+" },
            { label: "Happy Clients", value: "2.5K+" },
            { label: "Countries Served", value: "50+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.1,
                }}
                className="mb-4 text-4xl font-bold text-violet-600 dark:text-violet-400"
              >
                {stat.value}
              </motion.div>
              <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter Section */}
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Get the latest trends and innovations in fashion sourcing delivered to your inbox.
          </p>
          <motion.form
            className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-neutral-300 bg-transparent px-6 py-3 text-neutral-900 placeholder-neutral-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-violet-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  </div>
)
}