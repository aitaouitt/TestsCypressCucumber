Feature: Simulation sur l OS BAR-TH-101

  BAR-TH-101 - chauffe eau solaire individuel

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-101 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                          | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-101 - chauffe eau solaire individuel | H1   | N/A           | N/A         | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-101 - chauffe eau solaire individuel | H2   | N/A           | N/A         | Modeste              |              |      |      |             |         |
      | BAR-TH-101 - chauffe eau solaire individuel | H3   | N/A           | N/A         | Standard             |              |      |      |             |         |
