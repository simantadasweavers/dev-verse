import { useState } from "react";
import axios from "../auth/Auth";
import { useNavigate } from "react-router";

export const Register = () => {

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [skills, setSkills] = useState();
    const [exp, setExp] = useState();
    const [loc, setLoc] = useState();
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("skills", skills);
        formData.append("exp", exp);
        formData.append("loc", loc);
        formData.append("profile_img", profile);

        axios({
          url: '/user/register',
          method: 'post',
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            Swal.fire({
            title: "User registered successfully!",
            icon: "success"
            })

            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
            
            navigate("/login")
        }
        )
        .catch((err) => console.error(err))

    }

    return (
        <>

            <br />
            <br />

            <div class="container">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" class="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} id="firstName" required />
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastName" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="skills" class="form-label">Skills</label>
                        <textarea class="form-control" id="skills" rows="4" placeholder="Enter your skills (e.g., JavaScript, Python, etc.)" value={skills} onChange={(e) => setSkills(e.target.value)}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="experience" class="form-label">Experience</label>
                        <input type="number" class="form-control" id="experience" placeholder="Describe your experience" value={exp} onChange={(e) => setExp(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="location" class="form-label">Location</label>
                        <input type="text" class="form-control" id="location" placeholder="Enter your location" value={loc} onChange={(e) => setLoc(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="profileImage" class="form-label">Profile Image</label>
                        <input type="file" class="form-control" id="profileImage" accept="image/*" onChange={(e) => setProfile(e.target.files[0])} />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>

        </>
    )
}
