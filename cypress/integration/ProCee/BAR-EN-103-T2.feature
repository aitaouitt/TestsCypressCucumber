Feature: BAR-EN-103-T2

  Cette suite de tests crée un BAR EN 103 T2
  Charge le Devis Signé, la Facture, l AH et le cadastre dans ProCee
  Valide en KO TEMP le Cadastre, Impots et la Facture dans BO
  Valide en OK l Attestation sur l Honneur, le Cadre de Contribution et le devis dans BO
  Charge la Facture corrigée dans ProCee
  Charge le document complémentaire Impots et Cadastre dans ProCee
  Valide le cadastre + Impots + Facture dans BO


  @ProCee@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @ProCee@focus
  Scenario Outline: Creation de l OS Grand Precaire dans ProCee
    Given Je me connecte à ProCee
    When Je cree mon OS sur ProCee "<renovation>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>","<methode>","<coupDePouce>"
    And Je recupere la reference du dernier OS cree dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    Then Charger le Devis Signe dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    And Charger la Facture dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    And Charger l Attestation dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    And Charger le Cadastre dans ProCee
    And Checker le status de l OS "En cours de vérification" dans ProCee
    Examples:
      | renovation | logement    | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus              | adresseTravaux        | CP    | ville      | methode   | coupDePouce |
      | Isolation  | appartement | electricite     | individuel        | Sols        | 110     | PRECAIRE_ENERGETIQUE | 18 avenue de bretagne | 78000 | Versailles | Intérieur | Oui         |
#     | Chauffage| maison       | gaz               | collectif         | Murs                 | MODESTE                                                                                                      |Combles|
#     | Régulation|             | fioul                                  | Sols                 | STANDARD
#     |Ventilation|             | bois                                   | Fenêtres
#                               | charbon                                |Isolation des toitures terrasses
#                               | pompeAChaleur                          |Toit ou combles perdus


  @ProCee@focus
  Scenario: Validation du Cadastre, Impots et Facture en KO TEMP et AH, CDC, Devis signe en OK dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Mettre les impots en KO TEMP sans envoi de mail
    And Valider le controle de la facture en KO TEMP pour motif "Numero de la facture manquant" sans l envoie de mail dans BO sans date visite
    And Controle Cadastre KO TEMP pour raison "Cadastre non trouve" et checker statut "A_TRAITER"
    And Valider le controle du Devis signe sans devis non signé dans BO sans l envoie de mail
    And Valider le controle de l attestation sur l honneur sans l envoie de mail dans BO
    And Valider le controle du Cadre de Contribution dans BO sans l envoie de mail
    And Checker le status "CORRECTIONS_ATTENDU" de l OS dans BO
   @ProCee@focus
  Scenario: Suppression du Devis Signé et Recharge du nouveau Devis Signé dans ProCee
    Given Je me connecte à ProCee
    When redirection Upload Docuements
    Then Chargement de document complementaire sur "Facture" dans ProCee
    And Chargement de document complementaire sur "Impots" dans ProCee
    And Chargement de document complementaire sur "Cadastre" dans ProCee
    And Checker le status de l OS "En cours de vérification" dans ProCee
  @ProCee@focus
  Scenario: Validation Cadastre + impôts + facture dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Valider le controle de l impots "PRECAIRE_ENERGETIQUE" sans l envoie de mail
    And Valider le controle de la facture sans l envoie de mail dans BO sans date de visite
    And Valider le controle du Cadastre dans BO en OK sans l envoie de mail
    And Checker le status "VALIDE_CC" de l OS dans BO
    And Redirection info beneficiaire
    And Cloturer l OS