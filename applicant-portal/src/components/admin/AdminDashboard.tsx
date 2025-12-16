import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LogOut, 
  Search, 
  Download, 
  Filter,
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationDetailModal } from "./ApplicationDetailModal";

interface AdminDashboardProps {
  onLogout: () => void;
}

// Mock data for demonstration
const mockApplications = [
  {
    id: "1",
    referenceNumber: "YEFFA-2024-ABC123",
    jinaKamili: "Juma Hassan Mwamba",
    mkoa: "Dar es Salaam",
    wilaya: "Kinondoni",
    nambaSimu: "+255712345678",
    baruaPepe: "juma@example.com",
    status: "pending" as const,
    createdAt: "2024-01-15",
    jinsia: "kiume" as const,
    tareheKuzaliwa: "1995-05-20",
    haliNdoa: "Hajaoa/Hajaolewa (Single)",
    uraia: "Tanzania",
    nambaKitambulisho: "19950520-12345-00001-23",
    anwaniMakazi: "Mikocheni B, Dar es Salaam",
    kiwagoElimu: "Shahada ya Kwanza (Bachelor's Degree)",
    taasisiShule: "Chuo Kikuu cha Dar es Salaam",
    koziFani: "Sayansi ya Kompyuta",
    mwakaKuhitimu: "2020",
    kaziShughuli: "Software Developer",
    mwajiriTaasisi: "Tech Solutions Ltd",
    uzoefuKazi: "Nimefanya kazi kama software developer kwa miaka 3",
    sababuKujiunga: "Nataka kujifunza zaidi na kuchangia katika jamii",
    matarajioYEFFA: "Kupata mafunzo na mtandao wa vijana wenzangu",
  },
  {
    id: "2",
    referenceNumber: "YEFFA-2024-DEF456",
    jinaKamili: "Maria Joseph Kimaro",
    mkoa: "Kilimanjaro",
    wilaya: "Moshi MC",
    nambaSimu: "+255754321098",
    baruaPepe: "maria@example.com",
    status: "review" as const,
    createdAt: "2024-01-14",
    jinsia: "kike" as const,
    tareheKuzaliwa: "1998-08-15",
    haliNdoa: "Hajaoa/Hajaolewa (Single)",
    uraia: "Tanzania",
    nambaKitambulisho: "19980815-12345-00002-45",
    anwaniMakazi: "Shanty Town, Moshi",
    kiwagoElimu: "Stashahada (Diploma)",
    taasisiShule: "DIT",
    koziFani: "Business Administration",
    mwakaKuhitimu: "2021",
    kaziShughuli: "Business Owner",
    mwajiriTaasisi: "Self-employed",
    uzoefuKazi: "Nina biashara yangu ya nguo kwa miaka 2",
    sababuKujiunga: "Kutaka kupanua biashara yangu na kujifunza ujasiriamali",
    matarajioYEFFA: "Mafunzo ya biashara na mtaji",
  },
  {
    id: "3",
    referenceNumber: "YEFFA-2024-GHI789",
    jinaKamili: "Peter Athanas Mollel",
    mkoa: "Arusha",
    wilaya: "Arusha City",
    nambaSimu: "+255789012345",
    baruaPepe: "peter@example.com",
    status: "approved" as const,
    createdAt: "2024-01-10",
    jinsia: "kiume" as const,
    tareheKuzaliwa: "1997-03-10",
    haliNdoa: "Ameoa/Ameolewa (Married)",
    uraia: "Tanzania",
    nambaKitambulisho: "19970310-12345-00003-67",
    anwaniMakazi: "Sakina, Arusha",
    kiwagoElimu: "Shahada ya Kwanza (Bachelor's Degree)",
    taasisiShule: "NM-AIST",
    koziFani: "Environmental Engineering",
    mwakaKuhitimu: "2019",
    kaziShughuli: "Environmental Consultant",
    mwajiriTaasisi: "Green Earth Consultants",
    uzoefuKazi: "Kazi ya uhandisi wa mazingira kwa miaka 4",
    sababuKujiunga: "Kutaka kuchangia katika uhifadhi wa mazingira",
    matarajioYEFFA: "Network ya vijana wanaojali mazingira",
  },
  {
    id: "4",
    referenceNumber: "YEFFA-2024-JKL012",
    jinaKamili: "Fatuma Said Bakari",
    mkoa: "Mwanza",
    wilaya: "Nyamagana",
    nambaSimu: "+255678901234",
    baruaPepe: "fatuma@example.com",
    status: "rejected" as const,
    createdAt: "2024-01-08",
    jinsia: "kike" as const,
    tareheKuzaliwa: "2000-12-01",
    haliNdoa: "Hajaoa/Hajaolewa (Single)",
    uraia: "Tanzania",
    nambaKitambulisho: "20001201-12345-00004-89",
    anwaniMakazi: "Isamilo, Mwanza",
    kiwagoElimu: "Sekondari Kidato cha 6 (Form 6)",
    taasisiShule: "Mwanza Sekondari",
    koziFani: "Arts",
    mwakaKuhitimu: "2022",
    kaziShughuli: "Student",
    mwajiriTaasisi: "N/A",
    uzoefuKazi: "Bado sina uzoefu wa kazi",
    sababuKujiunga: "Kutaka kujifunza skills mpya",
    matarajioYEFFA: "Mafunzo na fursa za kazi",
  },
];

const statusLabels = {
  pending: { label: "Inasubiri", icon: Clock, className: "status-pending" },
  review: { label: "Inakaguliwa", icon: FileText, className: "status-review" },
  approved: { label: "Imekubaliwa", icon: CheckCircle, className: "status-approved" },
  rejected: { label: "Imekataliwa", icon: XCircle, className: "status-rejected" },
};

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch = 
      app.jinaKamili.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.mkoa.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockApplications.length,
    pending: mockApplications.filter((a) => a.status === "pending").length,
    review: mockApplications.filter((a) => a.status === "review").length,
    approved: mockApplications.filter((a) => a.status === "approved").length,
    rejected: mockApplications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">Y</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">YEFFA Admin</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Toka
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Jumla</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Zinasubiri</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-info/10">
                <FileText className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.review}</p>
                <p className="text-sm text-muted-foreground">Zinakaguliwa</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary/10">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
                <p className="text-sm text-muted-foreground">Zimekubaliwa</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
                <p className="text-sm text-muted-foreground">Zimekataliwa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tafuta kwa jina, namba ya maombi, au mkoa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Hali" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">Zote</SelectItem>
                  <SelectItem value="pending">Zinasubiri</SelectItem>
                  <SelectItem value="review">Zinakaguliwa</SelectItem>
                  <SelectItem value="approved">Zimekubaliwa</SelectItem>
                  <SelectItem value="rejected">Zimekataliwa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Namba</TableHead>
                <TableHead>Jina Kamili</TableHead>
                <TableHead className="hidden md:table-cell">Mkoa</TableHead>
                <TableHead className="hidden lg:table-cell">Simu</TableHead>
                <TableHead>Hali</TableHead>
                <TableHead className="hidden sm:table-cell">Tarehe</TableHead>
                <TableHead className="text-right">Vitendo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => {
                const status = statusLabels[application.status];
                const StatusIcon = status.icon;

                return (
                  <TableRow key={application.id}>
                    <TableCell className="font-mono text-sm">
                      {application.referenceNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {application.jinaKamili}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {application.mkoa}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {application.nambaSimu}
                    </TableCell>
                    <TableCell>
                      <span className={`status-badge ${status.className}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {application.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Angalia
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredApplications.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Hakuna maombi yaliyopatikana</p>
            </div>
          )}
        </div>
      </main>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}
