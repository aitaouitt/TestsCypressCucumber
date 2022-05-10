Feature: Checker le Contenu du Fichier Emmy

  Cette Feature permet de:
    - Creer une OS BAR EN 102 Sans Coup de Pouce, la passer en DEPOSABLE, creer un Depot avec et checker le contenu du fichier Emmy


@focus@Emmy   
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
@focus@Emmy
  Scenario Outline: Création de l OS BAR-TH-102 PRECAIRE_ENERGETIQUE Sans Coup de Pouce
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    And Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville      |
      | Isoler  | maison   | electricite     | individuel        | murs        | 95      | STANDARD | 31 avenue de bretagne | 78000 | Versailles |

@focus@Emmy
  Scenario: Chargement devis non signé et les impots dans monExpert
    Given Je me connecte à monExpert
    And Chargement du justificatif des impots dans monExpert
    And Chargement du devis non signé dans monExpert
@focus@Emmy
  Scenario: Valider le controle de devis non signe et impots avec l envoie de mail dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    And Valider le controle de devis non signe et impots avec l envoie de mail dans BO
@focus@Emmy
  Scenario: Charger les devis signe et saisir la date
    Given Je me connecte à monExpert
    Then Charger le devis signe et saisir la date dans monExpert "Validé"
    And Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
@focus@Emmy
  Scenario: Checker le chargement de l attestation sur l honneur et valider les controles dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    Then Checker le chargement de l attestation sur l honneur = TO_CHECK dans BO
    And Valider le controle de devis "T5" sans l envoie de mail dans BO
    And Valider le controle de la facture sans l envoie de mail dans BO
    And Valider le controle de l attestation sur l honneur sans l envoie de mail dans BO
    And Valider le controle du Cadastre en NA sans document avec l envoie de mail dans B0
    When Valider le dossier en Qualite OK et passer en "DEPOSABLE","T5"
    And Creer un depot avec le dossier et passer en DEPOSE "T5"
@focus@Emmy
  Scenario Outline: Selection du Depôt et Verification du Fichier Emmy
    Given Je me suis connecte au BO
    When Redirection info Chantier
    And Recuperation des infos chantier "bar_en_102"
    Then Selection du Depot et telechargement du fichier Emmy
    And Lecture du fichier Emmy "BAR-EN-102","T5","<adresseTravaux>","<CP>","<ville>","<revenus>","<CDP>","<logement>","<surface>","<chauffageLogement>"
        Examples:
      | souhait | logement | chauffageActuel | chauffageLogement | typeTravaux | surface | revenus  | adresseTravaux        | CP    | ville      | CDP |
      | Isoler  | maison   | electricite     | individuel        | murs        | 95      | STANDARD | 31 avenue de bretagne | 78000 | Versailles | NON |