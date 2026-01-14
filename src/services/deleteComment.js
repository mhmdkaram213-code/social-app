import axios from "axios";
export default async function deleteMyComment(id) {
    try {
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
