import Link from "next/link";

export function DocsNav({ docs, id }: { docs: any; id: string }) {
  const categoriedDocs = docs.reduce((acc: any, doc: any) => {
    if (!acc[doc.data.category]) {
      acc[doc.data.category] = [];
    }
    acc[doc.data.category].push(doc);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-2 sm:w-40 w-full p-4">
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
                  key={doc.filePath}
                  className={
                    doc.data.id == id
                      ? "w-full sm:w-32 dark:bg-neutral-800 bg-neutral-300 hover:bg-neutral-300 hover:dark:bg-neutral-800 rounded-md p-1 flex justify-center"
                      : "w-full sm:w-32 rounded-md p-1 flex justify-center hover:bg-neutral-300 hover:dark:bg-neutral-800"
                  }
                >
                  {doc.data.title}
                </Link>
              </>
            ))}
        </div>
      ))}
    </div>
  );
}
