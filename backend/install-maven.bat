@echo off
echo Installation de Maven pour le projet Plateforme Educative
echo ========================================================

REM Vérifier si Java est installé
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Java n'est pas installé ou n'est pas dans le PATH
    echo Veuillez installer Java 17+ et réessayer
    pause
    exit /b 1
)

echo Java est installé ✓

REM Créer le dossier pour Maven
set MAVEN_DIR=C:\Program Files\Apache\maven
if not exist "%MAVEN_DIR%" (
    echo Création du dossier Maven...
    mkdir "%MAVEN_DIR%"
)

REM Télécharger Maven
echo Téléchargement de Maven 3.9.11...
powershell -Command "& {Invoke-WebRequest -Uri 'https://archive.apache.org/dist/maven/maven-3/3.9.11/binaries/apache-maven-3.9.11-bin.zip' -OutFile 'maven.zip'}"

if not exist "maven.zip" (
    echo ERREUR: Impossible de télécharger Maven
    pause
    exit /b 1
)

REM Extraire Maven
echo Extraction de Maven...
powershell -Command "& {Expand-Archive -Path 'maven.zip' -DestinationPath '%MAVEN_DIR%' -Force}"

REM Nettoyer le fichier zip
del maven.zip

REM Configurer les variables d'environnement
echo Configuration des variables d'environnement...
setx MAVEN_HOME "%MAVEN_DIR%\apache-maven-3.9.11" /M
setx PATH "%PATH%;%MAVEN_DIR%\apache-maven-3.9.11\bin" /M

echo.
echo Installation terminée !
echo Veuillez redémarrer votre terminal pour que les changements prennent effet
echo.
echo Pour vérifier l'installation, ouvrez un nouveau terminal et tapez: mvn -version
pause 