Feature: Checker le Contenu du Fichier Emmy

  Cette Feature permet de:
    - Creer une OS BAR EN 102 Sans Coup de Pouce, la passer en DEPOSABLE, creer un Depot avec et checker le contenu du fichier Emmy


@focus@Emmy   
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
@focus@Emmy
  Scenario Outline: Création de l OS BAR-EN-102 dans ProCee
    Given Je me connecte à ProCee
    When Je cree mon OS sur ProCee "<renovation>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>","<methode>","<coupDePouce>"
    And Je recupere la reference du dernier OS cree dans ProCee
    Then Charger le Devis Signe dans ProCee
    And Charger la Facture dans ProCee
    And Charger l Attestation dans ProCee
    And Charger le Cadastre dans ProCee
    And Checker le status de l OS "En cours de vérification" dans ProCee
    Examples:
      | renovation | logement    | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville      | methode   | coupDePouce |
      | Isolation  | appartement | electricite     | individuel        | Murs        | 110     | STANDARD | 35 avenue de bretagne | 78000 | Versailles | Extérieur | Non         |
@focus@Emmy
  Scenario: Validation de toutes les piéces et passage de l OS en état DEPOSABLE puis création du Dépot dans BO
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    Then Validation des pieces dans BO sans Devis non signé
    When Valider le dossier en Qualite OK et passer en "DEPOSABLE","T2"
    And Creer un depot avec le dossier et passer en DEPOSE "T2"
@focus@Emmy
  Scenario Outline: Selection du Depôt et Verification du Fichier Emmy
    Given Je me suis connecte au BO
    When Redirection info Chantier
    And Recuperation des infos chantier "bar_en_102"
    Then Selection du Depot et telechargement du fichier Emmy
    And Lecture du fichier Emmy "BAR-EN-102","T2","<adresseTravaux>","<CP>","<ville>","<revenus>","<CDP>","<logement>","<surface>","<chauffageLogement>"
        Examples:
      | souhait   | logement    | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville      | CDP |
      | Isolation | appartement | electricite     | individuel        | Murs        | 110     | STANDARD | 35 avenue de bretagne | 78000 | Versailles | NON |