import { Sidebar } from "../../components/admin/Sidebar"


export const AdminPage = () => {
    
    return (
        <>
        <div className="d-flex" id="wrapper">

            <Sidebar />

            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <h2>Admin Dashboard</h2>
                </div>
            </div>

        </div>        
        </>
    )
}
