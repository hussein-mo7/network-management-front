import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CustomerFormValues } from "@/components/pages/customers";
import { customersService, type CustomersListParams } from "@/services/customers.service";

export const customersQueryKey = (params?: CustomersListParams) =>
  ["customers", params ?? {}] as const;

export const customerByLineIdQueryKey = (lineId: string) =>
  ["customers", "line", lineId] as const;

export function useCustomersQuery(params: CustomersListParams = {}) {
  return useQuery({
    queryKey: customersQueryKey(params),
    queryFn: () => customersService.list(params),
  });
}

export function useCustomerByLineIdQuery(lineId: string, enabled = true) {
  return useQuery({
    queryKey: customerByLineIdQueryKey(lineId),
    queryFn: () => customersService.getByLineId(lineId),
    enabled: enabled && Boolean(lineId),
  });
}

export function useCustomerMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["customers"] });
    queryClient.invalidateQueries({ queryKey: ["subscribers"] });
  };

  const createMutation = useMutation({
    mutationFn: (values: {
      fullName: string;
      facilityType: string;
      phone: string;
      lineId: string;
      notes?: string | null;
    }) => customersService.create(values),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: Partial<CustomerFormValues> }) =>
      customersService.update(id, {
        fullName: values.fullName,
        facilityType: values.facilityType,
        phone: values.phone || null,
        lineId: values.packageLine !== undefined ? String(values.packageLine) : undefined,
        notes: values.notes || null,
      }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => customersService.remove(id),
    onSuccess: invalidate,
  });

  const deleteBulkMutation = useMutation({
    mutationFn: (ids: number[]) => customersService.removeBulk(ids),
    onSuccess: invalidate,
  });

  const deleteAllMutation = useMutation({
    mutationFn: () => customersService.removeAll(),
    onSuccess: invalidate,
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteBulkMutation,
    deleteAllMutation,
  };
}
