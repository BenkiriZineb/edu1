Write-Host "========================================" -ForegroundColor Green
Write-Host "    TEST DES ENDPOINTS PROFIL ELEVE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "1. Test de l'endpoint d'inscription d'eleve..." -ForegroundColor Yellow
$inscriptionData = @{
    nom = "Dupont"
    prenom = "Jean"
    email = "jean.dupont@test.com"
    mdp = "password123"
    adresse = "123 Rue de la Paix, Paris"
    role = "ELEVE"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/eleve/inscription" -Method POST -Body $inscriptionData -ContentType "application/json"
    Write-Host "✅ Inscription réussie: $($response.nom) $($response.prenom)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de l'inscription: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "2. Test de recuperation du profil par ID (ID=1)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/eleve/profile/1" -Method GET
    Write-Host "✅ Profil récupéré: $($response.nom) $($response.prenom)" -ForegroundColor Green
    Write-Host "   Email: $($response.email)" -ForegroundColor Cyan
    Write-Host "   Adresse: $($response.adresse)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erreur lors de la récupération: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "3. Test de recuperation du profil par email..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/eleve/profile/email/jean.dupont@test.com" -Method GET
    Write-Host "✅ Profil récupéré par email: $($response.nom) $($response.prenom)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la récupération par email: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "4. Test de mise a jour du profil..." -ForegroundColor Yellow
$updateData = @{
    adresse = "456 Avenue des Champs, Paris"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/eleve/profile/1" -Method PUT -Body $updateData -ContentType "application/json"
    Write-Host "✅ Profil mis à jour: $($response.nom) $($response.prenom)" -ForegroundColor Green
    Write-Host "   Nouvelle adresse: $($response.adresse)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erreur lors de la mise à jour: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "    TESTS TERMINES" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Read-Host "Appuyez sur Entrée pour continuer..."
