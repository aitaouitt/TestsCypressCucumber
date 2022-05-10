Feature: Qualite et Depot T5

  Passage de test Qualité et depot sur un BAR TH 106 T5

  @monExpert
@focus   
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @monExpert
@focus   
  Scenario Outline: Creation de l OS BAR TH 106 avec une adresse complete
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    Then Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | appartement | electricite     | collectif         | Radiateurs_electriques | 110     | PRECAIRE_ENERGETIQUE | 15 avenue de bretagne | 78000 | Versailles |
#     | Isoler    | appartement | electricite     | individuel        | comblesPerdusOuAmenageables | 110      | PRECAIRE_ENERGETIQUE | 38 avenue de paris | 78000 | Versailles |
#     | chauffer  | maison      | gaz             | collectif         | murs                                  | MODESTE
#     | Obtenir preconisations  | fioul                               | sols                                  | STANDARD
#                               | bois                                | toitureTerrasse
#                               | charbon                             | Radiateurs_electriques
#                               | pompeAChaleur

  @monExpert
@focus   
  Scenario: Chargement devis non signé et les impots dans monExpert
    Given Je me connecte à monExpert
    And Chargement du justificatif des impots dans monExpert
    And Chargement du devis non signé dans monExpert
  @monExpert
  @focus
  Scenario: Valider le controle de devis non signe et impots avec l envoie de mail dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de devis non signe et impots avec l envoie de mail dans BO
  @monExpert
  @focus
  Scenario: Charger les devis signe et saisir la date
    Given Je me connecte à monExpert
    Then Charger le devis signe et saisir la date dans monExpert "Validé"
    And Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
  @focus
  Scenario: Checker le chargement de l attestation sur l honneur et valider les controles dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    Then Checker le chargement de l attestation sur l honneur = TO_CHECK dans BO
    And Valider le controle de devis "T5" sans l envoie de mail dans BO
    And Valider le controle de la facture sans l envoie de mail dans BO
    And Valider le controle de l attestation sur l honneur sans l envoie de mail dans BO
    And Valider le controle du Cadastre en NA sans document avec l envoie de mail dans B0
    When Valider le dossier en Qualite OK et passer en "DEPOSABLE","T5"
    And Creer un depot avec le dossier et passer en DEPOSE "T5"
    Then Redirection info beneficiaire
    And Checker le status "DEPOSE" de l OS dans BO
    And Redirection info beneficiaire
    And Cloturer l OS