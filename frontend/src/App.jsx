import { Routes, Route } from "react-router"
import { Header } from "./components/common/Header"
import { Footer } from "./components/common/Footer"
import { Home } from "./pages/Home"
import { Blogs } from "./pages/Blogs"
import { Contact } from "./pages/Contact"


function App() {

  return (
    <>

      <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      <Footer />
    </>
  )
}

export default App
