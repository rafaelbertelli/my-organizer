import { GetTenantsHttp } from "@/backend/domain/tenant";
import api from "@/service/api";
import { useEffect } from "react";
import { useQuery } from "react-query";


async function getTenants() {
  const response = await api.get<GetTenantsHttp>("/condominium/tenants/get-tenants");
  return response.data;
}


export default function Condominium() {
  const { data, isError, isLoading } = useQuery({ queryKey: ['tenants'], queryFn: getTenants })
  const dataLength = data?.result?.length || 0

  useEffect(() => {
    console.log(data?.result)
  }, [data])

  return (
    <div>
      {isError && <p>Erro!</p>}
      {isLoading && <p>carregando</p>}
      {data && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Condômino
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Apartamento
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.result?.map((t, index) => {
                const lastItem = (index + 1) === dataLength
                const useClass = lastItem ? 'bg-white dark:bg-gray-800' : 'bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                return (
                  <tr key={t.id} className={`${useClass}`}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {t.tenant}
                    </th>
                    <td className="px-6 py-4 text-center">
                      {t.apartment}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                      {" | "}
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Excluir</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
