import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, Baby, ArrowLeft, Phone, Mail } from "lucide-react";

interface LoginPageProps {
  onLogin: (userData: any) => void;
  onBackToHome: () => void;
  onShowRegister: () => void;
}

export function LoginPage({ onLogin, onBackToHome, onShowRegister }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'une connexion
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simule l'API call
      
      // Validation simple pour la démo
      if (formData.email === 'demo@ematernite.ci' && formData.password === 'demo123') {
        onLogin({
          id: '1',
          name: 'Sarah Kouamé',
          email: formData.email,
          phone: '+225 07 88 99 11 22',
          userType: 'parent'
        });
      } else {
        setError('Email ou mot de passe incorrect. Utilisez demo@ematernite.ci / demo123 pour tester.');
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error on input change
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBackToHome}>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Baby className="h-8 w-8 text-primary" />
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

            {/* Demo credentials */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2">
                <strong>Compte de démonstration :</strong>
              </p>
              <p className="text-xs text-center">
                Email: demo@ematernite.ci<br/>
                Mot de passe: demo123
              </p>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Connexion avec SMS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
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
      </main>
    </div>
  );
}