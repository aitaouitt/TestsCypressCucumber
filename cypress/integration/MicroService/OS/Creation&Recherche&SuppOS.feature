Feature: Creation, Recherche, Update et Suppression d OS



  @MicroService
@focus   
  Scenario Outline: Creation, Recherche, Update et Suppression d OS
    Given Creation de l OS "<typeOS>","<groupID>","<org>","<zone>","<surface>","<insulationType>","<adresse>","<CP>","<ville>","<revenus>","<RefPrec>"
    # When Ajout de l OS dans la table Def "<typeOS>","<groupID>","<org>","<zone>","<surface>","<insulationType>","<adresse>","<CP>","<ville>","<revenus>","<RefPrec>"
    # Then Recherche de l OS "<typeOS>","<groupID>","<org>","<zone>","<surface>","<insulationType>","<adresse>","<CP>","<ville>","<revenus>","<RefPrec>"
    # Given Suppression de l OS
    Examples:
      | typeOS     | groupID                            | org                    |zone|surface|insulationType|     adresse        |CP   |ville     |revenus               |RefPrec|
      | BAR_EN_101 |602cc0ed-743a-4b39-9b8e-827a69d3c481|60081f9ba29c6363eb691c68| 1  |120    |combles_perdus|4 rue Lucien sampaix|78000|Versailles|REVENUS_GRAND_PRECAIRE|1      |