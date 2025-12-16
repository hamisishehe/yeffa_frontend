import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, FileText, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Fomu Rahisi",
      description: "Jaza fomu ya maombi hatua kwa hatua kwa urahisi",
    },
    {
      icon: Shield,
      title: "Usalama wa Data",
      description: "Taarifa zako zinahifadhiwa kwa usalama mkubwa",
    },

    {
      icon: CheckCircle,
      title: "Mchakato wa Haraka",
      description: "Maombi yako yatashughulikiwa kwa wakati",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="relative py-10">
  <div className="container max-w-5xl mx-auto px-4">
    {/* Intro */}
    <div className="text-center space-y-6 mb-14">
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        VETA kwa kushirikiana na AGRA na RUATI, AMSHA, TAMA na MIBOS
        inawatangazia wananchi wote wa Tanzania — hususan vijana,
        wanawake, na watu wenye mahitaji maalum — fursa ya kujiunga na
        <span className="font-semibold text-foreground">
          {" "}mafunzo ya muda mfupi
        </span>{" "}
        katika fani zifuatazo:
      </p>
    </div>

    {/* Courses */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
      {/* Card 1 */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            1
          </span>
          <span className="text-sm px-3 py-1 rounded-full bg-accent text-accent-foreground">
            Miezi 1
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Agro-Mechanics
        </h3>
       
      </div>

      {/* Card 2 */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            2
          </span>
          <span className="text-sm px-3 py-1 rounded-full bg-accent text-accent-foreground">
            Wiki 2
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Irrigation (Umwagiliaji)
        </h3>
        
      </div>

      {/* Card 3 */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            3
          </span>
          <span className="text-sm px-3 py-1 rounded-full bg-accent text-accent-foreground">
            Wiki 2
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Post-Harvest Technology
        </h3>
       
      </div>
    </div>

    {/* CTA */}
    <div className="flex justify-center">
      <Button size="xl" variant="hero" asChild>
        <Link to="/apply" className="flex items-center gap-2">
          Anza Maombi
          <ArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  </div>
</div>

        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Kwa Nini Utumie Portal Hii?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Tumetengeneza mfumo rahisi na salama wa kuwasilisha maombi yako
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Tayari Kuanza?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Jisajili sasa 
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/apply">
                  Wasilisha Maombi Sasa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
