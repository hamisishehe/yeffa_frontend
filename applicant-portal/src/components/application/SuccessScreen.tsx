import { CheckCircle, Download, Home, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface SuccessScreenProps {
  referenceNumber: string;
  applicantName: string;
}

export function SuccessScreen({ referenceNumber, applicantName }: SuccessScreenProps) {
  const navigate = useNavigate();

  const copyReferenceNumber = () => {
    navigator.clipboard.writeText(referenceNumber);
    toast({
      title: "Imenakiliwa!",
      description: "Namba ya maombi imenakiliwa kwenye clipboard.",
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 animate-scale-in">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-secondary" />
          </div>
          <div className="absolute -top-2 -right-2 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Hongera, {applicantName}!
          </h1>
          <p className="text-muted-foreground">
            Maombi yako yamepokelewa kwa mafanikio.
          </p>
        </div>

     

        <div className="space-y-3 pt-4">
     
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 mr-2" />
            Rudi Nyumbani
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          Tutawasiliana nawe kupitia barua pepe au simu ndani ya siku 7 za kazi.
        </p>
      </div>
    </div>
  );
}
