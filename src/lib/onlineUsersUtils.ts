import type { OnlineUser } from "@/types/onlineUser";

interface SubscriberLookup {
  username: string | null;
  lineId: string;
  fullName: string;
}

/** Match MikroTik sessions to subscriber profiles by username. */
export function enrichOnlineUsersWithSubscribers(
  rows: OnlineUser[],
  subscribers: SubscriberLookup[],
): OnlineUser[] {
  const byUsername = new Map<string, { lineId: string; fullName: string }>();
  for (const subscriber of subscribers) {
    const key = subscriber.username?.trim().toLowerCase();
    if (key) {
      byUsername.set(key, { lineId: subscriber.lineId, fullName: subscriber.fullName });
    }
  }

  return rows.map((row) => {
    const match = byUsername.get(row.username.trim().toLowerCase());
    if (!match) return row;
    return {
      ...row,
      lineId: match.lineId,
      fullName: row.fullName || match.fullName,
    };
  });
}

export function filterOnlineUsers(rows: OnlineUser[], search: string): OnlineUser[] {
  const term = search.trim().toLowerCase();
  if (!term) return rows;

  return rows.filter((row) => {
    const haystack = [
      row.username,
      row.fullName,
      row.ipAddress,
      row.callerId,
      row.service,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(term);
  });
}
