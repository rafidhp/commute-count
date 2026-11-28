import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import PageBreadcrumb from "@/components/page-breadcrumb";

import HeaderSection from "@/app/_components/overview/header-section";
import OverviewClient from "../_components/overview/overview-client";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-4">
      <PageBreadcrumb
        items={[
          {
            title: "Ringkasan & Simulator",
            href: "/",
          }
        ]}
      />
      <HeaderSection />
      {/*
        OverviewClient adalah "client boundary" — semua state management
        ada di dalam sini, page.tsx tetap bersih sebagai Server Component.
      */}
      <OverviewClient />
    </div>
  );
}