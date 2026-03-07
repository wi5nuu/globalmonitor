import { motion } from 'framer-motion';
import { Radar, RefreshCw, Shield, Plane, Globe, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Radar,
    title: 'Live Aircraft Radar',
    description: 'Track thousands of aircraft in real-time across the globe. View precise location, altitude, speed, and heading data updated every 10 seconds.',
    color: 'text-[#0EA5E9]',
    bgColor: 'bg-[#0EA5E9]/10',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Updates',
    description: 'Data refreshed automatically every 10 seconds from the OpenSky Network. Never miss a moment with our high-frequency polling system.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
  },
  {
    icon: Shield,
    title: 'Intelligence UI',
    description: 'Command-center design optimized for serious monitoring. Dark theme, precise typography, and professional-grade data visualization.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const additionalFeatures = [
  {
    icon: Plane,
    label: 'Flight Tracking',
    description: 'Monitor callsigns, ICAO codes, and aircraft details',
  },
  {
    icon: Globe,
    label: 'Global Coverage',
    description: 'Worldwide aircraft surveillance with Mapbox integration',
  },
  {
    icon: Zap,
    label: 'High Performance',
    description: 'Optimized for 10,000+ concurrent aircraft markers',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 md:py-32 bg-[#050D1A]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14, 165, 233, 0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-[#0EA5E9] tracking-wider uppercase">
            Capabilities
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-200 mt-4 mb-6">
            Advanced Monitoring Features
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Professional-grade aircraft tracking with real-time updates and
            intelligence-grade user interface.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full hover:border-[#0EA5E9]/40 transition-colors">
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center mb-6',
                    feature.bgColor
                  )}
                >
                  <feature.icon className={cn('w-6 h-6', feature.color)} />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-200 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#0A1628]/50 border border-[#0EA5E9]/10 rounded-xl p-6 md:p-8"
        >
          <div className="grid sm:grid-cols-3 gap-6">
            {additionalFeatures.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#0EA5E9]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 mb-1">
                    {item.label}
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
