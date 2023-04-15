import { SuccessHttp } from "@/backend/domain/http-response";
import { Tenant } from "@/backend/domain/tenant";
import api from "@/service/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useTenant() {
  const URL = {
    GET: '/condominium/tenants/get-tenants',
    PUT: '/condominium/tenants/update-tenant',
    POST: '/condominium/tenants/create-tenant',
    DELETE: '/condominium/tenants/delete-tenant'
  }

  const QUERY_KEY = {
    GET: 'getTenants'
  }

  const reactQueryClient = useQueryClient()

  const getMutation = async () => {
    const response = await api.get<SuccessHttp<Tenant[]>>(URL.GET);
    return response.data;
  }

  const putMutation = useMutation(
    async (tenant: Tenant) => {
      return await api.put<SuccessHttp<any>>(URL.PUT, { tenant })
    }, {
    onSuccess: () => {
      reactQueryClient.invalidateQueries(QUERY_KEY.GET)
    },
    onError: (err) => {
      console.log("ERRRRRO", err)
    },
  })

  const postMutation = useMutation(
    async (tenant: Tenant) => {
      return await api.post<SuccessHttp<any>>(URL.POST, { tenant })
    }, {
    onSuccess: () => {
      reactQueryClient.invalidateQueries(QUERY_KEY.GET)
    },
    onError: (err) => {
      console.log("ERRRRRO", err)
    },
  })

  const deleteMutation = useMutation(
    async (tenant: Tenant) => {
      return await api.delete<SuccessHttp<any>>(`${URL.DELETE}/${tenant?.id}`);
    }, {
    onSuccess: () => {
      reactQueryClient.invalidateQueries(QUERY_KEY.GET)
    },
    onError: (err) => {
      console.log("ERRRRRO", err)
    },
  })


  // Initial loading
  const { data, isError, isLoading } = useQuery(QUERY_KEY.GET, getMutation)


  // Exposable
  const registerTenant = async (tenant: Tenant) => {
    if (tenant.id) {
      return await putMutation.mutateAsync(tenant)
    }

    return await postMutation.mutateAsync(tenant)
  }

  const deleteTenant = async (tenant: Tenant | null) => {
    if (!tenant) return

    const result = await deleteMutation.mutateAsync(tenant)
    console.log("delete TENANT", result)

  }

  return {
    stateTenant: {
      data,
      isError,
      isLoading,
    },
    registerTenant,
    deleteTenant
  }

}