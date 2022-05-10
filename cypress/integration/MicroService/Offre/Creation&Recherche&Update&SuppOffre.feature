Feature: Creation, Recherche, Update et suppression d'une Offre


  @MicroService
  @focus
  Scenario Outline: Creation d une Offre, Recherche, Update et Suppression de l Offre
    Given Creation d Offre "<org1>","<org2>","<valStandard>","<valPrecaire>","<valGrandPrecaire>","<starts_at>","<priority>","<code>","<OS>"
    When Ajout de l Offre dans la table Def "<parent_id>","<adresse>","<CP>","<ville>","<precarity>","<SampleSocial>","<HighSocial>","<default_os>"
    And Recherche Offre "<parent_id>","<adresse>","<CP>","<ville>","<precarity>","<SampleSocial>","<HighSocial>","<default_os>"
    And Update Offre "<parent_id>","<adresse>","<CP>","<ville>","<NewPrecarity>","<NewSampleSocial>","<NewHighSocial>","<NewDefault_os>"
    And Recherche Offre "<parent_id>","<adresse>","<CP>","<ville>","<NewPrecarity>","<NewSampleSocial>","<NewHighSocial>","<NewDefault_os>"
    Then Suppression Offre
    Examples:
      | org1                             | org2                            | valStandard | valPrecaire | valGrandPrecaire | starts_at  | priority | code       | OS         |
      | 21db0caed8b24087d8c116f6915abe31 | e6d4e48f603d0d526607560d08bbe50e| 3.500550055 | 4.500550055 | 5.500550055      | 2019-09-01 | 1        | NewOffreTA | BAR_EN_101 |
