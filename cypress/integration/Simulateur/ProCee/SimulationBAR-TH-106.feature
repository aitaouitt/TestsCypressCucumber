Feature: Simulation sur l OS BAR-TH-106

  BAR-TH-106 - Chaudière individuelle à haute performance énergétique

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-106 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                                  | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-106 - Chaudière individuelle à haute performance énergétique | H1   | N/A           | NON         | Précaire énergétique | Maison       | 1    |      |             |         |
      | BAR-TH-106 - Chaudière individuelle à haute performance énergétique | H2   | N/A           | NON         | Modeste              | Maison       | 1    |      |             |         |
      | BAR-TH-106 - Chaudière individuelle à haute performance énergétique | H3   | N/A           | NON         | Standard             | Maison       | 1    |      |             |         |
      | BAR-TH-106 - Chaudière individuelle à haute performance énergétique | H1   | N/A           | NON         | Standard             | Appartement  | 1    |      |             |         |
      | BAR-TH-106 - Chaudière individuelle à haute performance énergétique | H2   | N/A           | NON         | Modeste              | Appartement  | 1    |      |             |         |
      | BAR-TH-106 - Chaudière individuelle à haute performance énergétique | H3   | N/A           | NON         | Précaire énergétique | Appartement  | 1    |      |             |         |
