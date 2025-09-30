import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b py-3">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left text-blue-900 font-semibold hover:text-blue-700"
            >
                {question}
            </button>
            {open && <p className="mt-2 text-sm text-blue-800">{answer}</p>}
        </div>
    );
};

const HelpPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">Help & Support</h1>

            <div className="bg-white border border-blue-200 rounded-lg shadow-md p-6 mb-8">
                <FAQItem
                    question="How do I add a savings or expense entry?"
                    answer="Go to the respective page and click 'New Entry'. Fill in the details and it will auto-save."
                />
                <FAQItem
                    question="How is budget usage calculated?"
                    answer="We divide your total savings or expenses by your set budget and show the percentage used."
                />
                <FAQItem
                    question="Can I filter my entries?"
                    answer="Yes. Use the Filter button to narrow entries by date, amount, or category."
                />
                <FAQItem
                    question="Is my data secure?"
                    answer="Yes. All entries are protected by JWT authentication and stored securely in the cloud."
                />
            </div>

            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-sm text-blue-900 shadow">
                <p>📧 Need more help? Reach out at <a href="mailto:support@finwise.app" className="underline">support@finwise.app</a></p>
            </div>
        </div>
    );
};

export default HelpPage;