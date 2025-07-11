import React from "react";

function Contact() {
    return (
        <div>
            <div className="title mt-20 py-20 px-4 flex flex-col items-center text-center">
                <h1 className="max-w-[800px] font-light uppercase text-5xl leading-[3rem] tracking-[-0.2rem]">
                    Contact Us
                </h1>
               
            </div>
            <div className="contacts max-w-[1024px] px-4 mt-0 m-auto mb-40">
                <div className="flex flex-wrap gap-20 justify-center">
                    {/* Phone Section */}
                    
                    {/* Email Section */}
                    <div className="max-w-96 w-1/2 min-w-72">
                        <div className="flex flex-col justify-center">
                            <div className="py-8 px-4 flex flex-col items-center">
                                <h2 className="font-semibold uppercase">Email</h2>
                                <div className="text-gray-500 mt-4 text-center">
                                    <p>For all questions and queries Email us at info@minaciasociety.com
                                    </p>
                                </div>
                                <div className="font-semibold mt-8">
                                    <a
                                        href="mailto:info@minaciasociety.com"
                                        className="underline font-semibold"
                                    
                                    >
                                        Email Us
                                    </a>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
