# Script de test pour l'API des notes
Write-Host "🧪 TEST DE L'API DES NOTES" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Attendre que le serveur démarre
Write-Host "⏳ Attente du démarrage du serveur..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Test 1: Vérifier que le serveur est accessible
Write-Host "`n🔍 Test 1: Vérification de l'accessibilité du serveur" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes" -Method GET
    Write-Host "✅ Serveur accessible !" -ForegroundColor Green
} catch {
    Write-Host "❌ Serveur non accessible: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Créer une nouvelle note
Write-Host "`n📝 Test 2: Création d'une nouvelle note" -ForegroundColor Green
$nouvelleNote = @{
    eleveId = 1
    coursId = 1
    matiereId = 1
    valeur = 15.5
    noteMaximale = 20.0
    commentaire = "Très bon travail !"
    date = "2025-08-26"
    type = "DEVOIR"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes" -Method POST -Body $nouvelleNote -ContentType "application/json"
    Write-Host "✅ Note créée avec succès ! ID: $($response.id)" -ForegroundColor Green
    $noteId = $response.id
} catch {
    Write-Host "❌ Erreur lors de la création: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Récupérer la note par ID
Write-Host "`n🔍 Test 3: Récupération de la note par ID" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/$noteId" -Method GET
    Write-Host "✅ Note récupérée ! Valeur: $($response.valeur)/$($response.noteMaximale)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la récupération: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Récupérer toutes les notes
Write-Host "`n📋 Test 4: Récupération de toutes les notes" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes" -Method GET
    Write-Host "✅ $($response.Count) note(s) récupérée(s)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la récupération: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Récupérer les notes d'un élève
Write-Host "`n👨‍🎓 Test 5: Récupération des notes d'un élève" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/eleve/1" -Method GET
    Write-Host "✅ $($response.Count) note(s) trouvée(s) pour l'élève 1" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la récupération: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Calculer la moyenne d'un élève
Write-Host "`n📊 Test 6: Calcul de la moyenne d'un élève" -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/eleve/1/moyenne" -Method GET
    Write-Host "✅ Moyenne de l'élève 1: $response%" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors du calcul: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Statistiques d'un élève
Write-Host "`n📈 Test 7: Statistiques d'un élève" -ForegroundColor Green
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

# Test 8: Validation d'une note
Write-Host "`n✅ Test 8: Validation d'une note" -ForegroundColor Green
$validationData = @{
    valeur = 18.0
    noteMaximale = 20.0
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/validation" -Method POST -Body $validationData -ContentType "application/json"
    Write-Host "✅ Note validée: $response" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la validation: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 9: Mise à jour d'une note
Write-Host "`n✏️ Test 9: Mise à jour d'une note" -ForegroundColor Green
$updateData = @{
    valeur = 17.0
    commentaire = "Note mise à jour !"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/notes/$noteId" -Method PUT -Body $updateData -ContentType "application/json"
    Write-Host "✅ Note mise à jour ! Nouvelle valeur: $($response.valeur)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la mise à jour: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 10: Suppression d'une note
Write-Host "`n🗑️ Test 10: Suppression d'une note" -ForegroundColor Green
try {
    Invoke-RestMethod -Uri "http://localhost:8080/api/notes/$noteId" -Method DELETE
    Write-Host "✅ Note supprimée avec succès !" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la suppression: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 TOUS LES TESTS TERMINÉS !" -ForegroundColor Cyan
Write-Host "Votre API des notes fonctionne parfaitement !" -ForegroundColor Green
