import React from 'react';

function TermsAndConditions() {
    return (
        <div>
            <div className="p-6 max-w-4xl mt-32 mb-10 mx-auto font-cormorant">
                <h1 className="text-5xl text-center font-bold mb-8 text-black">Terms and Conditions</h1>
                <p className="text-center mb-2 text-gray-700">Minacia Ltd</p>
                <p className="text-center mb-8 text-gray-700 italic">Effective Date: 07/10/24</p>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">1. Company Information</h2>
                    <p className="text-gray-700">Minacia Ltd<br />Company Number: 15281270<br />Email: support@minacia.com<br />Website: www.minacia.com</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">2. Acceptance of Terms</h2>
                    <p className="text-gray-700">By accessing or using this Site, you confirm that you have read, understood, and agree to these Terms and Conditions and our Privacy Policy. You agree to comply with all applicable laws, rules, and regulations.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">3. Use of the Site</h2>
                    <ul className="list-disc list-inside ml-6 text-gray-700">
                        <li>To engage in any fraudulent, illegal, or harmful activity.</li>
                        <li>To violate any applicable laws, regulations, or third-party rights.</li>
                        <li>To interfere with the operation of the Site or disrupt other users’ access to the Site.</li>
                        <li>To transmit or upload any malicious software, viruses, or harmful content.</li>
                    </ul>
                    <p className="mt-2 text-gray-700">We reserve the right to suspend or terminate your access to the Site without notice if you violate these Terms and Conditions or engage in unlawful activity.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">4. Intellectual Property Rights</h2>
                    <p className="text-gray-700">All content on this Site is the intellectual property of Minacia Ltd or its licensors and is protected by copyright, trademark, and other applicable intellectual property laws.</p>
                    <ul className="list-disc list-inside ml-6 text-gray-700">
                        <li>You may access, view, and download the content for personal, non-commercial use only.</li>
                        <li>You may not copy, reproduce, distribute, or display any part of the Site without our prior written consent.</li>
                        <li>You may not use automated systems (e.g., bots, scrapers) to extract data from the Site.</li>
                    </ul>
                    <p className="mt-2 text-gray-700">Any unauthorized use of our intellectual property may result in legal action.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">5. User-Generated Content</h2>
                    <p className="text-gray-700">If you submit any content to the Site, you grant Minacia Ltd a worldwide, non-exclusive, royalty-free license to use, display, and distribute that content. You confirm the content does not infringe on third-party rights or violate any laws.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">6. Third-Party Links</h2>
                    <p className="text-gray-700">Our Site may contain links to third-party websites. We are not responsible for their content, privacy policies, or practices. You acknowledge Minacia Ltd is not liable for any loss or damage from third-party websites.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">7. Disclaimer of Warranties</h2>
                    <p className="text-gray-700">The Site is provided "as is" without warranties. Minacia Ltd does not guarantee the Site will be error-free or secure. All warranties are disclaimed to the fullest extent permitted by law.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">8. Limitation of Liability</h2>
                    <p className="text-gray-700">To the maximum extent permitted by law, Minacia Ltd is not liable for any damages resulting from your use of the Site, including data loss, loss of profits, or unauthorized access to data.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">9. Indemnification</h2>
                    <p className="text-gray-700">You agree to indemnify and hold harmless Minacia Ltd from any claims or damages arising from your use of the Site, your violation of these Terms, or infringement of third-party rights.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">10. Termination</h2>
                    <p className="text-gray-700">We may terminate your access at any time for any reason, including breach of these Terms. Upon termination, you must cease all use of the Site.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">11. Governing Law and Jurisdiction</h2>
                    <p className="text-gray-700">These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">12. Changes to the Terms</h2>
                    <p className="text-gray-700">We may update these Terms without notice. It is your responsibility to review them regularly. Continued use of the Site means acceptance of the updated Terms.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">13. Severability</h2>
                    <p className="text-gray-700">If any part of these Terms is found invalid, the rest will remain in effect.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-black">14. Contact Us</h2>
                    <p className="text-gray-700">
                        If you have any questions about these Terms, contact us at:<br />
                        Minacia Ltd<br />
                        Email: <a href="mailto:support@minacia.com" className="text-blue-600 hover:underline">support@minacia.com</a>
                    </p>

                </section>

                <p className="mt-8 text-center text-gray-600 italic">By using our Site, you agree to be bound by these Terms and Conditions.</p>
            </div>
        </div>
    );
}

export default TermsAndConditions;
