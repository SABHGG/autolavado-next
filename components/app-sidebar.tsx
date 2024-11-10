"use client"
import { Calendar, User, ChartColumnIncreasing, LogOut, User2, ChevronUp } from "lucide-react"
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
    SidebarFooter,
    useSidebar
} from "@/components/ui/sidebar"
import LogoutButton from "@/components/logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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


export function AppSidebar({ nombre, email }: { nombre: string | undefined, email: string | undefined }) {
    const { isMobile, setOpenMobile } = useSidebar()

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row justify-between items-center">
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
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="h-auto">
                                <SidebarMenuButton>
                                    <Avatar>
                                        <AvatarImage>
                                        <User2 />
                                        </AvatarImage>
                                        <AvatarFallback>
                                            <User2 />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span>{nombre}</span>
                                        <span className="text-xs text-gray-400">{email}</span>
                                    </div>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-5 w-5" />
                                    <LogoutButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
