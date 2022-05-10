Feature: Simulation sur l OS BAR-EN-101

  BAR-EN-101 - Isolation des combles ou de toiture

  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-101 - Isolation des combles ou de toiture
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement      | chauffageActuel | chauffageLogement | typeTravaux                        | surface | revenus              | adresseTravaux        | CP    | ville      |
      | Isoler  | appartement   | electricite     | individuel        | comblesPerdusOuAmenageables        | 95      | PRECAIRE_ENERGETIQUE | 24 avenue de bretagne | 78000 | Versailles |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_101_H1 crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_101_H1""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
      @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-101 - Isolation des combles ou de toiture
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement      | chauffageActuel | chauffageLogement | typeTravaux                        | surface | revenus  | adresseTravaux        | CP    | ville       |
      | Isoler  | appartement   | electricite     | individuel        | comblesPerdusOuAmenageables        | 95      | MODESTE  | 24 avenue de bretagne | 17000 | la rochelle |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_101_H1 crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_101_H2""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
      @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-101 - Isolation des combles ou de toiture
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement      | chauffageActuel | chauffageLogement | typeTravaux                        | surface | revenus  | adresseTravaux        | CP    | ville      |
      | Isoler  | appartement   | electricite     | individuel        | comblesPerdusOuAmenageables        | 95      | STANDARD | 24 avenue de bretagne | 13000 | Marseille  |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_101_H1 crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_101_H3""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS