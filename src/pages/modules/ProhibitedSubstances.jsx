import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function ProhibitedSubstances() {
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
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Prohibited Substances</h1>
      
      <div className="space-y-8" ref={ref}>
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Understanding the Prohibited List</h2>
          <p className="text-gray-700 mb-4">
            The World Anti-Doping Agency (WADA) maintains a list of substances and methods that are prohibited in sport. 
            This list is updated annually and is the basis for anti-doping regulations worldwide.
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Updated annually by WADA</li>
              <li>Effective from January 1st each year</li>
              <li>Applies to all sports unless specified otherwise</li>
              <li>Includes both in-competition and out-of-competition testing</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Prohibited Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-md">
              <h3 className="text-red-800 font-medium mb-2">M1. Blood Manipulation</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Blood doping</li>
                <li>Blood transfusions</li>
                <li>Artificial oxygen carriers</li>
                <li>Any form of blood manipulation</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-md">
              <h3 className="text-orange-800 font-medium mb-2">M2. Physical Manipulation</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Urine substitution</li>
                <li>Sample tampering</li>
                <li>Intravenous infusions</li>
                <li>Catheterization</li>
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
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Health Risks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-4 rounded-md">
              <h3 className="text-yellow-800 font-medium mb-2">Physical Health Risks</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Liver damage</li>
                <li>Heart problems</li>
                <li>Hormonal imbalances</li>
                <li>Increased risk of cancer</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-green-800 font-medium mb-2">Mental Health Risks</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Mood swings</li>
                <li>Depression</li>
                <li>Aggression</li>
                <li>Anxiety</li>
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
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Therapeutic Use Exemptions (TUEs)</h2>
          <p className="text-gray-700 mb-4">
            Athletes may be granted permission to use a prohibited substance or method for medical reasons through a Therapeutic Use Exemption (TUE).
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 font-medium">TUE Requirements:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Medical necessity</li>
              <li>No alternative treatment available</li>
              <li>No performance enhancement</li>
              <li>Proper documentation and approval process</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Athlete Responsibilities</h2>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="text-purple-800 font-medium">Key Responsibilities:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Know what substances are prohibited</li>
              <li>Check all medications and supplements</li>
              <li>Apply for TUEs when necessary</li>
              <li>Keep medical records updated</li>
              <li>Report any potential violations</li>
            </ul>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default ProhibitedSubstances; 