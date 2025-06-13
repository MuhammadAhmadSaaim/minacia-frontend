import React from 'react';

const ShippingAndReturns = () => {
  return (
    <div className="p-6 max-w-4xl mt-32 mb-10 mx-auto font-cormorant">
      <h1 className="text-3xl text-center font-semibold mb-6">Shipping and Returns Policy</h1>
      <p className="mb-6 text-sm text-center text-gray-500">Effective Date: 07/10/24</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Shipping Policy</h2>

      <h3 className="text-xl font-medium mt-6 mb-2">a) Order Processing Time</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>All orders will be processed and shipped within 48 business hours after payment confirmation.</li>
        <li>Business hours are Monday to Friday, excluding public holidays.</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">b) Domestic Shipping</h3>
      <p className="mb-2">We offer two shipping options for deliveries within England, Wales, Scotland and Northern Ireland:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Free Standard Delivery:</strong> Delivery time is typically 2–3 business days from the time of dispatch.</li>
        <li><strong>Charged Express Delivery:</strong> For orders placed before 12:00 PM GMT, next-day delivery is available. Orders placed after 12:00 PM GMT will be processed on the next business day.</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">c) International Shipping</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>International shipping rates vary depending on the destination country.</li>
        <li>Estimated delivery times for international shipping vary by location and selected method at checkout.</li>
        <li>Customers are responsible for customs duties, taxes, or fees upon delivery.</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">d) Shipping Costs</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Shipping costs are calculated at checkout based on location and method.</li>
        <li>Express and international options may incur extra charges.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">2. Returns Policy</h2>

      <h3 className="text-xl font-medium mt-6 mb-2">a) 30-Day Return Window</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Returns accepted within 30 days of delivery for refund or exchange.</li>
        <li>Items must be in original condition — unworn, unwashed, and with all tags attached.</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">b) Return Process</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Contact customer service at <a href="mailto:return@minacia.com" className="text-blue-600 underline">return@minacia.com</a> to request a return authorization.</li>
        <li>Follow the instructions provided once the request is approved.</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">c) Return Shipping Costs</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Domestic:</strong> Customers cover return shipping unless the item is defective/incorrect. Use a trackable service.</li>
        <li><strong>International:</strong> Customers bear return shipping costs. Customs duties/taxes are non-refundable. Use a reliable courier with tracking.</li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-2">d) Refunds</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Refunds processed after receiving and verifying returned items.</li>
        <li>Issued to the original payment method within 7–10 business days.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">3. Exchanges</h2>
      <p className="mb-4">To exchange for a different size or color, please return the original item and place a new order.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">4. Contact Us</h2>
      <p>
        If you have any questions about our shipping and returns policy, contact us at:<br />
        Minacia Ltd<br />
        Email: <a href="mailto:return@minacia.com" className="text-blue-600 underline">return@minacia.com</a>
      </p>
    </div>
  );
};

export default ShippingAndReturns;
