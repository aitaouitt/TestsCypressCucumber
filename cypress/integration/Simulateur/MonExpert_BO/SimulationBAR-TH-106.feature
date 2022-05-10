Feature: Simulation sur l OS BAR-TH-106

  BAR-TH-106 - Chaudière individuelle à haute performance énergétique

  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-106, H1 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | appartement | electricite     | individuel        | Radiateurs_electriques | 95      | PRECAIRE_ENERGETIQUE | 22 avenue de bretagne | 78000 | Versailles |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_106_H1_Appart crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_106_H1_Appart""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-106, H2 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus  | adresseTravaux        | CP    | ville       |
      | chauffer | appartement | electricite     | individuel        | Radiateurs_electriques | 95      | STANDARD | 22 avenue de bretagne | 17000 | la rochelle |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_106_H2_Appart crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_106_H2_Appart""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-106, H3 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus | adresseTravaux        | CP    | ville     |
      | chauffer | appartement | electricite     | individuel        | Radiateurs_electriques | 95      | MODESTE | 22 avenue de bretagne | 13000 | Marseille |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_106_H3_Appart crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_106_H3_Appart""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-106, H1 Maison
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | maison   | electricite     | collectif         | Radiateurs_electriques | 95      | PRECAIRE_ENERGETIQUE | 22 avenue de bretagne | 78000 | Versailles |

  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_106_H1_Maison crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_106_H1_Maison""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-106, H2 Maison
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus  | adresseTravaux        | CP    | ville       |
      | chauffer | maison   | electricite     | collectif         | Radiateurs_electriques | 95      | STANDARD | 22 avenue de bretagne | 17000 | la rochelle |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_106_H2_Maison crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_106_H2_Maison""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-106, H3 Maison
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus | adresseTravaux        | CP    | ville     |
      | chauffer | maison   | electricite     | collectif         | Radiateurs_electriques | 95      | MODESTE | 22 avenue de bretagne | 13000 | Marseille |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_106_H3_Maison crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_106_H3_Maison""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS