import React from 'react';

interface HudFrameProps {
  children: React.ReactNode;
  className?: string;
  headerTitle?: string;
  systemCode?: string;
  statusBadge?: string;
  variant?: 'cyan' | 'emerald' | 'dual';
  showHatches?: boolean;
}

/**
 * Sci-Fi HUD Container Component inspired directly by the cybernetic UI frame.
 * Features:
 * - Chamfered beveled cut corners (45-degree angled cuts)
 * - Electric cyan / cyber emerald dual-tone border and glow
 * - Side bracket rail tabs on left and right
 * - Top tech cap with system title and code
 * - Bottom stepped notch with diagonal cyber hazard hatches (// // // //)
 */
export const HudFrame: React.FC<HudFrameProps> = ({
  children,
  className = '',
  headerTitle,
  systemCode = 'SENA.SYS_4.0',
  statusBadge,
  variant = 'dual',
  showHatches = true
}) => {
  const isCyan = variant === 'cyan';
  const isEmerald = variant === 'emerald';

  const borderColor = isEmerald
    ? 'border-[#39A900]'
    : isCyan
    ? 'border-cyan-400'
    : 'border-cyan-400 dark:border-cyan-400';

  const glowShadow = isEmerald
    ? 'shadow-[0_0_20px_-4px_rgba(57,169,0,0.35)]'
    : 'shadow-[0_0_22px_-4px_rgba(6,182,212,0.35)]';

  const accentColor = isEmerald
    ? 'bg-[#39A900] text-white'
    : 'bg-cyan-400 text-slate-950 font-bold';

  return (
    <div
      className={`relative rounded-xl border-2 ${borderColor} ${glowShadow} bg-white dark:bg-[#08121d] transition-all duration-300 ${className}`}
    >
      {/* Top Left Chamfer Deco Corner Accent */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-300 dark:border-cyan-300 pointer-events-none" />
      {/* Top Right Chamfer Deco Corner Accent */}
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-300 dark:border-cyan-300 pointer-events-none" />
      {/* Bottom Left Chamfer Deco Corner Accent */}
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-300 dark:border-cyan-300 pointer-events-none" />
      {/* Bottom Right Chamfer Deco Corner Accent */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-300 dark:border-cyan-300 pointer-events-none" />

      {/* Left Edge Bracket Grip (matching reference image) */}
      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-[6px] h-14 bg-cyan-400 rounded-xs shadow-[0_0_8px_rgba(6,182,212,0.8)] pointer-events-none" />

      {/* Right Edge Bracket Grip (matching reference image) */}
      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-[6px] h-14 bg-cyan-400 rounded-xs shadow-[0_0_8px_rgba(6,182,212,0.8)] pointer-events-none" />

      {/* Top Tech Header Bar if provided or default cyber rail */}
      {(headerTitle || systemCode || statusBadge) ? (
        <div className="relative flex items-center justify-between px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent border-b border-cyan-500/30 overflow-hidden">
          {/* Cyan Corner Header Plate */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_#22d3ee]" />
            {headerTitle && (
              <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-900 dark:text-cyan-300 font-mono">
                {headerTitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {statusBadge && (
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/40">
                {statusBadge}
              </span>
            )}
            {systemCode && (
              <span className="text-[10px] font-mono text-slate-400 dark:text-cyan-400/70 hidden sm:inline">
                [{systemCode}]
              </span>
            )}
          </div>
        </div>
      ) : null}

      {/* Main Content Area */}
      <div className="relative z-10">{children}</div>

      {/* Bottom Stepped Tech Notch with Diagonal Hatches (matching reference image) */}
      {showHatches && (
        <div className="relative px-5 py-2 flex items-center justify-between border-t border-cyan-500/20 bg-slate-50/60 dark:bg-[#060e17]/80 text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
            <span className="font-mono text-[9px] uppercase tracking-wider">HUD.SENA_V4</span>
            <span className="w-1.5 h-1.5 bg-[#39A900] rounded-full inline-block" />
          </div>

          {/* Diagonal Hazard Hatches matching the bottom of reference image */}
          <div className="flex items-center gap-1 opacity-70">
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-2.5 -skew-x-35 bg-cyan-400 dark:bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.6)]"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
