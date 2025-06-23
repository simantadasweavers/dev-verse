import { useState } from "react"
import { useEffect } from "react";
import axios from "../auth/Auth";
import { useNavigate } from "react-router";

export const Contact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };
        axios({
            method: 'post',
            url: '/contact',
            data: user,
        })
        .then((res)=> 
            Swal.fire({
            title: res.data.result,
            icon: "success"
            })
        )
        .catch((err) => console.error(err))

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");

    }

    return (
        <>

            <br />
            <br />

            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <h3 class="heading mb-4">Let's talk about everything!</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas debitis, fugit natus?</p>
                            <p><img src="src/assets/contact.jpg" alt="Image" class="img-fluid" /></p>
                        </div>
                        <div class="col-md-6">

                            <form onSubmit={handleSubmit} class="mb-5" method="post" id="contactForm" name="contactForm" novalidate="novalidate">
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <textarea class="form-control" name="message" id="message" cols="30" rows="7" placeholder="Write your message" onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-12">
                                        <input type="submit" value="Send Message" class="btn btn-primary rounded-0 py-2 px-4" />
                                        <span class="submitting"></span>
                                    </div>
                                </div>
                            </form>

                            <div id="form-message-warning mt-4"></div>
                            <div id="form-message-success">
                                Your message was sent, thank you!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
