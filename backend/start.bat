@echo off
echo Démarrage de l'application Spring Boot...
echo.
echo Configuration:
echo - Port: 8080
echo - Base de données: H2 (développement)
echo - Profil: dev
echo.
echo L'application sera accessible sur: http://localhost:8080
echo Console H2: http://localhost:8080/h2-console
echo Endpoint de test: http://localhost:8080/api/test/health
echo.
echo Appuyez sur Ctrl+C pour arrêter l'application
echo.

call mvnw.cmd spring-boot:run

pause 