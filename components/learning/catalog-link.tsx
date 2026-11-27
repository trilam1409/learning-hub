"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, type ComponentProps } from "react";
import { catalogQuery } from "@/lib/lesson-navigation";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

function FilteredLink({ href, ...props }: Props) {
  const params = useSearchParams();
  return <Link {...props} href={href + catalogQuery(params.get("q") ?? "", params.get("view") ?? "")} />;
}

export function CatalogLink(props: Props) {
  return <Suspense fallback={<Link {...props} />}><FilteredLink {...props} /></Suspense>;
}
