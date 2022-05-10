Feature: Generation CDC Avec Coup de Pouce sur BAR TH 104 T2

  Cette suite de tests permets de creer un OS BAR TH 104 T2,
  telecharger le PDF du CDC puis verifier le contenu text du PDF.
  Elle verifie l existance de:
    La date du jour (date proposition)
    L adresse des travaux declarer lors de la creation de l OS
    le nom et prenom declarés sur l OS
    le montant de la prime
    Les texts explicatifs
  Elle verifie l exixtance et l affichage du Pouce dans le titre du projet


  @ProCee@focus
    Scenario: Cloturer l OS crée précédemment
    Given  Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
    
  @ProCee@focus
  Scenario Outline: Creation de l OS BAR TH 104 T2 Grand Precaire avec Coup de Pouce dans ProCee
    Given Je me connecte à ProCee
    When Je cree mon OS sur ProCee "<renovation>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>","<methode>","<coupDePouce>"
    And Je recupere la reference du dernier OS cree dans ProCee
    Examples:
      | renovation | logement | chauffageActuel | chauffageLogement | typeTravaux     | surface | revenus              | adresseTravaux        | CP    | ville      | methode                 | coupDePouce |
      | Chauffage  | maison   | electricite     | collectif         | Pompe à chaleur | 110     | PRECAIRE_ENERGETIQUE | 20 avenue de bretagne | 78000 | Versailles | Pompe à chaleur air/eau | Oui         |
#     | Isoler    | appartement | electricite     | individuel        | comblesPerdusOuAmenageables | 110      | PRECAIRE_ENERGETIQUE | 38 avenue de paris | 78000 | Versailles |
#     | chauffer  | maison      | gaz             | collectif         | murs                                  | MODESTE
#     | Obtenir preconisations  | fioul                               | sols                                  | STANDARD
#                               | bois                                | toitureTerrasse
#                               | charbon                             | Radiateurs_electriques
#                               | pompeAChaleur


  @ProCee@focus 
  Scenario Outline: Checker le contenu du PDF CDC
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le Coupe de pouce à "Oui"
    Then Telecharger le PDF "CDC"
    And Ckecker le PDf "CDCT2","<adresseTravaux>","<CP>","<ville>","Oui"
    And Redirection info beneficiaire
    And Cloturer l OS
    Examples:
      | adresseTravaux        | CP    | ville      |
      | 20 avenue de bretagne | 78000 | Versailles |