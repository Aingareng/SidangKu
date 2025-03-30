import { useQuery } from "@tanstack/react-query";
import { IQuerySchedulesParams } from "../types/schedules";
import { get } from "../api/schedules";

export default function useSchedules(params?: IQuerySchedulesParams) {
  const {
    data: schedules,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["schedules", params],
    queryFn: () => get(params as IQuerySchedulesParams),
  });

  return {
    schedules,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
  };
}
