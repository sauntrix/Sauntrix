import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import { useContent } from '../contexts/ContentContext';

interface Character {
  name: string;
  role: string;
  color: string;
  greeting: string;
  description: string;
  image: string;
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { getAsset } = useContent();

  // Get dynamic character image
  const getCharacterImage = (characterName: string) => {
    const assetKey = `${characterName.toLowerCase()}_character`;
    const asset = getAsset(assetKey);
    return asset?.url || character.image;
  };

  const getCharacterAltText = (characterName: string) => {
    const assetKey = `${characterName.toLowerCase()}_character`;
    const asset = getAsset(assetKey);
    return asset?.alt_text || `${characterName} - ${character.role}`;
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'gold':
        return {
          border: 'border-yellow-400/50 hover:border-yellow-400',
          glow: 'hover:shadow-lg hover:shadow-yellow-400/30',
          text: 'text-yellow-400',
          bg: 'bg-yellow-400/10'
        };
      case 'violet':
        return {
          border: 'border-purple-500/50 hover:border-purple-500',
          glow: 'hover:shadow-lg hover:shadow-purple-500/30',
          text: 'text-purple-400',
          bg: 'bg-purple-500/10'
        };
      case 'crimson':
        return {
          border: 'border-red-500/50 hover:border-red-500',
          glow: 'hover:shadow-lg hover:shadow-red-500/30',
          text: 'text-red-400',
          bg: 'bg-red-500/10'
        };
      default:
        return {
          border: 'border-gray-500/50',
          glow: 'hover:shadow-lg',
          text: 'text-gray-400',
          bg: 'bg-gray-500/10'
        };
    }
  };

  const colorClasses = getColorClasses(character.color);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -10 }}
      className={`relative bg-gray-800/80 backdrop-blur-lg rounded-xl border-2 ${colorClasses.border} ${colorClasses.glow} transition-all duration-300 overflow-hidden group cursor-pointer`}
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 ${colorClasses.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      {/* Character Image */}
      <div className="relative h-64 overflow-hidden">
        <LazyImage
          src={getCharacterImage(character.name)}
          alt={getCharacterAltText(character.name)}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <motion.h3
          className={`text-2xl font-bold ${colorClasses.text} mb-2`}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        >
          {character.name}
        </motion.h3>
        
        <p className="text-gray-300 text-sm mb-4 font-medium">
          {character.role}
        </p>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className={`${colorClasses.text} font-medium mb-2 italic`}>
            "{character.greeting}"
          </p>
          <p className="text-gray-400 text-sm">
            {character.description}
          </p>
        </motion.div>

        {/* Aura Effect */}
        <motion.div
          animate={isHovered ? { scale: 1.2, opacity: 0.3 } : { scale: 1, opacity: 0.1 }}
          className={`absolute inset-0 ${colorClasses.bg} rounded-xl blur-xl pointer-events-none`}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default CharacterCard;