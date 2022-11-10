import Link from "next/link";

export function DocsNav({ docs, id }: { docs: any; id: string }) {
  return (
    <div className="flex flex-col gap-2 w-40">
      {docs.map((doc: any) => (
        <div
          key={doc.filePath}
          className={doc.data.id == id ? "bg-red-200 pl-4" : "pl-4"}
        >
          <Link
            as={`/docs/${doc.filePath.replace(/\.mdx?$/, "")}`}
            href={`/docs/[slug]`}
          >
            {doc.data.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
