import { Button } from "@heroui/react"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import uploadProfilePhoto from "../services/uploadProfilePhoto"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet"
export default function Profile() {
  // eslint-disable-next-line no-unused-vars
  const { userData, setUserData, getUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [preview, setPreview] = useState(userData?.photo)
  async function handleImg(e) {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    const formData = new FormData()
    formData.append("photo", file)
    const response = await uploadProfilePhoto(formData)
    if (response?.message === "success") {
      toast.success('Successfully Changed Profile Photo', { duration: 4000 })
      getUser()
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile Page</title>
      </Helmet>
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">

          {/* Avatar */}
          <input
            type="file"
            id="userImg"
            className="hidden"
            accept="image/*"
            onChange={handleImg}
          />
          <label htmlFor="userImg" className="cursor-pointer">
            <img
              src={preview || userData?.photo}
              alt="User Profile"
              className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 object-cover"
            />
          </label>

          {/* Name */}
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {userData?.name}
          </h2>

          {/* Email */}
          <p className="text-gray-500 text-sm">
            {userData?.email}
          </p>

          <div className="my-4 h-px bg-gray-200"></div>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {userData?.dateOfBirth &&
                new Date(userData.dateOfBirth).toLocaleDateString("en-GB")}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {userData?.gender}
            </p>
          </div>

          <div className="flex gap-3">
            <Button onPress={() => navigate("/myPosts")} color="primary" className="mt-6 w-full" >
              My Posts
            </Button>
            <Button onPress={() => navigate("/myComments")} color="primary" className="mt-6 w-full" >
              My Comments
            </Button>
          </div>

          <span
            onClick={() => navigate("/changePassword")}
            className="block mt-4 text-blue-500 hover:underline cursor-pointer"
          >
            Change Password
          </span>
        </div>
      </div>
    </>
  )
}
