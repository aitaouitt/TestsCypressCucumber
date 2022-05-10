Feature: Creation, Recherche, Update et Suppression d'une Organisation


  @MicroService
@focus   
  Scenario Outline: Creation, Recherche, Update et Suppression d'une Organisation
    Given Creation d Organisation "<parent_id>","<adresse>","<CP>","<ville>","<precarity>","<SampleSocial>","<HighSocial>","<default_os>"
    When Ajout de l Organisation dans la table Def "<parent_id>","<adresse>","<CP>","<ville>","<precarity>","<SampleSocial>","<HighSocial>","<default_os>"
    And Recherche Organisation "<parent_id>","<adresse>","<CP>","<ville>","<precarity>","<SampleSocial>","<HighSocial>","<default_os>"
    And Update Organisation "<parent_id>","<adresse>","<CP>","<ville>","<NewPrecarity>","<NewSampleSocial>","<NewHighSocial>","<NewDefault_os>"
    And Recherche Organisation "<parent_id>","<adresse>","<CP>","<ville>","<NewPrecarity>","<NewSampleSocial>","<NewHighSocial>","<NewDefault_os>"
    Then Suppression Organisation
    Examples:
      | parent_id                        | adresse            | CP    | ville    | precarity | SampleSocial | HighSocial | default_os | NewPrecarity | NewSampleSocial | NewHighSocial | NewDefault_os |
      | 415f3c17e8848e09ff45b44b5c0db861 | 12 avenue de Paris | 92025 | Colombes | 4         | 4.5          | 5          | BAR_TH_106 | 6            | 5.6             | 5             | BAR_EN_101    |

