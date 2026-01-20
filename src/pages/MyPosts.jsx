import { useContext, useEffect, useState } from 'react';
import PostCard from '../card/PostCard';
import { AuthContext } from '../context/AuthContext';
import getMyPosts from '../services/myAllPosts';
import { Spinner } from '@heroui/react';
import { Helmet } from 'react-helmet';
export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userData } = useContext(AuthContext);
    async function myPosts() {
        setLoading(true);
        const response = await getMyPosts(userData._id);
        if (response.message == 'success') {
            setPosts(response.posts);
        }
        setLoading(false);
    }
    useEffect(() => {
        myPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-300 flex items-center justify-center">
                <Spinner size="lg" className="text-gray-600" />
            </div>
        )
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Posts Page</title>
            </Helmet>
            <div className='text-center min-h-screen bg-gray-300'>
                <h1 className='text-2xl font-bold pt-6 pb-2'>My Posts Page</h1>
                <p className='text-gray-800'>This is the My Posts page.</p>
                {posts.length === 0 ? (
                    <div className="text-center mt-10 text-gray-600">
                        <Spinner />
                    </div>
                ) : (
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {posts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
