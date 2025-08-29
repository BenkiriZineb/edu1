# 🔍 Vérification de l'Application Spring Boot

## 📋 Étapes de vérification

### 1. Vérifier que l'application est démarrée
- Ouvrir un navigateur et aller sur : `http://localhost:8080`
- Vous devriez voir une page d'erreur (normal, car nous n'avons pas de page d'accueil)
- L'important est que l'application réponde

### 2. Vérifier les endpoints de l'API
- **Test simple** : `http://localhost:8080/api/eleve/profile/1`
- Devrait retourner une réponse (même si c'est "Not Found" au début)

### 3. Vérifier les logs de l'application
- Dans la console où vous avez lancé `./mvnw spring-boot:run`
- Vous devriez voir des logs comme :
  ```
  Started ProjetLmsApplication in X.XXX seconds
  Tomcat started on port(s): 8080 (http)
  ```

## 🚀 Tests des Endpoints

### Option 1 : Script PowerShell
```powershell
.\test_endpoints.ps1
```

### Option 2 : Script Batch
```cmd
test_endpoints.bat
```

### Option 3 : Manuel avec curl
```bash
# Test d'inscription
curl -X POST "http://localhost:8080/api/eleve/inscription" \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Test\",\"prenom\":\"User\",\"email\":\"test@test.com\",\"mdp\":\"password\",\"adresse\":\"Test Address\",\"role\":\"ELEVE\"}"

# Test de récupération du profil
curl -X GET "http://localhost:8080/api/eleve/profile/1"
```

## 🔧 Dépannage

### Si l'application ne démarre pas :
1. Vérifier que MySQL est en cours d'exécution dans XAMPP
2. Vérifier que le port 8080 n'est pas utilisé par une autre application
3. Vérifier les logs d'erreur dans la console

### Si les endpoints ne répondent pas :
1. Vérifier que l'URL est correcte
2. Vérifier que l'application est bien démarrée
3. Vérifier les logs de l'application

## 📊 Résultats attendus

- **Inscription** : Retourne l'élève créé avec un ID
- **Récupération par ID** : Retourne le profil complet de l'élève
- **Récupération par email** : Retourne le profil complet de l'élève
- **Mise à jour** : Retourne le profil mis à jour

## 🎯 Prochaines étapes

Une fois que les endpoints fonctionnent :
1. Intégrer avec le frontend Angular/React
2. Ajouter la gestion des photos de profil
3. Implémenter l'authentification et les permissions
4. Ajouter la validation avancée des données
