import axios from "axios";
export default async function createMyComment(content , id) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/comments', {
            content:content,
            post : id
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
