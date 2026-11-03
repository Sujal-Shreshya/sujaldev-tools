import React, { useEffect, useRef } from 'react';
import { ADS_CONFIG } from '../../config/ads';

export type AdSlotType = 'toolHeader' | 'toolSidebar' | 'toolFooter' | 'homeMiddle';

interface AdSlotProps {
  slotType: AdSlotType;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotType, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const slotId = ADS_CONFIG.slots[slotType];

  useEffect(() => {
    if (ADS_CONFIG.enabled && typeof window !== 'undefined') {
      try {
        // @ts-expect-error - adsbygoogle might be defined on window
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense initialization suppressed:', e);
      }
    }
  }, [slotType]);

  // Height configurations to prevent Cumulative Layout Shift (CLS)
  const heightStyles: Record<AdSlotType, string> = {
    toolHeader: 'min-h-[90px] w-full max-w-[728px] mx-auto',
    toolSidebar: 'min-h-[250px] w-full max-w-[300px] mx-auto',
    toolFooter: 'min-h-[90px] w-full max-w-[970px] mx-auto',
    homeMiddle: 'min-h-[120px] w-full max-w-[1140px] mx-auto',
  };

  return (
    <div
      ref={adRef}
      className={`my-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-200 ${heightStyles[slotType]} ${className}`}
      aria-label="Advertisement area"
    >
      {ADS_CONFIG.enabled && slotId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={ADS_CONFIG.publisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        /* Reserved placeholder layout container (no fake ads, preserves CLS) */
        <div className="w-full h-full min-h-[90px] border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-3 text-slate-400 dark:text-slate-600 select-none bg-slate-50/50 dark:bg-slate-900/30">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            Advertisement Space
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5">
            Non-intrusive ad space reserved for future sponsorship
          </span>
        </div>
      )}
    </div>
  );
};

