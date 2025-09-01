import React from 'react';
import { motion } from 'framer-motion';
import CharacterCard from '../components/CharacterCard';
import { useContent } from '../contexts/ContentContext';

const About = () => {
  const { getPageContent } = useContent();
  
  // Get dynamic content
  const heroContent = getPageContent('about', 'hero') || {
    title: 'About SAUNTRIX',
    description: 'SAUNTRIX is a virtual K-pop–inspired trio that blends anime fantasy with idol artistry. Each member represents a fundamental force of inspiration: light, spark, and fire — united to inspire fans worldwide through their music and stories.',
    extendedDescription: 'Born from the convergence of dreams and destiny, these three guardians transcend the boundaries between the virtual and real worlds, bringing hope, courage, and unity to all who follow their journey.'
  };
  
  const charactersSection = getPageContent('about', 'characters_section') || {
    title: 'The Trinity',
    description: 'Each member brings their unique essence and power to create perfect harmony'
  };
  
  const missionContent = getPageContent('about', 'mission') || {
    title: 'Our Mission',
    description1: 'To bridge the gap between fantasy and reality, bringing the magic of anime storytelling into the world of K-pop. Through our music, performances, and interactive experiences, we aim to create a community where fans can escape, dream, and find strength.',
    description2: 'SAUNTRIX represents the power of unity in diversity, showing that when different energies come together with a common purpose, they can create something truly extraordinary.'
  };

  const characters = [
    {
      name: 'Lumia',
      role: 'Leader / Main Vocalist',
      color: 'gold',
      greeting: "I'm Lumia, your golden light!",
      description: 'Platinum blonde with confident golden aura. The guiding light who rose from doubt to lead with unwavering determination.',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    {
      name: 'Kira',
      role: 'Rapper / Performer',
      color: 'violet',
      greeting: "This is Kira, your spark of chaos!",
      description: 'Black bob with purple streaks, violet aura. The underestimated spark who turned fearless, bringing electric energy to every performance.',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg'
    },
    {
      name: 'Riven',
      role: 'Vocalist / Main Dancer',
      color: 'crimson',
      greeting: "Riven here, burning with you!",
      description: 'Ash brown ponytail with crimson tips. The passionate flame who endured hardships, now burning brighter than ever.',
      image: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {heroContent.title.includes('SAUNTRIX') ? (
                <>
                  {heroContent.title.split('SAUNTRIX')[0]}<span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">SAUNTRIX</span>{heroContent.title.split('SAUNTRIX')[1]}
                </>
              ) : (
                heroContent.title
              )}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {heroContent.description}
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed">
              {heroContent.extendedDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {charactersSection.title.includes('Trinity') ? (
                <>
                  {charactersSection.title.split('Trinity')[0]}<span className="text-yellow-400">Trinity</span>{charactersSection.title.split('Trinity')[1]}
                </>
              ) : (
                charactersSection.title
              )}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {charactersSection.description}
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

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {missionContent.title.includes('Mission') ? (
                <>
                  {missionContent.title.split('Mission')[0]}<span className="text-purple-400">Mission</span>{missionContent.title.split('Mission')[1]}
                </>
              ) : (
                missionContent.title
              )}
            </h3>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {missionContent.description1}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {missionContent.description2}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;