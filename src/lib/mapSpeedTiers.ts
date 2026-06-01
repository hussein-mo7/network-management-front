import { buildSpeedLabel } from "@/lib/speedLabel";
import type {
  BackendAvailableUsernameRow,
  BackendSpeedJoinRow,
  BackendSpeedTierRow,
  SpeedTier,
} from "@/types/speeds";

function getTierRow(row: BackendSpeedJoinRow): BackendSpeedTierRow | undefined {
  return row.speed_tiers ?? row.speedTiers;
}

function getUsernameRow(row: BackendSpeedJoinRow): BackendAvailableUsernameRow | null {
  return row.available_usernames ?? row.availableUsernames ?? null;
}

function isActiveUsername(username: BackendAvailableUsernameRow): boolean {
  if (username.isOwnerUsername) {
    return true;
  }

  if (!username.expiryDate) {
    return false;
  }

  return new Date(username.expiryDate) > new Date();
}

export function mapSpeedsResponse(rows: BackendSpeedJoinRow[]): SpeedTier[] {
  const grouped = new Map<
    number,
    { tier: BackendSpeedTierRow; usernames: BackendAvailableUsernameRow[] }
  >();

  for (const row of rows) {
    const tier = getTierRow(row);
    if (!tier || tier.deleted) {
      continue;
    }

    const existing = grouped.get(tier.id);
    if (existing) {
      const username = getUsernameRow(row);
      if (username) {
        existing.usernames.push(username);
      }
      continue;
    }

    grouped.set(tier.id, {
      tier,
      usernames: getUsernameRow(row) ? [getUsernameRow(row)!] : [],
    });
  }

  return Array.from(grouped.values())
    .map(({ tier, usernames }) => ({
      id: tier.id,
      label: buildSpeedLabel(tier.speedValue),
      valueMbps: tier.speedValue,
      price: Number(tier.price),
      totalCount: usernames.length,
      availableCount: usernames.filter((username) => !username.isUsed).length,
      activeLinkedCount: usernames.filter(isActiveUsername).length,
    }))
    .sort((a, b) => a.valueMbps - b.valueMbps);
}

export function mapSpeedTierRecord(record: BackendSpeedTierRow): SpeedTier {
  return {
    id: record.id,
    label: buildSpeedLabel(record.speedValue),
    valueMbps: record.speedValue,
    price: Number(record.price),
    totalCount: 0,
    availableCount: 0,
    activeLinkedCount: 0,
  };
}
