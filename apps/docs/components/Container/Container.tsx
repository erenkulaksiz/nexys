import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <main className="w-full h-full flex flex-col">{children}</main>;
}
