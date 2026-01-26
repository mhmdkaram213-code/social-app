import { useParams } from "react-router-dom"
import getSinglePost from "../services/singlePostApi.js"
import { useEffect, useState } from "react"
import PostCard from '../card/PostCard.jsx'
import LoadingPage from "../component/LoadingPage/LoadingPage.jsx";
export default function SinglePost() {
    const [postDetails, setPostDetails] = useState(null)
    const { id } = useParams()
    async function getPostDetails() {
        const response = await getSinglePost(id)
        console.log("Single Post Response:", response)

        if (response?.message === 'success') {
            setPostDetails(response.post)
        }
    }
    useEffect(() => {
        getPostDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {postDetails ? <PostCard callback={getPostDetails} allComment={true} post={postDetails} /> : <LoadingPage />}
        </>
    )
}
