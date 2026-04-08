import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { authApi, createCrudApi, setAuthToken, uploadApi } from "@/services/api";

// ── Auth hooks ──

export function useSpringLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.invalidateQueries({ queryKey: ["spring-user"] });
    },
  });
}

export function useSpringRegister() {
  return useMutation({
    mutationFn: ({ email, password, username }: { email: string; password: string; username: string }) =>
      authApi.register(email, password, username),
    onSuccess: (data) => {
      setAuthToken(data.token);
    },
  });
}

export function useSpringUser(options?: Partial<UseQueryOptions<any>>) {
  return useQuery({
    queryKey: ["spring-user"],
    queryFn: () => authApi.me(),
    retry: false,
    ...options,
  });
}

export function useSpringLogout() {
  const queryClient = useQueryClient();
  return () => {
    setAuthToken(null);
    queryClient.removeQueries({ queryKey: ["spring-user"] });
  };
}

// ── Generic CRUD hooks ──

export function useSpringList<T>(resource: string, params?: Record<string, string>, options?: Partial<UseQueryOptions<T[]>>) {
  const api = createCrudApi<T>(resource);
  return useQuery({
    queryKey: [resource, "list", params],
    queryFn: () => api.getAll(params),
    ...options,
  });
}

export function useSpringDetail<T>(resource: string, id: string | number | null, options?: Partial<UseQueryOptions<T>>) {
  const api = createCrudApi<T>(resource);
  return useQuery({
    queryKey: [resource, "detail", id],
    queryFn: () => api.getById(id!),
    enabled: id != null,
    ...options,
  });
}

export function useSpringCreate<T>(resource: string) {
  const queryClient = useQueryClient();
  const api = createCrudApi<T>(resource);
  return useMutation({
    mutationFn: (data: Partial<T>) => api.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource, "list"] });
    },
  });
}

export function useSpringUpdate<T>(resource: string) {
  const queryClient = useQueryClient();
  const api = createCrudApi<T>(resource);
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<T> }) =>
      api.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [resource, "list"] });
      queryClient.invalidateQueries({ queryKey: [resource, "detail", variables.id] });
    },
  });
}

export function useSpringDelete<T>(resource: string) {
  const queryClient = useQueryClient();
  const api = createCrudApi<T>(resource);
  return useMutation({
    mutationFn: (id: string | number) => api.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource, "list"] });
    },
  });
}

// ── File upload hook ──

export function useSpringUpload(endpoint?: string) {
  return useMutation({
    mutationFn: (file: File) => uploadApi.upload(file, endpoint),
  });
}
