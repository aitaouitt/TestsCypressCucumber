Feature: BAR TH 106 T5 avec adresse complete

  Passage du BAR TH 106 T5 avec adresse complete


  @monExpert
    @focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @monExpert
    @focus
  Scenario Outline: Creation de l OS avec une adresse complete
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    Then Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | appartement | electricite     | collectif         | Radiateurs_electriques | 110     | PRECAIRE_ENERGETIQUE | 12 avenue de bretagne | 78000 | Versailles |
#     | Isoler    | appartement | electricite     | individuel        | comblesPerdusOuAmenageables | 80      | PRECAIRE_ENERGETIQUE | 38 avenue de paris | 78000 | Versailles |
#     | chauffer  | maison      | gaz             | collectif         | murs                                  | MODESTE
#     | Obtenir preconisations  | fioul                               | sols                                  | STANDARD
#                               | bois                                | toitureTerrasse
#                               | charbon                             | Radiateurs_electriques
#                               | pompeAChaleur
  @monExpert
    @focus
  Scenario: Verification du status dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Checker le status "PIECE_A_CHARGER" de l OS dans BO
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
  @monExpert
    @focus
  Scenario: Checker si le status du Devis = OK , Devis Signé = TO_CHECK et Impots=OK dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Checker le status "PIECE_A_CHARGER" de l OS dans BO
    And Checker si le status du Devis = OK , Devis Signé = TO_CHECK et Impots=OK dans BO
  @monExpert
    @focus
  Scenario: Charger la  Facture et saisir les données obligatoires
    Given Je me connecte à monExpert
    Then Charger la Facture et saisir les données obligatoires dans monExpert
  @monExpert
    @focus
  Scenario: Checker si le status de la facture = TO_CHECK dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Checker le status "PIECE_A_CHARGER" de l OS dans BO
    And Checker si le status de la facture = TO_CHECK dans BO
  @monExpert
    @focus
  Scenario: Charger l attestation sur l honneur et charger la version signee
    Given Je me connecte à monExpert
    Then Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
    @focus
  Scenario: Checker le chargement de l attestation sur l honneur et valider les controles dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Checker le status "A_TRAITER" de l OS dans BO
    Then Checker le chargement de l attestation sur l honneur = TO_CHECK dans BO
    And Valider le controle de devis "T5" sans l envoie de mail dans BO
    And Valider le controle de la facture sans l envoie de mail dans BO
    And Valider le controle de l attestation sur l honneur sans l envoie de mail dans BO
    And Valider le controle du Cadastre en NA sans document avec l envoie de mail dans B0
    Then Checker le status "VALIDE_CC" de l OS dans BO
    And Redirection info beneficiaire
    And Cloturer l OS
