import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";

import Layout from "@/components/layout";
import Cleaning from "@/components/page/limpeza";

const Limpeza: NextPageWithLayout = () => {
  return <Cleaning />;
};

Limpeza.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Limpeza;
