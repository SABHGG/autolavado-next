import { redirect } from 'next/navigation'
import { auth } from "@/auth"
import LogoutButton from "@/components/logout-button"

const page = async () => {
    const session = await auth()

    if (!session) {
        return redirect('/login')
    }
    if (session?.user.rol !== 'admin') {
        return redirect('/dashboard')
    }
    return (
        <div className="container">
            <div>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </div>
    )
}

export default page