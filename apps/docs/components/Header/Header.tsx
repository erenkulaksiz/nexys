import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTheme } from "next-themes";

import { DarkIcon, LightIcon, MenuIcon } from "@icons";
import { DocsNav } from "components/DocsNav";

export function Header({
  docs,
  id,
  mobileMenu,
  setMobileMenuVisible,
}: {
  docs: any;
  id: string;
  mobileMenu?: boolean;
  setMobileMenuVisible?: (visible: boolean) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-md w-full pl-4 pr-4 min-h-[4rem] flex justify-between items-center border-b-[1px] border-b-neutral-300 dark:border-b-neutral-800">
      {mobileMenu &&
        createPortal(<DocsNav docs={docs} id={id} mobile />, document.body)}
      <div className="sm:hidden flex">
        <button
          onClick={() =>
            typeof setMobileMenuVisible == "function" &&
            setMobileMenuVisible(!mobileMenu)
          }
        >
          <MenuIcon size={24} fill="currentColor" />
        </button>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link href="https://docs.nexys.app">
          <img
            src="/nexsy_transparent.png"
            className="object-contain h-10"
            alt="nexsy logo"
          />
        </Link>
        <span className="text-neutral-500">Docs</span>
      </div>
      {loaded && (
        <button
          className="w-10 h-10 flex items-center justify-center"
          onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}
        >
          {resolvedTheme != null && resolvedTheme == "dark" ? (
            <LightIcon width={16} height={16} className="text-neutral-300" />
          ) : (
            <DarkIcon width={16} height={16} className="text-neutral-700" />
          )}
        </button>
      )}
    </nav>
  );
}
