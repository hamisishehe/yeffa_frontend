import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import { ApplicationFormData } from "@/types/application";

interface Step5ReasonProps {
  data: ApplicationFormData;
  updateData: (updates: Partial<ApplicationFormData>) => void;
  errors: Record<string, string>;
}

export function Step5Reason({ data, updateData, errors }: Step5ReasonProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Heart className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Sababu ya Kujiunga</h2>
          <p className="text-sm text-muted-foreground">Tuambie kwa nini unataka kujiunga na YEFFA</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Reasons for Joining */}
        <div className="space-y-2">
          <Label htmlFor="sababuKujiunga" className="input-label">
            Sababu za Kujiunga na YEFFA <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="sababuKujiunga"
            value={data.sababuKujiunga}
            onChange={(e) => updateData({ sababuKujiunga: e.target.value })}
            placeholder="Eleza kwa nini unataka kujiunga na YEFFA na jinsi unavyotarajia kunufaika"
            rows={5}
            className={errors.sababuKujiunga ? "border-destructive" : ""}
          />
          {errors.sababuKujiunga && <p className="text-sm text-destructive">{errors.sababuKujiunga}</p>}
        </div>

        {/* Expectations from YEFFA */}
        <div className="space-y-2">
          <Label htmlFor="matarajioYEFFA" className="input-label">
            Matarajio Yako kutoka YEFFA <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="matarajioYEFFA"
            value={data.matarajioYEFFA}
            onChange={(e) => updateData({ matarajioYEFFA: e.target.value })}
            placeholder="Eleza unatarajia nini kutoka kwa YEFFA - mafunzo, mtandao, fursa, au mengineyo"
            rows={5}
            className={errors.matarajioYEFFA ? "border-destructive" : ""}
          />
          {errors.matarajioYEFFA && <p className="text-sm text-destructive">{errors.matarajioYEFFA}</p>}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-accent border border-border">
        <p className="text-sm text-accent-foreground">
          <strong>Ushauri:</strong> Kuwa wazi na mkweli katika maelezo yako. 
          Hii itatusaidia kuelewa jinsi tunavyoweza kukusaidia vizuri zaidi.
        </p>
      </div>
    </div>
  );
}
