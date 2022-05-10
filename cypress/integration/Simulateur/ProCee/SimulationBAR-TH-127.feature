Feature: Simulation sur l OS BAR-TH-127

  BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-127 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                                     | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall  | TypeVMC |
      | BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable | H1   | N/A           | N/A         | Précaire énergétique | Appartement  |      |      | Individuelle | B       |
      | BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable | H2   | N/A           | N/A         | Modeste              | Appartement  |      |      | Individuelle | B       |
      | BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable | H3   | N/A           | N/A         | Standard             | Appartement  |      |      | Individuelle | B       |
      | BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable | H1   | N/A           | N/A         | Précaire énergétique | Maison       |      |      | Collective   | B       |
      | BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable | H2   | N/A           | N/A         | Modeste              | Maison       |      |      | Collective   | B       |
      | BAR-TH-127 - Ventilation Mécanique Contrôlée simple flux hygroréglable | H3   | N/A           | N/A         | Standard             | Maison       |      |      | Collective   | B       |
