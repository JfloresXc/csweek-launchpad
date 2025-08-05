export const CommunitySection = () => {
  const communities = [
    {
      name: "IEEE Computer Society UNTELS",
      logo: "🎓",
      description: "Universidad Nacional Tecnológica de Lima Sur",
    },
    {
      name: "IEEE CS UNI",
      logo: "⚡",
      description: "Universidad Nacional de Ingeniería",
    },
    {
      name: "IEEE CS UNMSM",
      logo: "🏛️",
      description: "Universidad Nacional Mayor de San Marcos",
    },
    {
      name: "IEEE CS UPC",
      logo: "🚀",
      description: "Universidad Peruana de Ciencias Aplicadas",
    },
    {
      name: "IEEE CS PUCP",
      logo: "⭐",
      description: "Pontificia Universidad Católica del Perú",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/10">
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