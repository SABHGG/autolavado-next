import { columns } from "@/app/admin/user/columns"
import { DataTable } from "@/components/data-table"
import { getUser } from "@/actions/User"
import { auth } from "@/auth"
const userPage = async () => {
  const users = await getUser()
  const session = await auth()
  const userFilter = users.filter((user) => user.email !== session?.user.email as string)
  console.log(userFilter)
  return (
    <div className="">
      <h1 className="px-2">Usuarios</h1>
      <DataTable columns={columns} data={userFilter} />
    </div>
  )
}

export default userPage