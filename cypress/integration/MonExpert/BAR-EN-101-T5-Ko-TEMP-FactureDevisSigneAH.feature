Feature: BAR-EN-101-T5-Ko-TEMP-FactureDevisSigneAH

  Passage du BAR EN 101 T5 avec KO Temporaire sur la Facture, le Devis Signé et l Attestation


  @monExpert
    @focus
  Scenario: Cloturer l OS crée précédemment
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Cloturer l OS
  @monExpert
  @focus
  Scenario Outline: Creation de l OS avec revenu PRECAIRE ENERGETIQUE
    Given Je cree mon OS sur Monexpert "<souhait>","<logement>","<chauffageActuel>","<chauffageLogement>","<typeTravaux>","<surface>","<revenus>","<adresseTravaux>","<CP>","<ville>"
    When Je me connecte à monExpert
    Then Je recupere la reference du dernier OS cree dans monExpert
    Examples:
      | souhait | logement    | chauffageActuel | chauffageLogement | typeTravaux                 | surface | revenus              | adresseTravaux       | CP    | ville      |
      | Isoler  | appartement | electricite     | individuel        | comblesPerdusOuAmenageables | 110     | PRECAIRE_ENERGETIQUE | avenue de bretagne   | 78000 | Versailles |
#     | chauffer| maison       | gaz            | collectif         | murs                                  | MODESTE
#     | Obtenir preconisations | fioul                              | sols                                  | STANDARD
#                              | bois                               | toitureTerrasse
#                              | charbon
#                              | pompeAChaleur
  @monExpert
  @focus
  Scenario: Chargement devis non signé et les impots dans monExpert
    Given Je me connecte à monExpert
    When Chargement du justificatif des impots dans monExpert
    And Chargement du devis non signé dans monExpert
  @monExpert
  @focus
  Scenario: Validation du controle de devis non signe et impots avec l envoie de mail dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    Then Valider le controle de devis non signe et impots avec l envoie de mail dans BO
  @monExpert
  @focus
  Scenario: Charger le devis signé, la Facture et l"Attestation dans monExpert
    Given Je me connecte à monExpert
    And Charger le devis signe et saisir la date dans monExpert "Impots Valide"
    And Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
  @focus
  Scenario: Valider le controle de devis signé et le KO TEMP sans l envoie de mail
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    Then Valider le controle de Devis Signé en KO TEMP pour motif "<coordonnee beneficiaire" sans l envoie de mail dans BO
    And Valider le controle de la facture en KO TEMP pour motif "Artisan different du devis" sans l envoie de mail dans BO
    And Valider le controle de l attestation en KO TEMP pour motif "Date d engagement absente" sans l envoie de mail dans BO
  @monExpert
  @focus
  Scenario: Charger le devis signé, la Facture et l"Attestation dans monExpert
    Given Je me connecte à monExpert
    Then Charger le devis signe et saisir la date dans monExpert "Recharge doc"
    And Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
  @focus
  Scenario: Validation du controle de devis non signe et impots avec l envoie de mail dans BO
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    Then Valider le controle de devis "T5" sans l envoie de mail dans BO
    And Valider le controle de la facture en KO TEMP pour motif "Numero de la facture manquant" sans l envoie de mail dans BO
    And Valider le controle de l attestation en KO TEMP pour motif "Reference facture absente" sans l envoie de mail dans BO
  @monExpert
  @focus
  Scenario: Charger la Facture et l"Attestation dans monExpert
    Given Je me connecte à monExpert
    Then Charger la Facture et saisir les données obligatoires dans monExpert
    And Charger l attestation sur l honneur et charger la version signee dans monExpert
  @monExpert
  @focus
  Scenario: Ajout et validation du controle de la facture, l"Attestation et le Cadastre puis cloture de l OS
    Given Je me suis connecte au BO
    When Redirection info beneficiaire
    And Checker le status "A_TRAITER" de l OS dans BO
    Then Valider le controle de la facture sans l envoie de mail dans BO
    And Valider le controle de l attestation sur l honneur sans l envoie de mail dans BO
    And Ajouter et valider le controle du Cadastre avec l envoie de mail dans BO et sans cloturer l OS
    And Mettre les impots en KO TEMP sans envoi de mail
    And Checker le status "CORRECTIONS_ATTENDU" de l OS dans BO
    And Valider le controle de l impots "PRECAIRE_ENERGETIQUE" sans l envoie de mail
    And Checker le status "VALIDE_CC" de l OS dans BO
    And Redirection info beneficiaire
    And Cloturer l OS
