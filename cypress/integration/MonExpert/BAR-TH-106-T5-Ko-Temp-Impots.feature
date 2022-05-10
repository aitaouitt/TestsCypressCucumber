Feature: BAR TH 106 T5 avec un KO TEMP sur Impots

  Passage du BAR TH 106 T5 avec un KO temporaire sur les impots

  @monExpert
    @focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @monExpert
  @focus
  Scenario Outline: Creation de l OS avec un KO temporaire sur les impots
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Then Chargement du justificatif des impots dans monExpert
    And Chargement du devis non signé dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | appartement | electricite     | individuel        | Radiateurs_electriques | 110     | PRECAIRE_ENERGETIQUE | 13 avenue de bretagne | 78210 | Versailles |
#     | Isoler    | appartement | electricite     | individuel        | comblesPerdusOuAmenageables | 80      | PRECAIRE_ENERGETIQUE | 38 avenue de paris | 78000 | Versailles |
#     | chauffer  | maison      | gaz             | collectif         | murs                                  | MODESTE
#     | Obtenir preconisations  | fioul                               | sols                                  | STANDARD
#                               | bois                                | toitureTerrasse
#                               | charbon                             | Radiateurs_electriques
#                               | pompeAChaleur
  @monExpert
  @focus
  Scenario: Valider le controle de devis non signe avec All OK et impots avec KO Temp dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de devis non signe avec All OK et impots avec KO Temp dans BO et envoie de mail
  @monExpert
  @focus
  Scenario: Charger les devis signe et saisir la date
    Given Je me connecte à monExpert
    Then Charger le devis signe et saisir la date dans monExpert "Attente de correction"
    And Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
  @focus
  Scenario: Chargement ducument complementaire impots
    Given Je me connecte à monExpert
    Then Chargement ducument complementaire impots
  @monExpert
  @focus
  Scenario: Validation de toutes les pieces dans BO et Verfication dans BO status "A traiter"
    When Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    And Validation de toutes les pieces dans BO
    Then Checker le status "VALIDE_CC" de l OS dans BO
    And Redirection info beneficiaire
    And Cloturer l OS