import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ className, ...rest }: Props) {
  return <button className={`p-2 px-4 rounded ${className} hover:opacity-85 duration-100`} {...rest} />
}