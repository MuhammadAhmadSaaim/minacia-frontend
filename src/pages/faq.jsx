import FaqDiv from "../components/faqDiv";

const faqData = [
  {
    question: "What is Minacia?",
    answer: "Minacia isn’t just a brand, it’s a mindset. Rooted in the Latin word minacia (meaning menace), we’ve redefined what it means to be one. To us, being a menace is about breaking free from limitations, challenging norms and owning your identity without apology. We’re not here to blend in, we’re here to stand out."
  },
  {
    question: "What makes Minacia different from other streetwear brands?",
    answer: "Minacia isn’t driven by trends, it’s driven by purpose. Every piece we design is a statement of resistance, self-belief and bold individuality. We don’t sell clothes; we represent a movement. Our community is made up of those who refuse to follow the crowd and our products are built to reflect that energy."
  },
  {
    question: "What products do you offer?",
    answer: `Our core collection includes:\n\n• Bucket Hats\n• Trucker Hats\n• Beanies\n• Sunglasses\n\nEach item is a wearable symbol of rebellion, created for those who lead, not follow.`
  },
  {
    question: "Who is the Minacia community for?",
    answer: "Minacia is for the disruptors, the visionaries, the misfits and the rule-breakers. Whether you’re chasing a dream, starting a movement or simply refusing to be defined by others, Minacia is for you."
  },
  {
    question: "How can I be part of the movement?",
    answer: "Start by wearing the statement. Tag us in your looks, follow our journey and connect with a community that thrives on authenticity and boldness. Minacia isn’t just something you wear, it’s something you live."
  }
];

function FAQs() {
  return (
    <div className="py-28 bg-gray-100">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div className="text-center mt-8">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Frequently Asked <span className="text-black">Questions</span>
          </h3>
        </div>

        <div className="mt-20">
          <ul>
            {faqData.map((faq, index) => (
              <li key={index} className="text-left mb-10">
                <FaqDiv question={faq.question} answer={faq.answer} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
