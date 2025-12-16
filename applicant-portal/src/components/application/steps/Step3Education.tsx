import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import { ApplicationFormData } from "@/types/application";
import { educationLevels } from "@/lib/tanzaniaData";

interface Step3EducationProps {
  data: ApplicationFormData;
  updateData: (updates: Partial<ApplicationFormData>) => void;
  errors: Record<string, string>;
}

export function Step3Education({ data, updateData, errors }: Step3EducationProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Taarifa za Elimu</h2>
          <p className="text-sm text-muted-foreground">Jaza taarifa za elimu yako</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Education Level */}
        <div className="space-y-2">
          <Label className="input-label">
            Kiwango cha Elimu <span className="text-destructive">*</span>
          </Label>
          <Select value={data.kiwagoElimu} onValueChange={(value) => updateData({ kiwagoElimu: value })}>
            <SelectTrigger className={errors.kiwagoElimu ? "border-destructive" : ""}>
              <SelectValue placeholder="Chagua kiwango cha elimu" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.kiwagoElimu && <p className="text-sm text-destructive">{errors.kiwagoElimu}</p>}
        </div>

        {/* Institution */}
        <div className="space-y-2">
          <Label htmlFor="taasisiShule" className="input-label">
            Taasisi / Shule
          </Label>
          <Input
            id="taasisiShule"
            value={data.taasisiShule}
            onChange={(e) => updateData({ taasisiShule: e.target.value })}
            placeholder="Jina la shule au chuo"
          />
        </div>

        {/* Course/Specialization */}
        <div className="space-y-2">
          <Label htmlFor="koziFani" className="input-label">
            Kozi / Fani
          </Label>
          <Input
            id="koziFani"
            value={data.koziFani}
            onChange={(e) => updateData({ koziFani: e.target.value })}
            placeholder="Mfano: Uhandisi wa Kompyuta"
          />
        </div>

        {/* Graduation Year */}
        <div className="space-y-2">
          <Label className="input-label">
            Mwaka wa Kuhitimu
          </Label>
          <Select value={data.mwakaKuhitimu} onValueChange={(value) => updateData({ mwakaKuhitimu: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chagua mwaka" />
            </SelectTrigger>
            <SelectContent className="bg-popover max-h-60">
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course/Specialization */}
        <div className="space-y-2">
          <Label htmlFor="ufaulu" className="input-label">
            Ufaulu
          </Label>
          <Input
            id="ufaulu"
            value={data.ufaulu}
            onChange={(e) => updateData({ ufaulu: e.target.value })}
            placeholder="Mfano: VC1, VC2"
          />
        </div>
      </div>
    </div>
  );
}
