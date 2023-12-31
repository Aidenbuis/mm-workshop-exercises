import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Step {
  id: number;
  name: string;
  status: "complete" | "current" | "upcoming";
}

const intitialSteps: Step[] = [
  { id: 0, name: "Job details", status: "upcoming" },
  { id: 1, name: "Application form", status: "upcoming" },
  { id: 2, name: "Preview", status: "upcoming" }
];

const ExerciseTailwindSevenExercise = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = intitialSteps.map((step) => {
    if (step.id === currentStep) {
      return { ...step, status: "current" };
    } else if (step.id < currentStep) {
      return { ...step, status: "complete" };
    } else {
      return step;
    }
  });

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length;

  return (
    <nav>
      <div className="mb-2 flex">
        <div className="flex border border-gray-300 rounded-md divide-x divide-gray-300">
          <button
            type="button"
            className={`px-4 py-1 cursor-pointer ${
              isFirstStep
                ? "text-gray-300 cursor-not-allowed  disabled"
                : "cursor-pointer hover:bg-gray-100"
            }`}
            onClick={() => {
              if (!isFirstStep) {
                setCurrentStep(currentStep - 1);
              }
            }}
          >
            <ArrowLeft className="h-6 w-6 text-gray-300" />
          </button>
          <button
            type="button"
            className={`px-4 py-1 cursor-pointer ${
              isLastStep
                ? "text-gray-300 disabled cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-100"
            }`}
            onClick={() => {
              if (!isLastStep) {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            <ArrowRight className="h-6 w-6 text-gray-300" />
          </button>
        </div>
      </div>
      <ul className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
        {steps.map((step, stepIndex) => (
          <Step key={step.id} step={step} stepIndex={stepIndex} />
        ))}
      </ul>
    </nav>
  );
};

interface StepProps {
  step: {
    id: number;
    name: string;
    status: "complete" | "current" | "upcoming";
  };
  stepIndex: number;
}

const Step = ({ step, stepIndex }: StepProps) => {
  const isLastStep = stepIndex === intitialSteps.length - 1;
  const stepNumber = stepIndex + 1;

  return (
    <li
      className={`relative flex items-center py-4 px-6 w-full ${
        isLastStep ? "" : "md:border-r"
      }`}
    >
      <div
        className={`h-10 w-10 flex items-center justify-center rounded-full border-2 ${
          step.status === "complete"
            ? "bg-indigo-600 border-indigo-600 text-gray-800"
            : step.status === "current"
            ? "bg-white border-indigo-600 text-indigo-600"
            : step.status === "upcoming"
            ? "bg-white border-gray-300 text-gray-400"
            : ""
        }`}
      >
        {step.status === "complete" ? (
          <CheckIcon />
        ) : (
          <span className="font-semibold">{stepNumber}</span>
        )}
      </div>
      <p
        className={`text-sm ml-4 font-semibold ${
          step.status === "complete"
            ? "text-gray-800"
            : step.status === "current"
            ? "text-indigo-600"
            : step.status === "upcoming"
            ? "text-gray-500"
            : ""
        }`}
      >
        {step.name}
      </p>
    </li>
  );
};

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="3"
    stroke="currentColor"
    className="h-6 w-6 text-white"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export default ExerciseTailwindSevenExercise;
