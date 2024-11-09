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
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    )
}

export default adminLayout