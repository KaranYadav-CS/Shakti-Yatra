import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface VerificationBadgeProps {
  sourceName?: string;
  sourceUrl?: string;
  verified?: boolean;
  date?: string;
  compact?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  sourceName = "UP Tourism & Shrine Records",
  sourceUrl,
  verified = true,
  date,
  compact = false,
}) => {
  if (!verified) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
        <Info className="w-3.5 h-3.5" />
        Information Pending Verification
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 transition-all hover:bg-emerald-500/15"
      title={`Verified by ${sourceName}${date ? ` on ${date}` : ''}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
      <span>{compact ? "Verified Source" : `Verified: ${sourceName}`}</span>
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 underline text-emerald-400 hover:text-emerald-200"
          onClick={(e) => e.stopPropagation()}
        >
          View Source
        </a>
      )}
    </span>
  );
};
