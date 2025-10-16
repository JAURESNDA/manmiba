import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Home, 
  Syringe, 
  TrendingUp, 
  BookOpen, 
  GraduationCap,
  Heart,
  Stethoscope,
  Apple,
  MapPin,
  MessageCircle,
  Baby,
  LogOut,
  X
} from 'lucide-react';

export function AppSidebar({ 
  activeTab, 
  setActiveTab, 
  userType, 
  vaccinations,
  onClose,
  isOpen = true 
}) {
  const getPendingVaccinations = () => {
    return vaccinations?.filter(v => v.status === 'due' || v.status === 'overdue').length || 0;
  };

  const menuItems = userType === 'parent' ? [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'vaccinations', label: 'Vaccinations', icon: Syringe, badge: getPendingVaccinations() },
    { id: 'growth', label: 'Croissance', icon: TrendingUp },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'symptoms', label: 'Symptômes', icon: Stethoscope },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'directory', label: 'Annuaire', icon: MapPin },
    { id: 'community', label: 'Communauté', icon: MessageCircle },
    { id: 'education', label: 'Éducation', icon: GraduationCap },
  ] : [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'symptoms', label: 'Symptômes', icon: Stethoscope },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'directory', label: 'Annuaire', icon: MapPin },
    { id: 'community', label: 'Communauté', icon: MessageCircle },
    { id: 'education', label: 'Éducation', icon: GraduationCap },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 flex flex-col">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* User Type Badge */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2 bg-sidebar-accent rounded-md">
          {userType === 'parent' ? (
            <>
              <Baby className="h-5 w-5 text-sidebar-accent-foreground" />
              <span className="text-sm font-medium text-sidebar-accent-foreground">Mode Parent</span>
            </>
          ) : (
            <>
              <Heart className="h-5 w-5 text-sidebar-accent-foreground" />
              <span className="text-sm font-medium text-sidebar-accent-foreground">Future Maman</span>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose && window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="ml-auto bg-destructive text-destructive-foreground">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer Info */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
