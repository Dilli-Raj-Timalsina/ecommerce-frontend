import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="p-8 my-10 mb-20">
            <hr />
            <div className="max-w-screen-lg mx-auto my-10 mb-20">
                <h1 className="text-4xl font-bold text-center mb-6">
                    Terms and Conditions
                </h1>
                <div className="text-gray-700 space-y-4">
                    <section>
                        <h2 className="text-2xl font-semibold">Introduction</h2>
                        <p>
                            our Service and explains how we collect, safeguard
                            and disclose information that results from your use
                            of our web pages. Your agreement with us includes
                            these Terms and our Privacy Policy (“Agreements”).
                            You acknowledge that you have read and understood
                            Agreements, and agree to be bound of them. If you do
                            not agree with (or cannot comply with) Agreements,
                            then you may not use the Service, but please let us
                            know by emailing at
                            [customer-service@yourwebsite.com] so we can try to
                            find a solution. These Terms apply to all visitors,
                            users and others who wish to access or use Service.
                        </p>
                    </section>

                    {/* Privacy Policy */}
                    <section>
                        <h2 className="text-2xl font-semibold mt-6">
                            Privacy Policy
                        </h2>
                        <p>
                            Our Privacy Policy describes Our policies and
                            procedures on the collection, use and disclosure of
                            Your information when You use the Application or the
                            Website and tells You about Your privacy rights and
                            how the law protects You. Please read Our Privacy
                            Policy carefully before using Our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mt-6">
                            Contact Information
                        </h2>
                        <p>
                            For any questions about these Terms, please contact
                            us by email at [customer-service@yourwebsite.com],
                            or by phone at [Your Phone Number]. For any
                            questions about these Terms, please contact us by
                            email at [customer-service@yourwebsite.com], or by
                            phone at [Your Phone Number].
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mt-6">
                            Cookie Policy
                        </h2>
                        <p>
                            Our Privacy Policy describes Our policies and
                            procedures on the collection, use and disclosure of
                            Your information when You use the Application or the
                            Website and tells You about Your privacy rights and
                            how the law protects You. Please read Our Privacy
                            Policy carefully before using Our Service.
                        </p>
                    </section>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default TermsAndConditions;
