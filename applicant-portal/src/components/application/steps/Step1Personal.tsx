import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ApplicationFormData } from "@/types/application";
import { regions, districtsByRegion, chuo, fani, vitambulisho } from "@/lib/tanzaniaData";

interface Step1PersonalProps {
  data: ApplicationFormData;
  updateData: (updates: Partial<ApplicationFormData>) => void;
  errors: Record<string, string>;
}

export function Step1Personal({
  data,
  updateData,
  errors,
}: Step1PersonalProps) {
  const districts = data.mkoa ? districtsByRegion[data.mkoa] || [] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Taarifa Binafsi
          </h2>
          <p className="text-sm text-muted-foreground">
            Jaza taarifa zako binafsi
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="jinaKamili" className="input-label">
            Jina Kamili <span className="text-destructive">*</span>
          </Label>
          <Input
            id="jinaKamili"
            value={data.jinaKamili}
            onChange={(e) => updateData({ jinaKamili: e.target.value })}
            placeholder="Andika jina lako kamili"
            className={errors.jinaKamili ? "border-destructive" : ""}
          />
          {errors.jinaKamili && (
            <p className="text-sm text-destructive">{errors.jinaKamili}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="input-label">
            Jinsia <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={data.jinsia}
            onValueChange={(value) =>
              updateData({ jinsia: value as "kiume" | "kike" })
            }
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kiume" id="kiume" />
              <Label htmlFor="kiume" className="font-normal cursor-pointer">
                Me (Kiume)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kike" id="kike" />
              <Label htmlFor="kike" className="font-normal cursor-pointer">
                Ke (Kike)
              </Label>
            </div>
          </RadioGroup>
          {errors.jinsia && (
            <p className="text-sm text-destructive">{errors.jinsia}</p>
          )}
        </div>

        {/* Date of Birth */}
        {/* Date of Birth */}
        <div className="space-y-2">
          <Label className="input-label">
            Tarehe ya Kuzaliwa <span className="text-destructive">*</span>
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.tareheKuzaliwa && "text-muted-foreground",
                  errors.tareheKuzaliwa && "border-destructive"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.tareheKuzaliwa
                  ? format(data.tareheKuzaliwa, "dd/MM/yyyy")
                  : "Chagua tarehe ya kuzaliwa"}
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto p-3">
              {/* Year Selector */}
              <div className="mb-2">
                <select
                  className="w-full border rounded-md px-2 py-1 text-sm"
                  value={
                    data.tareheKuzaliwa
                      ? data.tareheKuzaliwa.getFullYear()
                      : new Date().getFullYear()
                  }
                  onChange={(e) => {
                    const year = Number(e.target.value);
                    const current = data.tareheKuzaliwa ?? new Date();
                    updateData({
                      tareheKuzaliwa: new Date(
                        year,
                        current.getMonth(),
                        current.getDate()
                      ),
                    });
                  }}
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1939 },
                    (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>

              {/* Calendar */}
              <Calendar
                mode="single"
                selected={data.tareheKuzaliwa ?? undefined}
                onSelect={(date) =>
                  updateData({ tareheKuzaliwa: date ?? null })
                }
                disabled={(date) =>
                  date > new Date() || date < new Date("1940-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {errors.tareheKuzaliwa && (
            <p className="text-sm text-destructive">
              Tafadhali chagua tarehe sahihi ya kuzaliwa
            </p>
          )}
        </div>

        {/* Chuo */}
        <div className="space-y-2">
          <Label className="input-label">Chagua Chuo</Label>
          <Select
            value={data.chuo}
            onValueChange={(value) => updateData({ chuo: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chagua chuo" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {chuo.map((chuo) => (
                <SelectItem key={chuo} value={chuo}>
                  {chuo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="input-label">Chagua Fani</Label>
          <Select
            value={data.fani}
            onValueChange={(value) => updateData({ fani: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chagua fani" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {fani.map((fani) => (
                <SelectItem key={fani} value={fani}>
                  {fani}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        
          <div className="space-y-2">
          <Label className="input-label">Chagua Kitambulisho <span className="text-destructive">*</span></Label>
          <Select
            value={data.ainayakitambulisho}
            onValueChange={(value) => updateData({ ainayakitambulisho: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chagua Kitambulisho" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {vitambulisho.map((vitambulisho) => (
                <SelectItem key={vitambulisho} value={vitambulisho}>
                  {vitambulisho}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

         {/* ID/Passport Number */}
        <div className="space-y-2">
          <Label htmlFor="nambaKitambulisho" className="input-label">
            Namba ya Kitambulisho <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nambaKitambulisho"
            value={data.nambaKitambulisho}
            onChange={(e) => updateData({ nambaKitambulisho: e.target.value })}
            placeholder="Andika namba yako ya kitambulisho"
            className={errors.nambaKitambulisho ? "border-destructive" : ""}
          />
          {errors.nambaKitambulisho && (
            <p className="text-sm text-destructive">
              {errors.nambaKitambulisho}
            </p>
          )}
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <Label htmlFor="uraia" className="input-label">
            Uraia
          </Label>
          <Input
            id="uraia"
            value={data.uraia}
            onChange={(e) => updateData({ uraia: e.target.value })}
            placeholder="Mfano: Tanzania"
          />
        </div>

       

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="jinalamzazi" className="input-label">
            Jina Kamili la Mzazi <span className="text-destructive">*</span>
          </Label>
          <Input
            id="jinaKamililamzazi"
            value={data.jinaKamililamzazi}
            onChange={(e) => updateData({ jinaKamililamzazi: e.target.value })}
            placeholder="Andika jina la mzazi / mlezi "
            className={errors.jinaKamililamzazi ? "border-destructive" : ""}
          />
          {errors.jinaKamililamzazi && (
            <p className="text-sm text-destructive">
              {errors.jinaKamililamzazi}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="anwaniMakazi" className="input-label">
            Anwani ya Makazi
          </Label>
          <Textarea
            id="anwaniMakazi"
            value={data.anwaniMakazi}
            onChange={(e) => updateData({ anwaniMakazi: e.target.value })}
            placeholder="Andika anwani yako kamili"
            rows={3}
          />
        </div>

        {/* Region and District */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="input-label">
              Mkoa <span className="text-destructive">*</span>
            </Label>
            <Select
              value={data.mkoa}
              onValueChange={(value) => updateData({ mkoa: value, wilaya: "" })}
            >
              <SelectTrigger
                className={errors.mkoa ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Chagua mkoa" />
              </SelectTrigger>
              <SelectContent className="bg-popover max-h-60">
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.mkoa && (
              <p className="text-sm text-destructive">{errors.mkoa}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="input-label">
              Wilaya <span className="text-destructive"> * </span>
            </Label>
            <Select
              value={data.wilaya}
              onValueChange={(value) => updateData({ wilaya: value })}
              disabled={!data.mkoa}
            >
              <SelectTrigger
                className={errors.wilaya ? "border-destructive" : ""}
              >
                <SelectValue
                  placeholder={
                    data.mkoa ? "Chagua wilaya" : "Chagua mkoa kwanza"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-popover max-h-60">
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.wilaya && (
              <p className="text-sm text-destructive">{errors.wilaya}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
