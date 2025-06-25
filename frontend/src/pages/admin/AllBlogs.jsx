import { Sidebar } from "../../components/admin/Sidebar"


export const AllBlogs = () => {
    return (
        <>
            <div className="d-flex" id="wrapper">

                <Sidebar />

                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <h2>all blogs</h2>
                    </div>
                </div>

            </div>
        </>
    )
}
