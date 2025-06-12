"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

// Animation Variants
const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const controls = useAnimation();

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Sample gallery data
  const galleryItems = [
    {
      id: 1,
      name: "Abstract",
      description: "Bold colors and forms",
      color: "from-purple-500 to-pink-500",
      image: "/abstract.jpg",
    },
    {
      id: 2,
      name: "Landscape",
      description: "Serene natural beauty",
      color: "from-green-500 to-blue-500",
      image: "/landscape.jpg",
    },
    {
      id: 3,
      name: "Modern",
      description: "Contemporary elegance",
      color: "from-gray-500 to-slate-500",
      image: "/modern.jpg",
    },
    {
      id: 4,
      name: "Vintage",
      description: "Timeless classics",
      color: "from-amber-500 to-orange-500",
      image: "/vintage.jpg",
    },
    {
      id: 5,
      name: "Pop Art",
      description: "Vibrant and playful",
      color: "from-pink-500 to-red-500",
      image: "/popart.jpg",
    },
    {
      id: 6,
      name: "Minimal",
      description: "Simple sophistication",
      color: "from-slate-500 to-gray-500",
      image: "/minimal.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 scroll-smooth">
      {/* Fixed Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 py-4 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 shadow-lg"
      >
        <Link
          href="#hero"
          className="flex items-center space-x-3 sm:space-x-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
            <Image
              src="/camp.png"
              alt="Mustafa Canvas Logo"
              width={48} // Optimized base size
              height={48} // Matches width for square aspect
              className="w-[100%] h-[100%] object-contain" // Relative sizing
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FF0000]">
              Mustafa Canvas
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["hero", "about", "gallery", "contact"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className={`text-gray-300 hover:text-[#FF0000] transition-all duration-300 text-sm font-medium relative group capitalize ${
                activeSection === section ? "text-[#FF0000]" : ""
              }`}
              aria-current={activeSection === section ? "page" : undefined}
            >
              {section === "hero"
                ? "Home"
                : section === "gallery"
                ? "Our Work"
                : section}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#FF0000] transition-all duration-300 ${
                  activeSection === section
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] sm:top-[80px] left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-sm shadow-lg md:hidden border-b border-gray-700"
          >
            <div className="flex flex-col py-4">
              {["hero", "about", "gallery", "contact"].map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className={`px-6 py-3 ${
                    activeSection === section
                      ? "text-[#FF0000] bg-gray-700/50"
                      : "text-gray-300"
                  } hover:bg-gray-700/50 hover:text-[#FF0000] transition-all duration-300 capitalize`}
                  onClick={toggleMobileMenu}
                  aria-current={activeSection === section ? "page" : undefined}
                >
                  {section === "hero"
                    ? "Home"
                    : section === "gallery"
                    ? "Our Work"
                    : section}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        id="hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
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

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight"
            variants={fadeInUp}
          >
            Elevate Your Space with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#FF4444]">
              Premium Canvas Art
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
            variants={fadeInUp}
          >
            Discover unique and handcrafted canvas art that transforms your
            environment with elegance and style.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <Link
              href="#gallery"
              className="group px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              <span className="flex items-center">
                Explore Gallery
                <ChevronRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-lg font-medium hover:border-[#FF0000] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
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
        viewport={{ once: true, amount: 0.2 }}
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
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
              variants={fadeInUp}
            >
              About Us
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] to-[#CC0000] mx-auto rounded-full"
              variants={fadeInUp}
            ></motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  At Mustafa Canvas, we create custom canvas art with passion
                  and precision to transform your space. Our team of talented
                  artists brings your vision to life with meticulous attention
                  to detail.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Founded in 2018, we've helped hundreds of clients find the
                  perfect artistic expression for their homes and offices. Each
                  piece is handcrafted with premium materials to ensure lasting
                  beauty.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                    <div className="text-2xl font-bold text-[#FF0000]">
                      500+
                    </div>
                    <div className="text-gray-400 text-sm">Happy Clients</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                    <div className="text-2xl font-bold text-[#FF0000]">6</div>
                    <div className="text-gray-400 text-sm">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative aspect-video">
                <Image
                  src="/artist-working.jpg"
                  alt="Artist at work in Mustafa Canvas studio"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
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
        viewport={{ once: true, amount: 0.2 }}
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
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              variants={fadeInUp}
            >
              Our Gallery
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] to-[#CC0000] mx-auto rounded-full"
              variants={fadeInUp}
            ></motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {galleryItems.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group border border-gray-700 rounded-xl overflow-hidden bg-gray-800 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#FF0000]/10"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.name} canvas art example`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FF0000] transition-colors">
                    {item.name} Canvas
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center text-[#FF0000] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                    <ChevronRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
              variants={fadeInUp}
            >
              Contact Us
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#FF0000] to-[#CC0000] mx-auto rounded-full"
              variants={fadeInUp}
            ></motion.div>
          </div>

          <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-600">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">
                Get In Touch
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed text-center max-w-2xl mx-auto text-lg">
                For inquiries or commissions, reach out to us. We'd love to hear
                about your project.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-[#FF0000]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF0000]/20 transition-colors">
                    <Mail size={24} className="text-[#FF0000]" />
                  </div>
                  <h4 className="font-medium text-white mb-2">Email</h4>
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
                  <h4 className="font-medium text-white mb-2">Phone</h4>
                  <a
                    href="tel:+923362725979"
                    className="text-gray-300 hover:text-[#FF0000] transition-colors text-sm"
                  >
                    +92 336 2725979
                  </a>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-[#FF0000]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF0000]/20 transition-colors">
                    <MapPin size={24} className="text-[#FF0000]" />
                  </div>
                  <h4 className="font-medium text-white mb-2">Location</h4>
                  <address className="text-gray-300 text-sm not-italic">
                    Jodia Bazar, Karachi
                  </address>
                </div>
              </div>

              {/* Contact Form */}
              <form className="mt-12 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Send Message
                </button>
              </form>
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
                  <Image
                    src="/camp.png"
                    alt="Mustafa Canvas Logo"
                    height={100}
                    width={100}
                    className="p-2"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Mustafa Canvas
                  </h2>
                  <p className="text-gray-400 text-sm">Premium Art Studio</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                Creating beautiful canvas art to transform your space since
                2018. We specialize in custom, handcrafted pieces that bring
                life and personality to any environment.
              </p>

              <div className="flex space-x-4 mb-8">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram
                    size={18}
                    className="text-gray-400 hover:text-white"
                  />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook
                    size={18}
                    className="text-gray-400 hover:text-white"
                  />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter
                    size={18}
                    className="text-gray-400 hover:text-white"
                  />
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF0000] transition-colors">
                    <Mail
                      size={16}
                      className="text-gray-400 group-hover:text-white"
                    />
                  </div>
                  <a
                    href="mailto:info@mustafacanvas.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    abdullaharif893@gmail.com
                  </a>
                </div>
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF0000] transition-colors">
                    <Phone
                      size={16}
                      className="text-gray-400 group-hover:text-white"
                    />
                  </div>
                  <a
                    href="tel:+923362725979"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +92 336 2725979
                  </a>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF0000] transition-colors">
                    <MapPin
                      size={16}
                      className="text-gray-400 group-hover:text-white"
                    />
                  </div>
                  <address className="text-gray-400 pt-2 not-italic">
                    Jodia Bazar, Karachi
                  </address>
                </div>
              </div>
            </div>

            <div className="md:pl-8 md:border-l md:border-gray-800">
              <h3 className="text-xl font-semibold mb-8 text-white">
                Quick Links
              </h3>
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
                <h4 className="text-lg font-medium text-white mb-4">
                  Working Hours
                </h4>
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
            <p className="text-gray-500">
              © {new Date().getFullYear()} Mustafa Canvas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
