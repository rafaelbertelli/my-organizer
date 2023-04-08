import { TenantProps } from "@/backend/domain/tenant"


type TableProps = {
  header: string[]
  body: TenantProps[] | undefined
}


export default function Table(props: TableProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {props.header.map((h, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>

      </table>
    </div >
  )
}