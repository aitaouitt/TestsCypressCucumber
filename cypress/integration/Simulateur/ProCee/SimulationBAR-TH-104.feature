Feature: Simulation sur l OS BAR-TH-104

  BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-104 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                      | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | OUI         | Précaire énergétique | Appartement  | 1    |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | OUI         | Modeste              | Maison       | 1    |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | OUI         | Standard             | Maison       | 1    |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | OUI-v2      | Précaire énergétique | Appartement  | 1    |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | OUI-v2      | Modeste              | Maison       | 1    |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | OUI-v2      | Standard             | Maison       | 1    |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | NON         | Standard             | Appartement  | 105  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | NON         | Modeste              | Appartement  | 102  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | NON         | Précaire énergétique | Appartement  | 109  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | NON         | Standard             | Appartement  | 110  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | NON         | Modeste              | Appartement  | 115  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | NON         | Précaire énergétique | Appartement  | 119  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | NON         | Standard             | Appartement  | 120  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | NON         | Modeste              | Appartement  | 121  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | NON         | Précaire énergétique | Appartement  | 122  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | NON         | Standard             | Maison       | 105  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | NON         | Modeste              | Maison       | 102  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | NON         | Précaire énergétique | Maison       | 109  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | NON         | Standard             | Maison       | 110  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | NON         | Modeste              | Maison       | 115  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | NON         | Précaire énergétique | Maison       | 119  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H1   | N/A           | NON         | Standard             | Maison       | 120  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H2   | N/A           | NON         | Modeste              | Maison       | 121  |      |             |         |
      | BAR-TH-104 - pompe à chaleur de type air/eau ou eau/eau | H3   | N/A           | NON         | Précaire énergétique | Maison       | 122  |      |             |         |
