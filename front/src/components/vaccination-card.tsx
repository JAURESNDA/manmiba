import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface Vaccination {
  id: string;
  name: string;
  dueDate: string;
  status: 'completed' | 'due' | 'overdue' | 'upcoming';
  completedDate?: string;
  ageInMonths: number;
}

interface VaccinationCardProps {
  vaccination: Vaccination;
  onMarkComplete: (id: string) => void;
}

export function VaccinationCard({ vaccination, onMarkComplete }: VaccinationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'due': return 'destructive';
      case 'overdue': return 'destructive';
      case 'upcoming': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'due': return <AlertTriangle className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'upcoming': return <Clock className="h-4 w-4" />;
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

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium">{vaccination.name}</h4>
              <Badge variant={getStatusColor(vaccination.status)} className="text-xs">
                <div className="flex items-center gap-1">
                  {getStatusIcon(vaccination.status)}
                  <span className="capitalize">{vaccination.status === 'upcoming' ? 'À venir' : 
                                                vaccination.status === 'due' ? 'À faire' :
                                                vaccination.status === 'overdue' ? 'En retard' : 'Fait'}</span>
                </div>
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {vaccination.status === 'completed' && vaccination.completedDate
                    ? `Fait le ${formatDate(vaccination.completedDate)}`
                    : `Prévu le ${formatDate(vaccination.dueDate)}`
                  }
                </span>
              </div>
              <span className="text-xs">À {vaccination.ageInMonths} mois</span>
            </div>
          </div>

          {vaccination.status !== 'completed' && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onMarkComplete(vaccination.id)}
            >
              Marquer fait
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}