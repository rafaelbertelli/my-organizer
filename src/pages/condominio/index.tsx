
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'

import Layout from '@/components/layout'
import Condominium from '@/components/toPage/condominio'

const Condominio: NextPageWithLayout = () => {
  return <Condominium />
}

Condominio.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Condominio
