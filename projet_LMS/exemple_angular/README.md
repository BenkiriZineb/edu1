# 🎓 Exemples Angular pour le Profil Élève

Ce dossier contient des exemples d'implémentation Angular pour utiliser l'API de profil élève.

## 📁 Fichiers inclus

- **`eleve-profile.service.ts`** - Service Angular pour communiquer avec l'API
- **`eleve-profile.component.ts`** - Composant Angular pour afficher le profil
- **`README.md`** - Ce fichier de documentation

## 🚀 Installation et utilisation

### 1. Prérequis
- Angular CLI installé
- Application Spring Boot démarrée sur le port 8080
- MySQL/XAMPP en cours d'exécution

### 2. Intégration dans votre projet Angular

#### Étape 1 : Copier le service
```bash
# Copier le service dans votre projet
cp eleve-profile.service.ts src/app/services/
```

#### Étape 2 : Copier le composant
```bash
# Copier le composant dans votre projet
cp eleve-profile.component.ts src/app/components/
```

#### Étape 3 : Ajouter le service au module
```typescript
// app.module.ts
import { EleveProfileService } from './services/eleve-profile.service';

@NgModule({
  // ...
  providers: [EleveProfileService],
  // ...
})
export class AppModule { }
```

#### Étape 4 : Ajouter la route
```typescript
// app-routing.module.ts
import { EleveProfileComponent } from './components/eleve-profile.component';

const routes: Routes = [
  // ...
  { path: 'eleve/profile/:id', component: EleveProfileComponent },
  // ...
];
```

### 3. Utilisation du service

```typescript
// Dans votre composant
import { EleveProfileService } from '../services/eleve-profile.service';

export class MonComposant {
  constructor(private eleveProfileService: EleveProfileService) {}

  // Récupérer le profil par ID
  loadProfile(id: number) {
    this.eleveProfileService.getProfileById(id).subscribe({
      next: (profile) => {
        console.log('Profil récupéré:', profile);
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  // Mettre à jour le profil
  updateProfile(id: number, data: any) {
    this.eleveProfileService.updateProfile(id, data).subscribe({
      next: (profile) => {
        console.log('Profil mis à jour:', profile);
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }
}
```

## 🎨 Personnalisation du composant

### Modifier le style
Le composant utilise des styles CSS intégrés. Vous pouvez :
- Modifier les couleurs dans le fichier
- Ajouter des classes CSS personnalisées
- Utiliser un fichier CSS séparé

### Modifier le template
Le template est inclus dans le composant. Vous pouvez :
- Ajouter de nouveaux champs
- Modifier la mise en page
- Ajouter des fonctionnalités (modification en ligne, etc.)

## 🔧 Configuration

### URL de l'API
Par défaut, le service pointe vers `http://localhost:8080/api/eleve`. Pour modifier :

```typescript
// Dans eleve-profile.service.ts
private baseUrl = 'http://votre-serveur:port/api/eleve';
```

### CORS
Assurez-vous que votre serveur Spring Boot autorise les requêtes depuis votre application Angular :

```java
@CrossOrigin(origins = "http://localhost:4200") // Port Angular par défaut
```

## 📱 Responsive Design

Le composant est conçu pour être responsive :
- Grille adaptative pour les informations
- Boutons adaptés aux écrans tactiles
- Styles CSS flexibles

## 🚨 Gestion des erreurs

Le composant inclut :
- Affichage des erreurs utilisateur
- Bouton de retry
- États de chargement
- Messages d'erreur explicites

## 🔄 Prochaines étapes

1. **Ajouter la validation des formulaires**
2. **Implémenter la modification en ligne**
3. **Ajouter la gestion des photos de profil**
4. **Intégrer avec un système d'authentification**
5. **Ajouter des animations et transitions**

## 📚 Ressources utiles

- [Documentation Angular](https://angular.io/docs)
- [Guide des services Angular](https://angular.io/guide/architecture-services)
- [Guide des composants Angular](https://angular.io/guide/component-overview)
- [Documentation de l'API LMS](README_PROFIL_ELEVE.md)

## 🆘 Support

En cas de problème :
1. Vérifier que l'API Spring Boot fonctionne
2. Vérifier la console du navigateur pour les erreurs
3. Vérifier les logs du serveur Spring Boot
4. Tester les endpoints avec Postman ou curl
