import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, User } from "lucide-react";

interface Child {
  id: string;
  name: string;
  birthDate: string;
  avatar?: string;
  bloodType?: string;
  allergies: string[];
}

interface ChildProfileCardProps {
  child: Child;
  onClick: () => void;
}

export function ChildProfileCard({ child, onClick }: ChildProfileCardProps) {
  const getAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months < 0 ? 12 + months : months} mois`;
    }
    return `${years} an${years > 1 ? 's' : ''}`;
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={child.avatar} alt={child.name} />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-medium">{child.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Calendar className="h-3 w-3" />
              <span>{getAge(child.birthDate)}</span>
            </div>
            
            {child.allergies.length > 0 && (
              <div className="flex gap-1 mt-2">
                {child.allergies.slice(0, 2).map((allergy) => (
                  <Badge key={allergy} variant="destructive" className="text-xs">
                    {allergy}
                  </Badge>
                ))}
                {child.allergies.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{child.allergies.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {child.bloodType && (
            <Badge variant="outline" className="ml-auto">
              {child.bloodType}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}