import { motion } from 'framer-motion';
import { Radar, ChevronRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onOpenRadar: () => void;
}

export function HeroSection({ onOpenRadar }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[#050D1A]">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Radar Sweep Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[800px] h-[800px]">
            {/* Concentric circles */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0EA5E9]/10"
                style={{
                  width: `${i * 200}px`,
                  height: `${i * 200}px`,
                }}
              />
            ))}
            
            {/* Rotating sweep line */}
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2">
              <div
                className="absolute top-0 left-1/2 w-0.5 h-1/2 origin-bottom bg-gradient-to-t from-[#0EA5E9]/50 to-transparent"
                style={{
                  animation: 'radar-sweep 4s linear infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Scan Line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/30 to-transparent"
            style={{
              animation: 'scan-line 4s linear infinite',
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A] via-transparent to-[#050D1A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full mb-8">
            <Radar className="w-4 h-4 text-[#0EA5E9]" />
            <span className="font-mono text-xs text-[#0EA5E9] tracking-wider">
              REAL-TIME GLOBAL TRACKING
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-200 tracking-tight mb-6">
            GLOBAL
            <span className="text-[#0EA5E9]"> MONITORING</span>
            <br />
            DASHBOARD
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Real-time aircraft surveillance and global intelligence monitoring.
            Track thousands of aircraft worldwide with military-grade precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenRadar}
              className={cn(
                'group flex items-center gap-2 px-8 py-4',
                'bg-[#0EA5E9] hover:bg-[#0EA5E9]/90',
                'text-white font-semibold rounded-lg',
                'transition-all duration-200',
                'shadow-lg shadow-[#0EA5E9]/25',
                'hover:shadow-xl hover:shadow-[#0EA5E9]/30',
                'hover:-translate-y-0.5'
              )}
            >
              <Radar className="w-5 h-5" />
              <span>OPEN RADAR</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#features"
              className={cn(
                'flex items-center gap-2 px-8 py-4',
                'bg-transparent border border-[#0EA5E9]/30',
                'text-slate-200 hover:text-[#0EA5E9]',
                'font-semibold rounded-lg',
                'transition-all duration-200',
                'hover:border-[#0EA5E9]/50'
              )}
            >
              <Info className="w-5 h-5" />
              <span>LEARN MORE</span>
            </a>
          </div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-4 md:gap-8"
        >
          {[
            { value: '9,000+', label: 'Aircraft Tracked' },
            { value: '180+', label: 'Countries' },
            { value: '10s', label: 'Update Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-mono text-2xl md:text-3xl font-bold text-[#0EA5E9]">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs md:text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
}
