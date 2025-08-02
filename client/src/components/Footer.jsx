import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white  mt-20 py-16 px-6 md:px-12">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-gray-900 opacity-50 blur-xl"></div>

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-10">
        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold">Stay Updated!</h2>
          <p className="text-gray-300">Subscribe to our newsletter and never miss an event.</p>
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full overflow-hidden p-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-transparent outline-none text-white placeholder-gray-300"
            />
            <button className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2 rounded-full transition">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2">
            {["About Us", "FAQ", "Privacy Policy", "Terms & Conditions"].map((link, index) => (
              <li key={index}>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact & Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="text-gray-300">📞 +91 6207209409</p>
          <p className="text-gray-300">📧 support@eventory.com</p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Eventory. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
