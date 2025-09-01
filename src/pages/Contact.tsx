import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Twitter, Instagram, Music } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Contact = () => {
  const { getPageContent } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Get dynamic content
  const heroContent = getPageContent('contact', 'hero') || {
    title: 'Contact',
    description: 'Have questions? Want to collaborate? We\'d love to hear from you!'
  };
  
  const formSection = getPageContent('contact', 'form_section') || {
    title: 'Send us a Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your.email@example.com',
    messagePlaceholder: 'Tell us what\'s on your mind...',
    submitText: 'Send Message'
  };
  
  const businessContact = getPageContent('contact', 'business_contact') || {
    title: 'Business Inquiries',
    email: 'sauntrix.music@gmail.com'
  };
  
  const socialSection = getPageContent('contact', 'social_section') || {
    title: 'Follow SAUNTRIX'
  };
  
  const responseTime = getPageContent('contact', 'response_time') || {
    title: 'Response Time',
    description: 'We typically respond to messages within 24-48 hours. For urgent matters, please reach out through our social media channels.'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: Music, label: 'TikTok', url: '#', color: 'hover:text-red-400' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">{heroContent.title}</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {heroContent.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-purple-400" />
                {formSection.title}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
                    placeholder={formSection.namePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
                    placeholder={formSection.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300 resize-none"
                    placeholder={formSection.messagePlaceholder}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{formSection.submitText}</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-8"
            >
              {/* Business Contact */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
                <h3 className="text-xl font-bold text-white mb-4">{businessContact.title}</h3>
                <a
                  href={`mailto:${businessContact.email}`}
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {businessContact.email}
                </a>
              </div>

              {/* Social Media */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
                <h3 className="text-xl font-bold text-white mb-6">{socialSection.title}</h3>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 10 }}
                      className={`flex items-center space-x-3 text-gray-300 ${link.color} transition-all duration-300 p-3 rounded-lg hover:bg-gray-700/30`}
                    >
                      <link.icon className="w-6 h-6" />
                      <span className="font-medium">{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-yellow-400/10 via-purple-500/10 to-red-500/10 rounded-xl border border-purple-500/20 p-6">
                <h4 className="text-lg font-semibold text-white mb-2">{responseTime.title}</h4>
                <p className="text-gray-300">
                  {responseTime.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;