import Link from "next/link";
import { useMemo } from "react";

export function DocsNav({
  docs,
  id,
  mobile,
  setMobileVisible,
  mobileVisible,
}: {
  docs: any;
  id: string;
  mobile?: boolean;
  mobileVisible?: boolean;
  setMobileVisible?: (visible: boolean) => void;
}) {
  const categoriedDocs = useMemo(() => docs.reduce((acc: any, doc: any) => {
    if (!acc[doc.data.category]) {
      acc[doc.data.category] = [];
    }
    acc[doc.data.category].push(doc);
    acc[doc.data.category].sort((a: any, b: any) => a.data.order - b.data.order);
    return acc;
  }, {}), [docs]);

  return (
    <div className="hidden sm:flex flex-col gap-2 w-[160px] p-2 sticky top-0 border-r-[1px] border-r-neutral-300 dark:border-r-neutral-800">
      <div className="flex flex-col gap-2">
        {Object.keys(categoriedDocs).map((category) => (
          <div key={category} className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
              {category}
            </div>
            <div className="flex flex-col gap-2">
              {categoriedDocs[category].map((doc: any) => (
                <Link key={doc.data.title} href={`/page/${doc.data.id}`} className={`text-sm font-medium rounded-lg p-2 ${
                  doc.data.id == id ? "text-neutral-900 dark:text-neutral-100 dark:bg-neutral-800 bg-neutral-200/70" : "text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900/50 bg-neutral-100/50"
                }`}>
                    {doc.data.title}
                </Link>
              ))}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
