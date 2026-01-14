import axios from "axios";
export default async function createMyPost(formData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData , {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error.response?.data
    }
}
