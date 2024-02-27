import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  error?: string;
  label?: string;
}

export function Input<T extends FieldValues>({ className, label, name, control, error, required, ...rest }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <label>{label} {required && '*'}</label>
          <input
            {...field}
            {...rest}
            className={`${className} h-8 p-1 border-b-2 border-gray-300 focus:border-blue-400 duration-100`}
            required={required}
          />
          <span className="text-red-500 italic">{error}</span>
        </div>
      )}
    />
  )
}