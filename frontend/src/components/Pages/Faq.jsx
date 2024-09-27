import React from "react";

const FAQs = [
  {
    question: "What courses do you offer?",
    answer:
      "We offer a wide range of courses in various subjects including programming, design, business, and personal development.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll in a course by navigating to the course page and clicking the 'Enroll Now' button.",
  },
  {
    question: "What is the duration of the courses?",
    answer:
      "Course durations vary, but most are designed to be completed within a few weeks to a couple of months, depending on the topic and complexity.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes, all our courses are self-paced, allowing you to learn at your own speed.",
  },
  {
    question: "Will I receive a certificate upon completion?",
    answer:
      "Yes, you will receive a certificate of completion for every course you finish.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee if you're not satisfied with your course.",
  },
];

const FAQ = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {FAQs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 dark:border-gray-600 pb-4"
          >
            <h3 className="text-xl font-semibold cursor-pointer hover:text-blue-500">
              {faq.question}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
