import Head from "next/head";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function Seo({
  title,
  description,
  keywords = "",
  image = "",
  url = "",
}: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
