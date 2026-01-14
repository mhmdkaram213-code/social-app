import { Spinner } from '@heroui/react';
import { useContext, useEffect, useState } from 'react';
import PostCard from '../card/PostCard';
import { AuthContext } from '../context/AuthContext';
import getMyComments from '../services/myAllCommentsApi';
export default function MyComments() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userData } = useContext(AuthContext);
    async function myComments() {
        setLoading(true);
        const response = await getMyComments(userData._id);
        console.log(response);
        
        if (response.message == 'success') {
            setPosts(response.posts);
        }
        setLoading(false);
    }
    useEffect(() => {
        if (userData?._id) { 
            myComments()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-300 flex items-center justify-center">
                <Spinner size="lg" className="text-gray-600" />
            </div>
        )
    }
    return (
        <div className='text-center min-h-screen bg-gray-300'>
            <h1 className='text-2xl font-bold pt-6 pb-2'>My Comments Page</h1>
            <p className='text-gray-800'>This is the My Comments page.</p>
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
    )
}
