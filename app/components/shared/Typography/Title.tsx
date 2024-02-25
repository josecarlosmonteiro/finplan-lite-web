import { ReactNode } from "react";

export function Title({ children }: { children: ReactNode }) {
  return <h1 className="text-3xl">{children}</h1>
}