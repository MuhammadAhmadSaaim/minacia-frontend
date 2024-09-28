function FaqDiv (props){
    return (
        <div>
            <div class="flex flex-row items-start mb-5 transform transition-transform hover:-translate-y-2 hover:scale-105 transition-opacity duration-1000">
                <div
                    class="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full group bg-black text-white text-xl font-semibold">
                    <svg width="30px" fill="white" height="30px" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <g data-name="Layer 2">
                            <g data-name="menu-arrow">
                                <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect>
                                <path
                                    d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z">
                                </path>
                                <circle cx="12" cy="19" r="1"></circle>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="bg-gray-200 rounded-lg p-4 w-full flex items-center">
                    <h4 class="text-lg leading-6 font-bold text-black">{props.question}</h4>
                </div>
            </div>

            <div class="flex flex-row items-start transform transition-transform hover:-translate-y-2 hover:scale-105 duration-1000">
                <div class="group bg-gradient-to-br rounded-lg ml-1 p-5 px-10 w-full flex items-center">
                    <p class="text-gray-700 text-md">{props.answer}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default FaqDiv;