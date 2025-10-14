import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Bell, X, Syringe, Calendar, AlertCircle, Heart } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'vaccination' | 'appointment' | 'alert' | 'reminder';
  date: string;
  read: boolean;
}

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Vaccination en retard',
      message: 'Le vaccin Polio oral (2ème dose) est en retard. Veuillez consulter votre centre de santé.',
      type: 'vaccination',
      date: '2024-01-20',
      read: false
    },
    {
      id: '2',
      title: 'Rappel de vaccination',
      message: 'La vaccination DTC-HepB-Hib (2ème dose) est prévue pour demain.',
      type: 'vaccination',
      date: '2024-01-19',
      read: false
    },
    {
      id: '3',
      title: 'Pesée mensuelle',
      message: 'Il est temps de peser votre enfant et d\'enregistrer sa croissance.',
      type: 'reminder',
      date: '2024-01-18',
      read: true
    },
    {
      id: '4',
      title: 'Prochain rendez-vous',
      message: 'Consultation pédiatrique prévue le 25 janvier à 10h00.',
      type: 'appointment',
      date: '2024-01-15',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'vaccination':
        return <Syringe className="h-4 w-4" />;
      case 'appointment':
        return <Calendar className="h-4 w-4" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4" />;
      case 'reminder':
        return <Heart className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getVariant = (type: string, read: boolean) => {
    if (read) return 'outline';
    switch (type) {
      case 'vaccination':
        return 'default';
      case 'alert':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="fixed top-16 right-4 w-[calc(100vw-2rem)] max-w-md max-h-[500px] flex flex-col shadow-lg z-50">
      <CardHeader className="flex-shrink-0 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Aucune notification</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 p-2 rounded-full ${
                        !notification.read ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant={getVariant(notification.type, notification.read) as any}>
                            {notification.type === 'vaccination' && 'Vaccination'}
                            {notification.type === 'appointment' && 'Rendez-vous'}
                            {notification.type === 'alert' && 'Alerte'}
                            {notification.type === 'reminder' && 'Rappel'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {notifications.length > 0 && (
        <div className="p-3 border-t flex-shrink-0">
          <Button variant="outline" size="sm" className="w-full">
            Tout marquer comme lu
          </Button>
        </div>
      )}
    </Card>
  );
}
