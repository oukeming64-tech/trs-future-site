import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./mini-3d.css";

const title = "拓尔思 TRS｜让数据成为可行动的智能";
const description =
  "拓尔思概念官网焕新：以数据、知识、模型与行业智能体，连接大数据、人工智能、数据安全和云服务的全栈能力。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title,
    description,
    keywords: [
      "拓尔思",
      "TRS",
      "拓天大模型",
      "大数据",
      "人工智能",
      "数据安全",
      "行业智能",
    ],
    icons: {
      icon: "https://www.trs.com.cn/images/TRS_logo.png",
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "拓尔思 TRS",
      title,
      description: "从 5,000 亿+高质量数据资产，到拓天大模型与行业智能体。",
      url: metadataBase,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "拓尔思 TRS｜让数据成为可行动的智能",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "从 5,000 亿+高质量数据资产，到拓天大模型与行业智能体。",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#04070c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
