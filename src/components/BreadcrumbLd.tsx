import { site } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function BreadcrumbLd({ items }: { items: { label: string; href: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `${site.primaryDomain}${it.href}`,
    })),
  };
  return <JsonLd data={data} />;
}
