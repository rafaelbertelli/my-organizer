import { SuccessHttp } from "@/backend/domain/http-response";
import { Tenant } from "@/backend/domain/tenant";
import api from "@/service/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useTenant() {
  const URL = {
    GET: '/condominium/tenants/get-tenants',
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

  const postMutation = useMutation(async (tenant: Tenant) => {
    const result = await api.post<SuccessHttp<any>>(URL.POST, { tenant });
    console.log('...........', result)
    return result
  }, {
    onSuccess: () => {
      reactQueryClient.invalidateQueries(QUERY_KEY.GET)
    },
    onError: (err) => {
      console.log("ERRRRRO", err)
    },
  })

  const deleteMutation = useMutation(async (tenant: Tenant) => {
    const result = await api.delete<SuccessHttp<any>>(`${URL.DELETE}/${tenant?.id}`);
    console.log(result)
    return result
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