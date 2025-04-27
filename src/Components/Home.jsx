import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


// Framer Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const bounce = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Add to existing motion variants
const scaleHover = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Updated Navigation
  const Navigation = () => (
    <nav className="absolute top-0 left-0 w-full py-10 z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400 neon-text">VenomGuard AI 🐍</h1>
        
        <div className="flex items-center space-x-6 gap-5 relative">
          {/* Identification Link */}
          <Link 
            to="/identify" 
            className="text-gray-400 hover:text-green-400 transition duration-300"
          >
            Identification
          </Link>

          {/* Emergency Map Link */}
          <Link 
            to="/emergency" 
            className="text-gray-400 hover:text-green-400 transition duration-300"
          >
            Emergency Map
          </Link>

          {/* Resources Dropdown */}
          <div className="relative group">
            <button className="text-gray-400 hover:text-green-400 transition duration-300 flex items-center gap-1">
              Resources
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Resources Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800"
            >
              <div className="p-2 space-y-2">
                <Link 
                  to="/database" 
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg"
                >
                  Species Database
                </Link>
                <Link 
                  to="/documentation" 
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg"
                >
                  Safety Guides
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Profile Dropdown (Existing Code) */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition duration-300"
              >
                <span>Profile</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800"
                >
                  <div className="p-2 space-y-2">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg"
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              to="/login"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full 
                        transition-all duration-300 shadow-md hover:shadow-green-500/30"
            >
              Login
            </Link>
          </motion.div>
          )}
        </div>
      </div>
    </nav>
  );

  // Featured Venomous Species
  const FeaturedSpecies = () => (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={staggerChildren}
      viewport={{ once: false, amount: 0.2 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h3 variants={fadeIn} className="text-3xl font-bold text-green-400 neon-text mb-12 text-center">
        Featured Venomous Species
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: 'King Cobra',
            image: '/Images/king_cobra.jpg',
            fact: 'World\'s longest venomous snake (up to 18.5ft)',
            danger: 'Extremely Venomous',
            wikipedia: 'https://en.wikipedia.org/wiki/King_cobra'
          },
          {
            name: 'Black Mamba',
            image: '/Images/black_mamba.jpg',
            fact: 'Fastest land snake (up to 20km/h)',
            danger: 'Highly Toxic',
            wikipedia: 'https://en.wikipedia.org/wiki/Black_mamba'
          },
          {
            name: 'Rattlesnake',
            image: '/Images/rattlesnake.jpg',
            fact: 'Heat-sensing pit organs',
            danger: 'Hemotoxic Venom',
            wikipedia: 'https://en.wikipedia.org/wiki/Rattlesnake'
          },
          {
            name: 'Inland Taipan',
            image: '/Images/Inland_Taipan.webp',
            fact: 'Most toxic venom of any land snake',
            danger: 'Extremely Dangerous',
            wikipedia: 'https://en.wikipedia.org/wiki/Inland_taipan'
          }
        ].map((species, index) => (
          <motion.div 
            key={index}
            variants={fadeIn}
            className="bg-zinc-900 rounded-xl overflow-hidden hover:bg-transparent transition-all"
          >
            <img 
              src={species.image} 
              alt={species.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-green-400 mb-2">{species.name}</h4>
              <p className="text-gray-300 text-sm mb-2">{species.fact}</p>
              <div className="flex items-center justify-between">
                <span className="text-red-400 text-sm font-medium">{species.danger}</span>
                <a 
                  href={species.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm transition-colors"
                >
                  Learn More →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );

  // Safety Guidelines
  const SafetyTips = () => (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={staggerChildren}
      viewport={{ once: false, amount: 0.2 }}
      className="bg-black py-12 mt-20 mb-60"
    >
      <div className="container mx-auto px-4">
        <motion.h3 variants={fadeIn} className="text-3xl font-bold text-green-400 neon-text mb-8 text-center">
          Safety Guidelines
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🚫',
              title: 'Do Not Disturb',
              content: 'Never attempt to handle or provoke wild snakes'
            },
            {
              icon: '📞',
              title: 'Emergency Response',
              content: 'Immediately call local emergency services if bitten'
            },
            {
              icon: '👟',
              title: 'Proper Footwear',
              content: 'Wear boots and long pants in snake habitats'
            },
            {
              icon: '🔦',
              title: 'Night Safety',
              content: 'Use flashlight when walking at night in snake areas'
            },
            {
              icon: '🏥',
              title: 'First Aid',
              content: 'Learn proper first aid procedures for snake bites'
            },
            {
              icon: '📷',
              title: 'Photo Safety',
              content: 'Use zoom instead of approaching for photos'
            }
          ].map((tip, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-zinc-900 p-6 rounded-xl hover:bg-zinc-950 transition-all"
            >
              <div className="text-3xl mb-4">{tip.icon}</div>
              <h4 className="text-xl font-semibold text-green-400 mb-2">{tip.title}</h4>
              <p className="text-gray-300">{tip.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section - Full Screen */}
      <header className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/Images/hero-bg.jpg')" }}
        ></div>
        <div className="container mx-auto px-4 mt-40 relative z-10">
          {/* Animated Heading 1 */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={slideInLeft}
            viewport={{ once: false, amount: 0.5 }}
            className="text-5xl font-bold text-green-400 neon-text mb-6 text-left"
          >
            AI-Driven
          </motion.h2>
          {/* Animated Heading 2 */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={slideInLeft}
            viewport={{ once: false, amount: 0.5 }}
            className="text-5xl font-bold text-green-400 neon-text mb-6 text-left"
          >
            Venomous Species Identification
          </motion.h2>
          {/* Animated Paragraph */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={slideInLeft}
            viewport={{ once: false, amount: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mb-8 text-left"
          >
            Welcome to the AI-driven system for identifying venomous species and providing emergency response guidance.
          </motion.p>
          {/* Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideInLeft}
            viewport={{ once: false, amount: 0.5 }}
            className="flex space-x-4"
          >
            <button className="bg-green-500 hover:bg-white text-white hover:text-green-400 font-bold py-3 px-8 rounded-full transition duration-300 shadow-l">
              Get Started
            </button>
            <button className="bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <motion.main
        initial="hidden"
        whileInView="visible"
        variants={slideInLeft}
        viewport={{ once: false, amount: 0.2 }}
        className="container mx-auto px-4 py-12"
      >
        <section className='mb-12'>
          <motion.h3 variants={fadeIn} className="text-3xl font-bold text-green-400 neon-text mb-8 text-center">
            Why Choose Us?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Accurate Identification",
                description: "Our AI system uses advanced algorithms to accurately identify venomous species.",
              },
              {
                icon: "🚨",
                title: "Emergency Guidance",
                description: "Get immediate guidance on what to do in case of a venomous bite or sting.",
              },
              {
                icon: "📚",
                title: "Comprehensive Database",
                description: "Access a vast database of venomous species and their characteristics.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-zinc-900 p-8 rounded-xl border-2 border-zinc-900 hover:bg-zinc-950 transition duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold text-green-400 mb-4">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.main>

      {/* How It Works Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={staggerChildren}
        viewport={{ once: false, amount: 0.2 }}
        className="container mx-auto px-4 py-12 mt-20 mb-20"
      >
        <motion.h3 variants={fadeIn} className="text-3xl font-bold text-green-400 neon-text mb-12 text-center">
          How It Works
        </motion.h3>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-zinc-700 transform -translate-x-1/2"></div>

          {/* Step 1 - Top Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={bounce}
            viewport={{ once: false, amount: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center mb-32"
          >
            <div className="md:w-1/2 md:pr-8 text-right">
              <h4 className="text-xl font-semibold text-green-400 mb-2">1. Upload Image</h4>
              <p className="text-gray-400">
                Upload an image of the species you want to identify.
              </p>
            </div>
            <div className="md:w-1/2"></div>
          </motion.div>
          
          {/* Step 2 - Middle Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={bounce}
            viewport={{ once: false, amount: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center mb-32"
          >
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-8">
              <h4 className="text-xl font-semibold text-green-400 mb-2">2. AI Analysis</h4>
              <p className="text-gray-400">
                Our AI analyzes the image and identifies the species.
              </p>
            </div>
          </motion.div>

          {/* Step 3 - Bottom Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={bounce}
            viewport={{ once: false, amount: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center mb-20"
          >
            <div className="md:w-1/2 md:pr-8 text-right">
              <h4 className="text-xl font-semibold text-green-400 mb-2">3. Get Results</h4>
              <p className="text-gray-400">
                Receive detailed information and emergency guidance.
              </p>
            </div>
            <div className="md:w-1/2"></div>
          </motion.div>
        </div>
      </motion.section>

      <FeaturedSpecies />

      <SafetyTips />

      {/* Footer */}
      <footer className="bg-gray-900 bg-opacity-70 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            <div>
              <h5 className="text-green-400 font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#!" className="text-gray-300 hover:text-green-400">Species Database</a></li>
                <li><a href="#!" className="text-gray-300 hover:text-green-400">Emergency Protocol</a></li>
                <li><a href="#!" className="text-gray-300 hover:text-green-400">Research Papers</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-green-400 font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                <li><a href="#!" className="text-gray-300 hover:text-green-400">First Aid Guide</a></li>
                <li><a href="#!" className="text-gray-300 hover:text-green-400">Snake Habitat Map</a></li>
              </ul>
            </div>
            <div className="col-span-2">
              <h5 className="text-green-400 font-semibold mb-4">Newsletter</h5>
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:border-green-400"
                />
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Get latest updates on venomous species research and safety alerts
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Venomous Species. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;