import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { authenticateUser, demoUsers } from '../utils/demo-users';
import { 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Phone, 
  Mail,
  ChevronLeft,
  ChevronRight,
  Heart,
  Syringe,
  TrendingUp,
  Stethoscope,
  Info
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

export function LoginPage({ onLogin, onBackToHome, onShowRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = authenticateUser(formData.email, formData.password);
      
      if (user) {
        onLogin(user);
      } else {
        setError('Email ou mot de passe incorrect. Utilisez les comptes de démonstration ci-dessous.');
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (userKey) => {
    const user = demoUsers[userKey];
    setFormData({
      email: user.email,
      password: user.password
    });
    setShowDemoAccounts(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const currentSlideData = carouselSlides[currentSlide];
  const SlideIcon = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBackToHome}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="font-semibold text-primary">Manmi Ba</h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Carousel Section */}
          <div className="relative order-2 lg:order-1">
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
          </div>

          {/* Login Form Section */}
          <div className="order-1 lg:order-2">
            <Card className="shadow-xl">
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Connexion</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Accédez à votre carnet de santé numérique
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Comptes de démonstration */}
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-900 font-medium">Comptes de démonstration</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                        className="text-blue-600 hover:text-blue-700 h-auto py-1"
                      >
                        {showDemoAccounts ? 'Masquer' : 'Afficher'}
                      </Button>
                    </div>
                    
                    {showDemoAccounts && (
                      <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                        <div className="grid gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('admin')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">👨‍💼</span>
                            <div className="text-xs">
                              <div className="font-semibold">Administrateur</div>
                              <div className="text-muted-foreground">admin@manmiba.ci</div>
                            </div>
                          </Button>
                          
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('sarahKouame')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">📱</span>
                            <div className="text-xs">
                              <div className="font-semibold">Maman urbaine - Sarah</div>
                              <div className="text-muted-foreground">sarah.kouame@gmail.com</div>
                            </div>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('kouassiDavid')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">👨‍👦</span>
                            <div className="text-xs">
                              <div className="font-semibold">Papa célibataire - David</div>
                              <div className="text-muted-foreground">kouassi.david@gmail.com</div>
                            </div>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('jeanClaudeBamba')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">🕊️</span>
                            <div className="text-xs">
                              <div className="font-semibold">Papa veuf - Jean-Claude</div>
                              <div className="text-muted-foreground">jc.bamba@gmail.com</div>
                            </div>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('aminataTraore')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">🤰</span>
                            <div className="text-xs">
                              <div className="font-semibold">Future maman - Aminata</div>
                              <div className="text-muted-foreground">aminata.traore@gmail.com</div>
                            </div>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('drNguessan')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">👩‍⚕️</span>
                            <div className="text-xs">
                              <div className="font-semibold">Médecin - Dr. N'Guessan</div>
                              <div className="text-muted-foreground">dr.nguessan@chu-yopougon.ci</div>
                            </div>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('ayaSageFemme')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">🤱</span>
                            <div className="text-xs">
                              <div className="font-semibold">Sage-femme - Aya</div>
                              <div className="text-muted-foreground">sage.aya@maternite-cocody.ci</div>
                            </div>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleDemoLogin('marieInfirmiere')}
                            className="justify-start text-left h-auto py-2"
                          >
                            <span className="mr-2">💉</span>
                            <div className="text-xs">
                              <div className="font-semibold">Infirmière - Marie</div>
                              <div className="text-muted-foreground">marie.infirmiere@pmi-marcory.ci</div>
                            </div>
                          </Button>
                        </div>
                        <p className="text-xs text-blue-700 mt-3 italic">
                          Cliquez sur un compte pour remplir automatiquement les champs
                        </p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="votre@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </form>

                <div className="text-center">
                  <Button variant="link" size="sm">
                    Mot de passe oublié ?
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-sm text-center text-muted-foreground">
                    Pas encore de compte ?
                  </p>
                  <Button variant="outline" className="w-full" onClick={onShowRegister}>
                    Créer un compte
                  </Button>
                </div>



                <div className="space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Connexion avec SMS
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Footer Links */}
            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>En vous connectant, vous acceptez nos</p>
              <div className="flex justify-center gap-4 mt-1">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Conditions d'utilisation
                </Button>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Politique de confidentialité
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
