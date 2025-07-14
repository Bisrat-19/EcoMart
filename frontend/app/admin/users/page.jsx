import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <UserManagement />
    </div>
  )
}
