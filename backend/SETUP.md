# 🚀 Guide d'installation et de configuration

## Prérequis

### 1. Java 17+ (✅ Installé)
- Version détectée : Java 21
- ✅ Compatible avec le projet

### 2. Maven 3.6+ (❌ À installer)

#### Option A : Installation automatique (Recommandée)
```bash
# Exécuter le script d'installation
install-maven.bat
```

#### Option B : Installation manuelle
1. Télécharger Maven depuis : https://maven.apache.org/download.cgi
2. Extraire dans `C:\Program Files\Apache\maven\`
3. Configurer les variables d'environnement :
   - `MAVEN_HOME` = `C:\Program Files\Apache\maven\apache-maven-3.9.11`
   - Ajouter `%MAVEN_HOME%\bin` au `PATH`

#### Option C : Installation via Chocolatey (Administrateur requis)
```bash
# Ouvrir PowerShell en tant qu'administrateur
choco install maven
```

### 3. IDE (Recommandé)
- **IntelliJ IDEA** (Community Edition gratuite)
- **Eclipse** avec Spring Tools Suite
- **VS Code** avec extensions Java

## Configuration

### 1. Profils de configuration

Le projet utilise des profils Spring Boot :

- **Développement** : `application-dev.properties`
- **Production** : `application-prod.properties`

### 2. Base de données

#### Développement (H2)
- Base de données en mémoire
- Console H2 accessible sur : http://localhost:8080/api/h2-console
- Données réinitialisées à chaque redémarrage

#### Production (PostgreSQL)
- Base de données persistante
- Nécessite l'installation de PostgreSQL

### 3. Variables d'environnement

```bash
# Profil actif
SPRING_PROFILES_ACTIVE=dev

# Base de données (production)
DATABASE_URL=jdbc:postgresql://localhost:5432/plateforme_educative
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password

# JWT
JWT_SECRET=votre-secret-jwt
JWT_EXPIRATION=86400000
```

## Lancement du projet

### 1. Vérifier l'installation
```bash
# Vérifier Java
java -version

# Vérifier Maven (après installation)
mvn -version
```

### 2. Compiler le projet
```bash
# Nettoyer et compiler
mvn clean compile

# Ou avec le profil de développement
mvn clean compile -Dspring.profiles.active=dev
```

### 3. Lancer l'application
```bash
# Lancer avec le profil de développement
mvn spring-boot:run -Dspring.profiles.active=dev

# Ou lancer le JAR
mvn clean package
java -jar target/plateforme-educative-1.0.0.jar --spring.profiles.active=dev
```

### 4. Accéder à l'application
- **API** : http://localhost:8080/api
- **Console H2** : http://localhost:8080/api/h2-console
- **Actuator** : http://localhost:8080/api/actuator

## Tests

### 1. Lancer les tests
```bash
# Tous les tests
mvn test

# Tests avec le profil de développement
mvn test -Dspring.profiles.active=dev
```

### 2. Tests d'intégration
```bash
mvn test -Dtest=*IntegrationTest
```

## Dépannage

### Problèmes courants

#### 1. Maven non trouvé
```bash
# Vérifier les variables d'environnement
echo %MAVEN_HOME%
echo %PATH%

# Redémarrer le terminal après installation
```

#### 2. Port déjà utilisé
```bash
# Changer le port dans application.properties
server.port=8081
```

#### 3. Erreurs de compilation
```bash
# Nettoyer et recompiler
mvn clean compile

# Vérifier la version de Java
java -version
```

#### 4. Problèmes de base de données
```bash
# Vérifier la configuration H2
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
```

## Structure du projet

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/edu/
│   │   │   ├── controllers/     # Contrôleurs REST
│   │   │   ├── services/        # Logique métier
│   │   │   ├── repositories/    # Accès aux données
│   │   │   ├── models/          # Entités JPA
│   │   │   ├── config/          # Configuration
│   │   │   └── security/        # Sécurité JWT
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       └── data.sql
│   └── test/                    # Tests
├── pom.xml                      # Dépendances Maven
├── install-maven.bat           # Script d'installation
└── SETUP.md                    # Ce fichier
```

## Prochaines étapes

1. ✅ Installer Maven
2. ✅ Configurer l'environnement
3. 🔄 Lancer l'application
4. 🔄 Tester les endpoints
5. 🔄 Développer de nouvelles fonctionnalités

## Support

Pour toute question ou problème :
- Vérifier ce guide
- Consulter les logs de l'application
- Créer une issue sur le projet 