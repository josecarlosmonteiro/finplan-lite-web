import { ReactNode } from "react";

export function Content({ children }: { children: ReactNode }) {
  return (
    <div className="px-2">
      {children}
    </div>
  )
}