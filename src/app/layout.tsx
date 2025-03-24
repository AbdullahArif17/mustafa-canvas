// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Mustafa Canvas',
  description: 'Custom Canvas Art by Mustafa Canvas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
