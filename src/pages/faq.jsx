import FaqDiv from "../components/faqDiv";

function FAQs() {
    return (
        <div>
            <div class="py-28 bg-gray-100">
                <div class="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">

                    <div class="text-center mt-8">
                        <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                            Frequently Asked <span class="text-black">Questions</span>
                        </h3>
                    </div>
                    <div class="mt-20">
                        <ul class="">
                            <li class="text-left mb-10">
                                <FaqDiv question="How does Minicia Clothing's ordering process work?" answer="Ordering from Minicia Clothing is easy. Simply browse our collection online or visit one of our boutiques. Once you've selected your items, add them to your cart and proceed to checkout. You can choose your preferred payment method and delivery options to complete your purchase."></FaqDiv>
                            </li>
                            <li class="text-left mb-10">
                                <FaqDiv question="Who can shop at Minicia Clothing?" answer="Minicia Clothing is open to everyone who appreciates high-quality fashion. Whether you're looking for a wardrobe refresh or a special outfit, our collections cater to a wide range of styles and preferences for men, women, and beyond."></FaqDiv>
                            </li>
                            <li class="text-left mb-10">
                                <FaqDiv question="Are there any fees for shopping at Minicia Clothing?" answer="There are no additional fees for shopping at Minicia Clothing beyond the price of the items and applicable shipping costs. We aim to provide a transparent shopping experience with no hidden charges."></FaqDiv>
                            </li>
                            <li class="text-left mb-10">
                                <FaqDiv question="How are Minicia Clothing’s prices determined?" answer="Our prices reflect the quality of materials and craftsmanship that go into each piece. We strive to offer fair and competitive pricing, considering the premium nature of our fabrics and the meticulous design process."></FaqDiv>
                            </li>
                            <li class="text-left mb-10">
                                <FaqDiv question="What types of clothing does Minicia offer?" answer="Minicia Clothing offers a diverse range of fashion items, including formal wear, casual attire, outerwear, and accessories. Our collections are designed to suit various occasions and personal styles, ensuring you find something perfect for every event."></FaqDiv>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQs;
