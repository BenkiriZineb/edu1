@echo off
echo ========================================
echo    TEST DES ENDPOINTS PROFIL ELEVE
echo ========================================
echo.

echo 1. Test de l'endpoint d'inscription d'eleve...
curl -X POST "http://localhost:8080/api/eleve/inscription" ^
  -H "Content-Type: application/json" ^
  -d "{\"nom\":\"Dupont\",\"prenom\":\"Jean\",\"email\":\"jean.dupont@test.com\",\"mdp\":\"password123\",\"adresse\":\"123 Rue de la Paix, Paris\",\"role\":\"ELEVE\"}"
echo.
echo.

echo 2. Test de recuperation du profil par ID (ID=1)...
curl -X GET "http://localhost:8080/api/eleve/profile/1"
echo.
echo.

echo 3. Test de recuperation du profil par email...
curl -X GET "http://localhost:8080/api/eleve/profile/email/jean.dupont@test.com"
echo.
echo.

echo 4. Test de mise a jour du profil...
curl -X PUT "http://localhost:8080/api/eleve/profile/1" ^
  -H "Content-Type: application/json" ^
  -d "{\"adresse\":\"456 Avenue des Champs, Paris\"}"
echo.
echo.

echo ========================================
echo    TESTS TERMINES
echo ========================================
pause
