// src/services/authApi.js
import axios from "axios"

export function changePassword(password, newPassword) {
  return axios.patch(
    "https://linked-posts.routemisr.com/users/change-password",
    {
      password,
      newPassword
    },
    {
      headers: {
        token: localStorage.getItem("token")
      }
    }
  )
}
