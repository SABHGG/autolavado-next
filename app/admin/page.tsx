import { auth } from "@/auth"
import LogoutButton from "@/components/logout-button"
const page = async () => {
    const session = await auth()
    if (session?.user.rol !== 'admin') {
        return <div>Acceso denegado</div>
    }
    return (
        <div className="container">
            <div>Admin page</div>
            <div>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <LogoutButton />
        </div>
    )
}

export default page