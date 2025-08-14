package com.example.projet_LMS.Enum;

public enum ModePaiement {
    CARTE("Carte bancaire"),
    ESPECES("Espèces"),
    CHEQUE("Chèque"),
    VIREMENT("Virement bancaire"),
    PAYPAL("PayPal"),
    CRYPTO("Crypto-monnaie");

    private final String libelle;

    ModePaiement(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}
