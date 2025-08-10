import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, Users, BookOpen, Mic, Lightbulb, Zap, Instagram, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre <span className="text-secondary">CS WEEK 2025</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubre más sobre el evento que está transformando la comunidad tecnológica universitaria
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12 mb-16 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold">Nuestra Misión</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            💡 Difundir la visión de la IEEE Computer Society, impulsar la participación estudiantil en tecnologías emergentes y fortalecer la comunidad técnica universitaria con actividades formativas, colaborativas y prácticas.
          </p>
        </div>

        {/* IEEE Computer Society Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">¿Qué es IEEE Computer Society?</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Es parte del IEEE (Institute of Electrical and Electronics Engineers) como el capítulo con más de 60,000 miembros en 168 países. Es la comunidad global que conecta ciencia, innovación y tecnología.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Donde impulsamos la informática, el procesamiento de datos y el desarrollo profesional de quienes construyen el futuro digital. 🌐
            </p>
          </div>

          <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-ai-green/20 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-ai-green" />
              </div>
              <h3 className="text-2xl font-bold">¿Qué es IEEE?</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              🌐 El Institute of Electrical and Electronics Engineers es una organización profesional sin fines de lucro, enfocada en el avance de la tecnología relacionada con la electricidad, la electrónica y las ciencias afines más grande del mundo 🌍
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Desde 1963 impulsa la ingeniería, la informática y la innovación a nivel global.
            </p>
          </div>
        </div>

        {/* IEEE Activities */}
        <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12 mb-16 shadow-card">
          <h3 className="text-3xl font-bold text-center mb-8">¿Por qué deberías conocer el IEEE?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-data-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-data-orange" />
              </div>
              <h4 className="font-semibold mb-2">📚 Publica investigaciones</h4>
              <p className="text-sm text-muted-foreground">Contenido académico de vanguardia</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-security-red/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-security-red" />
              </div>
              <h4 className="font-semibold mb-2">🎤 Organiza eventos</h4>
              <p className="text-sm text-muted-foreground">Conferencias y networking global</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-dev-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-dev-cyan" />
              </div>
              <h4 className="font-semibold mb-2">💡 Desarrolla estándares</h4>
              <p className="text-sm text-muted-foreground">Normas tecnológicas mundiales</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">🚀 Conecta mentes brillantes</h4>
              <p className="text-sm text-muted-foreground">¡Como la tuya!</p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h3 className="text-3xl font-bold mb-4">💥 Y prepárate, porque algo GRANDE está por llegar...</h3>
          <p className="text-lg text-muted-foreground">Mantente atento a nuestras próximas novedades</p>
        </div>

        {/* Social Media Section */}
        <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12 shadow-card">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">¡Etiquétanos en todas las redes!</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Queremos ver cómo lo pasas. Comparte tu experiencia con nosotros:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">#</div>
              <h4 className="font-bold text-lg mb-2">#CSWEEK2025</h4>
              <p className="text-sm text-muted-foreground">El hashtag principal del evento</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">#</div>
              <h4 className="font-bold text-lg mb-2">#IEEEComputerSociety</h4>
              <p className="text-sm text-muted-foreground">Nuestra comunidad global</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">#</div>
              <h4 className="font-bold text-lg mb-2">#ConectandoMentes</h4>
              <p className="text-sm text-muted-foreground">Uniendo talentos tecnológicos</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              📱 Comparte en nuestras redes sociales:
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="https://www.instagram.com/csweekperu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm font-medium"
              >
                <Instagram size={16} />
                Instagram
              </a>
              <a 
                href="https://twitter.com/csweekperu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-sm font-medium"
              >
                <Twitter size={16} />
                Twitter
              </a>
              <a 
                href="https://www.linkedin.com/company/csweekperu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 text-sm font-medium"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a 
                href="https://www.tiktok.com/@csweekperu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 text-sm font-medium"
              >
                <TikTokIcon className="w-4 h-4" />
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;