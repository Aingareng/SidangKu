import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IPersonnelPayload, IQueryPersonnelParams } from "../types/personnel";
import { create, get } from "../api/personnel";

export default function usePersonnel(params?: IQueryPersonnelParams) {
  const queryClient = useQueryClient();

  const {
    data: personnels,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
  } = useQuery({
    initialData: [],
    queryKey:
      params?.search || params?.role_id ? ["personnel", params] : ["personnel"],
    queryFn: () => {
      if (params?.search || params?.role_id) {
        return get(params as IQueryPersonnelParams);
      }
      return get();
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: IPersonnelPayload) => create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personnel"] });
    },
  });

  return {
    personnels,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
    createPersonnel: createMutation.mutate,
  };
}
