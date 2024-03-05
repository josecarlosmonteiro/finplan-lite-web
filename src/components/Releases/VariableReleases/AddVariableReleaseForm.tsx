'use client';

import { VariableReleaseProps } from "@/src/types/Releases";
import { useForm } from "react-hook-form";
import { Input } from "../../shared/Forms/Input";
import { Select } from "../../shared/Forms/Select";
import { EXPENSES_CATEGORIES, REVENUES_CATEGORIES } from "@/src/constants/CATEGORIES";
import { FORM_MESSAGES } from "@/src/constants/MESSAGES";
import { Button } from "../../shared/Button";

type Props = {
  type: VariableReleaseProps['type'];
  submitFn: (data: VariableReleaseProps) => void;
}

export function AddVariableReleaseForm({ type, submitFn }: Props) {
  const { control, handleSubmit, setFocus, setValue, formState: { errors } } = useForm<VariableReleaseProps>();

  const onSubmit = (data: VariableReleaseProps) => {
    submitFn({ ...data, type });

    setFocus('title');
    setValue('title', '');
    setValue('value', 0);
  }

  const categories = type === 'in' ? REVENUES_CATEGORIES : EXPENSES_CATEGORIES;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-8">
        <Input
          type="date"
          label="Data de lançamento"
          control={control}
          name="releaseDate"
          rules={{ required: FORM_MESSAGES.required }}
          error={errors.releaseDate?.message} />

        <Select
          label="Categoria"
          control={control} name="category">
          <option value=""></option>
          {categories.map((opt) =>
            <option key={opt} value={opt}>
              {opt}
            </option>)
          }
        </Select>

        <Input
          type="text"
          label="Título"
          control={control}
          name="title"
          rules={{ required: FORM_MESSAGES.required }}
          error={errors.title?.message} />

        <Input
          type="number"
          label="Valor(R$)"
          control={control}
          name="value"
          rules={{ required: FORM_MESSAGES.required }}
          error={errors.value?.message} />
      </div>
      <br />

      <div className="flex justify-end">
        <Button className={`text-sm text-white ${type === 'in' ? 'bg-emerald-500' : 'bg-red-500'}`}>adicionar</Button>
      </div>
    </form>
  )
}