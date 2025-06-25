import { useState, useEffect } from "react"
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
import axios from "./auth/Auth"



function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState(import.meta.env.VITE_COMMON_PROFILE_URL);

  useEffect(() => {
    async function fetchUser() {
      if (localStorage.getItem("access_token") || localStorage.getItem("refresh_token")) {
        await axios({
          url: '/user',
          method: 'post',
          data: {
            "access_token": localStorage.getItem("access_token")
          }
        })
          .then((res) => {
            if (res.data.result._id) {
              setLoggedIn(true)
              setProfile(import.meta.env.VITE_BACKEND_URL + "/" + res.data.result.profile_img);
            }
          })
          .catch((err) => console.error(err))
      }

    }
    fetchUser();
  }, [])

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
          <Route path="/admin/dashboard" element={isLoggedIn ? <AdminPage /> : <Login /> } />
          <Route path="/admin/posts" element={isLoggedIn ? <AllBlogs /> : <Login /> } />
          <Route path="/admin/add-new" element={ isLoggedIn ? <AddNew /> : <Login /> } />
          <Route path="/admin/profile" element={ isLoggedIn ? <Profile /> : <Login /> } />
        </Routes>
      </main>
      <Footer />

    </>
  )
}

export default App
