Feature: Simulation sur l OS BAR-EN-101

  BAR-EN-101 - Isolation des combles ou de toiture


  @Simulateur
    @focus
  Scenario: Connexion au BO
    Given Je me suis connecte au BO

  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-EN-101 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection Simulateur
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                               | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-EN-101 - Isolation des combles ou de toiture | H1   | Electricite   | NON         | Précaire énergétique |              |      |      |             |         |
      | BAR-EN-101 - Isolation des combles ou de toiture | H2   | Electricite   | NON         | Modeste              |              |      |      |             |         |
      | BAR-EN-101 - Isolation des combles ou de toiture | H3   | Combustible   | NON         | Standard             |              |      |      |             |         |
