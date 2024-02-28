'use client';

import { ReleaseProps } from "@/app/types/Releases";
import { useForm } from "react-hook-form";
import { Input } from "../shared/Forms/Input";
import { Button } from "../shared/Button";
import { Select } from "../shared/Forms/Select";
import { EXPENSES_CATEGORIES, REVENUES_CATEGORIES } from "@/app/constants/CATEGORIES";
import { FORM_MESSAGES } from "@/app/constants/MESSAGES";

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

  const categories = type === 'in' ? REVENUES_CATEGORIES : EXPENSES_CATEGORIES;

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <Select
        control={control}
        name="category"
        rules={{ required: FORM_MESSAGES.required }}
        label="Categoria:"
        error={errors['category']?.message}
      >
        <option value=""></option>
        {categories.map(cat =>
          <option key={cat} value={cat}>
            {cat}
          </option>
        )}
      </Select>
      <br />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          label="Título:"
          name="title"
          control={control}
          placeholder="Salário/Aluguel..."
          error={errors['title']?.message}
          rules={{ required: FORM_MESSAGES.required }}
          autoComplete="off" />

        <Input
          type="number"
          label="Valor($)"
          step={0.01}
          name="value"
          placeholder="R$ 1000,00"
          control={control}
          error={errors['value']?.message}
          autoComplete="off" />
      </div>

      <br />

      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          className={`text-white bg-${getColorByType(type)}`}>
          adicionar
        </Button>
      </div>
    </form>
  )
}