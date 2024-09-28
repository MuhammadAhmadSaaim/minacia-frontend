import React from "react";

const Cart = () => {
    return (
        <div className="cart-content m-auto my-32">
            <div className="md:hidden buttons-pay w-full border-b pt-6">
                <div className="w-11/12 m-auto pb-6">
                    <div className="text-center border-b py-8 text-2xl font-semibold font-cormorant">
                        Shopping Bag
                        <span className="count-elements mx-2 font-cormorant">(1)</span>
                    </div>

                    <div className="w-4/5 mt-6 mb-4 m-auto">
                        <button className="bg-black text-white mb-4 py-4 px-6 w-full tracking-widest text-xs font-semibold font-cormorant">
                            CHECKOUT
                        </button>
                        <button className="bg-purple-400 text-white mb-4 py-4 px-6 w-full tracking-widest text-xs font-semibold font-cormorant">
                            PAY WITH STRIPE
                        </button>
                        <button className="border py-4 px-6 w-full tracking-widest text-xs font-semibold font-cormorant">
                            PayPal
                        </button>
                    </div>
                </div>
            </div>

            <div className="md:hidden shopping-bag w-full min-w-full">
                <section className="usr-products">
                    <div className="products-wrapper w-full">
                        <ul className="product-list m-0 p-0 list-none">
                            <li className="item-summary px-6 pb-12 border-b">
                                <div className="item w-full mt-12 m-auto">
                                    <div className="bg-black m-auto w-60 h-60">
                                        image
                                    </div>
                                </div>

                                <div className="text-center my-4 item w-full tracking-wide font-cormorant">
                                    <div className="font-semibold font-cormorant">
                                        Leather Hang Bag
                                    </div>
                                    <div className="font-light font-cormorant">
                                        Color: Black
                                    </div>
                                    <div className="font-light font-cormorant">
                                        Size: Large
                                    </div>
                                    <div className="my-4 text-xl tracking-wider font-cormorant">
                                        $1700
                                    </div>
                                </div>
                                <div className="qty flex font-cormorant">
                                    <select className="border py-2 px-4 text-center font-cormorant">
                                        <option>QTY</option>
                                        {[...Array(10)].map((x, i) =>
                                            <option key={i} className="font-cormorant">QTY: {i}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="py-4 mt-2 text-sm font-semibold item-footer flex space-x-4 justify-center font-cormorant">
                                    <button className="border-b font-cormorant">
                                        EDIT
                                    </button>
                                    <button className="border-b font-cormorant">
                                        DELETE
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <div className="order-summary w-full">
                            <div className="border-b osum-wrap p-8 font-cormorant">
                                <div className="order-header border-b">
                                    <div className="mb-2 text-sm font-semibold uppercase font-cormorant">
                                        order summary
                                    </div>
                                    <div className="mb-4 text-xs uppercase font-cormorant">
                                        UKCART40217258
                                    </div>
                                </div>
                                <div className="order-details my-4 font-cormorant">
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Subtotal</span>
                                        <span>$1700</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Shipping</span>
                                        <span className="text-gray-400 font-cormorant">Free (Premium Express)</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Tax</span>
                                        <span><u>Calculate</u></span>
                                    </div>
                                    <div className="text-sm pb-4 border-b font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Total</span>
                                        <span className="text-lg font-cormorant">$1700</span>
                                    </div>
                                    <div className="w-4/5 mt-6 m-auto">
                                        <button className="bg-black text-white py-4 px-6 w-full tracking-widest text-xs font-semibold font-cormorant">
                                            CHECKOUT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="hidden md:block gutter w-full p-4">
                <div className="wrapper p-8">
                    <div className="maincontent flex gap-8">
                        <div className="left flex-1">
                            <div className="flex py-4 border-b uppercase justify-between w-full list-header font-cormorant">
                                <div className="font-semibold font-cormorant">
                                    your selections
                                </div>
                            </div>
                            <div className="mt-8 items">
                                <div className="product w-full flex items-center border-b-2">
                                    <div className="prodimg max-w-28">
                                        <img
                                            src="/images/temp.jpeg"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col p-4 flex-1 font-cormorant">
                                        <div className="prod-info flex items-center justify-between">
                                            <div className="title text-md w-1/2 font-cormorant">
                                                Choker necklace with geometric Studs
                                            </div>
                                            <div className="flex-col text-end font-cormorant">
                                                <div className="qty flex font-cormorant">
                                                    <select className="border py-1 px-2 text-center font-cormorant">
                                                        <option>QTY</option>
                                                        {[...Array(10)].map((x, i) =>
                                                            <option key={i} className="font-cormorant">QTY: {i}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="amount tracking-widest text-gray-600 font-cormorant">
                                                    $2950
                                                </div>
                                            </div>
                                        </div>
                                        <div className="r2 py-2 text-sm text-gray-600 font-cormorant">
                                            <div className="style">
                                                Style# BQ79001460D8DD5
                                            </div>
                                            <div className="variation font-cormorant">
                                                variation: Yellow-Gold toned Metal
                                            </div>
                                        </div>
                                        <div className="ship-info mt-8 font-cormorant">
                                            <div className="uppercase font-semibold font-cormorant">
                                                Available
                                            </div>
                                            <div className="text-sm font-cormorant">
                                                Enjoy your complementary delivery
                                            </div>
                                        </div>
                                        <div className="py-4 mt-2 text-sm font-semibold item-footer space-x-4 font-cormorant">
                                            <button className="border-b font-cormorant">
                                                EDIT
                                            </button>
                                            <button className="border-b font-cormorant">
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right flex-1 min-w-80 max-w-96 font-cormorant">
                            <div className="order-summary flex-col p-6 border font-cormorant">
                                <div className="header pt-10 pb-6 border-b-2 font-cormorant">
                                    <div className="font-semibold uppercase font-cormorant">
                                        order summary
                                    </div>
                                    <div className="text-sm uppercase font-cormorant">
                                        USCART1235123
                                    </div>
                                </div>
                                <div className="summary py-6 flex-col font-cormorant">
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Subtotal</span>
                                        <span>$1700</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Shipping</span>
                                        <span className="text-gray-400 font-cormorant">Free</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Tax</span>
                                        <span><u>Calculate</u></span>
                                    </div>
                                    <div className="text-sm pb-4 border-b font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Total</span>
                                        <span className="text-lg font-cormorant">$1700</span>
                                    </div>
                                    <div className="w-full mt-6">
                                        <button className="bg-black text-white py-4 px-6 w-full tracking-widest text-xs font-semibold font-cormorant">
                                            CHECKOUT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
