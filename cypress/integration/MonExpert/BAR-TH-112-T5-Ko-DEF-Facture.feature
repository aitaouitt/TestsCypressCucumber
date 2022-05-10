Feature: BAR TH 112 KO DEF Facture

  Passage du BAR TH 112 avec test suppression du devis non signé et KO definitif sur la facture


  @monExpert
    @focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @monExpert
    @focus
  Scenario Outline: Creation de l OS avec revenu STANDARD
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Then Chargement du devis non signé dans monExpert
    And Supprimer le devis non signé
    And Chargement du devis non signé dans monExpert
    Examples:
      | souhait  | logement | chauffageActuel | chauffageLogement | typeTravaux               | surface | revenus  | adresseTravaux        | CP    | ville      |
      | chauffer | maison   | electricite     | individuel        | Radiateurs_electriques112 | 110     | STANDARD | 11 avenue de bretagne | 78210 | Versailles |
#     | Isoler    | appartement | electricite  | individuel       | comblesPerdusOuAmenageables | 80      | PRECAIRE_ENERGETIQUE | 38 avenue de paris | 78000 | Versailles |
#     | chauffer  | maison      | gaz          | collectif        | murs                                  | MODESTE
#     | Obtenir preconisations  | fioul                           | sols                                  | STANDARD
#                               | bois                            | toitureTerrasse
#                               | charbon                         | Radiateurs_electriques
#                               | pompeAChaleur                   | Radiateurs_electriques112
  @monExpert
    @focus
  Scenario: Verification documents generes Preuve Antéiorité et Cadre Contribution
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    And Verification documents generes Preuve Antéiorité et Cadre Contribution
    And Valider le contrôle de devis non signé en KO TEMP pour le motif "Date devis" dans format et checker le statut de l OS "CORRECTIONS_ATTENDU"
  @monExpert
    @focus
  Scenario: Charger le devis non signé corrigé dans monExpert
    Given Je me connecte à monExpert
    Then Chargement du devis non signé dans monExpert
  @monExpert
    @focus
  Scenario: Valider le controle de devis non signe avec l envoie de mail
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de devis non signe avec l envoie de mail
  @monExpert
    @focus
  Scenario: Charger les devis signe, la Facture et l Attestation sur l honneur signée dans monExpert
    Given Je me connecte à monExpert
    Then Charger le devis signe et saisir la date dans monExpert "Pas d Impots"
    And Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
    @focus
  Scenario: Valider le controle de devis signé et le KO Definitif de la facture pour motif "date edition<1an" sans l envoie de mail
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    Then Valider le controle de devis "T5" sans l envoie de mail dans BO
    And Valider le controle de la facture en KO Definitif pour motif "date edition<1an" sans l envoie de mail dans BO
    And Redirection info beneficiaire
    And Cloturer l OS
