Feature: Simulation sur l OS BAR-TH-148

  BAR-TH-148 - Chauffe eau thermodynamique à accumulation

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-148 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                      | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-148 - Chauffe eau thermodynamique à accumulation | H3   | N/A           | N/A         | Standard             | Appartement  |      |      |             |         |
      | BAR-TH-148 - Chauffe eau thermodynamique à accumulation | H1   | N/A           | N/A         | Précaire énergétique | Maison       |      |      |             |         |
