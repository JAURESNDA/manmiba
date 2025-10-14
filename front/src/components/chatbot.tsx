import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

export function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant santé. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Vaccination questions
    if (lowerMessage.includes('vaccin') || lowerMessage.includes('vaccination')) {
      return 'Pour les vaccinations, consultez l\'onglet "Vaccins" pour voir le calendrier PEV de Côte d\'Ivoire. N\'oubliez pas que le BCG est administré à la naissance, suivi du DTC-HepB-Hib à 2, 4 et 6 mois. Avez-vous une question spécifique sur un vaccin ?';
    }
    
    // Fever questions
    if (lowerMessage.includes('fièvre') || lowerMessage.includes('temperature')) {
      return 'En cas de fièvre chez l\'enfant : \n• Moins de 3 mois : consultez immédiatement\n• Plus de 3 mois et fièvre > 38.5°C : donnez du paracétamol (15mg/kg) et surveillez\n• Si fièvre persiste > 3 jours, consultez un médecin\n• Hydratez bien l\'enfant';
    }
    
    // Nutrition questions
    if (lowerMessage.includes('nutrition') || lowerMessage.includes('aliment') || lowerMessage.includes('manger')) {
      return 'Conseils nutrition selon l\'âge :\n• 0-6 mois : Allaitement maternel exclusif\n• 6-12 mois : Introduction progressive des aliments solides + allaitement\n• 12+ mois : Alimentation familiale variée\nConsultez l\'onglet "Nutrition" pour plus de détails !';
    }
    
    // Growth questions
    if (lowerMessage.includes('poids') || lowerMessage.includes('taille') || lowerMessage.includes('croissance')) {
      return 'Pour suivre la croissance de votre enfant, utilisez l\'onglet "Croissance" où vous trouverez les courbes de l\'OMS. Pesez votre enfant régulièrement et notez les mesures. Une prise de poids régulière est signe de bonne santé.';
    }
    
    // Emergency questions
    if (lowerMessage.includes('urgence') || lowerMessage.includes('grave') || lowerMessage.includes('danger')) {
      return '⚠️ SIGNES D\'URGENCE - Consultez immédiatement si :\n• Difficultés respiratoires\n• Convulsions\n• Refus de téter/manger\n• Vomissements répétés\n• Diarrhée sévère\n• Fièvre chez bébé < 3 mois\n• Léthargie inhabituelle\n\nEn cas d\'urgence, composez le 185 (Pompiers) ou rendez-vous au CHU le plus proche.';
    }
    
    // Pregnancy questions
    if (lowerMessage.includes('grossesse') || lowerMessage.includes('enceinte') || lowerMessage.includes('cpn')) {
      return 'Pour le suivi de grossesse :\n• 1ère CPN avant 12 semaines\n• CPN mensuelles ensuite\n• Minimum 4 CPN recommandées\n• Supplémentation en fer et acide folique\n• Vaccination antitétanique\nUtilisez la vue "Future Maman" pour suivre votre grossesse !';
    }
    
    // Malaria questions
    if (lowerMessage.includes('paludisme') || lowerMessage.includes('malaria') || lowerMessage.includes('palu')) {
      return 'Paludisme - Signes d\'alerte :\n• Fièvre élevée\n• Vomissements\n• Diarrhée\n• Léthargie\n\nPrévention :\n• Moustiquaire imprégnée\n• Traitement préventif (TPI) pour femmes enceintes\n• Consultez rapidement si symptômes';
    }
    
    // Default responses
    const defaultResponses = [
      'Je peux vous aider avec :\n• Vaccinations\n• Nutrition\n• Symptômes et urgences\n• Croissance de l\'enfant\n• Suivi de grossesse\n\nQue souhaitez-vous savoir ?',
      'Je suis là pour répondre à vos questions sur la santé de votre enfant. N\'hésitez pas à me poser des questions sur les vaccinations, la nutrition, ou tout autre sujet de santé.',
      'Pour une meilleure aide, pouvez-vous préciser votre question ? Par exemple : "Quand faire le vaccin BCG ?" ou "Mon bébé a de la fièvre, que faire ?"'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="fixed bottom-20 right-4 w-[calc(100vw-2rem)] max-w-md h-[500px] flex flex-col shadow-lg z-50">
      <CardHeader className="flex-shrink-0 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Assistant Santé
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>
                    {message.sender === 'bot' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-3 py-2 bg-muted">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
