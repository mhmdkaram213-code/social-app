import { useContext } from 'react'
import userImg from '../assets/user profile.webp'
import CommentDropDown from '../component/DropDown/CommentDropDown'
import { AuthContext } from '../context/AuthContext'
export default function CommentCard({ comment , id , callback}) {
    const {userData} = useContext(AuthContext)
    return (
        <div className="w-full h-16 items-center flex justify-between py-12 px-4 my-4 border-2 border-gray-200">
            <div className="flex">
                <img onError={(e) => e.target.src = userImg} className=" rounded-full w-10 h-10 mr-3" src={comment?.commentCreator.photo} alt='user photo' />
                <div>
                    <h3 className="text-md font-semibold ">{comment?.commentCreator.name}</h3>
                    <p className="text-xs text-gray-500">{comment?.createdAt.split('.').slice(0, 1).join(' ').replace('T', ' ')}</p>
                    <p className='my-2'>{comment?.content}</p>
                </div>
            </div>
            {userData._id == comment.commentCreator._id && userData._id == id && <CommentDropDown callback={callback} id={comment._id}/>}
        </div>
    )
}