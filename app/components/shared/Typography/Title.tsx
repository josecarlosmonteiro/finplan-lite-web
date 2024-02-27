import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> { }

export function Title({ className, ...rest }: Props) {
  return <h1 className={`text-3xl ${className}`} {...rest} />
}