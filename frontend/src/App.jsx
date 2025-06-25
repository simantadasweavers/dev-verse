import { Routes, Route } from "react-router"
import { Header } from "./components/common/Header"
import { Footer } from "./components/common/Footer"
import { Home } from "./pages/Home"
import { Blogs } from "./pages/Blogs"
import { Contact } from "./pages/Contact"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { AdminPage } from "./pages/admin/AdminPage"
import { AllBlogs } from "./pages/admin/AllBlogs"
import { AddNew } from "./pages/admin/AddNew"
import { Profile } from "./pages/admin/Profile"


function App() {
  return (
    <>

      <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/posts" element={<AllBlogs />} />
            <Route path="/admin/add-new" element={<AddNew />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Routes>
        </main>
      <Footer />

    </>
  )
}

export default App
