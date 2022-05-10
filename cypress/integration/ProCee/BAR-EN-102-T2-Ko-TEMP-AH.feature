Feature: BAR-EN-102-T2 KO TEMP sur AH et N/A sur Cadastre

  Cette suite de tests crée un BAR EN 102 T2, charge tout les documents,
  Valide le controle du cadastre en N/A


  @ProCee@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @ProCee@focus
  Scenario Outline: Creation de l OS STANDARD sans Lieu dit
    Given Je me connecte à ProCee
    When Je cree mon OS sur ProCee "<renovation>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>","<methode>","<coupDePouce>"
    And Je recupere la reference du dernier OS cree dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    Then Charger le Devis Signe dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    And Charger la Facture dans ProCee
    And Checker le status de l OS "Pièces à charger" dans ProCee
    And Charger l Attestation dans ProCee
    And Checker le status de l OS "En cours de vérification" dans ProCee
    And Charger le Cadastre dans ProCee
    And Checker le status de l OS "En cours de vérification" dans ProCee
    Examples:
      | renovation | logement    | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville      | methode   | coupDePouce |
      | Isolation  | appartement | electricite     | individuel        | Murs        | 110     | STANDARD | 17 avenue de bretagne | 78000 | Versailles | Extérieur | Oui         |
#     | Chauffage| maison       | gaz               | collectif         | Murs                 | MODESTE                                                                                          |Combles|
#     | Régulation|            | fioul                                  | Sols                 | STANDARD                                                                                         |Intérieur|
#     |Ventilation|            | bois                                   | Fenêtres             | PRECAIRE_ENERGETIQUE                                                                             |Extérieur|
#                              | charbon                                |Isolation des toitures terrasses
#                              | pompeAChaleur

  @ProCee@focus
  Scenario: Valadation du controle Cadastre N/A, Impots, Devis Signé KO TEMP, la facture et l"AH en KO TEMP
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Valider le controle du Cadastre en NA sans document sans l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de l impots "STANDARD" sans l envoie de mail
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de Devis Signé en KO TEMP pour motif "Absence Classe" sans l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de la facture sans l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de l attestation en KO TEMP pour motif "Ratures présentes" sans l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
  @ProCee@focus
  Scenario: Validation du Devis Signé, la facture, AH en KO TEMP puis AH EN OK dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Valider le controle de devis "T2" sans l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de la facture sans l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de l attestation en KO TEMP pour motif "Ratures présentes" sans l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de l attestation sur l honneur avec l envoie de mail dans BO
    And Checker le status "A_TRAITER" de l OS dans BO
    And Redirection info beneficiaire
    And Cloturer l OS