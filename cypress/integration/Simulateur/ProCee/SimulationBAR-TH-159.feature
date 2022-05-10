Feature: Simulation sur l OS BAR-TH-159

  BAR-TH-159 - Pompe à chaleur hybride individuelle

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-159 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | OUI         | Précaire énergétique | Appartement  | 1    |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | OUI         | Modeste              | Appartement  | 1    |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | OUI         | Standard             | Appartement  | 1    |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | OUI-v2      | Précaire énergétique | Appartement  | 1    |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | OUI-v2      | Modeste              | Appartement  | 1    |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | OUI-v2      | Standard             | Appartement  | 1    |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Appartement  | 111  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Appartement  | 114  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Appartement  | 119  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Appartement  | 120  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Appartement  | 125  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Appartement  | 129  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Appartement  | 130  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Appartement  | 135  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Appartement  | 139  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Appartement  | 140  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Appartement  | 141  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Appartement  | 149  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Appartement  | 150  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Appartement  | 155  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Appartement  | 159  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Appartement  | 160  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Appartement  | 170  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Appartement  | 175  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Maison       | 111  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Maison       | 114  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Maison       | 119  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Maison       | 120  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Maison       | 125  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Maison       | 129  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Maison       | 130  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Maison       | 135  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Maison       | 139  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Maison       | 140  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Maison       | 141  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Maison       | 149  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Maison       | 150  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Maison       | 155  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Maison       | 159  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H1   | N/A           | NON         | Précaire énergétique | Maison       | 160  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H2   | N/A           | NON         | Modeste              | Maison       | 170  |      |             |         |
      | BAR-TH-159 - Pompe à chaleur hybride individuelle | H3   | N/A           | NON         | Standard             | Maison       | 175  |      |             |         |







