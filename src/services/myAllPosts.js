import axios from "axios";

export default async function getMyPosts(userId) {
    try {
        const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
            headers: {
                token: localStorage.getItem("token"),
            },
            params: {
                limit: 10,
            },
        }
        );
        return data;
    } catch (error) {
        return error.response?.data;
    }
}
