import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, Baby, ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react";

interface RegisterPageProps {
  onRegister: (userData: any) => void;
  onBackToHome: () => void;
  onShowLogin: () => void;
}

export function RegisterPage({ onRegister, onBackToHome, onShowLogin }: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
    situation: '',
    city: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cities = [
    'Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro', 
    'Korhogo', 'Man', 'Divo', 'Gagnoa', 'Abengourou'
  ];

  const situations = [
    { value: 'urbaine-connectee', label: 'Maman urbaine connectée', icon: '📱', description: 'Active, connectée et urbaine' },
    { value: 'rurale-debrouillarde', label: 'Maman rurale débrouillarde', icon: '🌾', description: 'Autonome et proche de la nature' },
    { value: 'future-maman-moderne', label: 'Future maman moderne', icon: '🤰', description: 'Enceinte et bien informée' },
    { value: 'grand-mere-gardienne', label: 'Grand-mère gardienne', icon: '👵', description: 'Gardienne des traditions' },
    { value: 'professionnelle-sante', label: 'Professionnelle de santé', icon: '👩‍⚕️', description: 'Soignante engagée' },
    { value: 'autre', label: 'Autre situation', icon: '👤', description: 'Une autre situation' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
      if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
      if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
      if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
      else if (!/^(\+225\s?)?[0-9\s]{8,15}$/.test(formData.phone)) newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (step === 2) {
      if (!formData.password) newErrors.password = 'Le mot de passe est requis';
      else if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      if (!formData.userType) newErrors.userType = 'Sélectionnez votre profil';
      if (!formData.situation) newErrors.situation = 'Sélectionnez votre situation';
      if (!formData.city) newErrors.city = 'Sélectionnez votre ville';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simule l'API call
      
      onRegister({
        id: Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType,
        situation: formData.situation,
        city: formData.city
      });
    } catch {
      setErrors({ submit: 'Erreur lors de la création du compte. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={currentStep === 1 ? onBackToHome : handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="flex items-center gap-2">
            <Baby className="h-6 w-6 text-primary" />
            <h1 className="font-semibold">Manmi Ba</h1>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Progress indicator */}
      <div className="px-4 py-3 bg-muted/20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Étape {currentStep} sur 2</span>
            <span className="text-sm text-muted-foreground">{currentStep === 1 ? 'Informations personnelles' : 'Finalisation'}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-md">
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Baby className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Créer un compte</CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentStep === 1 
                ? 'Vos informations personnelles'
                : 'Finalisez votre inscription'
              }
            </p>
          </CardHeader>
          <CardContent>
            {errors.submit && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={currentStep === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Prénom"
                          className="pl-10"
                        />
                      </div>
                      {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Nom"
                      />
                      {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                    </div>
                  </div>

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
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+225 07 XX XX XX XX"
                        className="pl-10"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>

                  <Button type="submit" className="w-full">
                    Continuer
                  </Button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Au moins 6 caractères"
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
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Répétez le mot de passe"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Je suis</Label>
                    <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="pregnant">Future maman</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.userType && <p className="text-xs text-destructive">{errors.userType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Ma situation</Label>
                    <Select value={formData.situation} onValueChange={(value) => handleInputChange('situation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Décrivez votre situation" />
                      </SelectTrigger>
                      <SelectContent>
                        {situations.map((situation) => (
                          <SelectItem key={situation.value} value={situation.value}>
                            <div className="flex items-center gap-2">
                              <span>{situation.icon}</span>
                              <div className="flex flex-col">
                                <span className="font-medium">{situation.label}</span>
                                <span className="text-xs text-muted-foreground">{situation.description}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.situation && <p className="text-xs text-destructive">{errors.situation}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        J'accepte les conditions d'utilisation et la politique de confidentialité
                      </Label>
                      {errors.acceptTerms && <p className="text-xs text-destructive">{errors.acceptTerms}</p>}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Création du compte...' : 'Créer mon compte'}
                  </Button>
                </>
              )}
            </form>

            {currentStep === 1 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Déjà un compte ?{' '}
                  <Button variant="link" size="sm" className="h-auto p-0" onClick={onShowLogin}>
                    Se connecter
                  </Button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>En créant un compte, vous acceptez nos</p>
          <div className="flex justify-center gap-4 mt-1">
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              Conditions d'utilisation
            </Button>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              Politique de confidentialité
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}