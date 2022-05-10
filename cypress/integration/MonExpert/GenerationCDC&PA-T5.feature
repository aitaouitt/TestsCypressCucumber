Feature: Generation CDC et PA sur BAR TH 104 T5

  Cette suite de tests permets de creer un OS BAR TH 104 T5,
  telecharger le PDF du CDC et la PA puis verifier le contenu text dans chaque
  PDF.
  Elle verifie l existance de:
    La date du jour (date proposition)
    L adresse des travaux declarer lors de la creation de l OS
    le nom et prenom declarés sur l OS
    le montant de la prime
    Les texts explicatifs


  @monExpert
    @focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @monExpert
    @focus
  Scenario Outline: Creation de l OS BAR TH 104 T5
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    Then Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement | chauffageActuel | chauffageLogement | typeTravaux         | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | maison   | pompeAChaleur   | collectif         | pompeAchaleurAirEau | 110     | PRECAIRE_ENERGETIQUE | 4 avenue de bretagne | 78000 | Versailles |
#     | Isoler    | appartement | electricite     | individuel        | comblesPerdusOuAmenageables | 110      | PRECAIRE_ENERGETIQUE | 38 avenue de paris | 78000 | Versailles |
#     | chauffer  | maison      | gaz             | collectif         | murs                                  | MODESTE
#     | Obtenir preconisations  | fioul                               | sols                                  | STANDARD
#                               | bois                                | toitureTerrasse
#                               | charbon                             | Radiateurs_electriques
#                               | pompeAChaleur

  @monExpert
    @focus
  Scenario Outline: Checker les contenus des PDF CDC et PA
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le Coupe de pouce à "Non"
    Then Telecharger le PDF "CDC"
    And Telecharger le PDF "PA"
    And Ckecker le PDf "CDCT5","<adresseTravaux>","<CP>","<ville>","Non"
    And Ckecker le PDf "PAT5","<adresseTravaux>","<CP>","<ville>","Non"
    And Redirection info beneficiaire
    And Cloturer l OS
    Examples:
      | adresseTravaux        | CP    | ville      |
      | 4 avenue de bretagne  | 78000 | Versailles |

