
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'

import Layout from '@/components/layout'
// import NestedLayout from '@/components/nested-layout'

const Condominio: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Condominio.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {/* <NestedLayout>{page}</NestedLayout> */}
      {page}
    </Layout>
  )
}

export default Condominio