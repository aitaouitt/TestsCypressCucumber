Feature: Simulation sur l OS BAR-TH-112

  BAR-TH-112 - Appareil indépendant de chauffage au bois

  @Simulateur
    @focus
  Scenario: Connexion au BO
    Given Je me suis connecte au BO
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-112 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection Simulateur
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                     | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-112 - Appareil indépendant de chauffage au bois | H1   | N/A           | NON         | Précaire énergétique |              | 1    |      |             |         |
      | BAR-TH-112 - Appareil indépendant de chauffage au bois | H2   | N/A           | NON         | Modeste              |              | 1    |      |             |         |
      | BAR-TH-112 - Appareil indépendant de chauffage au bois | H3   | N/A           | NON         | Standard             |              | 1    |      |             |         |
