Feature: Simulation sur l OS BAR-EN-103

  BAR-EN-103 - Isolation d un plancher

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-EN-103 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                    | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-EN-103 - Isolation d\'un plancher | H1   | Electricite   | NON         | Précaire énergétique |              |      |      |             |         |
      | BAR-EN-103 - Isolation d\'un plancher | H2   | Electricite   | NON         | Modeste              |              |      |      |             |         |
      | BAR-EN-103 - Isolation d\'un plancher | H3   | Combustible   | NON         | Standard             |              |      |      |             |         |
