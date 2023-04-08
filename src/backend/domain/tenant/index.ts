export type TenantProps = {
  id?: string
  tenant: string
  apartment: string
}

export type GetTenantsHttp = {
  success: boolean
  data?: Tenant[]
  error?: any
}

export class Tenant {
  readonly id: string | undefined
  readonly tenant: string
  readonly apartment: string

  constructor(props: TenantProps) {
    this.id = props.id
    this.tenant = props.tenant
    this.apartment = props.apartment
  }
}
