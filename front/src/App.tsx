import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { ChildProfileCard } from './components/child-profile-card';
import { VaccinationCard } from './components/vaccination-card';
import { GrowthChart } from './components/growth-chart';
import { HealthJournalEntry } from './components/health-journal-entry';
import { PregnancyTracker } from './components/pregnancy-tracker';
import { SymptomsGuide } from './components/symptoms-guide';
import { NutritionCalculator } from './components/nutrition-calculator';
import { HealthcareDirectory } from './components/healthcare-directory';
import { CommunitySupport } from './components/community-support';
import { UserPersonas } from './components/user-personas';
import { LoginPage } from './components/login-page';
import { RegisterPage } from './components/register-page';
import { Chatbot } from './components/chatbot';
import { NotificationsPanel } from './components/notifications-panel';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoImage from 'figma:asset/9e13c5ebd83bf54eca3ccca342d73f30cf4d9ce4.png';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './components/ui/dropdown-menu';
import { 
  Home, 
  Users, 
  Syringe, 
  TrendingUp, 
  BookOpen, 
  GraduationCap,
  Plus,
  Bell,
  Settings,
  Baby,
  Heart,
  Stethoscope,
  Apple,
  MapPin,
  MessageCircle,
  LogIn,
  UserPlus,
  LogOut,
  User,
  MoreHorizontal,
  Bot
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedChild, setSelectedChild] = useState(null);
  const [userType, setUserType] = useState('parent');
  const [currentPage, setCurrentPage] = useState('app');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  const [children] = useState([
    {
      id: '1',
      name: 'Amina Kone',
      birthDate: '2023-03-15',
      bloodType: 'O+',
      allergies: ['Arachides'],
      gender: 'female'
    },
    {
      id: '2',
      name: 'Kouame Yao',
      birthDate: '2021-08-22',
      bloodType: 'A+',
      allergies: [],
      gender: 'male'
    }
  ]);

  const [vaccinations, setVaccinations] = useState([
    {
      id: '1',
      name: 'BCG',
      dueDate: '2023-03-15',
      status: 'completed',
      completedDate: '2023-03-15',
      ageInMonths: 0
    },
    {
      id: '2',
      name: 'DTC-HepB-Hib (1ère dose)',
      dueDate: '2023-05-15',
      status: 'completed',
      completedDate: '2023-05-16',
      ageInMonths: 2
    },
    {
      id: '3',
      name: 'Polio oral (1ère dose)',
      dueDate: '2023-05-15',
      status: 'completed',
      completedDate: '2023-05-16',
      ageInMonths: 2
    },
    {
      id: '4',
      name: 'DTC-HepB-Hib (2ème dose)',
      dueDate: '2023-07-15',
      status: 'due',
      ageInMonths: 4
    },
    {
      id: '5',
      name: 'Polio oral (2ème dose)',
      dueDate: '2023-07-15',
      status: 'overdue',
      ageInMonths: 4
    }
  ]);

  const [growthData] = useState([
    { age: 0, weight: 3.2, height: 49, date: '2023-03-15' },
    { age: 2, weight: 4.8, height: 56, date: '2023-05-15' },
    { age: 4, weight: 6.2, height: 61, date: '2023-07-15' },
    { age: 6, weight: 7.1, height: 65, date: '2023-09-15' }
  ]);

  const [healthEntries] = useState([
    {
      id: '1',
      date: '2024-01-15',
      type: 'illness',
      title: 'Fièvre légère',
      description: 'Fièvre durant la nuit, donné du paracétamol',
      temperature: 38.2,
      symptoms: ['Fièvre', 'Fatigue']
    },
    {
      id: '2',
      date: '2024-01-10',
      type: 'milestone',
      title: 'Premier sourire',
      description: 'Premier vrai sourire en réponse à nos sourires'
    },
    {
      id: '3',
      date: '2024-01-05',
      type: 'appointment',
      title: 'Consultation pédiatre',
      description: 'Visite de routine - tout va bien'
    }
  ]);

  const [pregnancyData] = useState([
    {
      weeksPregnant: 10,
      dueDate: '2023-12-01',
      lastMenstrualPeriod: '2023-08-01',
      weight: 65,
      bloodPressure: '120/80'
    }
  ]);

  const [pregnancyAppointments] = useState([
    {
      id: '1',
      type: 'ultrasound',
      date: '2023-09-15',
      status: 'completed',
      description: 'Ultrasound normal'
    },
    {
      id: '2',
      type: 'checkup',
      date: '2023-10-15',
      status: 'upcoming',
      description: 'Routine checkup'
    },
    {
      id: '3',
      type: 'blood test',
      date: '2023-11-15',
      status: 'overdue',
      description: 'Blood test overdue'
    }
  ]);

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  useEffect(() => {
    if (!selectedChild && children.length > 0) {
      setSelectedChild(children[0].id);
    }
  }, [children, selectedChild]);

  const handleMarkVaccinationComplete = (vaccinationId) => {
    setVaccinations(prev => 
      prev.map(vaccination => 
        vaccination.id === vaccinationId 
          ? { ...vaccination, status: 'completed', completedDate: new Date().toISOString() }
          : vaccination
      )
    );
  };

  const getPendingVaccinations = () => {
    return vaccinations.filter(v => v.status === 'due' || v.status === 'overdue').length;
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserType(userData.userType);
    setCurrentPage('app');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserType(userData.userType);
    setCurrentPage('app');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('app');
    setActiveTab('home');
  };

  // Handle page navigation
  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onBackToHome={() => setCurrentPage('app')}
        onShowRegister={() => setCurrentPage('register')}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <RegisterPage 
        onRegister={handleRegister}
        onBackToHome={() => setCurrentPage('app')}
        onShowLogin={() => setCurrentPage('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setCurrentPage('app');
              setActiveTab('home');
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            title="Retour à l'accueil"
          >
            <ImageWithFallback 
              src={logoImage}
              alt="Manmi Ba Logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="font-semibold">Manmi Ba</h1>
          </button>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  title="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {getPendingVaccinations() > 0 && (
                    <Badge className="ml-1 h-4 w-4 text-xs p-0 flex items-center justify-center">
                      {getPendingVaccinations()}
                    </Badge>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => alert('Paramètres - Fonctionnalité à venir')}
                  title="Paramètres"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  title="Déconnexion"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setCurrentPage('login')}>
                  <LogIn className="h-4 w-4 mr-1" />
                  Connexion
                </Button>
                <Button variant="default" size="sm" onClick={() => setCurrentPage('register')}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Inscription
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* User Type Toggle */}
      {isAuthenticated && (
        <div className="px-4 py-2 bg-muted/20 border-b">
          <div className="flex gap-2">
            <Button
              variant={userType === 'parent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUserType('parent')}
            >
              <Baby className="h-4 w-4 mr-1" />
              Parent
            </Button>
            <Button
              variant={userType === 'pregnant' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUserType('pregnant')}
            >
              <Heart className="h-4 w-4 mr-1" />
              Future Maman
            </Button>
          </div>
        </div>
      )}

      {/* Child Selector - only show for parents */}
      {isAuthenticated && userType === 'parent' && children.length > 1 && (
        <div className="px-4 py-3 bg-muted/30">
          <div className="flex gap-2 overflow-x-auto">
            {children.map((child) => (
              <Button
                key={child.id}
                variant={selectedChild === child.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedChild(child.id)}
                className="flex-shrink-0"
              >
                {child.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-20">
        {!isAuthenticated ? (
          // Landing page for non-authenticated users
          <div className="px-4 py-8">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Baby className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Bienvenue sur Manmi ba</h1>
                <p className="text-lg text-muted-foreground">
                  Votre compagnon numérique pour la santé de votre famille en Côte d'Ivoire
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Suivi de grossesse</h3>
                    <p className="text-sm text-muted-foreground">
                      Calendrier personnalisé, rappels CPN, conseils nutrition
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Syringe className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Vaccinations</h3>
                    <p className="text-sm text-muted-foreground">
                      Calendrier vaccinal ivoirien, rappels automatiques
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Croissance</h3>
                    <p className="text-sm text-muted-foreground">
                      Courbes de l'OMS, suivi du développement
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Stethoscope className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Guide santé</h3>
                    <p className="text-sm text-muted-foreground">
                      Symptômes, premiers secours, conseils experts
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Rejoignez des milliers de familles ivoiriennes qui font confiance à eMarternité
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" onClick={() => setCurrentPage('register')}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Créer un compte gratuit
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setCurrentPage('login')}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </Button>
                </div>
              </div>
            </div>

            {/* User Personas Section */}
            <div className="px-4 py-8 bg-muted/20">
              <div className="max-w-6xl mx-auto">
                <UserPersonas />
              </div>
            </div>
          </div>
        ) : (
          // Main app content for authenticated users
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="home" className="mt-0 px-4 py-4">
              {userType === 'pregnant' ? (
                <PregnancyTracker 
                  pregnancyData={pregnancyData[0]} 
                  appointments={pregnancyAppointments} 
                />
              ) : (
                <div className="space-y-4">
                  {/* Welcome message */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Bonjour {user?.name} !</h3>
                          <p className="text-sm text-muted-foreground">
                            Bienvenue sur votre tableau de bord
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Current Child Profile */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Profil de {currentChild?.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={currentChild?.avatar} />
                          <AvatarFallback>
                            <Baby className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{currentChild?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Né(e) le {new Date(currentChild?.birthDate || '').toLocaleDateString('fr-FR')}
                          </p>
                          {currentChild?.bloodType && (
                            <Badge variant="outline" className="mt-1">
                              Groupe sanguin: {currentChild.bloodType}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Syringe className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-medium">{vaccinations.filter(v => v.status === 'completed').length}</div>
                        <div className="text-xs text-muted-foreground">Vaccins faits</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-medium">{growthData[growthData.length - 1]?.weight || '--'} kg</div>
                        <div className="text-xs text-muted-foreground">Dernier poids</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Health Entries */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Dernières entrées
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {healthEntries.slice(0, 3).map((entry) => (
                        <HealthJournalEntry key={entry.id} entry={entry} />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {userType === 'parent' && (
              <>
                <TabsContent value="vaccinations" className="mt-0 px-4 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="flex items-center gap-2">
                        <Syringe className="h-5 w-5" />
                        Vaccinations
                      </h2>
                      <Button 
                        size="sm"
                        onClick={() => alert('Ajouter une vaccination - Fonctionnalité à venir')}
                        title="Ajouter une vaccination"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {vaccinations.map((vaccination) => (
                        <VaccinationCard
                          key={vaccination.id}
                          vaccination={vaccination}
                          onMarkComplete={handleMarkVaccinationComplete}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="growth" className="mt-0 px-4 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Croissance
                      </h2>
                      <Button 
                        size="sm"
                        onClick={() => alert('Ajouter une mesure - Fonctionnalité à venir')}
                        title="Ajouter une nouvelle mesure"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Mesure
                      </Button>
                    </div>

                    <GrowthChart 
                      data={growthData} 
                      type="weight" 
                      childGender={currentChild?.gender || 'female'} 
                    />
                    
                    <GrowthChart 
                      data={growthData} 
                      type="height" 
                      childGender={currentChild?.gender || 'female'} 
                    />
                  </div>
                </TabsContent>

                <TabsContent value="journal" className="mt-0 px-4 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Journal de santé
                      </h2>
                      <Button 
                        size="sm"
                        onClick={() => alert('Ajouter une entrée - Fonctionnalité à venir')}
                        title="Ajouter une entrée au journal"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {healthEntries.map((entry) => (
                        <HealthJournalEntry key={entry.id} entry={entry} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </>
            )}

            <TabsContent value="symptoms" className="mt-0 px-4 py-4">
              <SymptomsGuide />
            </TabsContent>

            <TabsContent value="nutrition" className="mt-0 px-4 py-4">
              <NutritionCalculator />
            </TabsContent>

            <TabsContent value="directory" className="mt-0 px-4 py-4">
              <HealthcareDirectory />
            </TabsContent>

            <TabsContent value="community" className="mt-0 px-4 py-4">
              <CommunitySupport />
            </TabsContent>

            <TabsContent value="education" className="mt-0 px-4 py-4">
              <div className="space-y-4">
                <h2 className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Conseils & Éducation
                </h2>

                <Tabs defaultValue="articles" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="articles">Articles santé</TabsTrigger>
                    <TabsTrigger value="personas">Nos utilisatrices</TabsTrigger>
                  </TabsList>

                  <TabsContent value="articles" className="mt-4">
                    <div className="grid gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">Nutrition 0-6 mois</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            L'allaitement exclusif est recommandé pendant les 6 premiers mois...
                          </p>
                          <Badge variant="secondary">Nouveau-né</Badge>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">Signes d'alerte paludisme</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Fièvre, vomissements, refus de téter... Consultez rapidement.
                          </p>
                          <Badge variant="destructive">Urgence</Badge>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">Développement moteur</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            À 6 mois, votre bébé devrait pouvoir se tenir assis avec un appui...
                          </p>
                          <Badge variant="outline">Développement</Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="personas" className="mt-4">
                    <UserPersonas />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Bottom Navigation */}
      {isAuthenticated && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <div className="grid w-full h-16 bg-transparent grid-cols-5">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Accueil"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Accueil</span>
            </button>
            
            {userType === 'parent' ? (
              <>
                <button
                  onClick={() => setActiveTab('vaccinations')}
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    activeTab === 'vaccinations' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Vaccinations"
                >
                  <Syringe className="h-5 w-5" />
                  <span className="text-xs">Vaccins</span>
                </button>
                <button
                  onClick={() => setActiveTab('growth')}
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    activeTab === 'growth' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Croissance"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs">Croissance</span>
                </button>
                <button
                  onClick={() => setActiveTab('journal')}
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    activeTab === 'journal' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Journal de santé"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">Journal</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('symptoms')}
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    activeTab === 'symptoms' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Guide des symptômes"
                >
                  <Stethoscope className="h-5 w-5" />
                  <span className="text-xs">Symptômes</span>
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    activeTab === 'nutrition' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Nutrition"
                >
                  <Apple className="h-5 w-5" />
                  <span className="text-xs">Nutrition</span>
                </button>
                <button
                  onClick={() => setActiveTab('community')}
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    activeTab === 'community' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Communauté"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-xs">Communauté</span>
                </button>
              </>
            )}
            
            {/* More menu with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                    ['symptoms', 'nutrition', 'directory', 'community', 'education'].includes(activeTab) && userType === 'parent'
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Plus d'options"
                >
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="text-xs">Plus</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {userType === 'parent' && (
                  <>
                    <DropdownMenuItem onClick={() => setActiveTab('symptoms')}>
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Symptômes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('nutrition')}>
                      <Apple className="h-4 w-4 mr-2" />
                      Nutrition
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('community')}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Communauté
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={() => setActiveTab('directory')}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Annuaire médical
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('education')}>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Éducation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      )}

      {/* Floating Chat Button */}
      {isAuthenticated && !showChat && (
        <Button
          onClick={() => setShowChat(true)}
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40"
          size="icon"
          title="Assistant santé"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot */}
      {showChat && <Chatbot onClose={() => setShowChat(false)} />}

      {/* Notifications Panel */}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
    </div>
  );
}
