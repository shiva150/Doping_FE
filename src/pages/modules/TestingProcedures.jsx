import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function TestingProcedures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Testing Procedures</h1>
      
      <div className="space-y-8" ref={ref}>
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Types of Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-blue-800 font-medium mb-2">In-Competition Testing</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Conducted during competitions</li>
                <li>Tests for all prohibited substances</li>
                <li>Usually urine and blood samples</li>
                <li>Focus on performance-enhancing drugs</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-green-800 font-medium mb-2">Out-of-Competition Testing</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Conducted at any time</li>
                <li>No advance notice required</li>
                <li>Focus on anabolic agents</li>
                <li>Part of the athlete's biological passport</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">The Testing Process</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-md">
              <h3 className="text-yellow-800 font-medium mb-2">1. Selection and Notification</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Random or targeted selection</li>
                <li>Notification by doping control officer</li>
                <li>Verification of athlete identity</li>
                <li>Right to have a representative present</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-md">
              <h3 className="text-orange-800 font-medium mb-2">2. Sample Collection</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Urine sample collection</li>
                <li>Blood sample collection (if required)</li>
                <li>Privacy and dignity maintained</li>
                <li>Witnessing of sample provision</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-md">
              <h3 className="text-red-800 font-medium mb-2">3. Sample Processing</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Sample splitting into A and B bottles</li>
                <li>Sealing of sample bottles</li>
                <li>Documentation of sample numbers</li>
                <li>Chain of custody maintained</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Athlete Rights and Responsibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-md">
              <h3 className="text-purple-800 font-medium mb-2">Athlete Rights</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Right to have a representative</li>
                <li>Right to request modifications</li>
                <li>Right to document concerns</li>
                <li>Right to a copy of documentation</li>
              </ul>
            </div>
            <div className="bg-indigo-50 p-4 rounded-md">
              <h3 className="text-indigo-800 font-medium mb-2">Athlete Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Comply with testing procedures</li>
                <li>Remain within sight of DCO</li>
                <li>Provide valid identification</li>
                <li>Complete documentation accurately</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Results Management</h2>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 font-medium">Process Overview:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Initial review of laboratory results</li>
              <li>Notification of adverse findings</li>
              <li>B sample analysis (if requested)</li>
              <li>Hearing process and decision</li>
              <li>Appeal process (if applicable)</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-md mt-4">
            <p className="text-green-800 font-medium">Important Notes:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Strict confidentiality maintained</li>
              <li>Right to fair hearing</li>
              <li>Appeal rights to CAS</li>
              <li>Public disclosure only after final decision</li>
            </ul>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default TestingProcedures; 