"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Tent } from "lucide-react"

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Fixed Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 py-4 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 shadow-lg"
      >
        <div className="flex items-center text-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-lg">
            <Tent size={40} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FF0000] ">Mustafa Canvas</h1>
            {/* <p className="text-xs text-gray-400 hidden sm:block">Premium Art Studio</p> */}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="#hero"
            className="text-gray-300 hover:text-[#FF0000] transition-all duration-300 text-sm font-medium relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0000] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#about"
            className="text-gray-300 hover:text-[#FF0000] transition-all duration-300 text-sm font-medium relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0000] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#gallery"
            className="text-gray-300 hover:text-[#FF0000] transition-all duration-300 text-sm font-medium relative group"
          >
            Our Work
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0000] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#contact"
            className="text-gray-300 hover:text-[#FF0000] transition-all duration-300 text-sm font-medium relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF0000] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </motion.header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[72px] sm:top-[80px] left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-sm shadow-lg md:hidden border-b border-gray-700"
        >
          <div className="flex flex-col py-4">
            <Link
              href="#hero"
              className="px-6 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-[#FF0000] transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="px-6 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-[#FF0000] transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              href="#gallery"
              className="px-6 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-[#FF0000] transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              Gallery
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-[#FF0000] transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.section
        id="hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
        className="pt-24 sm:pt-28 md:pt-36 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 md:px-8 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border border-gray-600 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 border border-gray-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-gray-600 rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-full text-[#FF0000] text-sm font-medium">
              Premium Canvas Art Studio
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight"
            variants={fadeInUp}
          >
            Elevate Your Space with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#FF4444]">
              Premium Canvas Art
            </span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
            variants={fadeInUp}
          >
            Discover unique and handcrafted canvas art that transforms your environment with elegance and style.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={fadeInUp}>
            <Link
              href="#gallery"
              className="group px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center">
                Explore Gallery
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-lg font-medium hover:border-[#FF0000] hover:text-white transition-all duration-300"
            >
              Get Quote
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-20 sm:py-24 bg-gray-800 px-4 sm:px-6 md:px-8 relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-full text-[#FF0000] text-sm font-medium mb-4">
                Our Story
              </span>
            </motion.div>
            <motion.h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white" variants={fadeInUp}>
              About Us
            </motion.h3>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] to-[#CC0000] mx-auto rounded-full"
              variants={fadeInUp}
            ></motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  At Mustafa Canvas, we create custom canvas art with passion and precision to transform your space. Our
                  team of talented artists brings your vision to life with meticulous attention to detail.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Founded in 2018, we've helped hundreds of clients find the perfect artistic expression for their homes
                  and offices. Each piece is handcrafted with premium materials to ensure lasting beauty.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-[#FF0000]">500+</div>
                    <div className="text-gray-400 text-sm">Happy Clients</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-[#FF0000]">6</div>
                    <div className="text-gray-400 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Artist at work"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        id="gallery"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-20 sm:py-24 bg-gray-900 px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-full text-[#FF0000] text-sm font-medium mb-4">
                Our Work
              </span>
            </motion.div>
            <motion.h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" variants={fadeInUp}>
              Our Gallery
            </motion.h3>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] to-[#CC0000] mx-auto rounded-full"
              variants={fadeInUp}
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Abstract", description: "Bold colors and forms", color: "from-purple-500 to-pink-500" },
              { name: "Landscape", description: "Serene natural beauty", color: "from-green-500 to-blue-500" },
              { name: "Modern", description: "Contemporary elegance", color: "from-gray-500 to-slate-500" },
              { name: "Vintage", description: "Timeless classics", color: "from-amber-500 to-orange-500" },
              { name: "Pop Art", description: "Vibrant and playful", color: "from-pink-500 to-red-500" },
              { name: "Minimal", description: "Simple sophistication", color: "from-slate-500 to-gray-500" },
            ].map((style, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group border border-gray-700 rounded-xl overflow-hidden bg-gray-800 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#FF0000]/10"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=400&width=500&text=${style.name}`}
                    alt={style.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FF0000] transition-colors">
                    {style.name} Canvas
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{style.description}</p>
                  <div className="mt-4 flex items-center text-[#FF0000] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-20 sm:py-24 bg-gray-800 px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-full text-[#FF0000] text-sm font-medium mb-4">
                Get In Touch
              </span>
            </motion.div>
            <motion.h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white" variants={fadeInUp}>
              Contact Us
            </motion.h3>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] to-[#CC0000] mx-auto rounded-full"
              variants={fadeInUp}
            ></motion.div>
          </div>

          <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-600">
              <h4 className="text-2xl font-semibold mb-6 text-white text-center">Get In Touch</h4>
              <p className="text-gray-300 mb-8 leading-relaxed text-center max-w-2xl mx-auto text-lg">
                For inquiries or commissions, reach out to us. We'd love to hear about your project.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-[#FF0000]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF0000]/20 transition-colors">
                    <Mail size={24} className="text-[#FF0000]" />
                  </div>
                  <h5 className="font-medium text-white mb-2">Email</h5>
                  <a
                    href="mailto:info@mustafacanvas.com"
                    className="text-gray-300 hover:text-[#FF0000] transition-colors text-sm"
                  >
                    abdullaharif893@gmail.com
                  </a>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-[#FF0000]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF0000]/20 transition-colors">
                    <Phone size={24} className="text-[#FF0000]" />
                  </div>
                  <h5 className="font-medium text-white mb-2">Phone</h5>
                  <a href="" className="text-gray-300 hover:text-[#FF0000] transition-colors text-sm">
                    +923362725979
                  </a>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-[#FF0000]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF0000]/20 transition-colors">
                    <MapPin size={24} className="text-[#FF0000]" />
                  </div>
                  <h5 className="font-medium text-white mb-2">Location</h5>
                  <span className="text-gray-300 text-sm">Jodia Bazar, Karachi</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000] to-[#CC0000] rounded-lg flex items-center justify-center shadow-lg">
                  <Tent size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">Mustafa Canvas</h4>
                  <p className="text-gray-400 text-sm">Premium Art Studio</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                Creating beautiful canvas art to transform your space since 2018. We specialize in custom, handcrafted
                pieces that bring life and personality to any environment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF0000] transition-colors">
                    <Mail size={16} className="text-gray-400 group-hover:text-white" />
                  </div>
                  <a href="mailto:info@mustafacanvas.com" className="text-gray-400 hover:text-white transition-colors">
                    abdullaharif893@gmail.com
                  </a>
                </div>
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF0000] transition-colors">
                    <Phone size={16} className="text-gray-400 group-hover:text-white" />
                  </div>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                    +923362725979
                  </a>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF0000] transition-colors">
                    <MapPin size={16} className="text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-400 pt-2">Jodia Bazar, Karachi</span>
                </div>
              </div>
            </div>

            <div className="md:pl-8 md:border-l md:border-gray-800">
              <h4 className="text-xl font-semibold mb-8 text-white">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { href: "#hero", label: "Home" },
                  { href: "#about", label: "About" },
                  { href: "#gallery", label: "Our Work" },
                  { href: "#contact", label: "Contact" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ChevronRight
                        size={16}
                        className="mr-3 text-[#FF0000] transform group-hover:translate-x-1 transition-transform"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 bg-gray-900 rounded-lg border border-gray-800">
                <h5 className="text-lg font-medium text-white mb-4">Working Hours</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Saturday</span>
                    <span className="text-white">9am - 8pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white">10am - 5pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500">© {new Date().getFullYear()} Mustafa Canvas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
