import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "../api/auth";
import { IAuthPayload } from "../types/auth";

export default function useAuth() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (payload: IAuthPayload) => auth(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });

  return {
    login: loginMutation.mutateAsync,
  };
}
