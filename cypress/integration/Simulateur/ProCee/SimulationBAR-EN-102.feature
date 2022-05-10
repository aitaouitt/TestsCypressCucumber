Feature: Simulation sur l OS BAR-EN-102

  BAR-EN-102 - Isolation des murs

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-EN-102 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                              | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-EN-102 - Isolation des murs | H1   | Electricite   | N/A         | Précaire énergétique |              |      |      |             |         |
      | BAR-EN-102 - Isolation des murs | H1   | Combustible   | N/A         | Modeste              |              |      |      |             |         |
      | BAR-EN-102 - Isolation des murs | H2   | Electricite   | N/A         | Standard             |              |      |      |             |         |
      | BAR-EN-102 - Isolation des murs | H2   | Combustible   | N/A         | Modeste              |              |      |      |             |         |
      | BAR-EN-102 - Isolation des murs | H3   | Electricite   | N/A         | Précaire énergétique |              |      |      |             |         |
      | BAR-EN-102 - Isolation des murs | H3   | Combustible   | N/A         | Standard             |              |      |      |             |         |
