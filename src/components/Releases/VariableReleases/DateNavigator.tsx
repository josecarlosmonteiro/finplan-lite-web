'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BsSearch } from 'react-icons/bs';

import { allMonthNames } from "@/src/utils/dates";
import { Select } from "../../shared/Forms/Select";
import { FORM_MESSAGES } from "@/src/constants/MESSAGES";
import { Input } from "../../shared/Forms/Input";

type DateProps = {
  month: string;
  year: number;
}

type Props = {
  initialDate?: DateProps;
}

export function DateNavigator({ initialDate }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<DateProps>({
    defaultValues: initialDate,
  });

  const router = useRouter();

  const months = allMonthNames();

  const onSubmit = (data: DateProps) => {
    const url: string = `/lancamentos/variaveis/${data.month}/${data.year}`;
    router.push(url);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-1">
          <Select control={control} name="month" rules={{ required: FORM_MESSAGES.required }} >
            <option value=""></option>
            {months.map(el => <option key={el} value={el}>{el}</option>)}
          </Select>
          <span className="text-xs text-red-500">{errors.month?.message}</span>
        </div>
        <span className="text-2xl">/</span>
        <div className="flex flex-col gap-1">
          <Input
            name="year"
            control={control}
            type="number"
            className="w-20"
            rules={{ required: 'campo obrigatório' }} />
          <span className="text-xs text-red-500">{errors.year?.message}</span>
        </div>

        <button className="p-1 px-2 flex gap-2 text-sm rounded bg-blue-400 text-white">
          <BsSearch size={18} />
          buscar
        </button>
      </div>
    </form>
  )
}