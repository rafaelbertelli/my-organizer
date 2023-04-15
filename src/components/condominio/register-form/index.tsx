import { Tenant } from '@/backend/domain/tenant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaForm = z.object({
  tenant: z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Complete o nome do condômino").max(30, "Limite do campo atingido"),
    apartment: z.string().regex(new RegExp("^[1-4]$"), "São permitidos os apartamentos do 1 ao 4")
  })
})

type FormProps = z.infer<typeof schemaForm>

type Props = {
  register: (data: Tenant, callback: () => void) => void
  payload: Tenant | null
}

export default function RegisterForm(props: Props) {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      tenant: {
        id: '',
        name: '',
        apartment: ''
      }
    }
  });

  useEffect(() => {
    reset({
      tenant: {
        id: props.payload?.id ?? '',
        name: props.payload?.name ?? '',
        apartment: props.payload?.apartment ?? '',
      }
    })
  }, [props.payload, reset])

  const cleanData = () => reset()

  const onSubmit = (data: FormProps) => {
    const tenant = new Tenant({ id: data.tenant.id, name: data.tenant.name, apartment: data.tenant.apartment })
    props.register(tenant, cleanData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Novo condômino
          </h5>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome" />
          </div>
          <TextInput id="name" {...register("tenant.name")} />
          {errors.tenant?.name && <p className="text-red-500 text-sm">{errors.tenant.name.message}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="apartment" value="Apartamento" />
          </div>
          <TextInput id="apartment" {...register("tenant.apartment")} />
          {errors.tenant?.apartment && <p className="text-red-500 text-sm">{errors.tenant.apartment.message}</p>}
        </div>
        <Button type="submit">
          {props.payload?.id ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  )
}
