Feature: Simulation sur l OS BAR-TH-148

  BAR-TH-148 - Chauffe eau thermodynamique à accumulation

  @Simulateur
    @focus
  Scenario: Connexion au BO
    Given Je me suis connecte au BO
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-148 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection Simulateur
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                      | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-148 - Chauffe eau thermodynamique à accumulation | H3   | N/A           | N/A         | Standard             | Appartement  |      |      |             |         |
      | BAR-TH-148 - Chauffe eau thermodynamique à accumulation | H1   | N/A           | N/A         | Précaire énergétique | Maison       |      |      |             |         |
