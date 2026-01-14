import axios from "axios";
export default async function updateMyComment(content , id) {
    try {
        const { data } = await axios.put(`https://linked-posts.routemisr.com/comments/${id}`, {
            content:content,
        } ,  {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
