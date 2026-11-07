import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biraz da Seni Tanıyalım, Prenses ✨ | Cennet",
  description:
    "Cennet'i daha yakından tanımak için özel olarak tasarlanmış interaktif, zarif mini web deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, background: "#FAF5F0" }}>
        {children}
      </body>
    </html>
  );
}

