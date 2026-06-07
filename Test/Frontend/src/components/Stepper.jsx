import React, { useState } from "react";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      label: "Personal Info",
      content: <div>Personal Information Content</div>,
    },
    {
      label: "Account Info",
      content: <div>Account Information Content</div>,
    },
    {
      label: "Payment Info",
      content: <div>Payment Information Content</div>,
    },
    {
      label: "Confirmation Info",
      content: <div>Confirmation Information Content</div>,
    },
    {
      label: "Review Info",
      content: <div>Review Information Content</div>,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container">
      {/* Left Side Stepper */}
      <div className="stepper">
        {steps.map((step, index) => (
          <div key={index} className="stepItem">
            <div
              className={`step ${
                index <= currentStep ? "active" : ""
              }`}
            >
              {index + 1}
            </div>

            <p>{step.label}</p>

            {index < steps.length - 1 && (
              <div className="line"></div>
            )}
          </div>
        ))}
      </div>

      {/* Right Side Content */}
      <div className="content">
        <h2>{steps[currentStep].label}</h2>

        {steps[currentStep].content}

        <div className="buttons">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;