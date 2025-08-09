import { Users } from "lucide-react";

export const CommunitySection = () => {
  // Función para obtener la ruta del logo, priorizando versiones específicas de communities
  const getCommunityLogo = (logoName: string) => {
    // Mapeo de logos específicos de communities cuando estén disponibles
    const communityLogos: Record<string, string> = {
      "ieee-pucp-logo.svg": "/assets/communities/ieee_pucp_rgb_pp.svg",
      "ieee-untels-logo.svg": "/assets/communities/ieee_untels_cs_rgb_pp_c.svg",
      "ieee-unmsm-logo.svg": "/assets/communities/ieee_unmsm_cs_rgb_pp_c.svg",
      "ieee-upc-logo.svg": "/assets/communities/ieee_upc_cs_rgb_pp_c.svg",
      "ieee-unsa-logo.svg": "/assets/communities/ieee-unsa.jpeg",
      "ieee-utp-logo.svg": "/assets/communities/ieee_utp_cs_rgb_pp.svg",
      "ieee-peru-logo.svg": "/assets/communities/ieee_peru_cs_rgb.svg",
    };
    
    // Si existe una versión específica de community, la usa; sino usa la versión estándar
    return communityLogos[logoName] || `/assets/${logoName}`;
  };

  // Función para determinar si una imagen necesita padding especial
  const needsSpecialPadding = (logoName: string) => {
    return logoName === "ieee-unsa-logo.svg";
  };

  const communities = [
    {
      name: "IEEE Computer Society UNTELS",
      logo: getCommunityLogo("ieee-untels-logo.svg"),
      description: "Universidad Nacional Tecnológica de Lima Sur",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UNMSM",
      logo: getCommunityLogo("ieee-unmsm-logo.svg"),
      description: "Universidad Nacional Mayor de San Marcos",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UPC",
      logo: getCommunityLogo("ieee-upc-logo.svg"),
      description: "Universidad Peruana de Ciencias Aplicadas",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS PUCP",
      logo: getCommunityLogo("ieee-pucp-logo.svg"),
      description: "Pontificia Universidad Católica del Perú",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UNSA",
      logo: getCommunityLogo("ieee-unsa-logo.svg"),
      description: "Universidad Nacional de San Agustín",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UTP",
      logo: getCommunityLogo("ieee-utp-logo.svg"),
      description: "Universidad Tecnológica del Perú",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE Computer Society Perú",
      logo: getCommunityLogo("ieee-peru-logo.svg"),
      description: "Capítulo Nacional de IEEE Computer Society",
      url: "https://www.ieee.org/",
    },
  ];

  const handleCommunityClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="community" className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="inline-flex items-center gap-2 bg-csweek-secondary/10 text-csweek-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Comunidad
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Organizado por la{" "}
            <span className="text-secondary">comunidad</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Este evento es posible gracias a la colaboración de los capítulos estudiantiles de{" "}
            <span className="text-primary font-semibold">IEEE Computer Society Perú</span>.
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative overflow-hidden py-4">
          <div className="flex animate-[slide-infinite_20s_linear_infinite] hover:pause-animation">
            {/* First set */}
            {communities.map((community, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-6 group cursor-pointer"
                style={{ width: "320px", height: "280px" }}
                onClick={() => handleCommunityClick(community.url)}
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo container */}
                  <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-centergroup-hover:border-primary/40 transition-all duration-300">
                    <img 
                      src={community.logo} 
                      alt={`${community.name} logo`}
                      className={`w-24 h-24 p-2 object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300 bg-white rounded-lg`}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-white text-base mb-2 group-hover:text-primary transition-colors duration-300">
                        {community.name}
                      </h3>
                      
                      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                        {community.description}
                      </p>
                    </div>
                    
                    {/* Subtle action hint */}
                    <div className="text-xs text-gray-500 group-hover:text-primary/70 transition-colors duration-300">
                      Conocer más →
                    </div>
                  </div>
                  
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-xl rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}

            {/* First set */}
            {communities.map((community, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-6 group cursor-pointer"
                style={{ width: "320px", height: "280px" }}
                onClick={() => handleCommunityClick(community.url)}
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo container */}
                  <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-centergroup-hover:border-primary/40 transition-all duration-300">
                    <img 
                      src={community.logo} 
                      alt={`${community.name} logo`}
                      className={`w-24 h-24 p-2 object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300 bg-white rounded-lg`}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-white text-base mb-2 group-hover:text-primary transition-colors duration-300">
                        {community.name}
                      </h3>
                      
                      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                        {community.description}
                      </p>
                    </div>
                    
                    {/* Subtle action hint */}
                    <div className="text-xs text-gray-500 group-hover:text-primary/70 transition-colors duration-300">
                      Conocer más →
                    </div>
                  </div>
                  
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-xl rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};