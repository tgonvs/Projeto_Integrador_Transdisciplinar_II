export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Cupcake Mania",
  description: "Frontend para ser utilizado no PIT",
  navItems: [
    {
      label: "Conta",
      href: "/account",
    },
    {
      label: "Carrinho",
      href: "/shopping-bag",
    },
    {
      label: "Pedidos",
      href: "/order",
    },
    {
      label: "Categorias",
      href: "/category",
    },
  ],
  links: {
    github: "https://github.com/allan-nubling/pit-II",
  },
};
