import { Tenant } from '@/backend/domain/tenant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { schemaForm } from './schema';
import { FormProps, RegisterFormProps } from './types';

export function useRegisterform(props: RegisterFormProps) {

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<FormProps>({
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
        id: props.payload?.id,
        name: props.payload?.name,
        apartment: props.payload?.apartment,
      }
    })
  }, [props.payload, reset])

  const cleanData = () => reset()

  const onSubmit = (data: FormProps) => {
    const tenant = new Tenant({ id: data.tenant.id, name: data.tenant.name, apartment: data.tenant.apartment })
    props.register(tenant, cleanData)
  }

  return {
    register, handleSubmit, watch, setValue, errors, onSubmit
  }
}