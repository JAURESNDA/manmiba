import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Search,
  Stethoscope,
  Baby,
  Building2,
  Pill,
  Video,
  Calendar,
  X,
  Ambulance,
  Shield
} from "lucide-react";

interface HealthcareProfessional {
  id: string;
  name: string;
  specialty: string;
  location: string;
  district: string;
  phone: string;
  rating: number;
  availability: string;
  consultation_fee: string;
  emergency: boolean;
  telemedicine: boolean;
}

interface Pharmacy {
  id: string;
  name: string;
  location: string;
  phone: string;
  hours: string;
  emergency_service: boolean;
  pediatric_specialist: boolean;
}

export function HealthcareDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const professionals: HealthcareProfessional[] = [
    {
      id: '1',
      name: 'Dr. Kouame Adjoua',
      specialty: 'Pédiatre',
      location: 'CHU de Cocody',
      district: 'Cocody',
      phone: '+225 27 22 44 13 79',
      rating: 4.8,
      availability: 'Lun-Ven 8h-17h',
      consultation_fee: '15,000 - 25,000 FCFA',
      emergency: true,
      telemedicine: true
    },
    {
      id: '2',
      name: 'Dr. Traore Mamadou',
      specialty: 'Médecin généraliste',
      location: 'Centre de santé Abobo',
      district: 'Abobo',
      phone: '+225 07 09 85 67 23',
      rating: 4.5,
      availability: 'Lun-Sam 7h-19h',
      consultation_fee: '5,000 - 10,000 FCFA',
      emergency: false,
      telemedicine: false
    },
    {
      id: '3',
      name: 'Dr. Assi Marie-Claire',
      specialty: 'Pédiatre',
      location: 'Clinique Internationale',
      district: 'Plateau',
      phone: '+225 27 20 21 55 89',
      rating: 4.9,
      availability: 'Lun-Ven 9h-18h, Sam 9h-13h',
      consultation_fee: '30,000 - 50,000 FCFA',
      emergency: true,
      telemedicine: true
    },
    {
      id: '4',
      name: 'Sage-femme Konan Akissi',
      specialty: 'Sage-femme',
      location: 'Maternité Adjamé',
      district: 'Adjamé',
      phone: '+225 05 44 33 77 91',
      rating: 4.6,
      availability: '24h/24',
      consultation_fee: '3,000 - 8,000 FCFA',
      emergency: true,
      telemedicine: false
    }
  ];

  const pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'Pharmacie de la Paix',
      location: 'Boulevard Latrille, Cocody',
      phone: '+225 27 22 44 56 78',
      hours: 'Lun-Sam 7h30-21h, Dim 8h-20h',
      emergency_service: true,
      pediatric_specialist: true
    },
    {
      id: '2',
      name: 'Pharmacie du Plateau',
      location: 'Avenue Chardy, Plateau',
      phone: '+225 27 20 32 15 47',
      hours: 'Lun-Ven 8h-19h, Sam 8h-17h',
      emergency_service: false,
      pediatric_specialist: true
    },
    {
      id: '3',
      name: 'Pharmacie Abobo Santé',
      location: 'Carrefour PK18, Abobo',
      phone: '+225 07 88 55 33 21',
      hours: 'Lun-Sam 7h-20h',
      emergency_service: true,
      pediatric_specialist: false
    }
  ];

  const districts = ['Cocody', 'Plateau', 'Abobo', 'Adjamé', 'Yopougon', 'Marcory', 'Treichville'];
  const specialties = ['Pédiatre', 'Médecin généraliste', 'Sage-femme', 'Gynécologue'];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = !selectedDistrict || prof.district === selectedDistrict;
    const matchesSpecialty = !selectedSpecialty || prof.specialty === selectedSpecialty;
    
    return matchesSearch && matchesDistrict && matchesSpecialty;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('');
    setSelectedSpecialty('');
  };

  const hasActiveFilters = searchTerm || selectedDistrict || selectedSpecialty;

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Annuaire Santé Côte d'Ivoire</h1>
        <p className="text-muted-foreground">Trouvez des professionnels de santé et pharmacies près de chez vous</p>
      </div>

      {/* Filtres de recherche */}
      <Card className="shadow-md border-blue-100">
        <CardHeader className="bg-blue-50 rounded-t-lg py-4">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Search className="h-5 w-5" />
            Rechercher un professionnel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nom, spécialité ou lieu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Toutes les communes" />
              </SelectTrigger>
              <SelectContent>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Toutes spécialités" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-sm text-muted-foreground">
                Filtres actifs: 
                {searchTerm && <Badge variant="secondary" className="ml-2">Recherche: {searchTerm}</Badge>}
                {selectedDistrict && <Badge variant="secondary" className="ml-2">Commune: {selectedDistrict}</Badge>}
                {selectedSpecialty && <Badge variant="secondary" className="ml-2">Spécialité: {selectedSpecialty}</Badge>}
              </span>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4 mr-1" />
                Réinitialiser
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Services d'urgence */}
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Shield className="h-5 w-5" />
            Numéros d'urgence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-red-100 shadow-sm">
              <div className="flex justify-center mb-2">
                <Ambulance className="h-8 w-8 text-red-500" />
              </div>
              <p className="font-semibold text-red-700">SAMU</p>
              <p className="text-2xl font-bold text-red-800">185</p>
              <p className="text-xs text-muted-foreground mt-1">Service d'Aide Médicale Urgente</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-red-100 shadow-sm">
              <div className="flex justify-center mb-2">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <p className="font-semibold text-red-700">Police Secours</p>
              <p className="text-2xl font-bold text-red-800">111</p>
              <p className="text-xs text-muted-foreground mt-1">Urgences policières</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats professionnels */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            Professionnels de santé
            <Badge variant="secondary" className="ml-2">
              {filteredProfessionals.length} résultat(s)
            </Badge>
          </h2>
        </div>

        {filteredProfessionals.length === 0 ? (
          <Card className="text-center py-8 border-dashed">
            <CardContent>
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground mt-2">
                Aucun professionnel ne correspond à vos critères de recherche.
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{professional.name}</h3>
                          <Badge variant="secondary" className="text-sm">{professional.specialty}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(professional.rating)}
                          <span className="text-sm text-muted-foreground ml-1">
                            {professional.rating}/5
                          </span>
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{professional.location} • {professional.district}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{professional.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{professional.availability}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        {professional.emergency && (
                          <Badge variant="destructive" className="text-xs flex items-center gap-1">
                            <Ambulance className="h-3 w-3" />
                            Urgences
                          </Badge>
                        )}
                        {professional.telemedicine && (
                          <Badge variant="outline" className="text-xs flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                            <Video className="h-3 w-3" />
                            Télémédecine
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="text-sm">
                        <span className="font-medium">Consultation: </span>
                        <span className="text-blue-700 font-semibold">{professional.consultation_fee}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Phone className="h-4 w-4" />
                          Appeler
                        </Button>
                        <Button size="sm" className="gap-1">
                          <Calendar className="h-4 w-4" />
                          Prendre RDV
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Pharmacies */}
      <Card className="shadow-md border-purple-100">
        <CardHeader className="bg-purple-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Pill className="h-5 w-5" />
            Pharmacies à proximité
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-3">
            {pharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{pharmacy.name}</h4>
                      {pharmacy.emergency_service && (
                        <Badge variant="destructive" className="text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          24h/24
                        </Badge>
                      )}
                      {pharmacy.pediatric_specialist && (
                        <Badge variant="secondary" className="text-xs flex items-center gap-1">
                          <Baby className="h-3 w-3" />
                          Pédiatrie
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{pharmacy.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{pharmacy.hours}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Phone className="h-4 w-4" />
                    Appeler
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service de téléconsultation */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Video className="h-5 w-5" />
            Téléconsultation disponible
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-600 mb-4">
            Consultez un médecin depuis chez vous pour des questions non urgentes. Service disponible 7j/7 de 8h à 22h.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <p className="font-medium text-blue-800">Consultation générale</p>
              <p className="text-blue-700 font-semibold">10,000 FCFA</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <p className="font-medium text-blue-800">Consultation pédiatrique</p>
              <p className="text-blue-700 font-semibold">15,000 FCFA</p>
            </div>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
            <Video className="h-4 w-4" />
            Commencer une téléconsultation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}