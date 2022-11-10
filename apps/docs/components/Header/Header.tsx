import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { DarkIcon, LightIcon } from "@icons";

export function Header() {
  const [loaded, setLoaded] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="w-full pl-4 pr-4 min-h-[4rem] flex justify-between items-center">
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
