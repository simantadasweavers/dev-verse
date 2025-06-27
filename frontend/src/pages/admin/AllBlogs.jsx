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

                                                <div class="col-md-6">
                                                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                                        <div class="col-auto d-none d-lg-block">
                                                            <img src={import.meta.env.VITE_BACKEND_URL+"/"+item.thumbnail} className="img" alt={item.title} style={{ maxWidth: 300, maxHeight: 300 }} />
                                                        </div>
                                                        <div class="col p-4 d-flex flex-column position-static"> <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
                                                            <h3 class="mb-0">{item.title}</h3>
                                                            <div class="mb-1 text-body-secondary">Nov 11</div>
                                                            <p class="mb-auto">
                                                            { item.excerpt }
                                                            </p> 
                                                            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                                                                Continue reading
                                                                <svg class="bi" aria-hidden="true"><use xlink:href="#chevron-right"></use></svg> </a> 
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
