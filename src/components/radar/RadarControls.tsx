import { cn } from '@/lib/utils';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface RadarControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  className?: string;
}

export function RadarControls({
  onZoomIn,
  onZoomOut,
  onReset,
  className,
}: RadarControlsProps) {
  return (
    <div
      className={cn(
        'absolute top-4 left-4 z-10',
        'flex flex-col gap-2',
        className
      )}
    >
      <ControlButton onClick={onZoomIn} aria-label="Zoom in">
        <Plus className="w-5 h-5" />
      </ControlButton>
      <ControlButton onClick={onZoomOut} aria-label="Zoom out">
        <Minus className="w-5 h-5" />
      </ControlButton>
      <ControlButton onClick={onReset} aria-label="Reset view">
        <RotateCcw className="w-5 h-5" />
      </ControlButton>
    </div>
  );
}

function ControlButton({
  children,
  onClick,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  'aria-label': string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'w-10 h-10',
        'flex items-center justify-center',
        'bg-[#0A1628]/90 backdrop-blur-md',
        'border border-[#0EA5E9]/20 rounded-lg',
        'text-slate-400 hover:text-slate-200',
        'hover:bg-[#0F1E35] hover:border-[#0EA5E9]/40',
        'active:scale-95',
        'transition-all duration-150',
        'shadow-lg shadow-black/20'
      )}
    >
      {children}
    </button>
  );
}
