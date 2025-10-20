// Comptes de démonstration prédéfinis pour Manmi Ba

export const demoUsers = {
  // Compte Administrateur
  admin: {
    id: 'admin-001',
    email: 'admin@manmiba.ci',
    password: 'Admin2025!',
    name: 'Administrateur Manmi Ba',
    phone: '+225 07 00 00 00 00',
    userType: 'admin',
    situation: 'autre',
    city: 'Abidjan',
    role: 'admin',
    avatar: null,
    createdAt: '2025-01-01'
  },

  // Compte Maman Urbaine Connectée
  sarahKouame: {
    id: 'user-001',
    email: 'sarah.kouame@gmail.com',
    password: 'Sarah2025!',
    name: 'Sarah Kouamé',
    phone: '+225 07 12 34 56 78',
    userType: 'parent',
    situation: 'urbaine-connectee',
    city: 'Abidjan',
    role: 'parent',
    avatar: null,
    createdAt: '2025-01-15',
    bio: 'Jeune maman passionnée, toujours à la recherche de conseils pour mon petit Kofi ❤️',
    children: [
      {
        id: 'child-001',
        name: 'Kofi Kouamé',
        birthDate: '2024-03-15',
        gender: 'male',
        bloodType: 'O+',
        avatar: null
      }
    ]
  },

  // Compte Papa Célibataire
  kouassiDavid: {
    id: 'user-002',
    email: 'kouassi.david@gmail.com',
    password: 'David2025!',
    name: 'Kouassi David',
    phone: '+225 07 23 45 67 89',
    userType: 'parent',
    situation: 'pere-celibataire',
    city: 'Abidjan',
    role: 'parent',
    avatar: null,
    createdAt: '2025-01-10',
    bio: 'Papa solo de deux merveilleux enfants. On apprend ensemble chaque jour ! 👨‍👦‍👦',
    children: [
      {
        id: 'child-002',
        name: 'Aya Kouassi',
        birthDate: '2020-06-10',
        gender: 'female',
        bloodType: 'A+',
        avatar: null
      },
      {
        id: 'child-003',
        name: 'Koffi Kouassi',
        birthDate: '2022-09-25',
        gender: 'male',
        bloodType: 'A+',
        avatar: null
      }
    ]
  },

  // Compte Papa Veuf
  jeanClaudeBamba: {
    id: 'user-003',
    email: 'jc.bamba@gmail.com',
    password: 'Bamba2025!',
    name: 'Jean-Claude Bamba',
    phone: '+225 07 34 56 78 90',
    userType: 'parent',
    situation: 'papa-veuf',
    city: 'Yopougon',
    role: 'parent',
    avatar: null,
    createdAt: '2024-12-20',
    bio: 'Père courageux de 3 enfants. La vie continue, pour eux. 🕊️',
    children: [
      {
        id: 'child-004',
        name: 'Aminata Bamba',
        birthDate: '2016-03-12',
        gender: 'female',
        bloodType: 'B+',
        avatar: null
      },
      {
        id: 'child-005',
        name: 'Ibrahim Bamba',
        birthDate: '2018-07-20',
        gender: 'male',
        bloodType: 'B+',
        avatar: null
      },
      {
        id: 'child-006',
        name: 'Fatima Bamba',
        birthDate: '2021-11-05',
        gender: 'female',
        bloodType: 'O+',
        avatar: null
      }
    ]
  },

  // Compte Future Maman
  aminataTraore: {
    id: 'user-004',
    email: 'aminata.traore@gmail.com',
    password: 'Aminata2025!',
    name: 'Aminata Traoré',
    phone: '+225 07 45 67 89 01',
    userType: 'pregnant',
    situation: 'future-maman-moderne',
    city: 'Yopougon',
    role: 'parent',
    avatar: null,
    createdAt: '2024-09-01',
    bio: 'Bientôt maman pour la première fois ! Impatiente de rencontrer mon bébé 🤰✨',
    pregnancyWeek: 32,
    dueDate: '2025-03-15'
  },

  // Compte Maman Rurale
  fatouCoulibaly: {
    id: 'user-005',
    email: 'fatou.coulibaly@gmail.com',
    password: 'Fatou2025!',
    name: 'Fatou Coulibaly',
    phone: '+225 07 56 78 90 12',
    userType: 'parent',
    situation: 'rurale-debrouillarde',
    city: 'Bouaké',
    role: 'parent',
    avatar: null,
    createdAt: '2024-11-10',
    bio: 'Agricultrice et maman de 4 beaux enfants. Fière de mes racines 🌾❤️',
    children: [
      {
        id: 'child-007',
        name: 'Mariam Coulibaly',
        birthDate: '2015-01-10',
        gender: 'female',
        bloodType: 'O+',
        avatar: null
      },
      {
        id: 'child-008',
        name: 'Sekou Coulibaly',
        birthDate: '2017-05-15',
        gender: 'male',
        bloodType: 'A+',
        avatar: null
      },
      {
        id: 'child-009',
        name: 'Aissata Coulibaly',
        birthDate: '2019-08-20',
        gender: 'female',
        bloodType: 'O+',
        avatar: null
      },
      {
        id: 'child-010',
        name: 'Moussa Coulibaly',
        birthDate: '2022-12-01',
        gender: 'male',
        bloodType: 'A+',
        avatar: null
      }
    ]
  },

  // Compte Médecin/Pédiatre
  drNguessan: {
    id: 'user-006',
    email: 'dr.nguessan@chu-yopougon.ci',
    password: 'Doctor2025!',
    name: 'Dr. Adjoua N\'Guessan',
    phone: '+225 07 67 89 01 23',
    userType: 'health-professional',
    situation: 'professionnelle-sante',
    professionalRole: 'doctor',
    city: 'Abidjan',
    role: 'doctor',
    avatar: null,
    createdAt: '2024-06-01',
    bio: 'Pédiatre au CHU de Yopougon. Partage de conseils santé validés pour vos enfants 👩‍⚕️',
    verified: true,
    specialty: 'Pédiatrie',
    hospital: 'CHU Yopougon',
    licenseNumber: 'MD-CI-2015-4567'
  },

  // Compte Sage-femme
  ayaSageFemme: {
    id: 'user-007',
    email: 'sage.aya@maternite-cocody.ci',
    password: 'Midwife2025!',
    name: 'Sage-femme Aya Koné',
    phone: '+225 07 78 90 12 34',
    userType: 'health-professional',
    situation: 'professionnelle-sante',
    professionalRole: 'midwife',
    city: 'Abidjan',
    role: 'midwife',
    avatar: null,
    createdAt: '2024-07-15',
    bio: 'Accompagnement des futures mamans avec bienveillance depuis 15 ans 🤱',
    verified: true,
    specialty: 'Sage-femme',
    hospital: 'Maternité de Cocody',
    licenseNumber: 'SF-CI-2010-1234'
  },

  // Compte Infirmière
  marieInfirmiere: {
    id: 'user-008',
    email: 'marie.infirmiere@pmi-marcory.ci',
    password: 'Nurse2025!',
    name: 'Marie Konan',
    phone: '+225 07 89 01 23 45',
    userType: 'health-professional',
    situation: 'professionnelle-sante',
    professionalRole: 'nurse',
    city: 'Abidjan',
    role: 'nurse',
    avatar: null,
    createdAt: '2024-08-01',
    bio: 'Infirmière en PMI, spécialisée en vaccination et suivi infantile 💉',
    verified: true,
    specialty: 'Infirmière PMI',
    hospital: 'PMI de Marcory',
    licenseNumber: 'INF-CI-2018-7890'
  },

  // Compte Grand-mère
  aichaGrandMere: {
    id: 'user-009',
    email: 'aicha.diabate@gmail.com',
    password: 'Aicha2025!',
    name: 'Aïcha Diabaté',
    phone: '+225 07 90 12 34 56',
    userType: 'parent',
    situation: 'grand-mere-gardienne',
    city: 'Korhogo',
    role: 'parent',
    avatar: null,
    createdAt: '2024-10-01',
    bio: 'Grand-mère de 8 petits-enfants. Gardienne des traditions et de la sagesse 👵❤️',
    grandChildren: 8
  }
};

// Fonction pour authentifier un utilisateur
export function authenticateUser(email: string, password: string) {
  const user = Object.values(demoUsers).find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (user) {
    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
}

// Fonction pour obtenir tous les utilisateurs (sans mots de passe)
export function getAllUsers() {
  return Object.values(demoUsers).map(({ password, ...user }) => user);
}

// Fonction pour obtenir un utilisateur par email
export function getUserByEmail(email: string) {
  const user = Object.values(demoUsers).find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
}
