import { ClipboardCheck, User, Phone, GraduationCap, Briefcase, Heart, FileCheck, Edit } from "lucide-react";
import { ApplicationFormData } from "@/types/application";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Step7ReviewProps {
  data: ApplicationFormData;
  onEditStep: (step: number) => void;
}

interface ReviewSectionProps {
  icon: React.ReactNode;
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}

function ReviewSection({ icon, title, step, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-primary/10">
            {icon}
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onEdit(step)}
          className="text-primary hover:text-primary/80"
        >
          <Edit className="w-4 h-4 mr-1" />
          Hariri
        </Button>
      </div>
      <div className="p-4 space-y-3">
        {children}
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div className="grid sm:grid-cols-3 gap-1">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium text-foreground sm:col-span-2">
        {value || <span className="text-muted-foreground italic">Hakuna</span>}
      </span>
    </div>
  );
}

export function Step7Review({ data, onEditStep }: Step7ReviewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <ClipboardCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Mapitio ya Maombi</h2>
          <p className="text-sm text-muted-foreground">Kagua taarifa zako kabla ya kuwasilisha</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Personal Information */}
        <ReviewSection
          icon={<User className="w-4 h-4 text-primary" />}
          title="Taarifa Binafsi"
          step={1}
          onEdit={onEditStep}
        >
          <ReviewItem label="Jina Kamili" value={data.jinaKamili} />
          <ReviewItem label="Jinsia" value={data.jinsia === 'kiume' ? 'Me' : data.jinsia === 'kike' ? 'Ke' : undefined} />
          <ReviewItem label="Tarehe ya Kuzaliwa" value={data.tareheKuzaliwa ? format(data.tareheKuzaliwa, "dd/MM/yyyy") : undefined} />
          <ReviewItem label="Uraia" value={data.uraia} />
          <ReviewItem label="Namba ya Kitambulisho" value={data.nambaKitambulisho} />
          <ReviewItem label="Jina Kamili la Mzazi" value={data.jinaKamililamzazi} />
          <ReviewItem label="Anwani" value={data.anwaniMakazi} />
          <ReviewItem label="Mkoa" value={data.mkoa} />
          <ReviewItem label="Wilaya" value={data.wilaya} />
        </ReviewSection>

        {/* Contact Information */}
        <ReviewSection
          icon={<Phone className="w-4 h-4 text-primary" />}
          title="Mawasiliano"
          step={2}
          onEdit={onEditStep}
        >
          <ReviewItem label="Namba ya Simu" value={data.nambaSimu} />
          <ReviewItem label="Simu ya Mzazi / Mlezi" value={data.nambaSimuZiada} />
          <ReviewItem label="Barua Pepe" value={data.baruaPepe} />
        </ReviewSection>

        {/* Education */}
        <ReviewSection
          icon={<GraduationCap className="w-4 h-4 text-primary" />}
          title="Elimu"
          step={3}
          onEdit={onEditStep}
        >
          <ReviewItem label="Kiwango cha Elimu" value={data.kiwagoElimu} />
          <ReviewItem label="Taasisi/Shule" value={data.taasisiShule} />
          <ReviewItem label="Kozi/Fani" value={data.koziFani} />
          <ReviewItem label="Mwaka wa Kuhitimu" value={data.mwakaKuhitimu} />
          <ReviewItem label="Ufaulu" value={data.ufaulu} /> 
        </ReviewSection>

   

        {/* Declaration */}
        <ReviewSection
          icon={<FileCheck className="w-4 h-4 text-primary" />}
          title="Tamko na Viambatisho"
          step={6}
          onEdit={onEditStep}
        >
          <ReviewItem label="Picha ya Pasipoti" value={data.pichaPasipoti?.name} />
          <ReviewItem label="Nakala ya Kitambulisho" value={data.nakalaKitambulisho?.name} />
          <ReviewItem label="Vyeti vya Elimu" value={data.vyetiElimu?.name} />
          <ReviewItem label="Uthibitisho wa Ukweli" value={data.confirmAccuracy ? "Ndiyo" : "Hapana"} />
          <ReviewItem label="Makubaliano ya Sheria" value={data.agreeToRules ? "Ndiyo" : "Hapana"} />
          <ReviewItem label="Jina la Mwombaji" value={data.jinaMwombaji} />
          <ReviewItem label="Sahihi" value={data.sahihi} />
          <ReviewItem label="Tarehe" value={data.tarehe} />
        </ReviewSection>
      </div>

      <div className="p-4 rounded-lg bg-accent border border-border">
        <p className="text-sm text-accent-foreground">
          <strong>Muhimu:</strong> Tafadhali hakikisha taarifa zote ni sahihi kabla ya kuwasilisha maombi yako. 
          Baada ya kuwasilisha, hutaweza kubadilisha taarifa.
        </p>
      </div>
    </div>
  );
}
