import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IQuerySchedulesParams, ISchedulePayload } from "../types/schedules";
import { create, destroy, get } from "../api/schedules";

export default function useSchedules(params?: IQuerySchedulesParams) {
  const queryClient = useQueryClient();

  const {
    data: schedules,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
  } = useQuery({
    initialData: [],
    queryKey: ["schedules", params],
    queryFn: () => get(params as IQuerySchedulesParams),
  });

  const createMutation = useMutation({
    mutationFn: (payload: ISchedulePayload) => create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => destroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  return {
    schedules,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
    createSchedule: createMutation.mutate,
    deleteSchedule: deleteMutation.mutate,
  };
}
