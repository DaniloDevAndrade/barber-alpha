import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppSidebar } from "../../components/app-slidebar";
import CardTable from "./components/Card";
import { BusinessSession } from "../../clientes/todos/page";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth() as BusinessSession;
        if (!session) {
            redirect('/login');
        }
        const nameBusiness = session.user.name as string
        const emailBusiness = session.user.email as string
  return (
    <SidebarProvider>
      <AppSidebar emailBusiness={emailBusiness} nameBusiness={nameBusiness} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Fila
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Gereciamento</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="m-1">
          <Suspense fallback={<div>Loading...</div>}>
            <CardTable emailBusiness={emailBusiness}></CardTable>
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

