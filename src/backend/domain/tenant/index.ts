type TenantProps = {
  id?: string
  name: string
  apartment: string
}

export class Tenant {
  readonly id: string | undefined
  readonly name: string
  readonly apartment: string

  constructor(props: TenantProps) {
    this.id = props.id
    this.name = props.name
    this.apartment = props.apartment
  }
}
