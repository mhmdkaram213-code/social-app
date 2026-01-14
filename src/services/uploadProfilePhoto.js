import axios from "axios";
export default async function uploadProfilePhoto(formData) {
    try {
        const { data } = await axios.put('https://linked-posts.routemisr.com/users/upload-photo', formData , {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
