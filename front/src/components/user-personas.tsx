import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Smartphone, 
  Heart, 
  Baby, 
  Stethoscope,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  imageUrl: string;
  type: string;
  description: string;
  device: string;
  painPoints: string[];
  goals: string[];
  howAppHelps: string[];
  tags: string[];
}

const personas: Persona[] = [
  {
    id: '1',
    name: 'Aminata',
    age: 24,
    location: 'Abidjan (Marcory)',
    occupation: 'Secrétaire',
    imageUrl: 'https://images.unsplash.com/photo-1630706657929-7ff4dce42d74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFmcmljYW4lMjB3b21hbiUyMHNtYXJ0cGhvbmUlMjBhYmlkamFuJTIwdXJiYW58ZW58MXx8fHwxNzU4NzkzNDIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Jeune Maman Urbaine "Connectée"',
    description: 'Mariée, maman d\'un petit garçon de 6 mois. Niveau bac+2, active sur les réseaux sociaux.',
    device: 'Smartphone Android moyen de gamme',
    painPoints: [
      'Peur de mal faire en tant que jeune maman',
      'Conseils contradictoires de la famille',
      'Coût des consultations pour des "broutilles"',
      'Manque de temps entre travail et ménage'
    ],
    goals: [
      'Source fiable pour contrer les conseils non sollicités',
      'Ne rien oublier (vaccins, vitamines, achats)',
      'Comprendre les pleurs de son bébé',
      'Solutions pratiques et rapides'
    ],
    howAppHelps: [
      'Rappels de vaccin programmés',
      'Guide des symptômes 3-4 fois/mois',
      'Fiches alimentation par âge',
      'Forum premium avec autres mamans'
    ],
    tags: ['Urbaine', 'Connectée', 'Jeune maman', 'Active']
  },
  {
    id: '2',
    name: 'Fatou',
    age: 32,
    location: 'Village près de Bouaké',
    occupation: 'Agricultrice',
    imageUrl: 'https://images.unsplash.com/photo-1567471945805-069e09c11098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbW90aGVyJTIwcnVyYWwlMjB2aWxsYWdlJTIwYWdyaWN1bHR1cmFsfGVufDF8fHx8MTc1ODc5MzQxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Maman Rurale "Débrouillarde"',
    description: 'Maman de 4 enfants (8, 5, 3 ans et 2 mois). Vend ses produits au marché.',
    device: 'Téléphone basique + smartphone partagé',
    painPoints: [
      'Accès difficile au centre de santé',
      'Coût du déplacement',
      'Méfiance envers les apps qui "mangent" du crédit',
      'Barrière de la langue (préfère le Dioula)'
    ],
    goals: [
      'Savoir quand le déplacement au CS est nécessaire',
      'Se rappeler des dates de vaccination',
      'Comprendre la faiblesse de son enfant de 3 ans',
      'Information fiable et compréhensible'
    ],
    howAppHelps: [
      'Service USSD (#123#) pour rappels SMS',
      'Contenu éducatif téléchargeable hors-ligne',
      'Pictogrammes pour identifier les dangers',
      'Fonction "trouver un centre de santé"'
    ],
    tags: ['Rurale', 'Débrouillarde', 'Tradition', 'Hors-ligne']
  },
  {
    id: '3',
    name: 'Affoué',
    age: 29,
    location: 'Yamoussoukro',
    occupation: 'Infirmière',
    imageUrl: 'https://images.unsplash.com/photo-1661256545534-9770a8ea2146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJlZ25hbnQlMjB3b21hbiUyMGhlYWx0aGNhcmUlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NzkzNDE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Future Maman "Moderne"',
    description: 'Enceinte de son premier enfant. Urbanisée, indépendante et technophile.',
    device: 'iPhone dernier cri',
    painPoints: [
      'Inquiétude personnelle malgré expertise médicale',
      'Carnet de grossesse papier peu pratique',
      'Manque de temps pour recherche personnalisée'
    ],
    goals: [
      'Tracker chaque aspect de sa grossesse',
      'Se préparer à l\'accouchement et maternité',
      'Historique digital pour la gynécologue',
      'Sentiment de contrôle professionnel'
    ],
    howAppHelps: [
      'Module de suivi de grossesse intensif',
      'Vidéos de premiers secours et préparation',
      'Version premium pour contenu expert',
      'Contributrice active du forum'
    ],
    tags: ['Moderne', 'Professionnelle', 'Enceinte', 'Leader']
  },
  {
    id: '4',
    name: 'Marie',
    age: 63,
    location: 'Adjamé, Abidjan',
    occupation: 'Grand-mère',
    imageUrl: 'https://images.unsplash.com/photo-1678225894217-ec0de2dc0548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZ3JhbmRtb3RoZXIlMjBlbGRlcmx5JTIwd29tYW4lMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTg3OTM0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Grand-Mère "Pilier Familial"',
    description: 'Veuve, garde 8 petits-enfants. Référence en soins traditionnels et remèdes aux plantes.',
    device: 'Téléphone simple (avec aide du petit-fils)',
    painPoints: [
      'Dévalorisation de son savoir traditionnel',
      'Ne peut pas déchiffrer les messages écrits',
      'Peur que les jeunes perdent confiance'
    ],
    goals: [
      'Continuer son rôle de conseillère familiale',
      'Protéger la santé des petits-enfants',
      'Comprendre les nouvelles recommandations',
      'Harmoniser tradition et modernité'
    ],
    howAppHelps: [
      'Sensibilisation indirecte par la famille',
      'Service vocal en langues locales',
      'Rôle de relai pour les alertes familiales',
      'Légitimation du savoir traditionnel'
    ],
    tags: ['Traditionnelle', 'Sage', 'Pilier familial', 'Vocal']
  },
  {
    id: '5',
    name: 'Adja',
    age: 35,
    location: 'Daloa',
    occupation: 'Agente de Santé Communautaire',
    imageUrl: 'https://images.unsplash.com/photo-1536064479547-7ee40b74b807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwaGVhbHRoJTIwd29ya2VyJTIwbWVkaWNhbHxlbnwxfHx8fDE3NTg3OTM0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Agente de Santé "Sur le Terrain"',
    description: 'Travaille pour une ONG, parcourt les villages pour sensibiliser et faire du dépistage.',
    device: 'Smartphone Android robuste (professionnel)',
    painPoints: [
      'Supports papier qui s\'abîment',
      'Difficulté à convaincre sans preuve visuelle',
      'Paperasse administrative chronophage'
    ],
    goals: [
      'Sensibiliser efficacement lors des tournées',
      'Supports visuels simples et percutants',
      'Gagner du temps dans la collecte de données',
      'Aider plus de personnes'
    ],
    howAppHelps: [
      'Outil de sensibilisation hors-ligne',
      'Module "Agent de Santé" professionnel',
      'Scanner QR pour vaccination rapide',
      'Rapports automatiques synchronisés'
    ],
    tags: ['Professionnelle', 'Terrain', 'Ambassadrice', 'ONG']
  }
];

export function UserPersonas() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="flex items-center justify-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Nos Utilisatrices Types
        </h2>
        <p className="text-muted-foreground">
          Découvrez comment eMarternité accompagne différents profils d'utilisatrices en Côte d'Ivoire
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {personas.map((persona) => (
          <Card key={persona.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ImageWithFallback
                    src={persona.imageUrl}
                    alt={`Photo de ${persona.name}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{persona.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{persona.age} ans • {persona.occupation}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{persona.location}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="w-fit">
                {persona.type}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm">{persona.description}</p>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Appareil</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{persona.device}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-sm">Défis principaux</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {persona.painPoints.slice(0, 2).map((point, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Comment l'app l'aide</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {persona.howAppHelps.slice(0, 2).map((help, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        {help}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {persona.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Baby className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Une solution pour toutes</h3>
              <p className="text-sm text-muted-foreground">
                eMarternité s'adapte aux besoins spécifiques de chaque utilisatrice, 
                de la jeune maman urbaine connectée à l'agente de santé sur le terrain, 
                en passant par la grand-mère gardienne des traditions.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-medium text-lg">5</div>
                <div className="text-xs text-muted-foreground">Profils types</div>
              </div>
              <div>
                <div className="font-medium text-lg">3+</div>
                <div className="text-xs text-muted-foreground">Langues</div>
              </div>
              <div>
                <div className="font-medium text-lg">Urban + Rural</div>
                <div className="text-xs text-muted-foreground">Zones couvertes</div>
              </div>
              <div>
                <div className="font-medium text-lg">Hors-ligne</div>
                <div className="text-xs text-muted-foreground">Fonctionnement</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}