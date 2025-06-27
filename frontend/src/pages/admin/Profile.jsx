import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "../../components/admin/Sidebar"
import axios from "../../auth/Auth";

export const Profile = () => {

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [skills, setSkills] = useState();
    const [exp, setExp] = useState();
    const [loc, setLoc] = useState();
    const navigate = useNavigate();

    useEffect(() => {
            axios({
                url: '/user',
                method: 'post',
                data: { "access_token": localStorage.getItem("access_token") },
            })
            .then((res) => {
                setFirstName(res.data.result.first_name);
                setLastName(res.data.result.last_name);
                setEmail(res.data.result.email)
                setSkills(res.data.result.skills)
                setExp(res.data.result.exp)
                setLoc(res.data.result.loc)
            })
            .catch((err) => {
                console.error(err);
            })

    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: "post",
            url: '/user/update',
            data: 
            { 
              first_name: first_name,
              last_name: last_name,
              email: email,
              skills: skills,
              exp: exp,
              loc: loc,
              "access_token": localStorage.getItem("access_token") 
            },
        })
        .then((res)=>{
            Swal.fire({
            title: res.data.result,
            icon: "success"
            })
        })
        .catch((err)=>{
            console.error(err);
        })

    }


    return (
        <>
            <div className="d-flex" id="wrapper">

                <Sidebar />

                <div id="page-content-wrapper">
                    <div className="container-fluid">

                        <br />
                        <br />

                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">

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

                                        <button type="submit" class="btn btn-dark">Submit</button>
                                    </form>
                                </div>

                            </div>
                            <div className="col-1"></div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
