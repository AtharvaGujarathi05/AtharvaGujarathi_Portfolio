import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  badge,
  title,
  subtitle,
  centered = false,
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {/* Top Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4 text-xs font-mono uppercase tracking-wider text-slate-300 ${
          centered ? 'mx-auto' : ''
        }`}
      >
        <span className="text-electric-blue font-bold">{number}</span>
        <span className="w-1 h-1 rounded-full bg-electric-violet" />
        <span className="text-slate-300">{badge}</span>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-white"
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className="inline-block mr-2.5">
            {i === title.split(' ').length - 1 ? (
              <span className="text-gradient-cyan-violet">{word}</span>
            ) : (
              word
            )}
          </span>
        ))}
      </motion.h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 text-base md:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
