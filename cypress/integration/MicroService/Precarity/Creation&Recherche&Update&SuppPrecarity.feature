Feature: Creation Recherche, Update et suppression de Precarité


  @MicroService
  @focus
  Scenario Outline: Creation de la Precarité, Recherche, Update et Suppression de Precarite
    Given Creation de Precarite dans la table Temp "<family>","<HighSocial>","<SampleSocial>","<StartDate>","<EndDate>","<localization>"
    When Ajout de la precarite dans la table Def "<family>","<HighSocial>","<SampleSocial>","<StartDate>","<EndDate>","<localization>"
    When Recherche Precarity "<family>","<CP>","<date>","<localization>","<HighSocial>","<SampleSocial>"
    And Update Precarite "<family>","<localization>","<NewHighSocial>","<NewSampleSocial>","<StartDate>","<EndDate>"
    And Recherche Precarity "<family>","<CP>","<date>","<localization>","<NewHighSocial>","<NewSampleSocial>"
    Then Supprimer la precarite
    Examples:
      | family | CP    | date       | HighSocial | SampleSocial | StartDate  | EndDate    | localization | NewHighSocial | NewSampleSocial |
      | 3      | 78000 | 2019-01-01 | 22500      | 38000        | 2005-01-01 | 2021-01-01 | idf          | 23000         | 39000           |
      | 1      | 54000 | 2029-11-01 | 28000      | 41000        | 2022-01-01 | null       | other        | 27000         | 39000           |
