import React from "react";

function Contact() {
    return (
        <div>
            <div className="title mt-20 py-20 px-4 flex flex-col items-center text-center">
                <h1 className="max-w-[800px] font-light uppercase text-5xl leading-[3rem] tracking-[-0.2rem]">
                    How to contact Minacia client services
                </h1>
                <div className="font-semibold max-w-[800px] uppercase mt-4 m-auto">
                    Choose your preffered method of contact and connect with us
                </div>
            </div>
            <div className="contacts max-w-[1024px] px-4 mt-0 m-auto mb-40">
                <div className="flex flex-wrap gap-20 justify-center">
                    <div className="max-w-96 w-1/2 min-w-72">
                        <div className="flex flex-col justify-center">
                            <div className="py-8 px-4 flex flex-col items-center flex-grow-[2] flex-shrink">
                                <h2 className="font-semibold uppercase">
                                    PHONE
                                </h2>
                                <div className="text-gray-500 mt-4 text-center flex-grow-2 flex-col flex-shrink flex">
                                    <p className="">
                                    Monday - Saturday from 9 AM to 11 PM (EST).
                                    Sunday from 10 AM to 9 PM (EST).
                                    </p>
                                </div>
                                <div className="font-semibold mt-8">
                                    <u>Call us +1 877 482 2430</u>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-96 w-1/2 min-w-72">
                        <div className="flex flex-col justify-center">
                            <div className="py-8 px-4 flex flex-col items-center flex-grow-[2] flex-shrink">
                                <h2 className="font-semibold uppercase">
                                    EMAIL 
                                </h2>
                                <div className="text-gray-500 mt-4 text-center flex-grow-2 flex-col flex-shrink flex">
                                    <p className="">
                                        Your inquiry and receive response from a client advisor
                                    </p>
                                </div>
                                <div className="font-semibold mt-8">
                                    <u>Write Us</u>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-96 w-1/2 min-w-72">
                        <div className="flex flex-col justify-center">
                            <div className="py-8 px-4 flex flex-col items-center flex-grow-[2] flex-shrink">
                                <h2 className="uppercase font-semibold">
                                    CHat
                                </h2>
                                <div className="mt-4 text-center text-gray-500 flex-grow-2 flex-col flex-shrink flex">
                                    <p className="">
                                    Monday - Saturday from 9 AM to 11 PM (EST).
                                    Sunday from 10 AM to 9 PM (EST).
                                    </p>
                                </div>
                                <div className="font-semibold mt-8">
                                    <u>Message Us</u>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-96 w-1/2 min-w-72">
                        <div className="flex flex-col justify-center">
                            <div className="py-8 px-4 flex flex-col items-center flex-grow-[2] flex-shrink">
                                <h2 className="font-semibold uppercase">
                                    whatsapp
                                </h2>
                                <div className="mt-4 text-gray-500 text-center flex-grow-2 flex-col flex-shrink flex">
                                    <p className="">
                                    Monday - Saturday from 9 AM to 11 PM (EST).
                                    Sunday from 10 AM to 9 PM (EST).
                                    </p>
                                </div>
                                <div className="font-semibold mt-8">
                                   <u>WhatsApp Us</u> 
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