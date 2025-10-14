import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Thermometer, Pill, Activity } from "lucide-react";

interface HealthEntry {
  id: string;
  date: string;
  type: 'illness' | 'medication' | 'milestone' | 'appointment';
  title: string;
  description: string;
  temperature?: number;
  symptoms?: string[];
}

interface HealthJournalEntryProps {
  entry: HealthEntry;
}

export function HealthJournalEntry({ entry }: HealthJournalEntryProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'illness': return <Thermometer className="h-4 w-4" />;
      case 'medication': return <Pill className="h-4 w-4" />;
      case 'milestone': return <Activity className="h-4 w-4" />;
      case 'appointment': return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'illness': return 'destructive';
      case 'medication': return 'default';
      case 'milestone': return 'secondary';
      case 'appointment': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'illness': return 'Maladie';
      case 'medication': return 'Médicament';
      case 'milestone': return 'Étape';
      case 'appointment': return 'Consultation';
      default: return type;
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
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant={getTypeColor(entry.type)} className="text-xs">
              <div className="flex items-center gap-1">
                {getTypeIcon(entry.type)}
                <span>{getTypeLabel(entry.type)}</span>
              </div>
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDate(entry.date)}
            </span>
          </div>
          
          {entry.temperature && (
            <Badge variant="destructive" className="text-xs">
              {entry.temperature}°C
            </Badge>
          )}
        </div>
        
        <h4 className="font-medium mb-1">{entry.title}</h4>
        <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
        
        {entry.symptoms && entry.symptoms.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {entry.symptoms.map((symptom) => (
              <Badge key={symptom} variant="outline" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}