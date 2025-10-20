import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AspectRatio } from "./ui/aspect-ratio";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VideoPlayer } from './video-player';
import { 
  Play,
  Clock,
  Eye,
  ThumbsUp,
  BookOpen,
  Video,
  TrendingUp,
  Baby,
  Heart,
  Utensils,
  Stethoscope
} from "lucide-react";

export function RecommendedContent({ userSituation, userType }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos] = useState([
    {
      id: '1',
      title: 'Les premiers jours avec bébé - Guide complet',
      thumbnail: 'https://images.unsplash.com/photo-1504888060547-83cbe78ccfe0?w=800',
      duration: '12:30',
      views: 12500,
      category: 'Nouveau-né',
      relevant: ['urbaine-connectee', 'pere-celibataire', 'papa-veuf'],
      icon: Baby
    },
    {
      id: '2',
      title: 'Allaitement : Positions et techniques',
      thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800',
      duration: '8:45',
      views: 8900,
      category: 'Allaitement',
      relevant: ['future-maman-moderne', 'urbaine-connectee', 'rurale-debrouillarde'],
      icon: Heart
    },
    {
      id: '3',
      title: 'Calendrier vaccinal PEV Côte d\'Ivoire',
      thumbnail: 'https://images.unsplash.com/photo-1576765975429-d2d8cf8c0ba0?w=800',
      duration: '15:20',
      views: 15600,
      category: 'Vaccination',
      relevant: ['urbaine-connectee', 'rurale-debrouillarde', 'pere-celibataire'],
      icon: Stethoscope
    },
    {
      id: '4',
      title: 'Papa solo : Organisation et routine',
      thumbnail: 'https://images.unsplash.com/photo-1549231634-8633391d04b8?w=800',
      duration: '10:15',
      views: 6700,
      category: 'Papa solo',
      relevant: ['pere-celibataire', 'papa-veuf'],
      icon: Baby
    },
    {
      id: '5',
      title: 'Nutrition bébé 6-12 mois',
      thumbnail: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800',
      duration: '11:40',
      views: 9200,
      category: 'Nutrition',
      relevant: ['urbaine-connectee', 'pere-celibataire', 'rurale-debrouillarde'],
      icon: Utensils
    },
    {
      id: '6',
      title: 'Suivi de grossesse mois par mois',
      thumbnail: 'https://images.unsplash.com/photo-1661256545534-9770a8ea2146?w=800',
      duration: '18:30',
      views: 11800,
      category: 'Grossesse',
      relevant: ['future-maman-moderne'],
      icon: Heart
    }
  ]);

  const [articles] = useState([
    {
      id: '1',
      title: 'Fièvre chez le bébé : Quand s\'inquiéter ?',
      excerpt: 'Les signes d\'alerte à surveiller et quand consulter un médecin...',
      readTime: '5 min',
      category: 'Urgences',
      relevant: ['urbaine-connectee', 'pere-celibataire', 'papa-veuf', 'rurale-debrouillarde']
    },
    {
      id: '2',
      title: 'Développement moteur 0-12 mois',
      excerpt: 'Les étapes clés du développement et comment stimuler votre bébé...',
      readTime: '8 min',
      category: 'Développement',
      relevant: ['urbaine-connectee', 'pere-celibataire', 'rurale-debrouillarde']
    },
    {
      id: '3',
      title: 'Préparation à l\'accouchement',
      excerpt: 'Exercices, techniques de respiration et conseils pratiques...',
      readTime: '10 min',
      category: 'Grossesse',
      relevant: ['future-maman-moderne']
    },
    {
      id: '4',
      title: 'Gérer le stress de papa célibataire',
      excerpt: 'Conseils et ressources pour les papas solos en Côte d\'Ivoire...',
      readTime: '6 min',
      category: 'Papa solo',
      relevant: ['pere-celibataire', 'papa-veuf']
    }
  ]);

  // Filtrer le contenu pertinent pour l'utilisateur
  const relevantVideos = videos.filter(video => 
    !userSituation || video.relevant.includes(userSituation)
  ).slice(0, 3);

  const relevantArticles = articles.filter(article => 
    !userSituation || article.relevant.includes(userSituation)
  ).slice(0, 4);

  const getWelcomeMessage = () => {
    switch (userSituation) {
      case 'pere-celibataire':
        return 'Contenu sélectionné pour les papas célibataires';
      case 'papa-veuf':
        return 'Ressources de soutien pour les papas veufs';
      case 'future-maman-moderne':
        return 'Votre guide de grossesse personnalisé';
      case 'urbaine-connectee':
        return 'Conseils pour les mamans urbaines';
      case 'rurale-debrouillarde':
        return 'Ressources adaptées à votre situation';
      default:
        return 'Contenu recommandé pour vous';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pour vous</h2>
          <p className="text-muted-foreground">{getWelcomeMessage()}</p>
        </div>
        <Button variant="outline">
          <TrendingUp className="h-4 w-4 mr-2" />
          Voir tout
        </Button>
      </div>

      {/* Vidéos recommandées */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Vidéos recommandées
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relevantVideos.map((video) => {
            const Icon = video.icon;
            return (
              <Card 
                key={video.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                </div>

                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    <Icon className="h-3 w-3 mr-1" />
                    {video.category}
                  </Badge>
                  <h4 className="font-medium mb-2 line-clamp-2">{video.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{(video.views / 1000).toFixed(1)}k vues</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Articles recommandés */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Articles à lire
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {relevantArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{article.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                <Button variant="ghost" size="sm" className="w-full">
                  Lire l'article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section>
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-primary" />
              Conseil du jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userSituation === 'pere-celibataire' || userSituation === 'papa-veuf' ? (
              <p className="text-sm">
                <strong>Papa solo :</strong> N'hésitez pas à créer un réseau de soutien. Rejoignez les groupes de parents dans votre quartier et sur Manmi Ba. Vous n'êtes pas seul ! 💪
              </p>
            ) : userSituation === 'future-maman-moderne' ? (
              <p className="text-sm">
                <strong>Future maman :</strong> Pensez à préparer votre sac de maternité dès la 32ème semaine. N'oubliez pas les documents importants et vos affaires de confort. 🤰
              </p>
            ) : (
              <p className="text-sm">
                <strong>Astuce santé :</strong> La fièvre n'est pas une maladie mais un symptôme. Prenez la température, surveillez le comportement général de l'enfant et contactez un professionnel si besoin. 🌡️
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Video Player Modal */}
      <VideoPlayer 
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
