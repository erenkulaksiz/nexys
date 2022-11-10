import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";

import { Container, Header, DocsNav, DocsContainer } from "@components";

import { docsFilePaths, DOCS_PATH } from "../../utils";

export default function PostPage({
  source,
  frontMatter,
  docs,
}: {
  source: any;
  frontMatter: any;
  docs: any;
}) {
  return (
    <Container>
      <Header />
      <DocsContainer>
        <DocsNav docs={docs} id={source.scope.id} />
        <div className="h-full flex flex-col p-4">
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

export const getStaticProps = async ({ params }: { params: any }) => {
  const postFilePath = path.join(DOCS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  const docs = docsFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(DOCS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      docs,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = docsFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
