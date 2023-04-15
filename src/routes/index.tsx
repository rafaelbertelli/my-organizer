import { FaAccusoft, FaBroom, FaBuilding, FaHome, FaPeopleArrows, FaPeopleCarry } from "react-icons/fa";

export type RouteProps = {
  id: string;
  name: string;
  visible: boolean;
  path: string;
  icon: React.ReactNode;
  children?: RouteProps[];
};

export const ROUTES_PRIVATE: RouteProps[] = [
  {
    id: "home",
    name: "Home",
    visible: true,
    path: "/",
    icon: <FaHome />,
  },
  {
    id: "condominium",
    name: "Condomínio",
    visible: true,
    path: "/condominio",
    icon: <FaBuilding />,

  },
  {
    id: "condominium-cleaning",
    name: "Limpeza",
    visible: true,
    path: "/condominio/limpeza",
    icon: <FaBroom />,
  },

  {
    id: "ex1",
    name: "Ex1",
    visible: true,
    path: "",
    icon: <FaBuilding />,
    children: [
      {
        id: "residents1",
        name: "Moradores 1",
        visible: true,
        path: "/condominio",
        icon: <FaPeopleCarry />,
      },
      {
        id: "residents2",
        name: "Moradores 2",
        visible: true,
        path: "/condominio",
        icon: <FaPeopleArrows />,
      },
    ],
  }, {
    id: "ex11",
    name: "Ex2",
    visible: true,
    path: "",
    icon: <FaAccusoft />,
    children: [
      {
        id: "residents11",
        name: "Moradores 11",
        visible: true,
        path: "/condominio",
        icon: <FaPeopleCarry />,
      },
      {
        id: "residents22",
        name: "Moradores 22",
        visible: true,
        path: "/condominio",
        icon: <FaPeopleArrows />,
      },
    ],
  },
];
