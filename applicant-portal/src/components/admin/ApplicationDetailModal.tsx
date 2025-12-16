import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  X, 
  User, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Heart,
  Download,
  CheckCircle,
  Clock,
  FileText,
  XCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ApplicationDetailModalProps {
  application: {
    id: string;
    referenceNumber: string;
    jinaKamili: string;
    jinsia: string;
    tareheKuzaliwa: string;
    haliNdoa: string;
    uraia: string;
    nambaKitambulisho: string;
    anwaniMakazi: string;
    mkoa: string;
    wilaya: string;
    nambaSimu: string;
    baruaPepe: string;
    kiwagoElimu: string;
    taasisiShule: string;
    koziFani: string;
    mwakaKuhitimu: string;
    kaziShughuli: string;
    mwajiriTaasisi: string;
    uzoefuKazi: string;
    sababuKujiunga: string;
    matarajioYEFFA: string;
    status: 'pending' | 'review' | 'approved' | 'rejected';
    createdAt: string;
  };
  onClose: () => void;
}

const statusConfig = {
  pending: { label: "Inasubiri", icon: Clock, className: "status-pending" },
  review: { label: "Inakaguliwa", icon: FileText, className: "status-review" },
  approved: { label: "Imekubaliwa", icon: CheckCircle, className: "status-approved" },
  rejected: { label: "Imekataliwa", icon: XCircle, className: "status-rejected" },
};

function DetailSection({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded bg-primary/10">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="pl-8 space-y-2">
        {children}
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium text-foreground col-span-2">{value || "—"}</span>
    </div>
  );
}

export function ApplicationDetailModal({ application, onClose }: ApplicationDetailModalProps) {
  const [status, setStatus] = useState(application.status);
  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as typeof status);
    toast({
      title: "Hali Imebadilishwa",
      description: `Maombi yamewekwa hali: ${statusConfig[newStatus as keyof typeof statusConfig].label}`,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{application.jinaKamili}</DialogTitle>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                {application.referenceNumber}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status and Actions */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Hali:</span>
              <span className={`status-badge ${currentStatus.className}`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {currentStatus.label}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="pending">Inasubiri</SelectItem>
                  <SelectItem value="review">Inakaguliwa</SelectItem>
                  <SelectItem value="approved">Imekubaliwa</SelectItem>
                  <SelectItem value="rejected">Imekataliwa</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          {/* Personal Information */}
          <DetailSection icon={User} title="Taarifa Binafsi">
            <DetailItem label="Jina Kamili" value={application.jinaKamili} />
            <DetailItem label="Jinsia" value={application.jinsia === 'kiume' ? 'Me' : 'Ke'} />
            <DetailItem label="Tarehe ya Kuzaliwa" value={application.tareheKuzaliwa} />
            <DetailItem label="Hali ya Ndoa" value={application.haliNdoa} />
            <DetailItem label="Uraia" value={application.uraia} />
            <DetailItem label="Namba ya Kitambulisho" value={application.nambaKitambulisho} />
            <DetailItem label="Anwani" value={application.anwaniMakazi} />
            <DetailItem label="Mkoa / Wilaya" value={`${application.mkoa} / ${application.wilaya}`} />
          </DetailSection>

          {/* Contact Information */}
          <DetailSection icon={Phone} title="Mawasiliano">
            <DetailItem label="Simu" value={application.nambaSimu} />
            <DetailItem label="Barua Pepe" value={application.baruaPepe} />
          </DetailSection>

          {/* Education */}
          <DetailSection icon={GraduationCap} title="Elimu">
            <DetailItem label="Kiwango" value={application.kiwagoElimu} />
            <DetailItem label="Taasisi" value={application.taasisiShule} />
            <DetailItem label="Kozi" value={application.koziFani} />
            <DetailItem label="Mwaka wa Kuhitimu" value={application.mwakaKuhitimu} />
          </DetailSection>

          {/* Occupation */}
          <DetailSection icon={Briefcase} title="Kazi">
            <DetailItem label="Kazi/Shughuli" value={application.kaziShughuli} />
            <DetailItem label="Mwajiri" value={application.mwajiriTaasisi} />
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Uzoefu:</span>
              <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                {application.uzoefuKazi || "—"}
              </p>
            </div>
          </DetailSection>

          {/* Reason for Joining */}
          <DetailSection icon={Heart} title="Sababu ya Kujiunga">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Sababu:</span>
                <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                  {application.sababuKujiunga}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Matarajio:</span>
                <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                  {application.matarajioYEFFA}
                </p>
              </div>
            </div>
          </DetailSection>

          {/* Metadata */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Tarehe ya Kuwasilisha: {application.createdAt}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
