import { Footer, Header, MenuBar, End } from "../objects";
import "./contact.css";

function Contact() {
    return (
        <div>
            <Header></Header>
            <MenuBar></MenuBar>
            <div className="contact-image">
                <h1 className="Service-heading">Contact Us</h1>
            </div>
            <div className="contact_div_overall">
                <div className="contact_div">
                    <div className="contact_sub_div">
                        <div>
                            <img className="contact_div_one_img" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1682572419~exp=1682573019~hmac=ce813aaccc4d2e8202195a8bbb9a53a4d0e5a9b057dda865cfe06a7ee5d93f9b" alt="member"></img>
                        </div>
                        <div className="contact_div_para">
                            <p>+91 9876789874</p>
                            <p>+91 9876789874</p>
                        </div>
                    </div>
                </div>
                <div className="contact_div">
                    <div className="contact_sub_div">
                        <div>
                            <img className="contact_div_one_img" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1682572419~exp=1682573019~hmac=ce813aaccc4d2e8202195a8bbb9a53a4d0e5a9b057dda865cfe06a7ee5d93f9b" alt="member"></img>
                        </div>
                        <div className="contact_div_para">
                            <p>websolutionus1@gmail.com</p>
                            <p>websolutionus@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="contact_div">
                    <div className="contact_sub_div">
                        <div>
                            <img className="contact_div_one_img" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1682572419~exp=1682573019~hmac=ce813aaccc4d2e8202195a8bbb9a53a4d0e5a9b057dda865cfe06a7ee5d93f9b" alt="member"></img>
                        </div>
                        <div className="contact_div_para">
                            <p>7232 Broadway Suite 308, Jackson</p>
                            <p> Heights, 11372, NY, United States</p>
                        </div>
                    </div>
                </div>
            </div>



            <div className="form_div_overall">
                <div className="form_div_border"> 
                <div className="form_div_overall_one">
                    <form>
                        <div>
                            <div>
                                <h5 className="align_left" id="title">Feel Free to Get in Touch</h5>
                            </div>
                            <div className="form_div">
                                <div class="form-item">
                                    <input type="text" id="username" autocomplete="off" required />
                                    <label for="username">First Name*</label>
                                </div>
                                <div class="form-item">
                                    <input type="text" id="username" autocomplete="off" required />
                                    <label for="username">Last Name*</label>
                                </div>

                            </div>
                            <div className="form_div">
                                <div class="form-item">
                                    <input type="text" id="username" autocomplete="off" required />
                                    <label for="username">Email*</label>
                                </div>
                                <div class="form-item">
                                    <input type="text" id="username" autocomplete="off" required />
                                    <label for="username">Phone*</label>
                                </div>
                            </div>
                            <div className="form_input_message">
                                <div class="form-item">
                                    <textarea className="message_input"></textarea>
                                    <label for="username">Message*</label>
                                </div>
                            </div>
                            <div className="align_left">
                                <button className="message_button">Send a Message</button>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="Image-div">
                </div>
                </div>
            
            </div>

            <Footer></Footer>
            <End></End>
        </div>
    )
}

export default Contact;