import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function AntiDopingBasics() {
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
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Anti-Doping Basics</h1>
      
      <div className="space-y-8" ref={ref}>
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">What is Anti-Doping?</h2>
          <p className="text-gray-700 mb-4">
            Anti-doping refers to the efforts and measures taken to prevent the use of prohibited substances and methods in sports. 
            The goal is to maintain fair play and protect athletes' health.
          </p>
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <p className="text-blue-800 font-medium">Key Principles:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Fair Play</li>
              <li>Athlete Health Protection</li>
              <li>Sport Integrity</li>
              <li>Equal Opportunity</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Strict Liability</h2>
          <p className="text-gray-700 mb-4">
            One of the fundamental principles in anti-doping is the concept of "strict liability." This means that athletes are 
            responsible for any prohibited substance found in their body, regardless of how it got there.
          </p>
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-yellow-800 font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Athletes are responsible for what enters their body</li>
              <li>Ignorance is not an excuse</li>
              <li>Must be careful with supplements and medications</li>
              <li>Always verify substances before use</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Consequences of Doping</h2>
          <p className="text-gray-700 mb-4">
            Doping violations can have severe consequences for athletes, affecting their career, reputation, and future in sports.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-800 font-medium">Sporting Consequences:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Competition bans</li>
                <li>Loss of medals and titles</li>
                <li>Disqualification from events</li>
                <li>Permanent Olympic ban</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-md">
              <p className="text-orange-800 font-medium">Other Consequences:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Damage to reputation</li>
                <li>Loss of sponsorships</li>
                <li>Financial penalties</li>
                <li>Legal implications</li>
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
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Checking Substances</h2>
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-green-800 font-medium">How to Verify Substances:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Use WADA's Prohibited List</li>
              <li>Consult Global DRO (Drug Reference Online)</li>
              <li>Check with your National Anti-Doping Organization</li>
              <li>Consult with medical professionals</li>
              <li>Never assume a substance is allowed</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Importance of Clean Sport</h2>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 font-medium">Why Clean Sport Matters:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Maintains fair competition</li>
              <li>Protects athlete health and safety</li>
              <li>Upholds the integrity of sport</li>
              <li>Sets positive examples for young athletes</li>
              <li>Preserves the spirit of sport</li>
            </ul>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default AntiDopingBasics; 