import { GetTenantsHttp, Tenant } from "@/backend/domain/tenant";
import api from "@/service/api";
import { useQuery } from "react-query";


async function getTenants() {
  const response = await api.get<GetTenantsHttp>("/condominium/tenants/get-tenants");
  return response.data;
}


export default function Condominium() {
  const { data, isError, isLoading } = useQuery({ queryKey: ['tenants'], queryFn: getTenants })

  return (
    <div>
      {isError && <p>Erro!</p>}
      {isLoading && <p>carregando</p>}
      {data && data.data?.map((d: Tenant) => {
        return (
          <div key={d.id}>
            <p>{d.id}</p>
            <p>{d.tenant}</p>
            <p>{d.apartment}</p>
          </div>
        )
      })}
    </div>

  )
}
