import { ReactNode } from "react";

export function Overlay({ children }: { children: ReactNode }) {
  return (
    <div className="overlay flex items-center justify-center">{children}</div>
  );
}
