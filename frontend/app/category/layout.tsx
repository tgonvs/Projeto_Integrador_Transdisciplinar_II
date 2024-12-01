export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grow flex flex-col justify-center items-center space-y-4">
      {children}
    </section>
  );
}
