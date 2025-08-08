# Backend Plateforme Éducative - Spring Boot

## 📋 Description

Backend Spring Boot pour la plateforme éducative marocaine, inspirée du modèle [interneturok.ru]. Cette API REST gère tous les aspects de la plateforme : authentification, gestion des utilisateurs, cours, matières, abonnements, et plus encore.

## 🏗️ Architecture

### Technologies utilisées
- **Spring Boot 3.2.0** - Framework principal
- **Spring Security** - Authentification et autorisation
- **Spring Data JPA** - Persistance des données
- **PostgreSQL** - Base de données principale
- **H2** - Base de données en mémoire pour le développement
- **JWT** - Authentification stateless
- **Maven** - Gestion des dépendances

### Structure du projet
```
backend/
├── src/main/java/com/edu/
│   ├── EduApplication.java
│   ├── config/
│   │   └── SecurityConfig.java
│   ├── controllers/
│   │   ├── AuthController.java
│   │   ├── CourseController.java
│   │   └── ...
│   ├── dto/
│   │   ├── AuthRequest.java
│   │   ├── AuthResponse.java
│   │   └── ...
│   ├── models/
│   │   ├── User.java
│   │   ├── Student.java
│   │   ├── Teacher.java
│   │   ├── Parent.java
│   │   ├── Course.java
│   │   └── ...
│   ├── repositories/
│   ├── services/
│   └── security/
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## 🚀 Installation et Configuration

### Prérequis
- Java 17 ou supérieur
- Maven 3.6+
- PostgreSQL (optionnel, H2 par défaut)

### 1. Cloner le projet
```bash
git clone <repository-url>
cd backend
```

### 2. Configuration de la base de données

#### Option A : H2 (Développement - Recommandé pour commencer)
Le fichier `application.properties` est déjà configuré pour H2. Aucune configuration supplémentaire nécessaire.

#### Option B : PostgreSQL (Production)
1. Installer PostgreSQL
2. Créer une base de données :
```sql
CREATE DATABASE plateforme_educative;
```
3. Modifier `application.properties` :
```properties
# Commenter H2 et décommenter PostgreSQL
# spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.url=jdbc:postgresql://localhost:5432/plateforme_educative
spring.datasource.username=postgres
spring.datasource.password=votre_mot_de_passe
```

### 3. Configuration des emails (optionnel)
Pour les fonctionnalités d'envoi d'emails, configurer dans `application.properties` :
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=votre-email@gmail.com
spring.mail.password=votre-mot-de-passe-app
```

### 4. Lancer l'application
```bash
mvn spring-boot:run
```

L'application sera accessible sur : `http://localhost:8080`

## 📚 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `POST /api/auth/refresh` - Rafraîchir le token
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Récupérer l'utilisateur connecté

### Cours
- `GET /api/courses` - Liste des cours (avec pagination et filtres)
- `GET /api/courses/{id}` - Détails d'un cours
- `POST /api/courses` - Créer un cours (Enseignant/Admin)
- `PUT /api/courses/{id}` - Modifier un cours
- `DELETE /api/courses/{id}` - Supprimer un cours
- `POST /api/courses/{id}/publish` - Publier un cours
- `POST /api/courses/{id}/rate` - Évaluer un cours

### Matières
- `GET /api/subjects` - Liste des matières
- `GET /api/subjects/{id}` - Détails d'une matière

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs (Admin)
- `GET /api/users/{id}` - Détails d'un utilisateur
- `PUT /api/users/{id}` - Modifier un utilisateur

## 🔐 Sécurité

### Rôles utilisateurs
- **ADMIN** : Accès complet à toutes les fonctionnalités
- **ENSEIGNANT** : Gestion des cours, quiz, évaluations
- **ELEVE** : Accès aux cours, suivi de progression
- **PARENT** : Supervision des enfants, consultation des résultats

### Authentification JWT
1. Se connecter via `/api/auth/login`
2. Récupérer le token JWT
3. Inclure le token dans le header : `Authorization: Bearer <token>`

## 🗄️ Modèles de données

### Utilisateurs
- **User** : Classe de base pour tous les utilisateurs
- **Student** : Élèves avec niveau scolaire et progression
- **Teacher** : Enseignants avec spécialités et cours
- **Parent** : Parents avec enfants et abonnements

### Contenu éducatif
- **Subject** : Matières du programme marocain
- **Course** : Cours avec chapitres et paragraphes
- **Chapter** : Chapitres organisant le contenu
- **Quiz** : Évaluations interactives

### Système
- **Subscription** : Abonnements payants
- **Progression** : Suivi de l'avancement des élèves
- **Note** : Évaluations et notes
- **Notification** : Système de notifications

## 🧪 Tests

### Lancer les tests
```bash
mvn test
```

### Tests d'intégration
```bash
mvn test -Dtest=*IntegrationTest
```

## 📊 Monitoring

### Actuator
L'application expose des endpoints de monitoring via Spring Boot Actuator :
- `GET /actuator/health` - Santé de l'application
- `GET /actuator/info` - Informations sur l'application
- `GET /actuator/metrics` - Métriques système

### Logs
Les logs sont configurés pour afficher :
- Les requêtes SQL (en mode DEBUG)
- Les événements de sécurité
- Les erreurs d'application

## 🚀 Déploiement

### JAR exécutable
```bash
mvn clean package
java -jar target/plateforme-educative-1.0.0.jar
```

### Docker (optionnel)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/plateforme-educative-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 🔧 Configuration avancée

### Variables d'environnement
- `SPRING_PROFILES_ACTIVE` : Profil Spring (dev, prod)
- `DATABASE_URL` : URL de la base de données
- `JWT_SECRET` : Clé secrète JWT
- `JWT_EXPIRATION` : Expiration des tokens

### Profils Spring
- **dev** : Configuration de développement (H2, logs détaillés)
- **prod** : Configuration de production (PostgreSQL, logs minimaux)

## 📝 Notes importantes

1. **Sécurité** : Changer la clé JWT secrète en production
2. **Base de données** : Faire des sauvegardes régulières
3. **Emails** : Configurer un service SMTP fiable
4. **Fichiers** : Configurer un stockage externe pour les uploads

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 