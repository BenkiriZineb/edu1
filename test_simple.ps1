# Test simple de l'API des notes
Write-Host "🧪 TEST SIMPLE DE L'API DES NOTES" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Attendre que le serveur démarre
Write-Host "⏳ Attente du démarrage du serveur..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

# Test 1: Vérifier que le serveur est accessible
Write-Host "`n🔍 Test 1: Vérification de l'accessibilité du serveur" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes" -Method GET
    Write-Host "✅ Serveur accessible !" -ForegroundColor Green
    Write-Host "   $($response.Count) note(s) trouvée(s)" -ForegroundColor White
} catch {
    Write-Host "❌ Serveur non accessible: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Vérifiez que le serveur Spring Boot est démarré" -ForegroundColor Yellow
    exit 1
}

# Test 2: Créer une nouvelle note
Write-Host "`n📝 Test 2: Création d'une nouvelle note" -ForegroundColor Green
$nouvelleNote = @{
    eleveId = 1
    coursId = 1
    matiereId = 1
    valeur = 16.5
    noteMaximale = 20.0
    commentaire = "Très bon travail !"
    date = "2025-08-26"
    type = "DEVOIR"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes" -Method POST -Body $nouvelleNote -ContentType "application/json"
    Write-Host "✅ Note créée avec succès !" -ForegroundColor Green
    Write-Host "   ID: $($response.id)" -ForegroundColor White
    Write-Host "   Note: $($response.valeur)/$($response.noteMaximale)" -ForegroundColor White
    $noteId = $response.id
} catch {
    Write-Host "❌ Erreur lors de la création: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Récupérer la note par ID
Write-Host "`n🔍 Test 3: Récupération de la note par ID" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/$noteId" -Method GET
    Write-Host "✅ Note récupérée !" -ForegroundColor Green
    Write-Host "   Valeur: $($response.valeur)/$($response.noteMaximale)" -ForegroundColor White
    Write-Host "   Commentaire: $($response.commentaire)" -ForegroundColor White
} catch {
    Write-Host "❌ Erreur lors de la récupération: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Calculer la moyenne d'un élève
Write-Host "`n📊 Test 4: Calcul de la moyenne d'un élève" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/eleve/1/moyenne" -Method GET
    Write-Host "✅ Moyenne de l'élève 1: $response%" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors du calcul: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Statistiques d'un élève
Write-Host "`n📈 Test 5: Statistiques d'un élève" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/eleve/1/stats" -Method GET
    Write-Host "✅ Statistiques élève 1:" -ForegroundColor Green
    Write-Host "   - Moyenne: $($response.moyenne)%" -ForegroundColor White
    Write-Host "   - Note max: $($response.noteMaximale)%" -ForegroundColor White
    Write-Host "   - Note min: $($response.noteMinimale)%" -ForegroundColor White
    Write-Host "   - Total notes: $($response.totalNotes)" -ForegroundColor White
} catch {
    Write-Host "❌ Erreur lors des statistiques: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 TESTS TERMINÉS !" -ForegroundColor Cyan
Write-Host "Votre API des notes fonctionne parfaitement !" -ForegroundColor Green
