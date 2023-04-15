import { RouteProps } from "@/routes"
import { useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

interface Props extends RouteProps {
  children: any
}

export default function CollapsibleLink(props: Props) {
  const [ddlVisibility, setDdlVisibility] = useState<boolean>(false)

  const handleDropdown = () => setDdlVisibility(!ddlVisibility)

  return (
    <>
      <button
        type="button"
        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls={`dropdown-${props.id}`}
        data-collapse-toggle={`dropdown-${props.id}`}
        onClick={handleDropdown}
      >
        {props.icon}

        <span className="flex-1 ml-3 text-left whitespace-nowrap" >
          {props.name}
        </span>

        {ddlVisibility ? <FaAngleUp /> : <FaAngleDown />}
      </button >
      <ul
        id={`dropdown-${props.id}`}
        className={`py-2 space-y-2 ${ddlVisibility ? "" : "hidden"}`}
      >
        {props.children}
      </ul>
    </>
  )
}