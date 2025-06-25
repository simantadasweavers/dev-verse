import { Sidebar } from "../../components/admin/Sidebar"

export const Profile = () => {
    return (
        <>
            <div className="d-flex" id="wrapper">

                <Sidebar />

                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <h2>profile page</h2>
                    </div>
                </div>

            </div>
        </>
    )
}
