/** Fair usage policy (upload + download total) per speed tier — GB until API exposes limits. */
const FAIR_USAGE_GB_BY_MBPS: Record<number, number> = {
  4: 500,
  8: 700,
};

const MB_PER_GB = 1024;

export function getFairUsageGbForSpeed(mbps: number): number | null {
  if (!Number.isFinite(mbps) || mbps <= 0) return null;
  return FAIR_USAGE_GB_BY_MBPS[mbps] ?? null;
}

export function getFairUsageMbForSpeed(mbps: number): number | null {
  const gb = getFairUsageGbForSpeed(mbps);
  if (gb == null) return null;
  return gb * MB_PER_GB;
}

/** Resolve quota in MB: API limit first, then FUP by speed. */
export function resolveUsageLimitMb(usageLimitMb: number | null | undefined, speedMbps: number): number | null {
  if (usageLimitMb != null && Number.isFinite(usageLimitMb) && usageLimitMb > 0) {
    return usageLimitMb;
  }
  return getFairUsageMbForSpeed(speedMbps);
}

export function formatDataUsageMb(mb: number): string {
  if (!Number.isFinite(mb) || mb < 0) return "0 GB";
  const gb = mb / MB_PER_GB;
  if (gb >= 10) return `${Math.round(gb)} GB`;
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  return `${Math.max(1, Math.round(mb))} MB`;
}

export function formatUsageRatio(usedMb: number, limitMb: number | null): string {
  const usedLabel = formatDataUsageMb(usedMb);
  if (limitMb == null || limitMb <= 0) return usedLabel;
  return `${usedLabel} / ${formatDataUsageMb(limitMb)}`;
}
