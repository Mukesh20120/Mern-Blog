import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/v1/user/get-user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.data);
        }
      } catch (error) {
        window.alert(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleSave = async() =>{
     try{
       const res = await fetch(`/api/v1/comment/edit-comment/${comment._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: editContent})
       });
       if(res.ok){
        setIsEditing(false);
        onEdit({comment,editContent});
       }
     }catch(error){
       window.alert(error.message);
     }
  }

  if (!comment) return;

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.imageUrl}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={editContent}
              className=" mb-2"
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            />
            <div className=" flex justify-end gap-1 text-xs">
              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                gradientDuoTone="purpleToPink"
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => {setIsEditing(false)}}
                gradientDuoTone="purpleToPink"
                outline
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes?.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLike > 0 &&
                  comment.numberOfLike +
                    " " +
                    (comment.numberOfLike === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                  <button
                    type="button"
                    className=" text-gray-500 hover:text-blue-500"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className=" text-gray-500 hover:text-red-500"
                    onClick={()=>{onDelete(comment._id)}}
                  >
                    Delete
                  </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
