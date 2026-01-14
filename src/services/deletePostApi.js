import axios from "axios";
export default async function deleteMyPost(id) {
    try {
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
