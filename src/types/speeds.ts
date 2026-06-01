export interface SpeedTier {
  id: number;
  label: string;
  valueMbps: number;
  price: number;
  totalCount?: number;
  availableCount?: number;
  activeLinkedCount?: number;
}

export interface BackendSpeedTierRow {
  id: number;
  speedValue: number;
  price: number;
  deleted: boolean | null;
  createdAt: string;
}

export interface BackendAvailableUsernameRow {
  id: number;
  speedId: number;
  isUsed: boolean | null;
  isOwnerUsername: boolean | null;
  expiryDate: string | null;
}

export interface BackendSpeedJoinRow {
  speed_tiers?: BackendSpeedTierRow;
  speedTiers?: BackendSpeedTierRow;
  available_usernames?: BackendAvailableUsernameRow | null;
  availableUsernames?: BackendAvailableUsernameRow | null;
}

export interface BackendSpeedTierRecord {
  id: number;
  speedValue: number;
  price: number;
}

interface BackendStatusResponse<T> {
  status: string;
  data?: T;
  message?: string;
}

export type SpeedsListResponse = BackendStatusResponse<BackendSpeedJoinRow[]>;
export type SpeedTierResponse = BackendStatusResponse<BackendSpeedTierRecord>;
