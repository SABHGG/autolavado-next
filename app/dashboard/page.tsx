import { auth } from "@/auth"
import LogoutButton from "@/components/logout-button"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/login')
    }

    if(session.user.rol === 'empleado') {
        return redirect('/empleado')
    }

    if(session.user.rol === 'admin') {
        return redirect('/admin')
    }

    return (
        <div className="container">
            <div>DashboardPage</div>
            <div>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <LogoutButton />
        </div>

    )
}

export default DashboardPage