import { ReactNode } from "react";

export function Subtitle({ children }: { children: ReactNode }) {
  return <h2 className="text-xl">{children}</h2>
}