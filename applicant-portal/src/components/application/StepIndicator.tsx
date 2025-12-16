import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  shortTitle: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-muted" />
        
        {/* Progress line filled */}
        <div 
          className="absolute left-0 top-5 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          const isPending = currentStep < step.number;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "step-indicator",
                  isActive && "step-indicator-active",
                  isCompleted && "step-indicator-completed",
                  isPending && "step-indicator-pending"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span 
                className={cn(
                  "mt-2 text-xs font-medium text-center hidden sm:block max-w-[80px]",
                  isActive ? "text-primary" : isCompleted ? "text-secondary" : "text-muted-foreground"
                )}
              >
                {step.shortTitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile step title */}
      <div className="sm:hidden text-center mt-4">
        <span className="text-sm font-medium text-primary">
          Hatua {currentStep}: {steps[currentStep - 1]?.title}
        </span>
      </div>
    </div>
  );
}
