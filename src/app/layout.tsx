import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: "Fortune Wheel",
  description: "Generated by Technology Innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'font-Inter-Regular'}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
