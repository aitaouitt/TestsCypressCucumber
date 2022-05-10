Feature: Simulation sur l OS BAR-TH-104

  BAR-TH-104

  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104, H1 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel   | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | appartement | pompeAChaleur     | individuel        | pompeAchaleurAirEau    | 65      | PRECAIRE_ENERGETIQUE | 25 avenue de bretagne | 78000 | Versailles |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_H1_102SupEqalETASinf110 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_H1_102SupEqalETASinf110""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104, H2 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel   | chauffageLogement | typeTravaux            | surface | revenus | adresseTravaux        | CP    | ville        |
      | chauffer | appartement | pompeAChaleur     | individuel        | pompeAchaleurAirEau    | 65      | MODESTE | 25 avenue de bretagne | 17000 | la rochelle  |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_H2_102SupEqalETASinf110 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_H2_102SupEqalETASinf110""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104, H3 Appartement
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel   | chauffageLogement | typeTravaux            | surface | revenus  | adresseTravaux        | CP    | ville      |
      | chauffer | appartement | pompeAChaleur     | individuel        | pompeAchaleurAirEau    | 65      | STANDARD | 25 avenue de bretagne | 13000 | Marseille  |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_H3_102SupEqalETASinf110 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_H3_102SupEqalETASinf110""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104, H1 Maison
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel   | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | maison      | pompeAChaleur     | individuel        | pompeAchaleurAirEau    | 95      | PRECAIRE_ENERGETIQUE | 25 avenue de bretagne | 78000 | Versailles |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_H1_Maison_102SupEqalETASinf110 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_H1_Maison_102SupEqalETASinf110""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104, H2 Maison
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel   | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville       |
      | chauffer | maison      | pompeAChaleur     | individuel        | pompeAchaleurAirEau    | 95      | PRECAIRE_ENERGETIQUE | 25 avenue de bretagne | 17000 | la rochelle |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_H2_Maison_102SupEqalETASinf110 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_H2_Maison_102SupEqalETASinf110""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS  
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104, H3 Maison
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel   | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | maison      | pompeAChaleur     | individuel        | pompeAchaleurAirEau    | 95      | PRECAIRE_ENERGETIQUE | 25 avenue de bretagne | 13000 | Marseille  |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_H3_Maison_102SupEqalETASinf110 crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_H3_Maison_102SupEqalETASinf110""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104 PRECAIRE_ENERGETIQUE avec Coup de Pouce
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus              | adresseTravaux        | CP    | ville      |
      | chauffer | maison      | gaz             | individuel        | pompeAchaleurAirEau    | 95      | PRECAIRE_ENERGETIQUE | 25 avenue de bretagne | 13000 | Marseille  |
  @focus@Simulateur
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_AvecCdPPrecaire crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    And Checker le Coupe de pouce à "OUI"
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_AvecCdPPrecaire""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-TH-104 STANDARD avec Coup de Pouce
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus  | adresseTravaux        | CP    | ville        |
      | chauffer | maison      | gaz             | individuel        | pompeAchaleurAirEau    | 95      | STANDARD | 25 avenue de bretagne | 17000 | La Rochelle  |
  @focus@Simulateur
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_AvecCdPStandard crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    And Checker le Coupe de pouce à "OUI"
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_AvecCdPStandard""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur @focus
  Scenario Outline: Création de l OS BAR-TH-104 MODESTE avec Coup de Pouce
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait  | logement    | chauffageActuel | chauffageLogement | typeTravaux            | surface | revenus | adresseTravaux        | CP    | ville       |
      | chauffer | maison      | gaz             | individuel        | pompeAchaleurAirEau    | 95      | MODESTE | 25 avenue de bretagne | 78000 | Versailles  |
  @focus@Simulateur
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_TH_104_AvecCdPModeste crée dans MonExpert
    Given Je me suis connecte au BO
    When Redirection info Chantier
    And Checker le Coupe de pouce à "OUI"
    Then Checker le montant du Cumac estimé pour l OS "BAR_TH_104_AvecCdPModeste""<surface>"
    Examples:
      | surface |
      | 1       |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS

