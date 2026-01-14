import { useState } from "react"
import { changePassword } from "../services/changePassword"
export default function ChangePassword() {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await changePassword(password, newPassword)
            alert("Password changed successfully ✅")
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || "Error")
        } finally {
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-200 min-h-screen flex flex-col justify-center">
            <div className="w-1/2 m-auto flex flex-col gap-4 justify-center items-center bg-white py-16 px-10 rounded-lg shadow-lg">
                <input type="password" placeholder="Current password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full border border-gray-600 p-2 rounded" />

                <input type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    className="w-full border border-gray-600 p-2 rounded" />
                    
                <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </div>
        </form>
    )
}
