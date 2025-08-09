import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Users, Info, Mic, Clock, Building, HelpCircle } from "lucide-react";

/**
 * Navbar experimental con diseño sticky que se adapta al scroll
 * Incluye efectos de glassmorphism y animaciones suaves
 */
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navegación suave a las secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'speakers', label: 'Speakers', icon: Mic },
    { id: 'schedule', label: 'Agenda', icon: Clock },
    { id: 'sponsors', label: 'Sponsors', icon: Building },
    { id: 'community', label: 'Comunidades', icon: Users },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className="relative">
                <img 
                  src="/assets/logo-csweek.png" 
                  alt="CS WEEK 2025 Logo" 
                  className="w-10 h-10 rounded-lg group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  CS WEEK
                </span>
                <span className="text-secondary ml-1">2025</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className="group relative px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-primary/10"
                    onClick={() => scrollToSection(item.id)}
                  >
                    <IconComponent className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                    {item.label}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                  </Button>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                variant="hero"
                size="sm"
                className="animate-glow-pulse"
                onClick={() => window.open('https://lu.ma/alaqbwzh?fbclid=PAZXh0bgNhZW0CMTEAAadzewIeuJoItjKgJQcFxaT14caJkEyn12FiJxGIEY0HXhxgXxZAmlsuwJsg7Q_aem_n6g6ZINLkRx0bPK5q8spGw', '_blank')}
              >
                Regístrate ahora
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-background/95 backdrop-blur-xl border-t border-border/50">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start text-left group transition-all duration-300"
                    onClick={() => scrollToSection(item.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent className="w-4 h-4 mr-3 group-hover:text-primary transition-colors" />
                    {item.label}
                  </Button>
                );
              })}
              
              {/* Botón de registro en menú móvil */}
              <Button
                variant="hero"
                className="w-full mt-4 animate-glow-pulse"
                onClick={() => {
                  window.open('https://lu.ma/alaqbwzh?fbclid=PAZXh0bgNhZW0CMTEAAadzewIeuJoItjKgJQcFxaT14caJkEyn12FiJxGIEY0HXhxgXxZAmlsuwJsg7Q_aem_n6g6ZINLkRx0bPK5q8spGw', '_blank');
                  setIsMobileMenuOpen(false);
                }}
                style={{ animationDelay: `${navItems.length * 0.1}s` }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Regístrate ahora
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer para evitar que el contenido se oculte bajo el navbar */}
      <div className="h-16"></div>
    </>
  );
};