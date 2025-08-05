import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Botón flotante de WhatsApp que redirige a la comunidad
 * Diseñado para integrarse con el tema dark mode de CS WEEK 2025
 */
export const WhatsAppButton = () => {
  // URL de la comunidad de WhatsApp (reemplazar con el enlace real)
  const whatsappGroupUrl = "https://chat.whatsapp.com/your-group-invite-link";

  /**
   * Maneja el clic en el botón de WhatsApp
   * Abre el enlace de la comunidad en una nueva pestaña
   */
  const handleWhatsAppClick = () => {
    window.open(whatsappGroupUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gradient-card border border-border rounded-lg px-3 py-2 shadow-elevation">
          <p className="text-sm text-foreground whitespace-nowrap">
            Únete a nuestra comunidad
          </p>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
        </div>
      </div>

      {/* Botón Principal */}
      <Button
        onClick={handleWhatsAppClick}
        className="
          w-14 h-14 rounded-full 
          bg-gradient-to-br from-[#25D366] to-[#128C7E] 
          hover:from-[#128C7E] hover:to-[#25D366]
          border-2 border-[#25D366]/30
          shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]
          transition-all duration-300 ease-out
          group-hover:scale-110
          animate-pulse hover:animate-none
        "
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </Button>

      {/* Efecto de ondas */}
      <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping"></div>
      <div className="absolute inset-0 rounded-full bg-[#25D366]/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

/**
 * Componente alternativo para integrar en secciones específicas
 * Versión inline del botón de WhatsApp
 */
export const WhatsAppInlineButton = () => {
  const whatsappGroupUrl = "https://chat.whatsapp.com/your-group-invite-link";

  const handleWhatsAppClick = () => {
    window.open(whatsappGroupUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="
        bg-gradient-to-r from-[#25D366] to-[#128C7E] 
        hover:from-[#128C7E] hover:to-[#25D366]
        border border-[#25D366]/30
        text-white font-semibold
        shadow-lg hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]
        transition-all duration-300
        group
      "
      size="lg"
    >
      <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
      Únete al WhatsApp
    </Button>
  );
};