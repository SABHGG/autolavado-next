import {columns} from "@/app/admin/user/columns"
import {DataTable} from "@/components/data-table"
import { getUser } from "@/actions/User"
const userPage = async () => {
  const users = await getUser()
  return (
    <div>
        <h1>Usuarios</h1>
        <DataTable columns={columns} data={users} />
    </div>
  )
}

export default userPage