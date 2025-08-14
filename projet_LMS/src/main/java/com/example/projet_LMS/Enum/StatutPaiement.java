package com.example.projet_LMS.Enum;

public enum StatutPaiement {
    EN_ATTENTE("En attente"),
    EFFECTUE("Effectué"),
    ANNULE("Annulé"),
    REFUSE("Refusé"),
    REMBOURSE("Remboursé"),
    PARTIEL("Paiement partiel");

    private final String libelle;

    StatutPaiement(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}
