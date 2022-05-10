Feature: BAR TH 106 T5 avec KO TEMP sur Cadastre

  Passage du BAR TH 106 T5 sans les impots et avec un KO temporaire sur le cadastre


  @monExpert
    @focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @monExpert
  @focus
  Scenario Outline: Creation de l OS avec precarité Precaire
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    Then Je recupere la reference du dernier OS cree dans monExpert
    And Chargement du devis non signé dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux    | CP    | ville      |
      | chauffer | appartement | electricite     | individuel        | Radiateurs_electriques | 110     | PRECAIRE_ENERGETIQUE | Lieu dit la Croix | 78000 | Versailles |
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
    Then Checker le status "PIECE_A_CHARGER" de l OS dans BO
    And Valider le controle de devis non signe sans l envoie de mail
  @monExpert
    @focus
  Scenario: Charger les devis signe et saisir la date
    Given Je me connecte à monExpert
    Then Charger le devis signe et saisir la date dans monExpert "En attente"
    And Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
    @focus
  Scenario: Validation du devis signé, la facture et l Attestation sans envoie de mail
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Checker le status "PIECE_A_CHARGER" de l OS dans BO
    Then Checker l affichage du message Document imposition manquant
    And Valider le controle de devis "T5" sans l envoie de mail dans BO
    And Valider le controle de la facture sans l envoie de mail dans BO
  @monExpert
    @focus
  Scenario: Chargement des impots dans monExpert
    Given Je me connecte à monExpert
    And Chargement du justificatif des impots dans monExpert
  @monExpert
    @focus
  Scenario: Valider le controle de devis non signe et impots avec l envoie de mail dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de l impots "PRECAIRE_ENERGETIQUE" sans l envoie de mail
    And Valider le controle de l attestation sur l honneur sans l envoie de mail dans BO
    Then Controle Cadastre KO TEMP pour raison "cadastre non trouve" et checker statut "CORRECTIONS_ATTENDU"
    And Corriger et valider le controle du Cadastre avec l envoie de mail dans BO
    Then Checker le status "VALIDE_CC" de l OS dans BO
    And Redirection info beneficiaire
    And Cloturer l OS
