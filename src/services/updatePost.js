import axios from "axios";
export default async function updateMyPost(formData , id) {
    try {
        const { data } = await axios.put(`https://linked-posts.routemisr.com/posts/${id}`, formData , {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
