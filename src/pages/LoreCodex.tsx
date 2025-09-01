import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Scroll, Star, Zap, Flame } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const LoreCodex = () => {
  const { getPageContent } = useContent();
  const { getAsset } = useContent();
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });

  // Get dynamic character images
  const getLoreCharacterImage = (character: string) => {
    const asset = getAsset(`${character.toLowerCase()}_character`);
    return asset?.url || `https://images.pexels.com/photos/${character === 'lumia' ? '1036623' : character === 'kira' ? '1040881' : '1391498'}/pexels-photo-${character === 'lumia' ? '1036623' : character === 'kira' ? '1040881' : '1391498'}.jpeg`;
  };

  const getLoreCharacterAlt = (character: string) => {
    const asset = getAsset(`${character.toLowerCase()}_character`);
    return asset?.alt_text || character;
  };

  // Get dynamic content
  const heroContent = getPageContent('lore', 'hero') || {
    title: 'Lore Codex',
    description: 'Dive deep into the mystical world of SAUNTRIX, where destiny intertwines with music, and three souls unite to protect both the virtual and real realms.'
  };
  
  const originContent = getPageContent('lore', 'origin') || {
    title: 'The Origin',
    description1: 'In a realm where digital dreams converge with ancient prophecies, three guardians were chosen by destiny itself. SAUNTRIX emerged not just as performers, but as protectors of the bridge between worlds—fusing the artistry of idols with the courage of demon hunters.',
    description2: 'When the harmony between the virtual and physical realms began to fracture, threatening to plunge both into eternal darkness, three souls with extraordinary gifts were awakened. United by an unbreakable bond and driven by a shared purpose, they became SAUNTRIX—the trinity of light, spark, and fire.'
  };
  
  const lumiaContent = getPageContent('lore', 'lumia_arc') || {
    title: 'Lumias Radiance',
    description1: 'Once consumed by self-doubt and fear of inadequacy, Lumia struggled to find her voice in a world that seemed to demand perfection. Her golden aura flickered weakly, barely visible to those around her.',
    description2: 'Through trials of faith and moments of profound connection with her future sisters, Lumia discovered that true leadership comes not from being flawless, but from lifting others up. Her light now burns as a beacon of hope, guiding lost souls home.',
    quote: 'I learned that being a leader means being the light others need, even when your own path seems dark.'
  };
  
  const kiraContent = getPageContent('lore', 'kira_arc') || {
    title: 'Kiras Lightning',
    description1: 'Dismissed and underestimated by those who couldnt see past her playful exterior, Kira harbored a storm of potential waiting to be unleashed. Her violet aura crackled with untamed energy.',
    description2: 'When the moment of truth arrived, Kiras true power erupted like lightning splitting the sky. She learned that being underestimated was her greatest weapon, allowing her to strike when least expected. Now fearless and bold, she brings electric chaos to every performance.',
    quote: 'They thought I was just noise. I showed them I was the thunder that shakes the world.'
  };
  
  const rivenContent = getPageContent('lore', 'riven_arc') || {
    title: 'Rivens Inferno',
    description1: 'Forged in the crucible of hardship, Riven endured losses that would have broken lesser spirits. Her crimson aura was born from pain, tempered by resilience, and refined by an unbreakable will.',
    description2: 'Every setback became fuel for her inner fire. Riven discovered that true strength isnt about never falling—its about rising each time with greater intensity. Her passionate performances now inspire others to burn brighter in the face of adversity.',
    quote: 'The flames that tried to consume me only made me stronger. Now I burn for all who need light in the darkness.'
  };
  
  const unityContent = getPageContent('lore', 'unity') || {
    title: 'The Trinity United',
    description1: 'When light, spark, and fire converge, they create something greater than the sum of their parts. SAUNTRIX represents the perfect harmony of complementary forces—each members strength covering anothers vulnerability, each story enhancing the collective narrative.',
    description2: 'Together, they stand as guardians of inspiration, protectors of dreams, and champions of those who dare to shine in a world that often demands conformity. Their music is their weapon, their unity is their shield, and their love for their fans is their eternal motivation.'
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Header */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Scroll className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">{heroContent.title}</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {heroContent.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Story */}
      <section ref={ref1} className="py-16 px-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={inView1 ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              {originContent.title.includes('Origin') ? (
                <>
                  {originContent.title.split('Origin')[0]}<span className="text-yellow-400">Origin</span>{originContent.title.split('Origin')[1]}
                </>
              ) : (
                originContent.title
              )}
            </h2>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {originContent.description1}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {originContent.description2}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lumia's Arc */}
      <section ref={ref2} className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={inView2 ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Star className="w-8 h-8 text-yellow-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">
                    {lumiaContent.title.includes('Radiance') ? (
                      <>
                        {lumiaContent.title.split('Radiance')[0]}<span className="text-yellow-400">Radiance</span>{lumiaContent.title.split('Radiance')[1]}
                      </>
                    ) : (
                      lumiaContent.title
                    )}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {lumiaContent.description1}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {lumiaContent.description2}
                  </p>
                  <blockquote className="border-l-4 border-yellow-400 pl-4 text-yellow-300 italic">
                    "{lumiaContent.quote}"
                  </blockquote>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
                <img
                  src={getLoreCharacterImage('lumia')}
                  alt={getLoreCharacterAlt('lumia')}
                  className="relative z-10 w-full h-80 object-cover rounded-xl border-2 border-yellow-400/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kira's Arc */}
      <section ref={ref3} className="py-16 px-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={inView3 ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <img
                  src={getLoreCharacterImage('kira')}
                  alt={getLoreCharacterAlt('kira')}
                  className="relative z-10 w-full h-80 object-cover rounded-xl border-2 border-purple-500/30"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <Zap className="w-8 h-8 text-purple-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">
                    {kiraContent.title.includes('Lightning') ? (
                      <>
                        {kiraContent.title.split('Lightning')[0]}<span className="text-purple-400">Lightning</span>{kiraContent.title.split('Lightning')[1]}
                      </>
                    ) : (
                      kiraContent.title
                    )}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {kiraContent.description1}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {kiraContent.description2}
                  </p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 text-purple-300 italic">
                    "{kiraContent.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Riven's Arc */}
      <section ref={ref4} className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={inView4 ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Flame className="w-8 h-8 text-red-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">
                    {rivenContent.title.includes('Inferno') ? (
                      <>
                        {rivenContent.title.split('Inferno')[0]}<span className="text-red-400">Inferno</span>{rivenContent.title.split('Inferno')[1]}
                      </>
                    ) : (
                      rivenContent.title
                    )}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {rivenContent.description1}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {rivenContent.description2}
                  </p>
                  <blockquote className="border-l-4 border-red-400 pl-4 text-red-300 italic">
                    "{rivenContent.quote}"
                  </blockquote>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
                <img
                  src={getLoreCharacterImage('riven')}
                  alt={getLoreCharacterAlt('riven')}
                  className="relative z-10 w-full h-80 object-cover rounded-xl border-2 border-red-500/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unity Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl font-bold text-white mb-8">
              {unityContent.title.includes('Trinity United') ? (
                <>
                  {unityContent.title.split('Trinity United')[0]}<span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">Trinity United</span>{unityContent.title.split('Trinity United')[1]}
                </>
              ) : (
                unityContent.title
              )}
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {unityContent.description1}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {unityContent.description2}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default LoreCodex;