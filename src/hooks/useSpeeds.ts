import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { speedsService } from "@/services/speeds.service";

export const SPEEDS_QUERY_KEY = ["speeds"] as const;

export function useSpeedsQuery() {
  return useQuery({
    queryKey: SPEEDS_QUERY_KEY,
    queryFn: () => speedsService.list(),
  });
}

export function useSpeedMutations() {
  const queryClient = useQueryClient();

  const invalidateSpeeds = () =>
    queryClient.invalidateQueries({ queryKey: SPEEDS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: ({ valueMbps, price }: { valueMbps: number; price: number }) =>
      speedsService.create(valueMbps, price),
    onSuccess: invalidateSpeeds,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      valueMbps,
      price,
    }: {
      id: number;
      valueMbps: number;
      price: number;
    }) => speedsService.update(id, valueMbps, price),
    onSuccess: invalidateSpeeds,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => speedsService.remove(id),
    onSuccess: invalidateSpeeds,
  });

  return { createMutation, updateMutation, deleteMutation };
}
