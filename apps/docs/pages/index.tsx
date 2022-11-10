import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

import { Container, Header, DocsNav, DocsContainer } from "@components";
import { docsFilePaths, DOCS_PATH } from "../utils";

export default function App({
  docs,
  source,
  frontMatter,
}: {
  docs: any;
  source: any;
  frontMatter: any;
}) {
  return (
    <Container>
      <Header />
      <DocsContainer>
        <DocsNav docs={docs} id={source.scope.id} />
        <div className="h-full flex flex-col p-4 w-full">
          <h1 className="text-4xl">{frontMatter.title}</h1>
          {frontMatter.description && (
            <p className="dark:text-neutral-400 text-neutral-900">
              {frontMatter.description}
            </p>
          )}
          <div className="pt-2 overflow-y-auto h-full">
            <MDXRemote {...source} components={{}} />
          </div>
        </div>
      </DocsContainer>
    </Container>
  );
}

export async function getStaticProps() {
  const docs = docsFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(DOCS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  const LANDING_PATH = path.join(process.cwd(), "components/landing.mdx");
  const source = fs.readFileSync(LANDING_PATH);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return { props: { docs, source: mdxSource, frontMatter: data } };
}
