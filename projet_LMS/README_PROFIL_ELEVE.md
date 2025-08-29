# 🎓 API Profil Élève - LMS

Ce document décrit les endpoints disponibles pour gérer les profils des élèves dans le système LMS.

## 📋 Endpoints Disponibles

### Base URL
```
http://localhost:8080/api/eleve
```

### 1. 📖 Récupérer le profil d'un élève par ID
**GET** `/profile/{id}`

**Paramètres :**
- `id` (Long) : L'ID de l'élève

**Réponse :**
```json
{
  "id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@email.com",
  "datedenaissance": "2005-03-15",
  "sexe": "M",
  "adresse": "123 Rue de la Paix, 75001 Paris",
  "role": "ELEVE",
  "actif": true,
  "coursNom": "Mathématiques Avancées",
  "niveauScolaire": "Terminale",
  "parentNom": "Dupont Marie",
  "matieres": "Mathématiques, Physique, Chimie"
}
```

**Exemple d'utilisation :**
```bash
curl -X GET "http://localhost:8080/api/eleve/profile/1"
```

### 2. 📧 Récupérer le profil d'un élève par email
**GET** `/profile/email/{email}`

**Paramètres :**
- `email` (String) : L'email de l'élève

**Réponse :** Même format que l'endpoint par ID

**Exemple d'utilisation :**
```bash
curl -X GET "http://localhost:8080/api/eleve/profile/email/jean.dupont@email.com"
```

### 3. ✏️ Mettre à jour le profil d'un élève
**PUT** `/profile/{id}`

**Paramètres :**
- `id` (Long) : L'ID de l'élève
- Body : Objet ProfileEleveDTO avec les champs à modifier

**Exemple de requête :**
```json
{
  "nom": "Dupont",
  "prenom": "Jean-Pierre",
  "adresse": "456 Avenue des Champs, 75008 Paris"
}
```

**Exemple d'utilisation :**
```bash
curl -X PUT "http://localhost:8080/api/eleve/profile/1" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Dupont","prenom":"Jean-Pierre","adresse":"456 Avenue des Champs, 75008 Paris"}'
```

### 4. 📝 Inscrire un nouvel élève
**POST** `/inscription`

**Body :** Objet Eleve complet

**Exemple d'utilisation :**
```bash
curl -X POST "http://localhost:8080/api/eleve/inscription" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Martin","prenom":"Sophie","email":"sophie.martin@email.com","mdp":"password123","adresse":"789 Boulevard Saint-Germain, 75006 Paris","role":"ELEVE"}'
```

## 🔧 Structure des Données

### ProfileEleveDTO
```java
public class ProfileEleveDTO {
    private Long id;                    // ID unique de l'élève
    private String nom;                  // Nom de famille
    private String prenom;               // Prénom
    private String email;                // Adresse email
    private LocalDate datedenaissance;   // Date de naissance
    private String sexe;                 // Sexe (M/F)
    private String adresse;              // Adresse complète
    private UserRole role;               // Rôle (toujours ELEVE)
    private boolean actif;               // Statut actif/inactif
    
    // Informations spécifiques à l'élève
    private String coursNom;             // Nom du cours principal
    private String niveauScolaire;       // Niveau scolaire
    private String parentNom;            // Nom du parent
    private String matieres;             // Liste des matières (séparées par des virgules)
    
    // Informations supplémentaires
    private String telephone;            // Numéro de téléphone
    private String photo;                // URL de la photo
    private String bio;                  // Biographie
}
```

## 🚀 Utilisation Frontend

### Angular/React - Récupération du profil
```typescript
// Récupérer le profil par ID
async getProfileEleve(id: number): Promise<ProfileEleveDTO> {
  const response = await fetch(`http://localhost:8080/api/eleve/profile/${id}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du profil');
  }
  return await response.json();
}

// Récupérer le profil par email
async getProfileEleveByEmail(email: string): Promise<ProfileEleveDTO> {
  const response = await fetch(`http://localhost:8080/api/eleve/profile/email/${email}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du profil');
  }
  return await response.json();
}
```

### Mise à jour du profil
```typescript
async updateProfileEleve(id: number, profileData: Partial<ProfileEleveDTO>): Promise<ProfileEleveDTO> {
  const response = await fetch(`http://localhost:8080/api/eleve/profile/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData)
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour du profil');
  }
  
  return await response.json();
}
```

## 🔒 Sécurité

- **CORS** : Configuré pour `http://localhost:4200` (Angular par défaut)
- **Validation** : Les données sont validées côté serveur
- **Sécurité** : Le mot de passe n'est jamais retourné dans les réponses

## 📝 Notes Importantes

1. **Mots de passe** : Ne sont jamais inclus dans les réponses de profil
2. **Relations** : Les informations sur les cours, matières et parents sont automatiquement récupérées
3. **Validation** : Tous les champs obligatoires sont validés avant sauvegarde
4. **Gestion d'erreurs** : Messages d'erreur détaillés en cas de problème

## 🐛 Débogage

Le contrôleur affiche des logs détaillés dans la console :
- ✅ Succès des opérations
- ❌ Erreurs rencontrées
- 🔍 Informations de débogage

## 🔄 Prochaines Étapes

- [ ] Ajout de la gestion des photos de profil
- [ ] Validation avancée des données
- [ ] Gestion des permissions par rôle
- [ ] Cache des profils fréquemment consultés
