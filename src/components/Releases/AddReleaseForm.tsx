'use client';

import { useForm } from "react-hook-form";

import { Input } from "../shared/Forms/Input";
import { Button } from "../shared/Button";
import { Select } from "../shared/Forms/Select";
import { ReleaseProps } from "@/src/types/Releases";
import { EXPENSES_CATEGORIES, REVENUES_CATEGORIES } from "@/src/constants/CATEGORIES";
import { FORM_MESSAGES } from "@/src/constants/MESSAGES";

type Props = {
  type: 'in' | 'out';
  submitFn: (data: Omit<ReleaseProps, 'id'>) => void;
}

export function AddReleaseForm({ type, submitFn }: Props) {
  const { control, handleSubmit, formState: { errors }, setValue, setFocus } = useForm<Omit<ReleaseProps, 'id'>>();

  const getColorByType = (type: "in" | "out") => {
    if (type === 'in') return "emerald-500";
    if (type === 'out') return "red-500";

    return "gray-400";
  }

  const categories = type === 'in' ? REVENUES_CATEGORIES : EXPENSES_CATEGORIES;

  const validateSubmit = (data: Omit<ReleaseProps, 'id'>) => {
    const payload = {
      ...data,
      value: Number(data.value),
      type,
    }

    submitFn(payload);

    setValue('value', 0);
    setValue('title', '');
    setFocus('title');
    
  }

  return (
    <form onSubmit={handleSubmit(validateSubmit)}>
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