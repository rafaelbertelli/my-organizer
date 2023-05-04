import { Button, Label, TextInput } from "flowbite-react";
import { RegisterFormProps } from './types';
import { useRegisterform } from './useRegisterForm';

export default function RegisterForm(props: RegisterFormProps) {
  const { register, handleSubmit, watch, setValue, errors, onSubmit } = useRegisterform(props)

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
