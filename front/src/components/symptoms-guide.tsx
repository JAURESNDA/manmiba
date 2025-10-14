import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { 
  Thermometer, 
  AlertTriangle, 
  Phone, 
  Home, 
  Clock,
  Stethoscope,
  Heart,
  Brain
} from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  category: 'fever' | 'respiratory' | 'digestive' | 'skin' | 'behavioral';
}

interface Assessment {
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  recommendation: string;
  description: string;
  actions: string[];
}

export function SymptomsGuide() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const symptoms: Symptom[] = [
    { id: 'fever', name: 'Fièvre (>38°C)', category: 'fever' },
    { id: 'high_fever', name: 'Fièvre élevée (>39°C)', category: 'fever' },
    { id: 'cough', name: 'Toux', category: 'respiratory' },
    { id: 'breathing_difficulty', name: 'Difficulté à respirer', category: 'respiratory' },
    { id: 'vomiting', name: 'Vomissements', category: 'digestive' },
    { id: 'diarrhea', name: 'Diarrhée', category: 'digestive' },
    { id: 'dehydration', name: 'Signes de déshydratation', category: 'digestive' },
    { id: 'rash', name: 'Éruption cutanée', category: 'skin' },
    { id: 'lethargy', name: 'Léthargie/Somnolence', category: 'behavioral' },
    { id: 'irritability', name: 'Irritabilité excessive', category: 'behavioral' },
    { id: 'convulsions', name: 'Convulsions', category: 'behavioral' },
    { id: 'consciousness', name: 'Perte de conscience', category: 'behavioral' }
  ];

  const commonIllnesses = [
    {
      name: "Paludisme",
      symptoms: ["Fièvre", "Frissons", "Vomissements", "Maux de tête"],
      severity: "high",
      description: "Maladie transmise par les moustiques, très fréquente en Côte d'Ivoire",
      warning: "Consultez immédiatement si fièvre + vomissements chez un enfant"
    },
    {
      name: "Infection Respiratoire Aiguë (IRA)",
      symptoms: ["Toux", "Fièvre", "Difficulté respiratoire"],
      severity: "medium",
      description: "Infection des voies respiratoires",
      warning: "Urgence si difficulté à respirer ou tirage"
    },
    {
      name: "Diarrhée aiguë",
      symptoms: ["Diarrhée", "Vomissements", "Déshydratation"],
      severity: "medium",
      description: "Perte de liquides pouvant mener à la déshydratation",
      warning: "Surveillez les signes de déshydratation"
    }
  ];

  const firstAidTips = [
    {
      title: "Convulsions fébriles",
      steps: [
        "Restez calme et chronométrez la durée",
        "Placez l'enfant sur le côté",
        "Ne mettez rien dans sa bouche",
        "Appelez les secours si > 5 minutes"
      ]
    },
    {
      title: "Étouffement",
      steps: [
        "Inclinez l'enfant tête en bas",
        "Donnez 5 tapes dans le dos",
        "Vérifiez la bouche",
        "Appelez les secours si inefficace"
      ]
    },
    {
      title: "Déshydratation",
      steps: [
        "Donnez des solutés de réhydratation (SRO)",
        "Petites quantités fréquentes",
        "Continuez l'allaitement",
        "Consultez si vomissements persistants"
      ]
    }
  ];

  const assessSymptoms = () => {
    let urgency: Assessment['urgency'] = 'low';
    let recommendation = '';
    let description = '';
    let actions: string[] = [];

    // Situations d'urgence
    if (selectedSymptoms.includes('convulsions') || 
        selectedSymptoms.includes('consciousness') ||
        selectedSymptoms.includes('breathing_difficulty')) {
      urgency = 'emergency';
      recommendation = 'URGENCE - Aller à l\'hôpital immédiatement';
      description = 'Ces symptômes nécessitent une prise en charge médicale immédiate.';
      actions = [
        'Appelez le 185 (urgences) ou rendez-vous aux urgences',
        'Ne donnez rien par la bouche',
        'Restez avec l\'enfant en permanence'
      ];
    }
    // Situations préoccupantes
    else if (selectedSymptoms.includes('high_fever') || 
             selectedSymptoms.includes('dehydration') ||
             (selectedSymptoms.includes('fever') && selectedSymptoms.includes('vomiting'))) {
      urgency = 'high';
      recommendation = 'Consulter un médecin dans les 24h';
      description = 'Ces symptômes peuvent indiquer une maladie grave comme le paludisme.';
      actions = [
        'Prenez la température régulièrement',
        'Donnez beaucoup de liquides',
        'Consultez rapidement un centre de santé'
      ];
    }
    // Situations modérées
    else if (selectedSymptoms.includes('fever') || 
             selectedSymptoms.includes('vomiting') || 
             selectedSymptoms.includes('diarrhea')) {
      urgency = 'medium';
      recommendation = 'Surveiller et consulter si aggravation';
      description = 'Symptômes courants qui nécessitent une surveillance.';
      actions = [
        'Donnez du paracétamol pour la fièvre',
        'Hydratez bien l\'enfant',
        'Consultez si pas d\'amélioration en 48h'
      ];
    }
    // Situations légères
    else if (selectedSymptoms.length > 0) {
      urgency = 'low';
      recommendation = 'Soins à domicile et surveillance';
      description = 'Symptômes bénins qui peuvent être gérés à la maison.';
      actions = [
        'Surveillez l\'évolution',
        'Maintenez l\'hydratation',
        'Consultez si nouveaux symptômes'
      ];
    }

    setAssessment({ urgency, recommendation, description, actions });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <Phone className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <Home className="h-4 w-4" />;
      default: return <Stethoscope className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Évaluation des symptômes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Évaluation des symptômes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sélectionnez les symptômes observés chez votre enfant :
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center space-x-2">
                <Checkbox
                  id={symptom.id}
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSymptoms([...selectedSymptoms, symptom.id]);
                    } else {
                      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptom.id));
                    }
                  }}
                />
                <label htmlFor={symptom.id} className="text-sm cursor-pointer">
                  {symptom.name}
                </label>
              </div>
            ))}
          </div>

          <Button onClick={assessSymptoms} className="w-full" disabled={selectedSymptoms.length === 0}>
            Évaluer les symptômes
          </Button>

          {assessment && (
            <Alert className={`border-l-4 ${
              assessment.urgency === 'emergency' ? 'border-red-500 bg-red-50' :
              assessment.urgency === 'high' ? 'border-orange-500 bg-orange-50' :
              assessment.urgency === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {getUrgencyIcon(assessment.urgency)}
                <Badge variant={getUrgencyColor(assessment.urgency)}>
                  {assessment.recommendation}
                </Badge>
              </div>
              <AlertDescription>
                <p className="mb-2">{assessment.description}</p>
                <ul className="list-disc list-inside space-y-1">
                  {assessment.actions.map((action, index) => (
                    <li key={index} className="text-sm">{action}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Maladies courantes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Maladies courantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {commonIllnesses.map((illness, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">{illness.name}</h4>
                <Badge variant={illness.severity === 'high' ? 'destructive' : 'default'}>
                  {illness.severity === 'high' ? 'Grave' : 'Modéré'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{illness.description}</p>
              <div className="mb-2">
                <p className="text-xs font-medium mb-1">Symptômes typiques :</p>
                <div className="flex flex-wrap gap-1">
                  {illness.symptoms.map((symptom, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{symptom}</Badge>
                  ))}
                </div>
              </div>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {illness.warning}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Premiers secours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Gestes de premiers secours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {firstAidTips.map((tip, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <h4 className="font-medium mb-2">{tip.title}</h4>
              <ol className="list-decimal list-inside space-y-1">
                {tip.steps.map((step, i) => (
                  <li key={i} className="text-sm">{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pharmacie familiale */}
      <Card>
        <CardHeader>
          <CardTitle>Pharmacie familiale essentielle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-sm">Paracétamol enfant</span>
              <Badge variant="outline" className="text-xs">10-15mg/kg</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-sm">Solutés de réhydratation (SRO)</span>
              <Badge variant="outline" className="text-xs">Diarrhée</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-sm">Antiseptique</span>
              <Badge variant="outline" className="text-xs">Blessures</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-sm">Thermomètre</span>
              <Badge variant="outline" className="text-xs">Essentiel</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}