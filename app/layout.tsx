import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import KanbanProvider from "@/context";
import "./globals.css";

const jarkarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jarkarta.className} bg-tetiary-white-space antialiased`}
      >
        <KanbanProvider>
          {props.children}
          {props.modal}
        </KanbanProvider>
      </body>
    </html>
  );
}
