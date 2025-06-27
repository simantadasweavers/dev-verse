import { useState } from "react";
import axios from "../auth/Auth";
import { useNavigate } from "react-router";


export const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();


        axios({
          url: '/user/login',
          method: 'post',
          data: {
                "email":email,
                "password":password
            },
        })
        .then((res) => {
            Swal.fire({
            title: "User logged-in successfully!",
            icon: "success"
            })
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
            navigate("/")
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        )
        .catch((err) => {
            Swal.fire({
            title: err.response.data.result,
            icon: "error"
            })
        })

    }

  return (
    <>
        <br />
            <br />

            <div class="container">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="text" class="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" class="btn btn-dark">Login</button>
                </form>
            </div>

    </>
  )
}
