import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Send,
  Image as ImageIcon,
  Video,
  Smile,
  MoreHorizontal,
  Baby,
  Users,
  TrendingUp,
  Calendar,
  UserPlus,
  UserCheck
} from "lucide-react";

export function SocialFeed({ currentUser }) {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: {
        name: 'Sarah Kouamé',
        avatar: null,
        role: 'Maman urbaine connectée',
        situation: 'urbaine-connectee'
      },
      content: 'Mon petit Kofi a fait ses premiers pas aujourd\'hui ! 🎉 Je suis tellement émue. Quelqu\'un a des conseils pour sécuriser la maison maintenant qu\'il marche ?',
      timestamp: 'Il y a 2 heures',
      likes: 24,
      comments: 8,
      shares: 2,
      liked: false,
      image: null,
      type: 'milestone'
    },
    {
      id: '2',
      author: {
        name: 'Kouassi David',
        avatar: null,
        role: 'Papa célibataire',
        situation: 'pere-celibataire'
      },
      content: 'Les papas célibataires d\'Abidjan, comment vous gérez les repas sains et rapides après le travail ? J\'ai besoin d\'idées !',
      timestamp: 'Il y a 4 heures',
      likes: 15,
      comments: 12,
      shares: 1,
      liked: true,
      image: null,
      type: 'question'
    },
    {
      id: '3',
      author: {
        name: 'Aminata Traoré',
        avatar: null,
        role: 'Future maman',
        situation: 'future-maman-moderne'
      },
      content: 'Semaine 32 de grossesse 🤰 ! Besoin de recommandations pour une bonne maternité à Yopougon. Merci d\'avance les mamans !',
      timestamp: 'Il y a 5 heures',
      likes: 31,
      comments: 18,
      shares: 5,
      liked: false,
      image: null,
      type: 'advice'
    },
    {
      id: '4',
      author: {
        name: 'Dr. Adjoua N\'Guessan',
        avatar: null,
        role: 'Pédiatre',
        situation: 'professionnelle-sante',
        verified: true
      },
      content: '💡 Conseil du jour : La fièvre chez l\'enfant n\'est pas une maladie mais un symptôme. Avant de paniquer, prenez la température et surveillez le comportement général de l\'enfant. Thread 👇',
      timestamp: 'Il y a 6 heures',
      likes: 156,
      comments: 23,
      shares: 45,
      liked: true,
      image: null,
      type: 'tip'
    }
  ]);

  const [suggestedUsers] = useState([
    {
      id: '1',
      name: 'Marie Koffi',
      role: 'Maman de jumeaux',
      location: 'Cocody',
      mutualFriends: 8,
      followed: false
    },
    {
      id: '2',
      name: 'Jean-Claude Bamba',
      role: 'Papa veuf',
      location: 'Yopougon',
      mutualFriends: 3,
      followed: false
    },
    {
      id: '3',
      name: 'Sage-femme Aya',
      role: 'Professionnelle de santé',
      location: 'Abidjan',
      mutualFriends: 15,
      verified: true,
      followed: false
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now().toString(),
      author: {
        name: currentUser?.name || 'Utilisateur',
        avatar: currentUser?.avatar,
        role: currentUser?.role || 'Parent',
        situation: currentUser?.situation
      },
      content: newPost,
      timestamp: 'À l\'instant',
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      image: null,
      type: 'post'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'milestone': return 'bg-yellow-100 text-yellow-800';
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'advice': return 'bg-purple-100 text-purple-800';
      case 'tip': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeLabel = (type) => {
    switch (type) {
      case 'milestone': return '🎉 Étape importante';
      case 'question': return '❓ Question';
      case 'advice': return '💬 Conseil';
      case 'tip': return '💡 Astuce';
      default: return '📝 Publication';
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>
                  <Users className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Quoi de neuf ? Partagez votre expérience de parent..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4 mr-2" />
                  Vidéo
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4 mr-2" />
                  Emoji
                </Button>
              </div>
              <Button onClick={handlePost} disabled={!newPost.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Publier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="following">Abonnements</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="tips">Conseils</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          <Users className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{post.author.name}</h4>
                          {post.author.verified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Vérifié
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.author.role}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.type && (
                    <Badge className={getPostTypeColor(post.type)}>
                      {getPostTypeLabel(post.type)}
                    </Badge>
                  )}
                  
                  <p className="text-sm leading-relaxed">{post.content}</p>

                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img src={post.image} alt="Post" className="w-full" />
                    </div>
                  )}

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-3">
                    <span>{post.likes} mentions j'aime</span>
                    <span>{post.comments} commentaires</span>
                    <span>{post.shares} partages</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 border-t pt-3">
                    <Button
                      variant={post.liked ? "default" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.liked ? 'fill-current' : ''}`} />
                      J'aime
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Commenter
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager
                    </Button>
                  </div>

                  {/* Comment Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.avatar} />
                      <AvatarFallback>
                        <Users className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <Input placeholder="Écrivez un commentaire..." />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="following" className="mt-4">
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Suivez des parents</h3>
              <p className="text-sm text-muted-foreground">
                Commencez à suivre d'autres parents pour voir leurs publications ici
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4 mt-4">
            {posts.filter(p => p.type === 'question').map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback><Users className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{post.author.name}</h4>
                      <p className="text-sm mt-1">{post.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{post.comments} réponses</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tips" className="space-y-4 mt-4">
            {posts.filter(p => p.type === 'tip').map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback><Users className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{post.author.name}</h4>
                        {post.author.verified && (
                          <Badge variant="secondary" className="text-xs">✓</Badge>
                        )}
                      </div>
                      <p className="text-sm mt-1">{post.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{post.likes} j'aime</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Suggested Connections */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Suggestions de connexions</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>
                    <Users className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="font-medium text-sm truncate">{user.name}</h4>
                    {user.verified && (
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                  <p className="text-xs text-muted-foreground">{user.location}</p>
                  {user.mutualFriends > 0 && (
                    <p className="text-xs text-primary mt-1">
                      {user.mutualFriends} amis en commun
                    </p>
                  )}
                  <Button size="sm" className="mt-2 w-full" variant="outline">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Suivre
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Sujets tendances
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">#VaccinationCôtedIvoire</h4>
              <p className="text-xs text-muted-foreground">2.3k publications</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">#PapasCélibataires</h4>
              <p className="text-xs text-muted-foreground">1.8k publications</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">#AlimentationBébé</h4>
              <p className="text-xs text-muted-foreground">4.1k publications</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">#ConseilsPédiatre</h4>
              <p className="text-xs text-muted-foreground">5.6k publications</p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Événements à venir
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="bg-primary/10 rounded p-2 text-center min-w-[60px]">
                <div className="text-xs text-primary">MAR</div>
                <div className="text-xl font-bold text-primary">25</div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Atelier allaitement</h4>
                <p className="text-xs text-muted-foreground">CHU Yopougon - 14h00</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Participer
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-primary/10 rounded p-2 text-center min-w-[60px]">
                <div className="text-xs text-primary">AVR</div>
                <div className="text-xl font-bold text-primary">02</div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Rencontre papas solo</h4>
                <p className="text-xs text-muted-foreground">Cocody - 10h00</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Participer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
