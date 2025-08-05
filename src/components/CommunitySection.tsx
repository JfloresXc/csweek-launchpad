export const CommunitySection = () => {
  const communities = [
    {
      name: "IEEE Computer Society UNTELS",
      logo: "/assets/ieee-untels-logo.svg",
      description: "Universidad Nacional Tecnológica de Lima Sur",
    },
    {
      name: "IEEE CS UNI",
      logo: "/assets/ieee-uni-logo.svg",
      description: "Universidad Nacional de Ingeniería",
    },
    {
      name: "IEEE CS UNMSM",
      logo: "/assets/ieee-unmsm-logo.svg",
      description: "Universidad Nacional Mayor de San Marcos",
    },
    {
      name: "IEEE CS UPC",
      logo: "/assets/ieee-upc-logo.svg",
      description: "Universidad Peruana de Ciencias Aplicadas",
    },
    {
      name: "IEEE CS PUCP",
      logo: "/assets/ieee-pucp-logo.svg",
      description: "Pontificia Universidad Católica del Perú",
    },
    {
      name: "IEEE CS USIL",
      logo: "/assets/ieee-usil-logo.svg",
      description: "Universidad San Ignacio de Loyola",
    },
    {
      name: "IEEE CS UTEC",
      logo: "/assets/ieee-utec-logo.svg",
      description: "Universidad de Ingeniería y Tecnología",
    },
    {
      name: "IEEE CS ULIMA",
      logo: "/assets/ieee-ulima-logo.svg",
      description: "Universidad de Lima",
    },
  ];

  return (
    <section id="community" className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Organizado por la{" "}
            <span className="text-primary">comunidad</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Este evento es posible gracias a la colaboración de los capítulos estudiantiles de{" "}
            <span className="text-secondary font-semibold">IEEE Computer Society Perú</span>.
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-[slide-infinite_20s_linear_infinite] hover:pause-animation">
            {/* First set */}
            {communities.map((community, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-6 group"
                style={{ width: "280px" }}
              >
                <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-smooth text-center group-hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/30 transition-colors p-2">
                    <img 
                      src={community.logo} 
                      alt={`${community.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {community.description}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {communities.map((community, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-6 group"
                style={{ width: "280px" }}
              >
                <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-smooth text-center group-hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary/30 transition-colors">
                    {community.logo}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {community.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};