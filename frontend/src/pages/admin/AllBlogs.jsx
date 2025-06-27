import { useEffect, useState } from "react"
import { Sidebar } from "../../components/admin/Sidebar"
import axios from "../../auth/Auth"


export const AllBlogs = () => {

    const [result, setResult] = useState();

    useEffect(() => {
        axios({
            url: '/posts',
            method: 'post',
            data: { "access_token": localStorage.getItem("access_token") },
        })
            .then((res) => {
                setResult(res.data.result);
            })
            .catch((err) => {
                console.error(err);
            })

    }, [])


    return (
        <>
            <div className="d-flex" id="wrapper">

                <Sidebar />

                <div id="page-content-wrapper">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">

                                <br />
                                <br />


                                <div className="row">


                                    {
                                        result ? result.map((item, index) => {

                                            return (

                                                <div class="col-6" style={{ border: '2px solid black' }} >
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <img src={import.meta.env.VITE_BACKEND_URL+"/"+item.thumbnail} class="img img-fluid" alt="" />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <h5>{item.title}</h5>
                                                            <p>
                                                                {item.excerpt}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            )

                                        }) : ''
                                    }

                                </div>



                            </div>
                            <div className="col-1"></div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
