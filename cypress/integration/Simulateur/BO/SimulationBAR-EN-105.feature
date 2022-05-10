Feature: Simulation sur l OS BAR-EN-105

  BAR-EN-105 - Isolation des toitures terrasses

  @Simulateur
    @focus
  Scenario: Connexion au BO
    Given Je me suis connecte au BO
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-EN-105 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection Simulateur
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                            | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-EN-105 - Isolation des toitures terrasses | H1   | N/A           | N/A         | Précaire énergétique |              |      |      |             |         |
      | BAR-EN-105 - Isolation des toitures terrasses | H2   | N/A           | N/A         | Modeste              |              |      |      |             |         |
      | BAR-EN-105 - Isolation des toitures terrasses | H3   | N/A           | N/A         | Standard             |              |      |      |             |         |
