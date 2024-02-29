import { ReactNode } from "react";

export function Content({ children }: { children: ReactNode }) {
  return (
    <div className="p-4">
      {children}
    </div>
  )
}