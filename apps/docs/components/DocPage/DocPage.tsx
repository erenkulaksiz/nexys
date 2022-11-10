import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import { Container, Header, DocsNav, DocsContainer } from "@components";

export function DocPage({
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
      <Head>
        <title>{source.scope.title}</title>
      </Head>
      <Header />
      <DocsContainer>
        <DocsNav docs={docs} id={source.scope.id} />
        <div className="h-full flex flex-col p-4">
          {frontMatter.title && (
            <h1 className="text-4xl font-medium">{frontMatter.title}</h1>
          )}
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
