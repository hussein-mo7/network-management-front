import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { onlineUsersService } from "@/services/onlineUsers.service";

export const onlineUsersQueryKey = ["online-users"] as const;

const REFRESH_MS = 30_000;

export function useOnlineUsersQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: onlineUsersQueryKey,
    queryFn: () => onlineUsersService.list(),
    enabled: options?.enabled ?? true,
    refetchInterval: REFRESH_MS,
    refetchIntervalInBackground: false,
    staleTime: REFRESH_MS,
    placeholderData: keepPreviousData,
  });
}
