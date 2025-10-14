import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Calculator, Apple, AlertTriangle, CheckCircle, Utensils } from "lucide-react";

interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  percentile: number;
  recommendation: string;
}

interface NutritionGuide {
  ageGroup: string;
  recommendations: string[];
  foods: string[];
  avoid: string[];
}

export function NutritionCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  const nutritionGuides: NutritionGuide[] = [
    {
      ageGroup: "0-6 mois",
      recommendations: [
        "Allaitement maternel exclusif",
        "Pas d'eau supplémentaire nécessaire",
        "Tétées à la demande (8-12 fois/jour)"
      ],
      foods: ["Lait maternel uniquement"],
      avoid: ["Tout autre aliment", "Eau", "Tisanes", "Lait artificiel sauf indication médicale"]
    },
    {
      ageGroup: "6-12 mois",
      recommendations: [
        "Continuer l'allaitement",
        "Introduction progressive des aliments",
        "Purées et bouillies enrichies"
      ],
      foods: [
        "Céréales (riz, millet, maïs)",
        "Légumes cuits (patate douce, carotte)",
        "Fruits mûrs (banane, papaye)",
        "Protéines (poisson, œuf, légumineuses)"
      ],
      avoid: ["Miel", "Noix entières", "Sel ajouté", "Sucre raffiné"]
    },
    {
      ageGroup: "1-2 ans",
      recommendations: [
        "Alimentation familiale adaptée",
        "3 repas + 2 collations",
        "Textures variées"
      ],
      foods: [
        "Alimentation familiale",
        "Lait maternel ou lait de croissance",
        "Fruits et légumes variés",
        "Céréales complètes"
      ],
      avoid: ["Aliments trop épicés", "Noix entières", "Bonbons durs"]
    },
    {
      ageGroup: "2-5 ans",
      recommendations: [
        "Alimentation équilibrée",
        "Portions adaptées à l'enfant",
        "Encourager la variété"
      ],
      foods: [
        "Tous les groupes alimentaires",
        "Protéines à chaque repas",
        "5 fruits et légumes par jour",
        "Céréales et féculents"
      ],
      avoid: ["Excès de sucre", "Boissons sucrées", "Grignotage excessif"]
    }
  ];

  const deficiencyWarnings = [
    {
      name: "Anémie ferriprive",
      symptoms: ["Pâleur", "Fatigue", "Essoufflement"],
      prevention: "Aliments riches en fer (viande, légumineuses, légumes verts)",
      risk: "Très fréquent chez les enfants"
    },
    {
      name: "Carence en vitamine A",
      symptoms: ["Problèmes de vision nocturne", "Infections fréquentes"],
      prevention: "Aliments orange (patate douce, carotte, papaye)",
      risk: "Fréquent en milieu rural"
    },
    {
      name: "Malnutrition protéino-énergétique",
      symptoms: ["Retard de croissance", "Œdèmes", "Irritabilité"],
      prevention: "Alimentation diversifiée avec protéines et calories suffisantes",
      risk: "Urgence médicale"
    }
  ];

  const calculateBMI = () => {
    const ageMonths = parseInt(age);
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);

    if (!ageMonths || !weightKg || !heightCm || !gender) {
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // Simplified BMI-for-age percentiles (would use WHO growth charts in real app)
    let category: BMIResult['category'] = 'normal';
    let percentile = 50;
    let recommendation = '';

    if (bmi < 16) {
      category = 'underweight';
      percentile = 10;
      recommendation = "Poids insuffisant - Consultez un nutritionniste";
    } else if (bmi < 18.5) {
      category = 'underweight';
      percentile = 25;
      recommendation = "Légèrement en dessous de la normale - Surveillez l'alimentation";
    } else if (bmi < 25) {
      category = 'normal';
      percentile = 50;
      recommendation = "Poids normal - Continuez une alimentation équilibrée";
    } else if (bmi < 30) {
      category = 'overweight';
      percentile = 85;
      recommendation = "Surpoids - Augmentez l'activité physique et consultez";
    } else {
      category = 'obese';
      percentile = 95;
      recommendation = "Obésité - Consultation médicale recommandée";
    }

    setBmiResult({ bmi, category, percentile, recommendation });
  };

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'underweight': return 'destructive';
      case 'normal': return 'default';
      case 'overweight': return 'default';
      case 'obese': return 'destructive';
      default: return 'secondary';
    }
  };

  const getAgeGroupGuide = () => {
    const ageMonths = parseInt(age);
    if (ageMonths <= 6) return nutritionGuides[0];
    if (ageMonths <= 12) return nutritionGuides[1];
    if (ageMonths <= 24) return nutritionGuides[2];
    return nutritionGuides[3];
  };

  return (
    <div className="space-y-4">
      {/* Calculateur BMI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculateur BMI enfant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Âge (en mois)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 24"
              />
            </div>
            <div>
              <Label htmlFor="gender">Sexe</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Garçon</SelectItem>
                  <SelectItem value="female">Fille</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Poids (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 12.5"
              />
            </div>
            <div>
              <Label htmlFor="height">Taille (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 85"
              />
            </div>
          </div>

          <Button onClick={calculateBMI} className="w-full">
            Calculer le BMI
          </Button>

          {bmiResult && (
            <Alert>
              <div className="flex items-center gap-2 mb-2">
                {bmiResult.category === 'normal' ? 
                  <CheckCircle className="h-4 w-4 text-green-600" /> : 
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                }
                <Badge variant={getBMIColor(bmiResult.category)}>
                  BMI: {bmiResult.bmi.toFixed(1)} - {bmiResult.percentile}e percentile
                </Badge>
              </div>
              <AlertDescription>
                {bmiResult.recommendation}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Guide nutrition par âge */}
      {age && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Guide nutrition {getAgeGroupGuide().ageGroup}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Recommandations générales</h4>
              <ul className="list-disc list-inside space-y-1">
                {getAgeGroupGuide().recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">{rec}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Aliments recommandés</h4>
              <div className="flex flex-wrap gap-1">
                {getAgeGroupGuide().foods.map((food, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {food}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">À éviter</h4>
              <div className="flex flex-wrap gap-1">
                {getAgeGroupGuide().avoid.map((item, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Détection des carences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Carences nutritionnelles courantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {deficiencyWarnings.map((deficiency, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">{deficiency.name}</h4>
                <Badge variant="outline" className="text-xs">{deficiency.risk}</Badge>
              </div>
              
              <div className="mb-2">
                <p className="text-xs font-medium mb-1">Signes d'alerte :</p>
                <div className="flex flex-wrap gap-1">
                  {deficiency.symptoms.map((symptom, i) => (
                    <Badge key={i} variant="destructive" className="text-xs">{symptom}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium mb-1">Prévention :</p>
                <p className="text-xs text-muted-foreground">{deficiency.prevention}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recettes adaptées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Recettes adaptées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium mb-1">Bouillie enrichie (6-12 mois)</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Mélange de céréales locales avec protéines et légumes
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Mil</Badge>
              <Badge variant="outline" className="text-xs">Poisson</Badge>
              <Badge variant="outline" className="text-xs">Huile de palme</Badge>
              <Badge variant="outline" className="text-xs">Légumes</Badge>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <h4 className="font-medium mb-1">Sauce nutritive (1-5 ans)</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Sauce riche en légumes et protéines pour accompagner le riz
            </p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">Épinards</Badge>
              <Badge variant="outline" className="text-xs">Viande</Badge>
              <Badge variant="outline" className="text-xs">Huile</Badge>
              <Badge variant="outline" className="text-xs">Tomates</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}