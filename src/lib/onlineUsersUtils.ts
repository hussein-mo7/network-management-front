import type { OnlineUser } from "@/types/onlineUser";

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
