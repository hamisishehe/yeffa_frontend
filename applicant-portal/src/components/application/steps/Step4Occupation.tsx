import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import { ApplicationFormData } from "@/types/application";

interface Step4OccupationProps {
  data: ApplicationFormData;
  updateData: (updates: Partial<ApplicationFormData>) => void;
  errors: Record<string, string>;
}

export function Step4Occupation({ data, updateData, errors }: Step4OccupationProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Taarifa za Kazi</h2>
          <p className="text-sm text-muted-foreground">Jaza taarifa za kazi au shughuli unazofanya</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Current Occupation */}
        <div className="space-y-2">
          <Label htmlFor="kaziShughuli" className="input-label">
            Kazi / Shughuli Unayofanya
          </Label>
          <Input
            id="kaziShughuli"
            value={data.kaziShughuli}
            onChange={(e) => updateData({ kaziShughuli: e.target.value })}
            placeholder="Mfano: Mwalimu, Mfanyabiashara, Mwanafunzi"
          />
        </div>

        {/* Employer/Organization */}
        <div className="space-y-2">
          <Label htmlFor="mwajiriTaasisi" className="input-label">
            Mwajiri / Taasisi
          </Label>
          <Input
            id="mwajiriTaasisi"
            value={data.mwajiriTaasisi}
            onChange={(e) => updateData({ mwajiriTaasisi: e.target.value })}
            placeholder="Jina la kampuni au taasisi unayofanya kazi"
          />
        </div>

        {/* Work Experience */}
        <div className="space-y-2">
          <Label htmlFor="uzoefuKazi" className="input-label">
            Uzoefu wa Kazi
          </Label>
          <Textarea
            id="uzoefuKazi"
            value={data.uzoefuKazi}
            onChange={(e) => updateData({ uzoefuKazi: e.target.value })}
            placeholder="Eleza kwa ufupi uzoefu wako wa kazi, ujuzi ulio nao, na mafanikio yako"
            rows={5}
          />
          <p className="text-xs text-muted-foreground">
            Unaweza kuelezea kazi ulizofanya zamani, ujuzi maalum, na mafanikio yako
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-accent border border-border">
        <p className="text-sm text-accent-foreground">
          <strong>Kumbuka:</strong> Kama hujafanya kazi rasmi, unaweza kueleza shughuli 
          nyingine unazofanya kama vile biashara ndogo, kilimo, au kazi za kujitolea.
        </p>
      </div>
    </div>
  );
}
