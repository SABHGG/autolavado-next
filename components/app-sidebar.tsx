"use client"
import { Calendar, User, ChartColumnIncreasing, LogOut } from "lucide-react"
import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import LogoutButton from "@/components/logout-button"

// Menu items.
const items = [
    {
        title: "Citas",
        url: "/admin/cita",
        icon: Calendar,
    },
    {
        title: "Usuarios",
        url: "/admin/user",
        icon: User,
    },
    {
        title: "Reportes",
        url: "/admin/report",
        icon: ChartColumnIncreasing,
    }
]


export function AppSidebar() {
    const { isMobile, setOpenMobile } = useSidebar()

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row justify-between">
                <h2>Admin Panel</h2>
                {isMobile && (
                    <SidebarTrigger />
                )}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton>
                                        <Link href={item.url} className="flex items-center gap-3" onClick={handleClick}>
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <LogOut className="mr-2 h-5 w-5" />
                                    <LogoutButton />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
