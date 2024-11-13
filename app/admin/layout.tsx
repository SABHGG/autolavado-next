import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import Header from "@/components/header"

const adminLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth()

    if (!session) {
        return redirect('/login')
    }
    if (session?.user.rol !== 'admin') {
        return redirect('/dashboard')
    }

    const { nombre, email } = session.user as { nombre: string | undefined, email: string | undefined }


    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar nombre={nombre} email={email} />
            <div>
                <Header />
                {children}
            </div>
        </SidebarProvider>
    )
}

export default adminLayout