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
  return <></>
}

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/page/home",
    },
    props:{},
  };
}
