Feature: Simulation sur l OS BAR-TH-129

  BAR-TH-129 - Pompe à chaleur de type air/air

  @Simulateur
    @focus
  Scenario: Connexion au BO
    Given Je me suis connecte au BO
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-TH-129 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection Simulateur
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                           | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H1   | N/A           | N/A         | Précaire énergétique | Appartement  |      | 3,9  |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H2   | N/A           | N/A         | Modeste              | Appartement  |      | 4    |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H3   | N/A           | N/A         | Standard             | Appartement  |      | 5    |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H1   | N/A           | N/A         | Précaire énergétique | Maison       |      | 4    |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H2   | N/A           | N/A         | Modeste              | Maison       |      | 4,1  |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H3   | N/A           | N/A         | Standard             | Maison       |      | 4,2  |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H1   | N/A           | N/A         | Précaire énergétique | Maison       |      | 4,3  |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H2   | N/A           | N/A         | Modeste              | Maison       |      | 5    |             |         |
      | BAR-TH-129 - Pompe à chaleur de type air/air | H3   | N/A           | N/A         | Standard             | Maison       |      | 6    |             |         |
