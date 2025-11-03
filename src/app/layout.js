import "./globals.css";

export const metadata = {
  title: "race the sun - endless runner",
  description: "assignment by MiraiGate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
