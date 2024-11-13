import { SidebarTrigger } from "@/components/ui/sidebar"


const header = () => {
    return (
        <header className="flex p-2 items-center justify-between">
            <SidebarTrigger />
            <h1>Auto lavado</h1>
        </header>
    )
}
export default header

