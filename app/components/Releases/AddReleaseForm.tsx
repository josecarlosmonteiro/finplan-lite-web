'use client';

import { ReleaseProps } from "@/app/types/Releases";
import { useForm } from "react-hook-form";
import { Input } from "../shared/Forms/Input";
import { Button } from "../shared/Button";

type Props = {
  type: 'in' | 'out';
}

export function AddReleaseForm({ type }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<Omit<ReleaseProps, 'id'>>();

  const getColorByType = (type: "in" | "out") => {
    if (type === 'in') return "emerald-500";
    if (type === 'out') return "red-500";

    return "gray-400";
  }

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <div className="grid grid-cols-2 gap-4 items-end">
        <Input
          type="text"
          label="Título:"
          name="title"
          control={control}
          placeholder="Salário/Aluguel..."
          error={errors['title']?.message}
          rules={{ required: 'campo obrigatório' }}
          autoComplete="off" />

        <Input
          type="number"
          label="Valor($)"
          step={0.01}
          name="value"
          placeholder="R$ 1000,00"
          control={control}
          error={errors['value']?.message} />
      </div>
      <br />
      <div className="flex justify-end gap-4">
        <Button type="reset" className="text-white bg-gray-400">limpar</Button>
        <Button type="submit" className={`text-white bg-${getColorByType(type)}`}>adicionar</Button>
      </div>
    </form>
  )
}