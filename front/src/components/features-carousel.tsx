import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ChevronLeft,
  ChevronRight,
  Heart,
  Syringe,
  TrendingUp,
  Stethoscope
} from "lucide-react";

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1504888060547-83cbe78ccfe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbW90aGVyJTIwYmFieSUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzYwNjAzNTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Accompagnement personnalisé",
    description: "Un suivi complet de la santé de votre famille, du nouveau-né à l'adolescent",
    icon: Heart
  },
  {
    image: "https://images.unsplash.com/photo-1576765975429-d2d8cf8c0ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNjaW5hdGlvbiUyMGNoaWxkJTIwaGVhbHRofGVufDF8fHx8MTc2MDYwMzU3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Calendrier vaccinal PEV",
    description: "Rappels automatiques pour ne jamais manquer une vaccination importante",
    icon: Syringe
  },
  {
    image: "https://images.unsplash.com/photo-1661256545534-9770a8ea2146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVnbmFuY3klMjBoZWFsdGhjYXJlJTIwYWZyaWNhfGVufDF8fHx8MTc2MDYwMzU3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Courbes de croissance OMS",
    description: "Suivez le développement de votre enfant avec les standards internationaux",
    icon: TrendingUp
  },
  {
    image: "https://images.unsplash.com/photo-1758691463569-66de91d76452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA1OTQyODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Conseils santé experts",
    description: "Contenu éducatif validé par des pédiatres ivoiriens pour votre tranquillité",
    icon: Stethoscope
  }
];

export function FeaturesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const currentSlideData = carouselSlides[currentSlide];
  const SlideIcon = currentSlideData.icon;

  return (
    <Card className="overflow-hidden shadow-xl">
      <div className="relative h-96 lg:h-[500px]">
        <ImageWithFallback
          src={currentSlideData.image}
          alt={currentSlideData.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/90 p-2 rounded-full">
              <SlideIcon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold">{currentSlideData.title}</h3>
          </div>
          <p className="text-white/90 text-lg">
            {currentSlideData.description}
          </p>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
