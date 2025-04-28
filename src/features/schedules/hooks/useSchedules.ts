import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IQuerySchedulesParams, ISchedulePayload } from "../types/schedules";
import { create, destroy, get, update, updateClerk } from "../api/schedules";

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

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ISchedulePayload }) =>
      update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  const updateClerkMutation = useMutation({
    mutationFn: ({
      schedule_id,
      user_id,
    }: {
      schedule_id: number;
      user_id: number;
    }) => updateClerk(schedule_id, user_id),
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
    createSchedule: createMutation.mutateAsync,
    deleteSchedule: deleteMutation.mutateAsync,
    updateSchedule: updateMutation.mutateAsync,
    updateClerck: updateClerkMutation.mutateAsync,
  };
}
