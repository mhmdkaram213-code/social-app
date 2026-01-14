import axios from "axios";
export default async function getAllPosts() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts', {
            headers: {
                token: localStorage.getItem('token')
            },
            params:{
                limit:15,
                sort:'-createdAt'
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
