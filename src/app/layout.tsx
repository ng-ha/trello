import "./globals.css";
import Modal from "@/components/Modal";

export const metadata = {
  title: "Trello",
  description: "Generated by ng-ha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
        {children}
        <Modal />
      </body>
    </html>
  );
}
