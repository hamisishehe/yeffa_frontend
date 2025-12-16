import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground"><img src="/public/veta.png" /></span>
              </div>
              <span className="font-bold text-foreground">VETA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Viungo</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Nyumbani
              </Link>
              <Link to="/apply" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Jisajili
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Mawasiliano</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>tovuti: www.veta.go.tz</p>
            </div>
          </div>

      
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VETA. Haki zote zimehifadhiwa.</p>
        </div>
      </div>
    </footer>
  );
}
