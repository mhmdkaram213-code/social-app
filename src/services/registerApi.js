import axios from "axios";
export default async function SignUp(userData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', userData)
        return data
    } catch (error) {
        return error.response?.data
    }
}
