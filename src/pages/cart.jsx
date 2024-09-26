import React from "react";

const Cart = () => {
    return (
        <div className="cart-content m-auto">
            <div className="buttons-pay w-full border-b pt-6">
                <div className="w-11/12 m-auto pb-6">
                    <div className="text-center border-b py-8 text-2xl font-semibold">
                        Shopping Bag
                        <span className="count-elements mx-2">(1)</span>
                    </div>

                    <div className="w-4/5 mt-6 mb-4 m-auto">
                        <button className="bg-black text-white mb-4 py-4 px-6 w-full tracking-widest text-xs font-semibold">
                            CHECKOUT
                        </button>
                        <button className="bg-purple-400 text-white mb-4 py-4 px-6 w-full tracking-widest text-xs font-semibold">
                            PAY WITH STRIPE
                        </button>
                        <button className="border py-4 px-6 w-full tracking-widest text-xs font-semibold">
                            PayPal
                        </button>
                    </div>
                </div>
            </div>
            <div className="shopping-bag w-full min-w-full">
                <section className="usr-products">
                    <div className="products-wrapper w-full">
                        <ul className="product-list m-0 p-0 list-none">
                            <li className="item-summary px-6 pb-12 border-b">
                                <div className="item w-full mt-12 m-auto">
                                    <div className="bg-black m-auto w-60 h-60">
                                        image 
                                    </div>
                                </div>

                                <div className="text-center my-4 item w-full tracking-wide">
                                    <div className="font-semibold">
                                        Leather Hang Bag 
                                    </div>
                                    <div className="font-light">
                                        Color: Black 
                                    </div>
                                    <div className="font-light">
                                        Size: Large
                                    </div>
                                    <div className="my-4 text-xl tracking-wider">
                                        $1700 
                                    </div>
                                </div>
                                <div className="qty flex">
                                    <select className="border py-2 px-4 text-center">
                                        <option>QTY</option>
                                        {[...Array(10)].map((x, i) =>
                                            <option>QTY: {i}</option>
                                         )}
                                    </select>
                                </div>
                                <div className="py-4 mt-2 text-sm font-semibold item-footer flex space-x-4 justify-center">
                                    <button className="border-b">
                                        EDIT
                                    </button>
                                    <button className="border-b">
                                        DELETE
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <div className="order-summary w-full">
                            <div className="border-b osum-wrap p-8">
                                <div className="order-header border-b">
                                    <div className="mb-2 text-sm font-semibold uppercase">
                                        order summary
                                    </div>
                                    <div className="mb-4 text-xs uppercase">
                                        UKCART40217258
                                    </div>
                                </div>
                                <div className="order-details my-4">
                                    <div className="text-sm mb-4 font-semibold flex justify-between">
                                        <span>Subtotal</span>
                                        <span>$1700</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-gray-400">Free (Premium Express)</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between">
                                        <span>Estimated Tax</span>
                                        <span><u>Calculate</u></span>
                                    </div>
                                    <div className="text-sm pb-4 border-b font-semibold flex justify-between">
                                        <span>Estimated Total</span>
                                        <span className="text-lg">$1700</span>
                                    </div>
                                    <div className="w-4/5 mt-6 m-auto">
                                        <button className="bg-black text-white py-4 px-6 w-full tracking-widest text-xs font-semibold">
                                            CHECKOUT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Cart;