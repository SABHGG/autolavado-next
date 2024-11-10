import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
const adminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarTrigger className="p-2"/>
            {children}
        </SidebarProvider>
    )
}

export default adminLayout