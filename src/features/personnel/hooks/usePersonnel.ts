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
    queryKey: ["personnel", params],
    queryFn: () => get(params as IQueryPersonnelParams),
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
