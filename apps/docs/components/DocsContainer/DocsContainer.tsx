import { PropsWithChildren } from "react";

export function DocsContainer({ children }: PropsWithChildren) {
  return <div className="flex flex-col sm:flex-row h-full">{children}</div>;
}
