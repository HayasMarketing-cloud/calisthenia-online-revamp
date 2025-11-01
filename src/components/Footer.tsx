import { Instagram, Youtube, Mail, MapPin } from "lucide-react";
import logoFooter from "@/assets/logo-footer.webp";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="mb-2">
              <img 
                src={logoFooter} 
                alt="Calistenia Online" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transformando vidas a través de la calistenia y el entrenamiento funcional. 
              Tu mejor versión está a un entrenamiento de distancia.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
                <Youtube className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-primary">Entrenamientos</h4>
            <ul className="space-y-2">
              <li><a href="/rutina-brazos-calistenia/" className="text-gray-300 hover:text-white transition-colors">Brazos</a></li>
              <li><a href="/rutina-espalda-calistenia/" className="text-gray-300 hover:text-white transition-colors">Espalda</a></li>
                <li><a href="/rutina-abdominales-calistenia/" className="text-gray-300 hover:text-white transition-colors">Abdomen</a></li>
                <li><a href="/rutina-core-calistenia/" className="text-gray-300 hover:text-white transition-colors">Core</a></li>
                <li><a href="/rutina-piernas-calistenia/" className="text-gray-300 hover:text-white transition-colors">Piernas</a></li>
              <li><a href="/rutina-pecho-calistenia/" className="text-gray-300 hover:text-white transition-colors">Pecho</a></li>
              <li><a href="/rutina-full-body/" className="text-gray-300 hover:text-white transition-colors">Full Body</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-primary">Compañía</h4>
            <ul className="space-y-2">
              <li><a href="/quien-soy/" className="text-gray-300 hover:text-white transition-colors">Sobre Nico</a></li>
              <li><a href="/programas/" className="text-gray-300 hover:text-white transition-colors">Programas</a></li>
              <li><a href="/blog/" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/quien-soy/#metodologia" className="text-gray-300 hover:text-white transition-colors">Metodología</a></li>
              <li><a href="/#testimonios" className="text-gray-300 hover:text-white transition-colors">Testimonios</a></li>
              <li><a href="mailto:info@calisthenia.online" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-primary">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-300">info@calisthenia.online</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300">España</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm font-semibold text-primary mb-2">¿Tienes dudas?</p>
              <p className="text-sm text-gray-300">
                Únete a nuestra comunidad y resuelve todas tus preguntas sobre calistenia.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Calistenia Online. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;