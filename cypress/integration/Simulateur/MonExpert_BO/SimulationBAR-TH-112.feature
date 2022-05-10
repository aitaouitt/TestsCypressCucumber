Feature: Simulation sur l OS BAR-TH-112

  BAR-TH-112

@focus@Simulateur
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
@focus@Simulateur
  Scenario Outline: Création de l OS BAR-TH-112, H1 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | maison      | bois            | individuel        | Chaudiere_A_Bois       | 95      | PRECAIRE_ENERGETIQUE | 23 avenue de bretagne | 78000 | Versailles |
@focus@Simulateur
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_112_H1 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_112_H1""<surface>"
    Examples:
      | surface |
      | 1       |

@Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
@Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-112, H2 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville       |
      | chauffer | maison      | bois            | individuel        | Chaudiere_A_Bois       | 95      | PRECAIRE_ENERGETIQUE | 23 avenue de bretagne | 17000 | La Rochelle |
@Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_112_H2 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_112_H2""<surface>"
    Examples:
      | surface |
      | 1       |

@Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
@Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-112, H3 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | maison      | bois            | individuel        | Chaudiere_A_Bois       | 95      | PRECAIRE_ENERGETIQUE | 23 avenue de bretagne | 13000 | Marseille  |
@Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_112_H3 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_112_H3""<surface>"
    Examples:
      | surface |
      | 1       |
@Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS