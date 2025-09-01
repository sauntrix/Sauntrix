import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Users, Star } from 'lucide-react';
import CharacterCard from '../components/CharacterCard';
import SEOHead from '../components/SEOHead';
import { useContent } from '../contexts/ContentContext';

const Home = () => {
  const { getPageContent } = useContent();
  
  // Get dynamic content
  const heroContent = getPageContent('home', 'hero') || {
    title: 'SAUNTRIX',
    subtitle: 'Stronger Together, Shining Forever',
    description: 'Virtual K-pop trio blending anime fantasy with idol artistry',
    primaryButton: { text: '🎵 Watch Latest MV', link: '/videos' },
    secondaryButton: { text: '🌠 Join AUREA', link: '/community' }
  };
  
  const charactersIntro = getPageContent('home', 'characters_intro') || {
    title: 'Meet the Trio',
    description: 'Three souls united by destiny, each wielding their unique aura to inspire and protect'
  };
  
  const ctaContent = getPageContent('home', 'cta') || {
    title: 'Ready to Join the AUREA?',
    description: 'Discover the lore, experience the music, and become part of our growing community',
    buttonText: 'Learn More About Us',
    buttonLink: '/about'
  };

  const characters = [
    {
      name: 'Lumia',
      role: 'Leader / Main Vocalist',
      color: 'gold',
      greeting: "I'm Lumia, your golden light!",
      description: 'Platinum blonde with confident golden aura',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    {
      name: 'Kira',
      role: 'Rapper / Performer',
      color: 'violet',
      greeting: "This is Kira, your spark of chaos!",
      description: 'Black bob with purple streaks, violet aura',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg'
    },
    {
      name: 'Riven',
      role: 'Vocalist / Main Dancer',
      color: 'crimson',
      greeting: "Riven here, burning with you!",
      description: 'Ash brown ponytail with crimson tips',
      image: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg'
    }
  ];

  return (
    <>
      <SEOHead 
        title="SAUNTRIX - Home | Stronger Together, Shining Forever"
        description="Welcome to SAUNTRIX - Virtual K-pop trio blending anime fantasy with idol artistry. Meet Lumia, Kira, and Riven."
      />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent mb-4">
              {heroContent.title}
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-purple-500/20 to-red-500/20 blur-3xl"></div>
          </motion.div>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to={heroContent.primaryButton?.link || '/videos'}
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 hover:scale-105 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>{heroContent.primaryButton?.text || '🎵 Watch Latest MV'}</span>
            </Link>

            <Link
              to={heroContent.secondaryButton?.link || '/community'}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>{heroContent.secondaryButton?.text || '🌠 Join AUREA'}</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {charactersIntro.title.split(' ').slice(0, -1).join(' ')} <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">{charactersIntro.title.split(' ').slice(-1)}</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {charactersIntro.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {characters.map((character, index) => (
              <motion.div
                key={character.name}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <CharacterCard character={character} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {ctaContent.title.includes('AUREA') ? (
                <>
                  {ctaContent.title.split('AUREA')[0]}<span className="text-yellow-400">AUREA</span>{ctaContent.title.split('AUREA')[1]}
                </>
              ) : (
                ctaContent.title
              )}
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {ctaContent.description}
            </p>
            <Link
              to={ctaContent.buttonLink || '/about'}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-red-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
            >
              <Star className="w-5 h-5 mr-2" />
              {ctaContent.buttonText || 'Learn More About Us'}
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
    </>
  );
};

export default Home;