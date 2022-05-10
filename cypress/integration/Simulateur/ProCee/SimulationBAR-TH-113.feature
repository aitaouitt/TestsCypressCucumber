Feature: Simulation sur l OS BAR-TH-113

  BAR-TH-113 - Chaudière biomasse individuelle

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-113 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                           | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-113 - Chaudière biomasse individuelle | H1   | N/A           | OUI         | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H1   | N/A           | OUI         | Modeste              |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H1   | N/A           | OUI         | Standard             |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H2   | N/A           | OUI         | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H2   | N/A           | OUI         | Modeste              |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H2   | N/A           | OUI         | Standard             |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H3   | N/A           | OUI         | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H3   | N/A           | OUI         | Modeste              |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H3   | N/A           | OUI         | Standard             |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H1   | N/A           | OUI-v2      | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H1   | N/A           | OUI-v2      | Modeste              |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H1   | N/A           | OUI-v2      | Standard             |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H2   | N/A           | OUI-v2      | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H2   | N/A           | OUI-v2      | Modeste              |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H2   | N/A           | OUI-v2      | Standard             |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H3   | N/A           | OUI-v2      | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H3   | N/A           | OUI-v2      | Modeste              |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H3   | N/A           | OUI-v2      | Standard             |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H1   | N/A           | NON         | Précaire énergétique |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H2   | N/A           | NON         | Modeste              |              |      |      |             |         |
      | BAR-TH-113 - Chaudière biomasse individuelle | H3   | N/A           | NON         | Standard             |              |      |      |             |         |
