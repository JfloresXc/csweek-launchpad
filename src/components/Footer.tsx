import { Linkedin, Instagram, Facebook } from "lucide-react";
import { TikTokIcon } from "./icons/TikTokIcon";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-background to-muted/20 border-t border-border py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Logo and Slogan */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="relative">
                <img 
                  src="/assets/logo-csweek.png" 
                  alt="CS WEEK 2025 Logo" 
                  className="w-12 h-12 rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  CS WEEK
                  <span className="text-secondary ml-2">2025</span>
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground">
              Conectando mentes, creando tecnología
            </p>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-6 text-foreground">Síguenos</h4>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/company/cs-week-per%C3%BA-2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-secondary hover:shadow-glow transition-smooth group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/csweekperu?igsh=NWQ3d2Y1ZGxkbzNy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-secondary hover:shadow-glow transition-smooth group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/share/1AiNyVUL1d/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-secondary hover:shadow-glow transition-smooth group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.tiktok.com/@csweekperu?_t=ZM-8yjxFSQHVBw&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-secondary hover:shadow-glow transition-smooth group"
              >
                <TikTokIcon className="group-hover:scale-110 transition-transform" size={20} />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-6 text-foreground">Computer Society</h4>
            <p className="text-muted-foreground">
              © 2025 CS Week. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Hecho con ❤️ por la comunidad estudiantil IEEE Computer Society Perú
          </p>
        </div>
      </div>
    </footer>
  );
};