import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, X } from "lucide-react";

const EVENT_DATE = new Date("2025-01-17T10:00:00");
const STORAGE_KEY = "event-popup-dismissed";
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Verificar si ya fue cerrado recientemente
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < DISMISS_DURATION_MS) {
        return; // No mostrar el popup
      }
    }

    // Mostrar después de 2.5 segundos
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = EVENT_DATE.getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-secondary via-secondary to-secondary/95 border-primary/20 text-white p-0 overflow-hidden">
        {/* Header con imagen decorativa */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary/80 to-primary" />
        
        <div className="p-6 pt-8">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Taller Presencial · 2h
              </Badge>
              <Badge className="bg-white/10 text-white/90 border-white/20 text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                Madrid
              </Badge>
            </div>
            
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center leading-tight">
              Funcional Bodybuilding{" "}
              <span className="text-primary">+30</span>
            </DialogTitle>
            
            <p className="text-white/80 text-center text-sm">
              Aprende a combinar calistenia y pesas para ganar músculo de forma inteligente después de los 30.
            </p>
          </DialogHeader>

          {/* Countdown compacto */}
          <div className="mt-6">
            <p className="text-xs text-white/60 text-center mb-3 uppercase tracking-wide">
              El taller comienza en:
            </p>
            <div className="flex justify-center gap-2">
              {timeUnits.map((unit) => (
                <div key={unit.label} className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 min-w-[50px] border border-white/10">
                    <span className="text-xl md:text-2xl font-bold tabular-nums text-white">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[10px] mt-1 text-white/60 uppercase tracking-wide">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fecha destacada */}
          <div className="flex items-center justify-center gap-2 mt-6 text-white/90">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">17 de Enero, 2025</span>
          </div>

          {/* CTA */}
          <div className="mt-6 space-y-3">
            <Button 
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
            >
              <Link to="/funcional-bodybuilding" onClick={handleClose}>
                Ver Detalles del Taller
              </Link>
            </Button>
            
            <button
              onClick={handleClose}
              className="w-full text-white/60 hover:text-white/80 text-sm py-2 transition-colors"
            >
              Quizás más tarde
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopup;
