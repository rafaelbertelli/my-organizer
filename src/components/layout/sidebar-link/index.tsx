import { RouteProps } from "@/routes";
import Link from "next/link";

export default function SidebarLink(props: RouteProps) {
  return (
    <Link
      href={props.path}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {props.icon}
      <span className="ml-3">{props.name}</span>
    </Link>
  );
}
