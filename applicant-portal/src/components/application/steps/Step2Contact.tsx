import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail } from "lucide-react";
import { ApplicationFormData } from "@/types/application";

interface Step2ContactProps {
  data: ApplicationFormData;
  updateData: (updates: Partial<ApplicationFormData>) => void;
  errors: Record<string, string>;
}

export function Step2Contact({ data, updateData, errors }: Step2ContactProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Phone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Mawasiliano</h2>
          <p className="text-sm text-muted-foreground">Jaza taarifa za mawasiliano yako</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Primary Phone */}
        <div className="space-y-2">
          <Label htmlFor="nambaSimu" className="input-label">
            Namba ya Simu <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="nambaSimu"
              value={data.nambaSimu}
              onChange={(e) => updateData({ nambaSimu: e.target.value })}
              placeholder="+255712345678"
              className={`pl-10 ${errors.nambaSimu ? "border-destructive" : ""}`}
            />
          </div>
          {errors.nambaSimu && <p className="text-sm text-destructive">{errors.nambaSimu}</p>}
          <p className="text-xs text-muted-foreground">Mfano: +255712345678</p>
        </div>

        {/* Secondary Phone */}
        <div className="space-y-2">
          <Label htmlFor="nambaSimuZiada" className="input-label">
            Namba ya Simu ya Mzazi / Mlezi
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="nambaSimuZiada"
              value={data.nambaSimuZiada}
              onChange={(e) => updateData({ nambaSimuZiada: e.target.value })}
              placeholder="+255712345678"
              className="pl-10"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="baruaPepe" className="input-label">
            Barua Pepe <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="baruaPepe"
              type="email"
              value={data.baruaPepe}
              onChange={(e) => updateData({ baruaPepe: e.target.value })}
              placeholder="jina@mfano.com"
              className={`pl-10 ${errors.baruaPepe ? "border-destructive" : ""}`}
            />
          </div>
          {errors.baruaPepe && <p className="text-sm text-destructive">{errors.baruaPepe}</p>}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-accent border border-border">
        <p className="text-sm text-accent-foreground">
          <strong>Muhimu:</strong> Hakikisha namba yako ya simu na barua pepe ni sahihi. 
          Tutawasiliana nawe kupitia njia hizi.
        </p>
      </div>
    </div>
  );
}
