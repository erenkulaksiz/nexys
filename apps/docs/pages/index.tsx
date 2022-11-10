import fs from "fs";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

import { DocPage } from "@components";
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
  return <DocPage source={source} frontMatter={frontMatter} docs={docs} />;
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
      rehypePlugins: [rehypeHighlight],
    },
    scope: data,
  });

  return { props: { docs, source: mdxSource, frontMatter: data } };
}
