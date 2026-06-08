import { apiClient } from "@/lib/apiClient";
import { ApiError } from "@/types/api";
import type { OnlineUser } from "@/types/onlineUser";

interface OnlineUsersResponse {
  status: "success" | "failed";
  data?: {
    onlineUsers: OnlineUser[];
  };
  message?: string;
}

export const onlineUsersService = {
  async list(): Promise<OnlineUser[]> {
    const { data } = await apiClient.get<OnlineUsersResponse>("/mikrotik/online-users", {
      timeout: 30_000,
    });

    if (data.status === "failed") {
      throw new ApiError(data.message ?? "Failed to fetch online users", 500);
    }

    return data.data?.onlineUsers ?? [];
  },
};
