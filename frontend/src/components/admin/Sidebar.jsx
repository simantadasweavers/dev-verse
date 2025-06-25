import { Link } from "react-router"

export const Sidebar = () => {
  return (
    <>
        <div className="border-end bg-white" id="sidebar-wrapper">
                {/* <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div> */}
                <div className="list-group list-group-flush">
                    <Link to="/admin/dashboard" className="list-group-item list-group-item-action list-group-item-light p-3">Dashboard</Link>
                    <Link to="/admin/posts" className="list-group-item list-group-item-action list-group-item-light p-3">All Blogs</Link>
                    <Link to="/admin/add-new" className="list-group-item list-group-item-action list-group-item-light p-3">Add New</Link>
                    <Link to="/admin/profile" className="list-group-item list-group-item-action list-group-item-light p-3">Profile</Link>
                </div>
            </div>
    </>
  )
}
