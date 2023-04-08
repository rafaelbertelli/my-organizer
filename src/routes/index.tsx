export interface IRoute {
  id: string;
  name: string;
  visible: boolean;
  path: string;
  icon: React.ReactNode;
}

export const ROUTES_PRIVATE: IRoute[] = [
  {
    id: "home",
    name: "Home",
    visible: true,
    path: "/",
    icon: "",
  },
  {
    id: "condominium",
    name: "Condomínio",
    visible: true,
    path: "/condominio",
    icon: "",
  },
  {
    id: "condominium-cleaning",
    name: "Limpeza",
    visible: true,
    path: "/condominio/limpeza",
    icon: "",
  },
];
