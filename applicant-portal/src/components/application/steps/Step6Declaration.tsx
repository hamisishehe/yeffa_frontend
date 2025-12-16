import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileCheck, Upload, X, Image, FileText } from "lucide-react";
import { ApplicationFormData } from "@/types/application";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface Step6DeclarationProps {
  data: ApplicationFormData;
  updateData: (updates: Partial<ApplicationFormData>) => void;
  errors: Record<string, string>;
}

interface FileUploadProps {
  label: string;
  required?: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  accept?: string;
  description?: string;
}

function FileUpload({ label, required, file, onFileChange, error, accept, description }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("Faili ni kubwa sana. Ukubwa wa juu ni 5MB.");
        return;
      }
      onFileChange(selectedFile);
    }
  };

  const removeFile = () => {
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label className="input-label">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          error ? "border-destructive bg-destructive/5" : 
          file ? "border-secondary bg-secondary/5" : 
          "border-border hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {file.type.startsWith("image/") ? (
                <Image className="w-8 h-8 text-secondary" />
              ) : (
                <FileText className="w-8 h-8 text-secondary" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Bofya kupakia faili au buruta hapa
            </p>
            {description && (
              <p className="text-xs text-muted-foreground text-center">{description}</p>
            )}
          </div>
        )}
        
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function Step6Declaration({ data, updateData, errors }: Step6DeclarationProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tamko na Viambatisho</h2>
          <p className="text-sm text-muted-foreground">Kamilisha tamko na pakia nyaraka zinazohitajika</p>
        </div>
      </div>

      {/* File Uploads */}
      <div className="grid gap-6">
        <FileUpload
          label="Picha ya Pasipoti"
          required
          file={data.pichaPasipoti}
          onFileChange={(file) => updateData({ pichaPasipoti: file })}
          error={errors.pichaPasipoti}
          accept="image/*"
          description="Picha ya pasipoti ya ukubwa wa kawaida (JPG, PNG)"
        />

        <FileUpload
          label="Nakala ya Kitambulisho"
          required
          file={data.nakalaKitambulisho}
          onFileChange={(file) => updateData({ nakalaKitambulisho: file })}
          error={errors.nakalaKitambulisho}
          accept="image/*,.pdf"
          description="Kitambulisho cha Taifa, Leseni, au Pasipoti (JPG, PNG, PDF)"
        />

        <FileUpload
          label="Vyeti vya Elimu"
          file={data.vyetiElimu}
          onFileChange={(file) => updateData({ vyetiElimu: file })}
          accept="image/*,.pdf"
          description="Cheti au vyeti vya elimu (Hiari)"
        />
      </div>

      {/* Declaration Checkboxes */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-semibold text-foreground">Tamko</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="confirmAccuracy"
              checked={data.confirmAccuracy}
              onCheckedChange={(checked) => updateData({ confirmAccuracy: checked as boolean })}
              className={errors.confirmAccuracy ? "border-destructive" : ""}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="confirmAccuracy" className="font-normal cursor-pointer">
                Nathibitisha kwamba taarifa zote nilizotoa ni za kweli na sahihi kwa ufahamu wangu bora.
                <span className="text-destructive"> *</span>
              </Label>
            </div>
          </div>
          {errors.confirmAccuracy && <p className="text-sm text-destructive ml-7">{errors.confirmAccuracy}</p>}

          <div className="flex items-start gap-3">
            <Checkbox
              id="agreeToRules"
              checked={data.agreeToRules}
              onCheckedChange={(checked) => updateData({ agreeToRules: checked as boolean })}
              className={errors.agreeToRules ? "border-destructive" : ""}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="agreeToRules" className="font-normal cursor-pointer">
                Ninakubali sheria na masharti ya YEFFA na ninaahidi kuyafuata.
                <span className="text-destructive"> *</span>
              </Label>
            </div>
          </div>
          {errors.agreeToRules && <p className="text-sm text-destructive ml-7">{errors.agreeToRules}</p>}
        </div>
      </div>

      {/* Signature Section */}
      <div className="grid gap-6 pt-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jinaMwombaji" className="input-label">
              Jina la Mwombaji <span className="text-destructive">*</span>
            </Label>
            <Input
              id="jinaMwombaji"
              value={data.jinaMwombaji}
              onChange={(e) => updateData({ jinaMwombaji: e.target.value })}
              placeholder="Jina lako kamili"
              className={errors.jinaMwombaji ? "border-destructive" : ""}
            />
            {errors.jinaMwombaji && <p className="text-sm text-destructive">{errors.jinaMwombaji}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tarehe" className="input-label">
              Tarehe
            </Label>
            <Input
              id="tarehe"
              value={data.tarehe}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sahihi" className="input-label">
            Sahihi (Andika jina lako kama sahihi) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="sahihi"
            value={data.sahihi}
            onChange={(e) => updateData({ sahihi: e.target.value })}
            placeholder="Andika jina lako kama sahihi ya kidijitali"
            className={`font-serif italic ${errors.sahihi ? "border-destructive" : ""}`}
          />
          {errors.sahihi && <p className="text-sm text-destructive">{errors.sahihi}</p>}
        </div>
      </div>
    </div>
  );
}
