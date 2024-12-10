import { useState, useEffect } from 'react';

export const DisclaimerPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAcknowledged = localStorage.getItem('disclaimerAcknowledged');
    if (!hasAcknowledged) {
      setShowPopup(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('disclaimerAcknowledged', 'true');
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h2 className="text-xl font-bold mb-4">Important Notice</h2>
        <div className="space-y-2 mb-4">
          <p>This site:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Is a parody/entertainment service</li>
            <li>Has no affiliation with Dominic Cummings</li>
            <li>Uses AI to generate responses that may be inaccurate</li>
            <li>Should not be used for any decision-making</li>
          </ul>
          <p>By continuing, you acknowledge these terms.</p>
        </div>
        <button
          onClick={handleAcknowledge}
          className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};