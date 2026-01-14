import axios from "axios";

export default async function getMyComments(userId) {
    try {
        const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/comments`, {
            headers: {
                token: localStorage.getItem("token"),
            }
        }
        );
        return data;
    } catch (error) {
        return error.response?.data;
    }
}
