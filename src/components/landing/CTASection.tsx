import { motion } from 'framer-motion';
import { Radar, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  onLaunchRadar: () => void;
}

export function CTASection({ onLaunchRadar }: CTASectionProps) {
  return (
    <section className="relative py-20 md:py-32 bg-[#050D1A] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-2xl mb-8">
            <Radar className="w-8 h-8 text-[#0EA5E9]" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-200 mb-6">
            Ready to Monitor the Skies?
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Launch the radar dashboard and start tracking aircraft in real-time.
            Experience professional-grade aviation monitoring.
          </p>

          {/* CTA Button */}
          <button
            onClick={onLaunchRadar}
            className={cn(
              'group inline-flex items-center gap-3 px-10 py-5',
              'bg-[#0EA5E9] hover:bg-[#0EA5E9]/90',
              'text-white font-semibold text-lg rounded-xl',
              'transition-all duration-200',
              'shadow-xl shadow-[#0EA5E9]/25',
              'hover:shadow-2xl hover:shadow-[#0EA5E9]/30',
              'hover:-translate-y-1'
            )}
          >
            <Radar className="w-6 h-6" />
            <span>LAUNCH RADAR DASHBOARD</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://opensky-network.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-[#0EA5E9] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Powered by OpenSky Network</span>
            </a>
            <a
              href="https://www.mapbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-[#0EA5E9] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Maps by Mapbox</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
