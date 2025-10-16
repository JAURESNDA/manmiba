import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Stethoscope,
  Heart,
  Baby,
  Award,
  Clock,
  Users,
  Activity,
  FileText,
  Camera,
  Shield,
  Briefcase,
  GraduationCap
} from "lucide-react";

export function UserProfile({ user, userRole, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    bloodType: user?.bloodType || '',
    specialty: user?.specialty || '',
    licenseNumber: user?.licenseNumber || '',
    hospital: user?.hospital || '',
    experience: user?.experience || '',
    bio: user?.bio || '',
    consultationHours: user?.consultationHours || '',
    emergencyContact: user?.emergencyContact || '',
    allergies: user?.allergies || '',
    medicalHistory: user?.medicalHistory || '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      dateOfBirth: user?.dateOfBirth || '',
      bloodType: user?.bloodType || '',
      specialty: user?.specialty || '',
      licenseNumber: user?.licenseNumber || '',
      hospital: user?.hospital || '',
      experience: user?.experience || '',
      bio: user?.bio || '',
      consultationHours: user?.consultationHours || '',
      emergencyContact: user?.emergencyContact || '',
      allergies: user?.allergies || '',
      medicalHistory: user?.medicalHistory || '',
    });
    setIsEditing(false);
  };

  // Determine user icon and title based on role
  const getRoleInfo = () => {
    switch (userRole) {
      case 'doctor':
        return { icon: Stethoscope, title: 'Médecin', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'midwife':
        return { icon: Heart, title: 'Sage-femme', color: 'text-pink-600', bgColor: 'bg-pink-100' };
      case 'nurse':
        return { icon: Activity, title: 'Infirmier(ère)', color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'pregnant':
        return { icon: Heart, title: 'Future Maman', color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 'parent':
        return { icon: Users, title: 'Parent', color: 'text-orange-600', bgColor: 'bg-orange-100' };
      case 'child':
        return { icon: Baby, title: 'Enfant', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      default:
        return { icon: User, title: 'Utilisateur', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const roleInfo = getRoleInfo();
  const RoleIcon = roleInfo.icon;
  const isHealthProfessional = ['doctor', 'midwife', 'nurse'].includes(userRole);

  return (
    <div className="space-y-6">
      {/* Header Card with Avatar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className={`${roleInfo.bgColor} ${roleInfo.color} text-3xl`}>
                  <RoleIcon className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                onClick={() => alert('Changer la photo de profil - Fonctionnalité à venir')}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{formData.name || 'Utilisateur'}</h2>
                <Badge className={`${roleInfo.bgColor} ${roleInfo.color} border-0`}>
                  <RoleIcon className="h-4 w-4 mr-1" />
                  {roleInfo.title}
                </Badge>
              </div>
              
              <div className="space-y-2 text-muted-foreground">
                {formData.email && (
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="h-4 w-4" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.address && (
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MapPin className="h-4 w-4" />
                    <span>{formData.address}</span>
                  </div>
                )}
              </div>

              {isHealthProfessional && formData.specialty && (
                <div className="mt-3">
                  <Badge variant="outline">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {formData.specialty}
                  </Badge>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} variant="default">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Informations</TabsTrigger>
          <TabsTrigger value="professional">
            {isHealthProfessional ? 'Professionnel' : 'Médical'}
          </TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date de naissance</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {!isHealthProfessional && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Groupe sanguin</Label>
                      <Input
                        id="bloodType"
                        value={formData.bloodType}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Ex: O+"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        disabled={!isEditing}
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>
                  </>
                )}
              </div>

              {!isHealthProfessional && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies connues</Label>
                    <Textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Listez vos allergies (médicaments, aliments, etc.)"
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional/Medical Tab */}
        <TabsContent value="professional" className="space-y-4">
          {isHealthProfessional ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Informations professionnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Spécialité</Label>
                    <Input
                      id="specialty"
                      value={formData.specialty}
                      onChange={(e) => handleInputChange('specialty', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Ex: Pédiatrie"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Numéro d'ordre</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospital">Établissement</Label>
                    <Input
                      id="hospital"
                      value={formData.hospital}
                      onChange={(e) => handleInputChange('hospital', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Nom de l'hôpital ou clinique"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Années d'expérience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="consultationHours">Horaires de consultation</Label>
                    <Textarea
                      id="consultationHours"
                      value={formData.consultationHours}
                      onChange={(e) => handleInputChange('consultationHours', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Ex: Lun-Ven: 8h-17h, Sam: 9h-13h"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Présentation</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Décrivez votre parcours et votre approche..."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informations médicales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Antécédents médicaux</Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Maladies chroniques, interventions chirurgicales, etc."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Groupe sanguin</p>
                          <p className="font-semibold">{formData.bloodType || 'Non renseigné'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center">
                          <Heart className="h-6 w-6 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Contact d'urgence</p>
                          <p className="font-semibold text-sm">{formData.emergencyContact || 'Non renseigné'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isHealthProfessional ? (
              <>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">248</div>
                    <div className="text-sm text-muted-foreground">Patients suivis</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Consultations ce mois</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="text-sm text-muted-foreground">Note moyenne</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">{formData.experience || '0'}+</div>
                    <div className="text-sm text-muted-foreground">Années d'expérience</div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Rendez-vous</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Vaccins à jour</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground">Entrées journal</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-pink-600" />
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-muted-foreground">Profil complété</div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isHealthProfessional ? (
                <>
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Consultation avec Sarah Kouamé</p>
                      <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Ordonnance créée pour Amina Traoré</p>
                      <p className="text-sm text-muted-foreground">Il y a 5 heures</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Nouveau patient inscrit</p>
                      <p className="text-sm text-muted-foreground">Hier</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Vaccination mise à jour</p>
                      <p className="text-sm text-muted-foreground">Il y a 3 jours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Nouvelle entrée au journal de santé</p>
                      <p className="text-sm text-muted-foreground">Il y a 5 jours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Rendez-vous pédiatre confirmé</p>
                      <p className="text-sm text-muted-foreground">Il y a 1 semaine</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
