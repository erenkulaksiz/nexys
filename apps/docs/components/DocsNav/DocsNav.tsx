import Link from "next/link";

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
  const categoriedDocs = docs.reduce((acc: any, doc: any) => {
    if (!acc[doc.data.category]) {
      acc[doc.data.category] = [];
    }
    acc[doc.data.category].push(doc);
    return acc;
  }, {});

  if (mobile && mobileVisible) {
    return (
      <div className="flex flex-col gap-2 p-4 absolute top-0 bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-r-[1px] border-r-neutral-300 dark:border-r-neutral-800">
        <div className="flex flex-col gap-2">
          {Object.keys(categoriedDocs).map((category) => (
            <div className="flex flex-col gap-2" key={category}>
              <div className="text-xs font-bold uppercase text-neutral-500">
                {category}
              </div>
              {docs
                .filter((doc: any) => doc.data.category == category)
                .map((doc: any) => (
                  <>
                    <Link
                      as={`/page/${doc.filePath.replace(/\.mdx?$/, "")}`}
                      href={`/page/[slug]`}
                      key={doc.filePath + "_link"}
                      className={
                        doc.data.id == id
                          ? "pr-6 pl-6 transition-all duration-200 ease-in-out w-full dark:bg-neutral-800 bg-neutral-100 hover:bg-neutral-200 hover:dark:bg-neutral-800 rounded-md p-1 flex justify-center"
                          : "pr-6 pl-6 transition-all duration-200 ease-in-out w-full rounded-md p-1 flex justify-center hover:bg-neutral-200 hover:dark:bg-neutral-800"
                      }
                    >
                      {doc.data.title}
                    </Link>
                  </>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex flex-col gap-2 p-4 sticky top-0 border-r-[1px] border-r-neutral-300 dark:border-r-neutral-800">
      <div className="flex flex-col gap-2">
        {Object.keys(categoriedDocs).sort((a: any,b: any) => {
          return categoriedDocs[a][0].data.order - categoriedDocs[b][0].data.order
        }).map((category) => (
          <div className="flex flex-col gap-2" key={category}>
            <div className="text-xs font-bold uppercase text-neutral-500">
              {category}
            </div>
            <div className="flex flex-col">
              {docs
                .filter((doc: any) => doc.data.category == category)
                .map((doc: any) => (
                  <>
                    <Link
                      as={`/page/${doc.filePath.replace(/\.mdx?$/, "")}`}
                      href={`/page/[slug]`}
                      key={doc.filePath + "_2link"}
                      className={
                        doc.data.id == id
                        ? "pr-6 pl-6 transition-all duration-200 ease-in-out w-full dark:bg-neutral-800 bg-neutral-100 hover:bg-neutral-200 hover:dark:bg-neutral-800 rounded-md p-1 flex justify-center"
                        : "pr-6 pl-6 transition-all duration-200 ease-in-out w-full rounded-md p-1 flex justify-center hover:bg-neutral-200 hover:dark:bg-neutral-800"
                      }
                    >
                      {doc.data.title}
                    </Link>
                  </>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
