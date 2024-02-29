import { SelectHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface Props<T extends FieldValues> extends SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  control: Control<T>;
  error?: string;
  label?: string;
  rules?: Omit<RegisterOptions<T, Path<T>>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">;
}

export function Select<T extends FieldValues>({ className, label, name, control, error, required, rules, ...rest }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-500 text-sm">{label} {required && '*'}</label>
          <select
            {...field}
            {...rest}
            className={`${className} h-8 p-1 border-b-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:border-blue-400 duration-100`}
            required={required}
          />
          <span className="text-red-500 italic">{error}</span>
        </div>
      )}
    />
  )
}