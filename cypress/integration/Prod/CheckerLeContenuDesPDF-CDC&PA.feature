Feature: Checker les contenus des documents CDC et PA sur les OS crées en date N-1

  @focus@Prod
  Scenario: Recuperation des IDs OS crées en date n-1 et Checker les PDF de CDC et PA
    Given Je me suis connecte au BO
    When Filtrer sur la date n-1
    Then Recuperation des IDs OS crées en date n-1 et Checker les PDF de CDC et PA