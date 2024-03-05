import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> { }

export function Subtitle({ className, ...rest }: Props) {
  return <h2 className={`text-xl ${className}`} {...rest} />
}