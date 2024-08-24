import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../Firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishPostError, setPublishPostError] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/v1/post?postId=${postId}&userId=${currentUser._id}`
        );
        const data = await res.json();
        if (!res.ok) {
          setPublishPostError(data.message);
        } else {
          setPublishPostError(null);
          setFormData(data?.posts[0]);
        
        }
      } catch (error) {
        publishPostError(error.message);
      }
    };
    fetchPosts();
  }, [postId]);

  const handleUploadImage = () => {
    if (!imageFile) {
      setUploadImageError("Please select file");
      return;
    }
    setUploadingImage(true);
    setUploadImageError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapShort) => {
        const progress =
          (snapShort.bytesTransferred * 100) / snapShort.totalBytes;
        setUploadProgress(progress);
      },
      (error) => {
        setUploadImageError(error.message);
        setImageFile(null);
        setUploadingImage(false);
        setUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFile(null);
          setUploadingImage(false);
          setUploadProgress(null);
          setUploadImageError(null);
          setFormData((prev) => ({ ...prev, image: downloadUrl }));
        });
      }
    );
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/v1/post?postId=${postId}&userId=${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const fetchData = await res.json();
      if (res.ok) {
        setFormData({});
        navigate("/");
      } else {
        setPublishPostError(fetchData.message);
      }
    } catch (error) {
      setPublishPostError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            value={formData.title}
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
            <option value="leetcode">Leetcode</option>
            <option value="book">Book</option>
            <option value="other">other</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            disabled={uploadingImage}
            onClick={handleUploadImage}
          >
            {uploadingImage === true ? (
              <div className=" w-16 h-16">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded Image"
            className=" w-full h-72 object-cover"
          />
        )}
        {uploadImageError && <Alert color="failure">{uploadImageError}</Alert>}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          modules={{toolbar: toolbarOptions}}
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
      </form>
      {publishPostError && <Alert color="failure">{publishPostError}</Alert>}
    </div>
  );
}
