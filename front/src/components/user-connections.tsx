import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Search, 
  Users, 
  UserPlus, 
  UserCheck,
  MapPin,
  MessageCircle,
  Heart,
  Baby
} from "lucide-react";

export function UserConnections() {
  const [searchQuery, setSearchQuery] = useState('');
  const [connections] = useState([
    {
      id: '1',
      name: 'Sarah Kouamé',
      avatar: null,
      role: 'Maman urbaine connectée',
      situation: 'urbaine-connectee',
      location: 'Abidjan, Marcory',
      children: 1,
      mutualFriends: 12,
      connected: true,
      bio: 'Jeune maman passionnée, toujours à la recherche de conseils et d\'astuces pour mon petit Kofi ❤️'
    },
    {
      id: '2',
      name: 'Kouassi David',
      avatar: null,
      role: 'Papa célibataire',
      situation: 'pere-celibataire',
      location: 'Abidjan, Cocody',
      children: 2,
      mutualFriends: 5,
      connected: false,
      bio: 'Papa solo de deux merveilleux enfants. On apprend ensemble chaque jour ! 👨‍👦‍👦'
    },
    {
      id: '3',
      name: 'Jean-Claude Bamba',
      avatar: null,
      role: 'Papa veuf',
      situation: 'papa-veuf',
      location: 'Yopougon',
      children: 3,
      mutualFriends: 3,
      connected: false,
      bio: 'Père courageux de 3 enfants. La vie continue, pour eux. 🕊️'
    },
    {
      id: '4',
      name: 'Aminata Traoré',
      avatar: null,
      role: 'Future maman',
      situation: 'future-maman-moderne',
      location: 'Yopougon',
      children: 0,
      mutualFriends: 8,
      connected: true,
      bio: 'Bientôt maman pour la première fois ! Impatiente de rencontrer mon bébé 🤰✨'
    },
    {
      id: '5',
      name: 'Dr. Adjoua N\'Guessan',
      avatar: null,
      role: 'Pédiatre',
      situation: 'professionnelle-sante',
      location: 'Abidjan',
      children: 0,
      mutualFriends: 45,
      verified: true,
      connected: true,
      bio: 'Pédiatre au CHU de Yopougon. Partage de conseils santé validés pour vos enfants 👩‍⚕️'
    },
    {
      id: '6',
      name: 'Marie Koffi',
      avatar: null,
      role: 'Maman de jumeaux',
      situation: 'urbaine-connectee',
      location: 'Cocody',
      children: 2,
      mutualFriends: 8,
      connected: false,
      bio: 'Double bonheur avec mes jumeaux ! Organisation et patience sont mes mots d\'ordre 👶👶'
    },
    {
      id: '7',
      name: 'Fatou Coulibaly',
      avatar: null,
      role: 'Maman rurale',
      situation: 'rurale-debrouillarde',
      location: 'Bouaké',
      children: 4,
      mutualFriends: 2,
      connected: false,
      bio: 'Agricultrice et maman de 4 beaux enfants. Fière de mes racines 🌾❤️'
    },
    {
      id: '8',
      name: 'Sage-femme Aya',
      avatar: null,
      role: 'Sage-femme',
      situation: 'professionnelle-sante',
      location: 'Abidjan',
      children: 0,
      mutualFriends: 15,
      verified: true,
      connected: true,
      bio: 'Accompagnement des futures mamans avec bienveillance depuis 15 ans 🤱'
    }
  ]);

  const [suggested] = useState([
    {
      id: '9',
      name: 'Aïcha Diabaté',
      avatar: null,
      role: 'Grand-mère gardienne',
      situation: 'grand-mere-gardienne',
      location: 'Korhogo',
      mutualFriends: 6,
      connected: false
    },
    {
      id: '10',
      name: 'Ibrahim Touré',
      avatar: null,
      role: 'Papa célibataire',
      situation: 'pere-celibataire',
      location: 'San-Pédro',
      mutualFriends: 4,
      connected: false
    }
  ]);

  const getSituationIcon = (situation) => {
    const icons = {
      'urbaine-connectee': '📱',
      'rurale-debrouillarde': '🌾',
      'future-maman-moderne': '🤰',
      'pere-celibataire': '👨‍👦',
      'papa-veuf': '🕊️',
      'grand-mere-gardienne': '👵',
      'professionnelle-sante': '👩‍⚕️',
      'autre': '👤'
    };
    return icons[situation] || '👤';
  };

  const filteredConnections = connections.filter(conn =>
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conn.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myConnections = filteredConnections.filter(c => c.connected);
  const allUsers = filteredConnections;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des parents par nom, rôle ou ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connections">
            Mes connexions ({myConnections.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            Tous les parents ({allUsers.length})
          </TabsTrigger>
          <TabsTrigger value="suggested">
            Suggestions ({suggested.length})
          </TabsTrigger>
        </TabsList>

        {/* My Connections */}
        <TabsContent value="connections" className="space-y-4 mt-6">
          {myConnections.length > 0 ? (
            myConnections.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Avatar */}
                    <Avatar className="h-20 w-20 mx-auto md:mx-0">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-2xl">
                        {getSituationIcon(user.situation)}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        {user.verified && (
                          <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
                            ✓ Vérifié
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{user.role}</p>
                      
                      {user.bio && (
                        <p className="text-sm mb-3 line-clamp-2">{user.bio}</p>
                      )}

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                        {user.children > 0 && (
                          <div className="flex items-center gap-1">
                            <Baby className="h-4 w-4" />
                            <span>{user.children} enfant{user.children > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {user.mutualFriends > 0 && (
                          <div className="flex items-center gap-1 text-primary">
                            <Users className="h-4 w-4" />
                            <span>{user.mutualFriends} amis en commun</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="default" className="flex-1" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" className="flex-1" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Voir le profil
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Connecté
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Aucune connexion</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Commencez à vous connecter avec d'autres parents de la communauté
                </p>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher des parents
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* All Users */}
        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {allUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xl">
                        {getSituationIcon(user.situation)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{user.name}</h4>
                        {user.verified && (
                          <Badge variant="secondary" className="text-xs">✓</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{user.role}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{user.location}</span>
                        </div>
                        {user.mutualFriends > 0 && (
                          <div className="flex items-center gap-1 text-primary">
                            <Users className="h-3 w-3" />
                            <span>{user.mutualFriends} amis</span>
                          </div>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant={user.connected ? "outline" : "default"} 
                        className="w-full"
                      >
                        {user.connected ? (
                          <>
                            <UserCheck className="h-3 w-3 mr-1" />
                            Connecté
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-3 w-3 mr-1" />
                            Suivre
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Suggestions */}
        <TabsContent value="suggested" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personnes que vous pourriez connaître</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggested.map((user) => (
                <div key={user.id} className="flex items-center gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {getSituationIcon(user.situation)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </div>
                    {user.mutualFriends > 0 && (
                      <p className="text-xs text-primary mt-1">
                        {user.mutualFriends} amis en commun
                      </p>
                    )}
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Suivre
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
