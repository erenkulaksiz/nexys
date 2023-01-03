import { PropsWithChildren } from "react";

export function DocsContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row h-full relative overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
}
