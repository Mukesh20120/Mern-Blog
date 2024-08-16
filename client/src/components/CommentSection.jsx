import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setComment("");
        setCommentError(null);
      if(data.comment)
        setAllComments([data.comment,...allComments]);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLikes = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
      }
      const res = await fetch(`/api/v1/comment/like-comment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setAllComments(
          allComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.data.likes,
                  numberOfLike: data.data.numberOfLike,
                }
              : comment
          )
        );
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleDelete = async (commentId) => {
    setShowModel(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
      }
      const res = await fetch(`/api/v1/comment/delete-comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setAllComments(allComments.filter((c) => c._id !== commentId));
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleEdit = ({ comment, editContent }) => {
    setAllComments(
      allComments.map((c) =>
        c._id == comment._id ? { ...c, content: editContent } : c
      )
    );
  };
  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/${postId}`);
        const comments = await res.json();
        if (res.ok) {
          const { data } = comments;
          setAllComments(data);
        }
      } catch (error) {
        window.alert(error.message);
      }
    };
    fetchAllComments();
  }, [postId]);
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.imageUrl}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {allComments.length === 0 ? (
        <p className=" text-sm my-5">No comment yet</p>
      ) : (
        <>
          <div className=" text-sm my-5 flex items-center gap-1">
            <p>comments</p>
            <div className=" border border-gray-400 rounded-sm py-1 px-2">
              <p>{allComments.length}</p>
            </div>
          </div>
          {allComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLikes}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModel(true);
                setDeleteCommentId(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(deleteCommentId)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
