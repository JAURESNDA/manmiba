import { Button } from "./ui/button";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">À propos</h3>
            <p className="text-sm text-muted-foreground">
              Manmi Ba - Votre compagnon numérique pour la santé familiale en Côte d'Ivoire
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  Conditions d'utilisation
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  Politique de confidentialité
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  FAQ
                </Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  Nous contacter
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +225 XX XX XX XX XX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@manmiba.ci
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Abidjan, Côte d'Ivoire
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">Suivez-nous</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Fait avec <Heart className="h-4 w-4 text-primary fill-primary" /> pour les familles ivoiriennes
          </p>
          <p className="mt-2">© 2025 Manmi Ba. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
