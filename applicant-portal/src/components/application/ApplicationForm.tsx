import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { FormNavigation } from "./FormNavigation";
import { Step1Personal } from "./steps/Step1Personal";
import { Step2Contact } from "./steps/Step2Contact";
import { Step3Education } from "./steps/Step3Education";
import { Step4Occupation } from "./steps/Step4Occupation";
import { Step5Reason } from "./steps/Step5Reason";
import { Step6Declaration } from "./steps/Step6Declaration";
import { Step7Review } from "./steps/Step7Review";
import { SuccessScreen } from "./SuccessScreen";
import { ApplicationFormData, initialFormData } from "@/types/application";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";





const steps = [
  { number: 1, title: "Taarifa Binafsi", shortTitle: "Binafsi" },
  { number: 2, title: "Mawasiliano", shortTitle: "Mawasiliano" },
  { number: 3, title: "Elimu", shortTitle: "Elimu" },
  { number: 4, title: "Tamko", shortTitle: "Tamko" },
  { number: 5, title: "Mapitio", shortTitle: "Mapitio" },
];




// Validation schemas for each step
const step1Schema = z.object({
  jinaKamili: z.string().min(1, "Jina kamili linahitajika"),
  jinsia: z.enum(["kiume", "kike"], { required_error: "Chagua jinsia" }),
  tareheKuzaliwa: z.date({ required_error: "Tarehe ya kuzaliwa inahitajika" }),
  ainayakitambulisho: z.string().min(1, "Aina ya kitambulisho"),
  nambaKitambulisho: z.string().min(1, "Namba ya kitambulisho inahitajika"),
  jinaKamililamzazi: z.string().min(1, "Jina kamili la mzazi / mlezi linahitajika"),
  mkoa: z.string().min(1, "Chagua mkoa"),
  wilaya: z.string().min(1, "Chagua wilaya"),
  chuo: z.string().min(1, "Chagua chuo"),
  fani: z.string().min(1, "Chagua fani"),
});

const step2Schema = z.object({
  nambaSimu: z.string()
    .min(1, "Namba ya simu inahitajika")
    .regex(/^(\+?255|0)[67]\d{8}$/, "Namba ya simu si sahihi. Mfano: 0712345678"),
  baruaPepe: z.string()
    .min(1, "Barua pepe inahitajika")
    .email("Barua pepe si sahihi"),
});

const step3Schema = z.object({
  kiwagoElimu: z.string().min(1, "Chagua kiwango cha elimu"),
});

const step5Schema = z.object({
  sababuKujiunga: z.string().min(10, "Eleza sababu za kujiunga (angalau maneno 10)"),
  matarajioYEFFA: z.string().min(10, "Eleza matarajio yako (angalau maneno 10)"),
});

const step6Schema = z.object({
  confirmAccuracy: z.literal(true, { errorMap: () => ({ message: "Lazima uthibitishe usahihi wa taarifa" }) }),
  agreeToRules: z.literal(true, { errorMap: () => ({ message: "Lazima ukubali sheria na masharti" }) }),
  jinaMwombaji: z.string().min(1, "Jina la mwombaji linahitajika"),
  sahihi: z.string().min(1, "Sahihi inahitajika"),
});

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const updateFormData = (updates: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const updatedKeys = Object.keys(updates);
    setErrors((prev) => {
      const newErrors = { ...prev };
      updatedKeys.forEach((key) => delete newErrors[key]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    let schema: z.ZodSchema | null = null;
    let dataToValidate: Partial<ApplicationFormData> = {};

    switch (step) {
      case 1:
        schema = step1Schema;
        dataToValidate = {
          jinaKamili: formData.jinaKamili,
          jinsia: formData.jinsia,
          tareheKuzaliwa: formData.tareheKuzaliwa,
          ainayakitambulisho:formData.ainayakitambulisho,
          nambaKitambulisho: formData.nambaKitambulisho,
          jinaKamililamzazi: formData.jinaKamililamzazi,
          mkoa: formData.mkoa,
          wilaya: formData.wilaya,
          chuo: formData.chuo,
          fani: formData.fani,
        };
        break;
      case 2:
        schema = step2Schema;
        dataToValidate = {
          nambaSimu: formData.nambaSimu,
          baruaPepe: formData.baruaPepe,
        };
        break;
      case 3:
        schema = step3Schema;
        dataToValidate = {
          kiwagoElimu: formData.kiwagoElimu,
        };
        break;
      case 4:
        { schema = step6Schema;
        dataToValidate = {
          confirmAccuracy: formData.confirmAccuracy,
          agreeToRules: formData.agreeToRules,
          jinaMwombaji: formData.jinaMwombaji,
          jinaKamililamzazi: formData.jinaKamililamzazi,
          sahihi: formData.sahihi,
        };
        // Also validate file uploads
        const fileErrors: Record<string, string> = {};
        if (!formData.pichaPasipoti) {
          fileErrors.pichaPasipoti = "Picha ya pasipoti inahitajika";
        }
        if (!formData.nakalaKitambulisho) {
          fileErrors.nakalaKitambulisho = "Nakala ya kitambulisho inahitajika";
        }
        if (Object.keys(fileErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...fileErrors }));
          if (!schema) return false;
        }
        break; }
      case 5:
        return true; // These steps don't have required fields
    }

    if (!schema) return true;

    try {
      schema.parse(dataToValidate);
      return step === 5 ? !errors.pichaPasipoti && !errors.nakalaKitambulisho : true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors((prev) => ({ ...prev, ...newErrors }));
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast({
        title: "Taarifa Hazijakamilika",
        description: "Tafadhali jaza sehemu zote zinazohitajika",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 

const handleSubmit = async () => {
  if (!validateStep(6)) {
    toast({
      title: "Incomplete Information",
      description: "Please complete the declaration and upload all required files.",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    const formPayload = new FormData();

    // Step 1: Personal Info
    formPayload.append("fullName", formData.jinaKamili);
    formPayload.append("gender", formData.jinsia === "kiume" ? "male" : "female");
    formPayload.append("dateOfBirth", formData.tareheKuzaliwa.toISOString());
    formPayload.append("guadianName", formData.jinaKamililamzazi || "");
    formPayload.append("nationality", formData.uraia || "");

    formPayload.append("id_type", formData.ainayakitambulisho);
    formPayload.append("idNumber", formData.nambaKitambulisho);
    formPayload.append("address", formData.anwaniMakazi || "");
    formPayload.append("region", formData.mkoa);
    formPayload.append("district", formData.wilaya);
    formPayload.append("selected_institution", formData.chuo);
    
    formPayload.append("selected_course", formData.fani);

    // Step 2: Contact Info
    formPayload.append("phonePrimary", formData.nambaSimu);
    formPayload.append("phoneSecondary", formData.nambaSimuZiada || "");
    formPayload.append("email", formData.baruaPepe);

    // Step 3: Education
    formPayload.append("educationLevel", formData.kiwagoElimu || "");
    formPayload.append("institution", formData.taasisiShule || "");
    formPayload.append("course", formData.koziFani || "");
    formPayload.append("graduationYear", formData.mwakaKuhitimu || "");
    formPayload.append("grade", formData.ufaulu || "");

  

    // Step 4: Declaration & files
    formPayload.append("confirmAccuracy", String(formData.confirmAccuracy));
    formPayload.append("agreeToRules", String(formData.agreeToRules));
    formPayload.append("applicantName", formData.jinaMwombaji || "");
    formPayload.append("signature", formData.sahihi || "");


    if (formData.pichaPasipoti) formPayload.append("passportPhoto", formData.pichaPasipoti);
    if (formData.nakalaKitambulisho) formPayload.append("idCopy", formData.nakalaKitambulisho);
    if (formData.vyetiElimu) formPayload.append("educationCertificates", formData.vyetiElimu);

    // Send to backend
    const response = await fetch("http://localhost:5000/api/applicants", {
      method: "POST",
      body: formPayload,
    });

    if (!response.ok) throw new Error("There was a problem saving your application.");

    const result = await response.json();

    setIsSubmitted(true);

    toast({
      title: "Application Submitted!",
      description: "Your application has been successfully submitted.",
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "An error occurred. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};



  if (isSubmitted) {
    return <SuccessScreen referenceNumber={referenceNumber} applicantName={formData.jinaKamili} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Personal data={formData} updateData={updateFormData} errors={errors} />;
      case 2:
        return <Step2Contact data={formData} updateData={updateFormData} errors={errors} />;
      case 3:
        return <Step3Education data={formData} updateData={updateFormData} errors={errors} />;
      case 4:
        return <Step6Declaration data={formData} updateData={updateFormData} errors={errors} />;
      case 5:
        return <Step7Review data={formData} onEditStep={handleEditStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <div className="form-section mt-6">
        {renderStep()}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
