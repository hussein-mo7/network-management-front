import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usernamesService } from "@/services/usernames.service";
import type { AvailableUsernameFormValues } from "@/components/pages/available-usernames";
import { SPEEDS_QUERY_KEY } from "@/hooks/useSpeeds";

export function availableUsernamesQueryKey(speedId: number) {
  return ["available-usernames", speedId] as const;
}

export function useAvailableUsernamesQuery(speedId: number, enabled = true) {
  return useQuery({
    queryKey: availableUsernamesQueryKey(speedId),
    queryFn: () => usernamesService.list(speedId),
    enabled: enabled && speedId > 0,
  });
}

export function useUsernameMutations(speedId: number) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: availableUsernamesQueryKey(speedId) });
    queryClient.invalidateQueries({ queryKey: SPEEDS_QUERY_KEY });
  };

  const createMutation = useMutation({
    mutationFn: (values: AvailableUsernameFormValues) => usernamesService.create(speedId, values),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: AvailableUsernameFormValues }) =>
      usernamesService.update(speedId, id, values),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usernamesService.remove(speedId, id),
    onSuccess: invalidate,
  });

  const deleteAllMutation = useMutation({
    mutationFn: () => usernamesService.removeAllForSpeed(speedId),
    onSuccess: invalidate,
  });

  const importMutation = useMutation({
    mutationFn: (file: File) => usernamesService.importExcel(speedId, file),
    onSuccess: invalidate,
  });

  const exportMutation = useMutation({
    mutationFn: () => usernamesService.exportExcel(speedId),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteAllMutation,
    importMutation,
    exportMutation,
  };
}
