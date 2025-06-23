import { Link } from "react-router";

export const Header = () => {
    return (
        <>
            <header className="p-3 bg-dark" data-bs-theme="dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" style={{ fontSize: 20 }} className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                           Dev Verse
                        </a>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <li>
                                <Link to="/" className="nav-link px-2 link-body-emphasis">Home</Link>
                            </li>
                            <li>
                                <Link to="/blogs" className="nav-link px-2 link-body-emphasis">Blogs</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="nav-link px-2 link-body-emphasis">Contact Us</Link>
                            </li>
                        </ul>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        </form>
                        <div className="dropdown text-end">
                            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" /> </a>
                            <ul className="dropdown-menu text-small" style={{}}>
                                <li><a className="dropdown-item" href="/">New project...</a></li>
                                <li><a className="dropdown-item" href="/">Settings</a></li>
                                <li><a className="dropdown-item" href="/">Profile</a></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
