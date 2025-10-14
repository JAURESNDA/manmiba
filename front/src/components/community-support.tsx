import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Send,
  Bot,
  Clock,
  Star,
  User,
  Baby,
  MessageSquare
} from "lucide-react";

interface ForumPost {
  id: string;
  author: string;
  authorType: 'parent' | 'expert';
  avatar?: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  timestamp: string;
  verified: boolean;
}

interface ChatbotResponse {
  id: string;
  question: string;
  answer: string;
  helpful: boolean | null;
}

export function CommunitySupport() {
  const [activeTab, setActiveTab] = useState<'forum' | 'chatbot'>('forum');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [chatbotQuestion, setChatbotQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatbotResponse[]>([]);

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      author: 'Maman Sarah',
      authorType: 'parent',
      title: 'Mon bébé de 6 mois refuse les légumes',
      content: 'Bonjour à toutes, ma fille refuse catégoriquement tous les légumes depuis qu\'on a commencé la diversification. Avez-vous des astuces ?',
      category: 'Alimentation',
      likes: 15,
      replies: 8,
      timestamp: '2024-01-15T10:30:00Z',
      verified: false
    },
    {
      id: '2',
      author: 'Dr. Koné (Pédiatre)',
      authorType: 'expert',
      title: 'Prévention du paludisme chez les enfants',
      content: 'Le paludisme reste une cause majeure de mortalité infantile. Voici les mesures préventives essentielles que tout parent doit connaître...',
      category: 'Santé',
      likes: 45,
      replies: 12,
      timestamp: '2024-01-14T14:20:00Z',
      verified: true
    },
    {
      id: '3',
      author: 'Papa Jean',
      authorType: 'parent',
      title: 'Réveil nocturne à 18 mois',
      content: 'Notre fils se réveille plusieurs fois par nuit depuis quelques semaines. Il était pourtant un bon dormeur. Des conseils ?',
      category: 'Sommeil',
      likes: 8,
      replies: 5,
      timestamp: '2024-01-14T09:15:00Z',
      verified: false
    },
    {
      id: '4',
      author: 'Sage-femme Adjoua',
      authorType: 'expert',
      title: 'Signes d\'alerte pendant la grossesse',
      content: 'Il est important de reconnaître les signaux qui nécessitent une consultation immédiate pendant la grossesse...',
      category: 'Grossesse',
      likes: 67,
      replies: 15,
      timestamp: '2024-01-13T16:45:00Z',
      verified: true
    }
  ];

  const chatbotResponses = {
    'fièvre': {
      answer: "Pour la fièvre chez un enfant :\n• Donnez du paracétamol (10-15mg/kg)\n• Déshabillez l'enfant\n• Proposez à boire régulièrement\n• Consultez si fièvre >38.5°C chez un nourrisson <3 mois\n• Appelez le 185 si convulsions ou difficultés respiratoires",
      category: "Urgence médicale"
    },
    'diarrhée': {
      answer: "En cas de diarrhée :\n• Continuez l'allaitement\n• Donnez des solutés de réhydratation (SRO)\n• Évitez les anti-diarrhéiques\n• Consultez si signes de déshydratation (bouche sèche, pas de larmes, fontanelle creuse)\n• Attention aux selles avec sang",
      category: "Soins courants"
    },
    'vaccination': {
      answer: "Le calendrier vaccinal ivoirien comprend :\n• BCG à la naissance\n• DTC-HepB-Hib à 6, 10, 14 semaines\n• Polio oral à 6, 10, 14 semaines\n• Rougeole à 9 et 15 mois\n• Fièvre jaune à 9 mois\n\nTenez toujours le carnet de vaccination à jour !",
      category: "Prévention"
    }
  };

  const handleChatbotSubmit = () => {
    if (!chatbotQuestion.trim()) return;

    // Simple keyword matching for demo
    const keywords = Object.keys(chatbotResponses);
    const matchedKeyword = keywords.find(keyword => 
      chatbotQuestion.toLowerCase().includes(keyword)
    );

    const response = matchedKeyword 
      ? chatbotResponses[matchedKeyword as keyof typeof chatbotResponses]
      : {
          answer: "Je vous recommande de consulter un professionnel de santé pour cette question spécifique. Vous pouvez également poser votre question sur le forum communautaire pour obtenir des conseils d'autres parents.",
          category: "Consultation recommandée"
        };

    const newResponse: ChatbotResponse = {
      id: Date.now().toString(),
      question: chatbotQuestion,
      answer: response.answer,
      helpful: null
    };

    setChatHistory([...chatHistory, newResponse]);
    setChatbotQuestion('');
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)} jour(s)`;
  };

  return (
    <div className="space-y-4">
      {/* Navigation tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'forum' ? 'default' : 'outline'}
          onClick={() => setActiveTab('forum')}
          className="flex-1"
        >
          <Users className="h-4 w-4 mr-2" />
          Forum
        </Button>
        <Button
          variant={activeTab === 'chatbot' ? 'default' : 'outline'}
          onClick={() => setActiveTab('chatbot')}
          className="flex-1"
        >
          <Bot className="h-4 w-4 mr-2" />
          SantéBot
        </Button>
      </div>

      {activeTab === 'forum' && (
        <>
          {/* Nouveau post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Poser une question
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Titre de votre question..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <Textarea
                placeholder="Décrivez votre situation en détail..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={3}
              />
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Publier ma question
              </Button>
            </CardContent>
          </Card>

          {/* Catégories populaires */}
          <Card>
            <CardHeader>
              <CardTitle>Catégories populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Alimentation</Badge>
                <Badge variant="secondary">Sommeil</Badge>
                <Badge variant="secondary">Santé</Badge>
                <Badge variant="secondary">Développement</Badge>
                <Badge variant="secondary">Grossesse</Badge>
                <Badge variant="secondary">Vaccination</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Posts du forum */}
          <div className="space-y-3">
            {forumPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>
                        {post.authorType === 'expert' ? <Star className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{post.author}</span>
                        {post.verified && (
                          <Badge variant="default" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Expert vérifié
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatTimeAgo(post.timestamp)}
                        </span>
                      </div>
                      
                      <h4 className="font-medium mb-2">{post.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies} réponses</span>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Répondre
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'chatbot' && (
        <>
          {/* Introduction SantéBot */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Bot className="h-5 w-5" />
                SantéBot - Assistant santé 24h/24
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700 mb-2">
                Posez vos questions sur la santé de votre enfant. Je peux vous aider avec :
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>• Fièvre et symptômes</div>
                <div>• Calendrier vaccinal</div>
                <div>• Premiers secours</div>
                <div>• Nutrition</div>
              </div>
            </CardContent>
          </Card>

          {/* Questions fréquentes */}
          <Card>
            <CardHeader>
              <CardTitle>Questions fréquentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => setChatbotQuestion('Que faire en cas de fièvre ?')}
              >
                Que faire en cas de fièvre ?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => setChatbotQuestion('Calendrier de vaccination')}
              >
                Quel est le calendrier de vaccination ?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => setChatbotQuestion('Mon enfant a la diarrhée')}
              >
                Mon enfant a la diarrhée, que faire ?
              </Button>
            </CardContent>
          </Card>

          {/* Historique du chat */}
          {chatHistory.length > 0 && (
            <div className="space-y-3">
              {chatHistory.map((chat) => (
                <Card key={chat.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Question de l'utilisateur */}
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 p-2 bg-muted rounded-lg">
                          <p className="text-sm">{chat.question}</p>
                        </div>
                      </div>
                      
                      {/* Réponse du bot */}
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 p-2 bg-blue-50 rounded-lg">
                          <pre className="text-sm whitespace-pre-wrap font-sans">{chat.answer}</pre>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">Cette réponse vous a-t-elle aidé ?</span>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              👍
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              👎
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Nouvelle question */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Tapez votre question..."
                  value={chatbotQuestion}
                  onChange={(e) => setChatbotQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatbotSubmit()}
                  className="flex-1"
                />
                <Button onClick={handleChatbotSubmit}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Avertissement */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-3">
              <p className="text-xs text-orange-700">
                ⚠️ Les conseils de SantéBot sont à titre informatif uniquement. 
                En cas d'urgence, appelez le 185 ou consultez un médecin.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}