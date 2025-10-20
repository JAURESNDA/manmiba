import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  FileText,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Phone,
  Video,
  Plus
} from "lucide-react";

export function HealthProfessionalDashboard({ user, role }) {
  const [appointments] = useState([
    {
      id: '1',
      patient: 'Aminata Traoré',
      time: '09:00',
      type: 'Consultation prénatale',
      status: 'upcoming',
      urgent: false
    },
    {
      id: '2',
      patient: 'Sarah Kouamé',
      time: '10:30',
      type: 'Vaccination bébé',
      status: 'upcoming',
      urgent: false
    },
    {
      id: '3',
      patient: 'Kouassi David',
      time: '14:00',
      type: 'Suivi post-natal',
      status: 'pending',
      urgent: true
    },
    {
      id: '4',
      patient: 'Marie Koffi',
      time: '15:30',
      type: 'Consultation jumeaux',
      status: 'completed',
      urgent: false
    }
  ]);

  const [patients] = useState([
    {
      id: '1',
      name: 'Aminata Traoré',
      lastVisit: '2025-01-15',
      nextAppointment: 'Aujourd\'hui 09:00',
      status: 'active',
      notes: 'Grossesse semaine 32'
    },
    {
      id: '2',
      name: 'Sarah Kouamé',
      lastVisit: '2024-12-20',
      nextAppointment: 'Aujourd\'hui 10:30',
      status: 'active',
      notes: 'Bébé 6 mois - vaccination DTC'
    },
    {
      id: '3',
      name: 'Jean-Claude Bamba',
      lastVisit: '2025-01-10',
      nextAppointment: 'Non planifié',
      status: 'follow-up',
      notes: 'Papa veuf - 3 enfants en suivi'
    }
  ]);

  const stats = {
    doctor: [
      { label: 'Patients aujourd\'hui', value: 12, icon: Users, color: 'text-blue-600' },
      { label: 'Consultations ce mois', value: 156, icon: Activity, color: 'text-green-600' },
      { label: 'Dossiers en attente', value: 8, icon: FileText, color: 'text-orange-600' },
      { label: 'Urgences résolues', value: 3, icon: AlertCircle, color: 'text-red-600' }
    ],
    midwife: [
      { label: 'Mamans suivies', value: 34, icon: Users, color: 'text-pink-600' },
      { label: 'Accouchements ce mois', value: 12, icon: Activity, color: 'text-green-600' },
      { label: 'CPN programmées', value: 18, icon: Calendar, color: 'text-blue-600' },
      { label: 'Appels d\'urgence', value: 5, icon: Phone, color: 'text-red-600' }
    ],
    nurse: [
      { label: 'Patients soignés', value: 45, icon: Users, color: 'text-blue-600' },
      { label: 'Vaccinations faites', value: 28, icon: CheckCircle, color: 'text-green-600' },
      { label: 'Soins programmés', value: 15, icon: Clock, color: 'text-orange-600' },
      { label: 'Alertes actives', value: 4, icon: AlertCircle, color: 'text-red-600' }
    ]
  };

  const currentStats = stats[role] || stats.doctor;

  const getRoleTitle = () => {
    switch (role) {
      case 'doctor': return 'Espace Médecin';
      case 'midwife': return 'Espace Sage-femme';
      case 'nurse': return 'Espace Infirmier(ère)';
      default: return 'Espace Professionnel';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Bonjour Dr. {user?.name || 'Professionnel'} 👋
              </h2>
              <p className="text-muted-foreground">
                {getRoleTitle()} - {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle consultation
              </Button>
              <Button variant="outline">
                <Video className="h-4 w-4 mr-2" />
                Téléconsultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
        </TabsList>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Rendez-vous du jour</h3>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Voir le calendrier
            </Button>
          </div>

          <div className="space-y-3">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className={appointment.urgent ? 'border-destructive' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xs text-muted-foreground">Heure</div>
                        <div className="font-bold">{appointment.time}</div>
                      </div>
                      
                      <div className="h-12 w-px bg-border" />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{appointment.patient}</h4>
                          {appointment.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {appointment.status === 'upcoming' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Appeler
                          </Button>
                          <Button size="sm">
                            Commencer
                          </Button>
                        </>
                      )}
                      {appointment.status === 'pending' && (
                        <Badge variant="outline">En attente</Badge>
                      )}
                      {appointment.status === 'completed' && (
                        <Badge variant="secondary">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Terminé
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Patients en suivi</h3>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Tous les patients
            </Button>
          </div>

          <div className="space-y-3">
            {patients.map((patient) => (
              <Card key={patient.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          <Users className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{patient.notes}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Dernière visite: {patient.lastVisit}</span>
                          <span>•</span>
                          <span>Prochain RDV: {patient.nextAppointment}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Dossier
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4 mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Messagerie sécurisée</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Communiquez avec vos patients en toute sécurité
              </p>
              <Button>
                Accéder à la messagerie
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4 mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Protocoles PEV</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Calendrier vaccinal ivoirien et protocoles officiels
                </p>
                <Button variant="outline" className="w-full">
                  Consulter
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Guides OMS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Courbes de croissance et recommandations OMS
                </p>
                <Button variant="outline" className="w-full">
                  Télécharger
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formulaires</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ordonnances, certificats et documents médicaux
                </p>
                <Button variant="outline" className="w-full">
                  Accéder
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formation continue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Webinaires, cours et mises à jour médicales
                </p>
                <Button variant="outline" className="w-full">
                  Voir les formations
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
