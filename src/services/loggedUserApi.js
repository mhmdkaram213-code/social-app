import axios from "axios";
export default async function getLoggedUser() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        console.log(error.response?.data);
        return error.response?.data
    }
}
