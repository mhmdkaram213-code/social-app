import axios from "axios";
export default async function getSinglePost(id) {
    try {
        const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
