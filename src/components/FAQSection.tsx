import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question: "¿Necesito equipos para empezar?",
    answer: "No, absolutamente ningún equipo es necesario. Todos nuestros programas están diseñados para trabajar únicamente con tu peso corporal. Lo único que necesitas es motivación y un espacio para entrenar."
  },
  {
    question: "¿Cuánto tiempo tardaré en ver resultados?",
    answer: "Los primeros resultados visibles suelen aparecer entre 4-6 semanas de entrenamiento constante. Sin embargo, sentirás mejoras en tu fuerza y energía desde la primera semana."
  },
  {
    question: "¿Es adecuado para principiantes?",
    answer: "¡Por supuesto! Tenemos programas específicos para todos los niveles, desde principiantes absolutos hasta atletas avanzados. Cada rutina incluye progresiones adaptadas a tu nivel actual."
  },
  {
    question: "¿Cómo accedo a las rutinas?",
    answer: "Una vez que te registres, tendrás acceso inmediato a todas las rutinas y programas desde cualquier dispositivo. Puedes entrenar cuando quieras y donde quieras."
  },
  {
    question: "¿Hay soporte personalizado?",
    answer: "Sí, ofrecemos soporte continuo a través de nuestra comunidad y acceso directo para resolver tus dudas sobre técnica, progresión y adaptación de los programas a tus necesidades."
  },
  {
    question: "¿Puedo entrenar si tengo lesiones previas?",
    answer: "Siempre recomendamos consultar con un médico antes de comenzar cualquier programa de ejercicios si tienes lesiones o condiciones médicas. Nuestros programas incluyen modificaciones, pero la seguridad es primero."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
              PREGUNTAS
              <span className="text-primary"> FRECUENTES</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Resolvemos tus dudas sobre Calistenia Online
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl px-6 border border-primary/10 shadow-card hover:shadow-elegant transition-shadow"
              >
                <AccordionTrigger className="font-display font-bold text-left hover:text-primary hover:no-underline py-6 text-lg">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-11">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
