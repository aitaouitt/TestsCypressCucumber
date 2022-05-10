Feature: BAR-EN-101-T2-Ko-DEF-Facture

  Cette suite de tests crée un BAR EN 101 T2, charge tout les documents, supprime le
  devis signé, valide de cadre de contribution puis valide le cadastre en OK et la
  Facture en KO definitif.


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
    And Charger le Cadre de Contribution dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    And Charger le Cadastre dans ProCee
    And Checker le status de l OS "En cours de vérification" dans ProCee
    Examples:
      | renovation | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      | methode             | coupDePouce |
      | Isolation  | appartement | electricite     | individuel        | Toit ou combles perdus | 110     | PRECAIRE_ENERGETIQUE | 16 avenue de bretagne | 78000 | Versailles | Rampants de toiture | Oui         |
#     | Chauffage| maison       | gaz               | collectif         | Murs                            | MODESTE                                                                                                      |Combles|
#     | Régulation|            | fioul                                  | Sols                            | STANDARD
#     |Ventilation|            | bois                                   | Fenêtres
#                              | charbon                                |Isolation des toitures terrasses
#                              | pompeAChaleur

  @ProCee@focus
  Scenario: Verification du Cadre de Contribution dans BO
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Checker le chargement du nouveau Cadre de Contrinution dans BO
    @ProCee@focus
  Scenario: Suppression du Devis Signé et Recharge du nouveau Devis Signé dans ProCee
    Given Je me connecte à ProCee
    When redirection Upload Docuements
    Then Supprimer le Devis Signe dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    And Charger le Devis Signe dans ProCee
    And Checker le status de l OS "En cours de vérification" dans ProCee
  @ProCee@focus
  Scenario: Verification du Cadre de Contribution dans BO
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Valider le controle du Cadastre dans BO en OK sans l envoie de mail et sans cloture OS
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de la facture en KO Definitif pour motif "date facture<devis signé" sans l envoie de mail dans BO
    And Redirection info beneficiaire
    And Cloturer l OS