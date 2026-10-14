import type { Metadata } from 'next';

// Studio gets its own root layout so the public site's header, footer and
// providers don't render around it.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false }
};

const AdminLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default AdminLayout;
