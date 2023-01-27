import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
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
  const [mobileMenu, setMobileMenuVisible] = useState(false);

  return (
    <Container>
      <Head>
        <title>{source.scope.title}</title>
      </Head>
      <Header
        mobileMenu={mobileMenu}
        setMobileMenuVisible={setMobileMenuVisible}
        docs={docs}
        id={source.scope.id}
      />
      <DocsContainer>
        <DocsNav
          setMobileVisible={(visible) => setMobileMenuVisible(visible)}
          mobileVisible={mobileMenu}
          mobile
          docs={docs}
          id={source.scope.id}
        />
        {!mobileMenu && (
          <div className="flex flex-col w-full relative">
            <div className="p-4 sticky top-0 bg-white/50 dark:bg-black/20 backdrop-blur-md">
              {frontMatter.title && (
                <h1 className="text-4xl font-medium">{frontMatter.title}</h1>
              )}
              {frontMatter.description && (
                <p className="dark:text-neutral-400 text-neutral-900">
                  {frontMatter.description}
                </p>
              )}
            </div>
            <div className="p-4 pt-0 flex flex-col gap-4">
              <MDXRemote {...source} components={{}} />
            </div>
            <Link className="px-4 py-2 text-sm dark:text-neutral-400 text-neutral-400" target="_blank" href={`https://github.com/erenkulaksiz/nexys/blob/master/apps/docs/docs/${frontMatter.id}.mdx`}>edit this page </Link>
          </div>
        )}
      </DocsContainer>
    </Container>
  );
}
