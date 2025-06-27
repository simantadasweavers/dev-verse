import { useState } from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "../../components/admin/Sidebar"
import axios from "../../auth/Auth";


export const AddNew = () => {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [excerpt, setExcerpt] = useState();
    const [thumbnail_img, setThumbnailImg] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", description)
        formData.append("excerpt", excerpt)
        formData.append("thumbnail", thumbnail_img)
        formData.append("access_token", localStorage.getItem('access_token'))

            axios({
                url: '/post',
                method: 'post',
                data: formData,
                headers: {
                    'Content-type': "multipart/form-data"
                },
            })
            .then((res) => {
                Swal.fire({
                    title: res.data.result,
                    icon: "success"
                })
                setTimeout(() => {
                  navigate("/admin/posts");    
                }, 1000);
            })
            .catch((err) => {
                Swal.fire({
                    title: "Please re-enter your blog",
                    icon: "error"
                })
                console.error(err)
            })

    }

    return (
        <>
            <div className="d-flex" id="wrapper">

                <Sidebar />

                <div id="page-content-wrapper">
                    <div className="container-fluid">

                        <br />
                        <br />

                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">

                                <form onSubmit={handleSubmit}>
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Post Title</label>
                                        <input type="text" class="form-control" value={title} placeholder="Enter post title" onChange={(e) => setTitle(e.target.value)} id="title" aria-describedby="Enter Post Title" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Description</label>
                                        <textarea class="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter your description" id="description" rows="10"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="excerpt" class="form-label">Excerpt</label>
                                        <textarea class="form-control" id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Enter your excerpt" rows="5"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Profile Image</label>
                                        <input class="form-control" type="file" placeholder="Select blog profile" onChange={(event) => setThumbnailImg(event.target.files[0])} id="formFile" />
                                    </div>
                                    <button type="submit" class="btn btn-dark">Save Post</button>
                                </form>

                            </div>
                            <div className="col-1"></div>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}
