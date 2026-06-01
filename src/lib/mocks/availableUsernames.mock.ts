import { mockSpeedTiers, type SpeedTier } from "./speeds.mock";

export interface AvailableUsername {
  id: number;
  username: string;
  password: string;
  speedId: number;
  isUsed: boolean;
  isOwnerUsername: boolean;
  createdAt: string;
}

export const mockAvailableUsernames: AvailableUsername[] = [
  {
    id: 1,
    username: "0599123456PP",
    password: "wifi2024",
    speedId: 2,
    isUsed: false,
    isOwnerUsername: false,
    createdAt: "2026-01-12",
  },
  {
    id: 2,
    username: "0598765432PP",
    password: "net8899",
    speedId: 2,
    isUsed: true,
    isOwnerUsername: false,
    createdAt: "2026-01-08",
  },
  {
    id: 3,
    username: "5962963140PP",
    password: "owner001",
    speedId: 2,
    isUsed: false,
    isOwnerUsername: true,
    createdAt: "2025-11-20",
  },
  {
    id: 4,
    username: "0599111222PP",
    password: "pass5566",
    speedId: 1,
    isUsed: false,
    isOwnerUsername: false,
    createdAt: "2026-02-01",
  },
  {
    id: 5,
    username: "0599333444PP",
    password: "link7788",
    speedId: 3,
    isUsed: false,
    isOwnerUsername: false,
    createdAt: "2026-02-14",
  },
  {
    id: 6,
    username: "0599444555PP",
    password: "fast32xx",
    speedId: 3,
    isUsed: true,
    isOwnerUsername: false,
    createdAt: "2026-02-20",
  },
  {
    id: 7,
    username: "0599555666PP",
    password: "slow4abc",
    speedId: 1,
    isUsed: false,
    isOwnerUsername: false,
    createdAt: "2026-03-01",
  },
];

export function getUsernamesBySpeedId(speedId: number): AvailableUsername[] {
  return mockAvailableUsernames.filter((row) => row.speedId === speedId);
}

export function countUsernamesBySpeedId(speedId: number): number {
  return getUsernamesBySpeedId(speedId).length;
}

export function countAvailableBySpeedId(speedId: number): number {
  return getUsernamesBySpeedId(speedId).filter((row) => !row.isUsed).length;
}

export { mockSpeedTiers, type SpeedTier };
