import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ApplicationForm } from "@/components/application/ApplicationForm";

const Apply = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Fomu ya Maombi
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Jaza fomu hii ili kuwasilisha maombi yako ya kujiunga na YEFFA. 
            Taarifa zote zinazohitajika zimeandikwa na alama ya nyota (*).
          </p>
        </div>

        <ApplicationForm />
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
