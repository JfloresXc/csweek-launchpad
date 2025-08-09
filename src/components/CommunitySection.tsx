import { Users } from "lucide-react";

export const CommunitySection = () => {
  const communities = [
    {
      name: "IEEE Computer Society UNTELS",
      logo: "/assets/ieee-untels-logo.svg",
      description: "Universidad Nacional Tecnológica de Lima Sur",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UNI",
      logo: "/assets/ieee-uni-logo.svg",
      description: "Universidad Nacional de Ingeniería",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UNMSM",
      logo: "/assets/ieee-unmsm-logo.svg",
      description: "Universidad Nacional Mayor de San Marcos",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UPC",
      logo: "/assets/ieee-upc-logo.svg",
      description: "Universidad Peruana de Ciencias Aplicadas",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS PUCP",
      logo: "/assets/ieee-pucp-logo.svg",
      description: "Pontificia Universidad Católica del Perú",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS USIL",
      logo: "/assets/ieee-usil-logo.svg",
      description: "Universidad San Ignacio de Loyola",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS UTEC",
      logo: "/assets/ieee-utec-logo.svg",
      description: "Universidad de Ingeniería y Tecnología",
      url: "https://www.ieee.org/",
    },
    {
      name: "IEEE CS ULIMA",
      logo: "/assets/ieee-ulima-logo.svg",
      description: "Universidad de Lima",
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
                style={{ width: "320px", height: "200px" }}
                onClick={() => handleCommunityClick(community.url)}
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo container */}
                  <div className="relative w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:border-primary/40 transition-all duration-300">
                    <img 
                      src={community.logo} 
                      alt={`${community.name} logo`}
                      className="w-10 h-10 object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300"
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
            
            {/* Duplicate set for seamless loop */}
            {communities.map((community, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-6 group cursor-pointer"
                style={{ width: "320px", height: "200px" }}
                onClick={() => handleCommunityClick(community.url)}
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo container */}
                  <div className="relative w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:border-primary/40 transition-all duration-300">
                    <img 
                      src={community.logo} 
                      alt={`${community.name} logo`}
                      className="w-10 h-10 object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300"
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