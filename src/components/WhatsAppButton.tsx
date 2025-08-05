// Removido MessageCircle, usando ícono SVG de WhatsApp personalizado
import { Button } from "@/components/ui/button";

/**
 * Botón flotante de WhatsApp que redirige a la comunidad
 * Diseñado para integrarse con el tema dark mode de CS WEEK 2025
 */
export const WhatsAppButton = () => {
  // URL de la comunidad de WhatsApp
  const whatsappGroupUrl = "https://chat.whatsapp.com/Hyaj9AHWqaS0D4f3sqJVz4?mode=ac_t";

  /**
   * Maneja el clic en el botón de WhatsApp
   * Abre el enlace de la comunidad en una nueva pestaña
   */
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('WhatsApp button clicked!', whatsappGroupUrl);
    window.open(whatsappGroupUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] group">
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
      <button
        onClick={handleWhatsAppClick}
        type="button"
        className="
          w-14 h-14 rounded-full 
          bg-gradient-to-br from-[#25D366] to-[#128C7E] 
          hover:from-[#128C7E] hover:to-[#25D366]
          border-2 border-[#25D366]/30
          shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]
          transition-all duration-300 ease-out
          group-hover:scale-110
          animate-pulse hover:animate-none
          cursor-pointer
          pointer-events-auto
          flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2
        "
      >
        {/* Ícono SVG de WhatsApp */}
        <svg 
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
        </svg>
      </button>

      {/* Efecto de ondas */}
      <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none"></div>
      <div className="absolute inset-0 rounded-full bg-[#25D366]/10 animate-ping pointer-events-none" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

/**
 * Componente alternativo para integrar en secciones específicas
 * Versión inline del botón de WhatsApp
 */
export const WhatsAppInlineButton = () => {
  const whatsappGroupUrl = "https://chat.whatsapp.com/Hyaj9AHWqaS0D4f3sqJVz4?mode=ac_t";

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
        w-full px-4 sm:px-6 md:px-8
        text-sm sm:text-base
      "
      size="lg"
    >
      {/* Ícono SVG de WhatsApp */}
      <svg 
        className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform flex-shrink-0" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
      </svg>
      <span className="truncate">
        <span className="hidden sm:inline">Únete al WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </span>
    </Button>
  );
};