Feature: Simulation sur l OS BAR-EN-102

  BAR-EN-102 - Isolation des murs

  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-102 - Isolation des murs, H1 Electricité
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville      |
      | Isoler  | maison   | electricite     | individuel        | murs        | 95      | STANDARD | 21 avenue de bretagne | 78000 | Versailles |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_102_H1_Electricite crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_102_H1_Electricite""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-102 - Isolation, Fioul, combles Perdus Ou Amenageables H1
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement    | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux      | CP    | ville      |
      | Isoler  | appartement | fioul           | individuel        | murs        | 95      | STANDARD | 23 avenue de Nantes | 78000 | Versailles |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_102_H1_Combustible crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_102_H1_Combustible""<surface>"
    Examples:
      | surface |
      | 95      |
 @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-102 - Isolation des murs, H2 Electricité
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville       |
      | Isoler  | maison   | electricite     | individuel        | murs        | 95      | STANDARD | 21 avenue de bretagne | 17000 | la rochelle |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_102_H2_Electricite crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_102_H2_Electricite""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-102 - Isolation, Fioul, combles Perdus Ou Amenageables H2
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement    | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux      | CP    | ville       |
      | Isoler  | appartement | fioul           | individuel        | murs        | 95      | STANDARD | 23 avenue de Nantes | 17000 | la rochelle |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_102_H2_Combustible crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_102_H2_Combustible""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-102 - Isolation des murs, H3 Electricité
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville     |
      | Isoler  | maison   | electricite     | individuel        | murs        | 95      | STANDARD | 21 avenue de bretagne | 13000 | Marseille |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_102_H3_Electricite crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_102_H3_Electricite""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @Simulateur@focus
  Scenario Outline: Création de l OS BAR-EN-102 - Isolation, Fioul, combles Perdus Ou Amenageables H3
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement    | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux      | CP    | ville     |
      | Isoler  | appartement | fioul           | individuel        | murs        | 95      | STANDARD | 23 avenue de Nantes | 13000 | Marseille |
  @Simulateur@focus
  Scenario Outline: Checker le montant du Cumac dans BO pour l OS BAR_EN_102_H3_Combustible crée dans MonExpert
    Given  Je me suis connecte au BO
    When Redirection info Chantier
    Then Checker le montant du Cumac estimé pour l OS "BAR_EN_102_H3_Combustible""<surface>"
    Examples:
      | surface |
      | 95      |
  @Simulateur@focus
  Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS