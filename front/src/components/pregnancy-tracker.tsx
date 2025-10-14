import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Calendar, Baby, Heart, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface PregnancyData {
  weeksPregnant: number;
  dueDate: string;
  lastMenstrualPeriod: string;
  weight: number;
  bloodPressure: string;
}

interface PregnancyAppointment {
  id: string;
  type: string;
  date: string;
  status: 'completed' | 'upcoming' | 'overdue';
  description: string;
}

interface PregnancyTrackerProps {
  pregnancyData: PregnancyData;
  appointments: PregnancyAppointment[];
}

export function PregnancyTracker({ pregnancyData, appointments }: PregnancyTrackerProps) {
  const getWeekDescription = (week: number) => {
    if (week <= 12) return "1er trimestre - Formation des organes";
    if (week <= 27) return "2ème trimestre - Croissance active";
    return "3ème trimestre - Préparation à la naissance";
  };

  const getBabySize = (week: number) => {
    if (week <= 8) return "Taille d'un grain de riz";
    if (week <= 12) return "Taille d'une prune";
    if (week <= 16) return "Taille d'un avocat";
    if (week <= 20) return "Taille d'une banane";
    if (week <= 24) return "Taille d'un épi de maïs";
    if (week <= 28) return "Taille d'une aubergine";
    if (week <= 32) return "Taille d'un chou-fleur";
    if (week <= 36) return "Taille d'une laitue";
    return "Taille d'une pastèque";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'upcoming': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const progressPercentage = (pregnancyData.weeksPregnant / 40) * 100;

  return (
    <div className="space-y-4">
      {/* Progression de grossesse */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5" />
            Semaine {pregnancyData.weeksPregnant} de grossesse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-center">
            <p className="font-medium">{getBabySize(pregnancyData.weeksPregnant)}</p>
            <p className="text-sm text-muted-foreground">{getWeekDescription(pregnancyData.weeksPregnant)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Date prévue</p>
              <p className="font-medium">{formatDate(pregnancyData.dueDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jours restants</p>
              <p className="font-medium">
                {Math.ceil((new Date(pregnancyData.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultations prénatales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Consultations prénatales (CPN)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(appointment.status)}
                <div>
                  <h4 className="font-medium">{appointment.type}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(appointment.date)}</p>
                </div>
              </div>
              <Badge variant={appointment.status === 'completed' ? 'default' : 
                             appointment.status === 'overdue' ? 'destructive' : 'secondary'}>
                {appointment.status === 'completed' ? 'Fait' :
                 appointment.status === 'overdue' ? 'En retard' : 'À venir'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suivi personnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Mon suivi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Poids actuel</p>
              <p className="font-medium">{pregnancyData.weight} kg</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Tension</p>
              <p className="font-medium">{pregnancyData.bloodPressure}</p>
            </div>
          </div>
          
          <Button className="w-full mt-4" variant="outline">
            Ajouter une mesure
          </Button>
        </CardContent>
      </Card>

      {/* Conseils de la semaine */}
      <Card>
        <CardHeader>
          <CardTitle>Conseils de la semaine {pregnancyData.weeksPregnant}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">• Prenez vos vitamines prénatales quotidiennement</p>
            <p className="text-sm">• Buvez beaucoup d'eau (au moins 2L par jour)</p>
            <p className="text-sm">• Évitez les aliments crus et non pasteurisés</p>
            <p className="text-sm">• Reposez-vous suffisamment</p>
          </div>
        </CardContent>
      </Card>

      {/* Liste maternité */}
      <Card>
        <CardHeader>
          <CardTitle>Checklist maternité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Valise pour la maternité</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Vêtements pour bébé</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Siège auto</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Documents administratifs</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}