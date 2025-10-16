import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/9e13c5ebd83bf54eca3ccca342d73f30cf4d9ce4.png';
import { 
  Bell, 
  Settings, 
  LogOut, 
  LogIn, 
  UserPlus,
  Menu,
  Monitor,
  Smartphone
} from 'lucide-react';

export function Header({ 
  isAuthenticated, 
  user, 
  getPendingVaccinations, 
  onLogoClick, 
  onNotificationsClick, 
  onSettingsClick, 
  onLogout, 
  onLoginClick, 
  onRegisterClick,
  onToggleSidebar,
  showSidebarToggle = false,
  viewMode,
  onViewModeChange
}) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            title="Retour à l'accueil"
          >
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <ImageWithFallback 
                src={logoImage}
                alt="Manmi Ba Logo"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-primary">Manmi Ba</h1>
              <p className="text-xs text-muted-foreground">Santé familiale</p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle - visible only on larger screens when authenticated */}
          {isAuthenticated && onViewModeChange && (
            <div className="hidden md:flex items-center gap-1 mr-2 bg-muted/30 rounded-md p-1">
              <Button 
                variant={viewMode === 'auto' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => onViewModeChange('auto')}
                title="Automatique"
                className="h-8 px-2"
              >
                Auto
              </Button>
              <Button 
                variant={viewMode === 'desktop' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => onViewModeChange('desktop')}
                title="Mode Desktop"
                className="h-8 px-2"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'mobile' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => onViewModeChange('mobile')}
                title="Mode Mobile"
                className="h-8 px-2"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          )}

          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNotificationsClick}
                title="Notifications"
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {getPendingVaccinations && getPendingVaccinations() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center bg-destructive">
                    {getPendingVaccinations()}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onSettingsClick}
                title="Paramètres"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                title="Déconnexion"
                className="hidden sm:flex"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={onLoginClick}>
                <LogIn className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Connexion</span>
              </Button>
              <Button variant="default" size="sm" onClick={onRegisterClick}>
                <UserPlus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Inscription</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
