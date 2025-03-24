"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, MapPin, ChevronRight } from "lucide-react"

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-4 sm:px-6 py-4 bg-white border-b shadow-sm"
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FF0000] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-base sm:text-lg">M</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Mustafa Canvas</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8">
          <Link href="#hero" className="text-gray-600 hover:text-[#FF0000] transition-colors text-sm font-medium">
            Home
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-[#FF0000] transition-colors text-sm font-medium">
            About
          </Link>
          <Link href="#gallery" className="text-gray-600 hover:text-[#FF0000] transition-colors text-sm font-medium">
            Gallery
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-[#FF0000] transition-colors text-sm font-medium">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[60px] sm:top-[68px] left-0 right-0 z-10 bg-white shadow-sm md:hidden border-b"
        >
          <div className="flex flex-col py-2">
            <Link
              href="#hero"
              className="px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#FF0000]"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#FF0000]"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              href="#gallery"
              className="px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#FF0000]"
              onClick={toggleMobileMenu}
            >
              Gallery
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#FF0000]"
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
        className="pt-20 sm:pt-24 md:pt-32 flex flex-col items-center justify-center min-h-[80vh] bg-white px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            Elevate Your Space with <span className="text-[#FF0000]">Premium Canvas Art</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover unique and handcrafted canvas art that transforms your environment with elegance and style.
          </p>
          <div className="mt-8 sm:mt-10">
            <Link
              href="#gallery"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[#FF0000] text-white rounded-md font-medium hover:bg-[#E60000] transition-colors"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">About Us</h3>
            <div className="w-12 sm:w-16 h-0.5 bg-[#FF0000] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                At Mustafa Canvas, we create custom canvas art with passion and precision to transform your space. Our
                team of talented artists brings your vision to life with meticulous attention to detail.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2018, we've helped hundreds of clients find the perfect artistic expression for their homes
                and offices. Each piece is handcrafted with premium materials to ensure lasting beauty.
              </p>
            </div>
            <div className="rounded-md overflow-hidden shadow-md mt-4 md:mt-0">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Artist at work"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
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
        className="py-16 sm:py-20 bg-white px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Our Gallery</h3>
            <div className="w-12 sm:w-16 h-0.5 bg-[#FF0000] mx-auto mt-3 sm:mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { name: "Abstract", description: "Bold colors and forms" },
              { name: "Landscape", description: "Serene natural beauty" },
              { name: "Modern", description: "Contemporary elegance" },
              { name: "Vintage", description: "Timeless classics" },
              { name: "Pop Art", description: "Vibrant and playful" },
              { name: "Minimal", description: "Simple sophistication" },
            ].map((style, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="border border-gray-200 rounded-md overflow-hidden bg-white transition-all duration-300 shadow-sm hover:shadow-md h-full"
              >
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=${style.name}`}
                    alt={style.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-medium text-gray-800">{style.name} Canvas</h4>
                  <p className="text-sm text-gray-600 mt-1 sm:mt-2">{style.description}</p>
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
        className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">Contact Us</h3>
            <div className="w-12 sm:w-16 h-0.5 bg-[#FF0000] mx-auto"></div>
          </div>
          <div className="grid gap-8 sm:gap-10">
            <div className="bg-white p-6 sm:p-8 rounded-md shadow-sm">
              <h4 className="text-lg sm:text-xl font-medium mb-4 text-gray-800 text-center">Get In Touch</h4>
              <p className="text-gray-600 mb-6 leading-relaxed text-center max-w-2xl mx-auto">
                For inquiries or commissions, reach out to us. We'd love to hear about your project.
              </p>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start">
                  <span className="font-medium mb-1 sm:mb-0 sm:mr-2 text-gray-700 text-center sm:text-left">
                    Email:
                  </span>
                  <a
                    href="mailto:info@mustafacanvas.com"
                    className="text-[#FF0000] hover:underline text-center sm:text-left"
                  >
                    info@mustafacanvas.com
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start">
                  <span className="font-medium mb-1 sm:mb-0 sm:mr-2 text-gray-700 text-center sm:text-left">
                    Phone:
                  </span>
                  <a href="tel:+1234567890" className="hover:text-[#FF0000] text-center sm:text-left">
                    (123) 456-7890
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start">
                  <span className="font-medium mb-1 sm:mb-0 sm:mr-2 text-gray-700 text-center sm:text-left">
                    Location:
                  </span>
                  <span className="text-center sm:text-left">Art District, Creative City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#FF0000] rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-base">M</span>
                </div>
                <h4 className="text-xl font-semibold text-white">Mustafa Canvas</h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
                Creating beautiful canvas art to transform your space since 2018. We specialize in custom, handcrafted
                pieces that bring life and personality to any environment.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail size={16} className="text-[#FF0000] mr-3" />
                  <a href="mailto:info@mustafacanvas.com" className="text-gray-300 hover:text-white transition-colors">
                    info@mustafacanvas.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-[#FF0000] mr-3" />
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                    (123) 456-7890
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin size={16} className="text-[#FF0000] mr-3 mt-1" />
                  <span className="text-gray-300">Art District, Creative City</span>
                </div>
              </div>
            </div>
            <div className="md:pl-8 md:border-l md:border-gray-700">
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#hero"
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight
                      size={16}
                      className="mr-2 text-[#FF0000] transform group-hover:translate-x-1 transition-transform"
                    />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight
                      size={16}
                      className="mr-2 text-[#FF0000] transform group-hover:translate-x-1 transition-transform"
                    />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#gallery"
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight
                      size={16}
                      className="mr-2 text-[#FF0000] transform group-hover:translate-x-1 transition-transform"
                    />
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight
                      size={16}
                      className="mr-2 text-[#FF0000] transform group-hover:translate-x-1 transition-transform"
                    />
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="mt-8">
                <h5 className="text-sm font-medium text-gray-400 mb-3">Business Hours</h5>
                <p className="text-gray-300 text-sm">Monday - Friday: 9am - 6pm</p>
                <p className="text-gray-300 text-sm">Saturday: 10am - 4pm</p>
                <p className="text-gray-300 text-sm">Sunday: Closed</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Mustafa Canvas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

