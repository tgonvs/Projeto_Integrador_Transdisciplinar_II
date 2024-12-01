import { title } from "@/components/primitives";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>Pedidos</h1>
      {children}
    </section>
  );
}
