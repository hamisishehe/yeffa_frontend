import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-6 border-t border-border">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={isFirstStep ? "invisible" : ""}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Rudi Nyuma
      </Button>

      {isLastStep ? (
        <Button
          type="button"
          variant="hero"
          size="lg"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-pulse-soft">Inatuma...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Wasilisha Maombi
            </>
          )}
        </Button>
      ) : (
        <Button type="button" onClick={onNext}>
          Endelea
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}
