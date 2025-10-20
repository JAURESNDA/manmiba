import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { AspectRatio } from "./ui/aspect-ratio";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ThumbsUp,
  Share2,
  MessageCircle,
  Clock
} from "lucide-react";

export function VideoPlayer({ video, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary">{video.category}</Badge>
              <span className="text-sm flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {video.duration}
              </span>
              <span className="text-sm">{(video.views / 1000).toFixed(1)}k vues</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden bg-black">
            <AspectRatio ratio={16 / 9}>
              <div className="relative w-full h-full bg-black flex items-center justify-center group">
                <ImageWithFallback
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Button
                    size="lg"
                    className="h-20 w-20 rounded-full"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="h-10 w-10" />
                    ) : (
                      <Play className="h-10 w-10 ml-1" />
                    )}
                  </Button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <div className="flex-1 h-1 bg-white/30 rounded-full">
                      <div className="h-1 bg-primary rounded-full w-1/3" />
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </Card>

          {/* Video Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={liked ? "default" : "outline"}
                onClick={() => setLiked(!liked)}
              >
                <ThumbsUp className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                J'aime
              </Button>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Commenter
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          {/* Video Description */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">À propos de cette vidéo</h4>
              <p className="text-sm text-muted-foreground">
                {video.description || 'Vidéo éducative sur la santé maternelle et infantile en Côte d\'Ivoire. Validée par des professionnels de santé.'}
              </p>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4">Commentaires (12)</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">SA</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Sarah Kouamé</p>
                    <p className="text-sm text-muted-foreground">
                      Très instructif ! Merci pour ces conseils pratiques.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 2 jours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">KD</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Kouassi David</p>
                    <p className="text-sm text-muted-foreground">
                      Parfait pour les papas célibataires comme moi. Merci !
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 4 jours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
