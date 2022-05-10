Feature: Simulation sur l OS BAR-EN-104

  BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant

  @Simulateur
    @focus
  Scenario: Connexion à ProCee
    Given Je me connecte à ProCee
  @Simulateur
    @focus
  Scenario Outline: Simulation sur l OS BAR-EN-104 en zone <Zone>, Energie <EnergieChauff>, CDP <CoupDePouce> et Revenus <Precarite>
    When Redirection vers Simulateur ProCee
    Then Simulation sur l OS "<OS>""<Zone>""<EnergieChauff>""<CoupDePouce>""<Precarite>""<TypeLogement>""<ETAS>""<SCOP>""<TypeInstall>""<TypeVMC>"
    Examples:
      | OS                                                                  | Zone | EnergieChauff | CoupDePouce | Precarite            | TypeLogement | ETAS | SCOP | TypeInstall | TypeVMC |
      | BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant | H1   | Electricite   | N/A         | Précaire énergétique |              |      |      |             |         |
      | BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant | H2   | Electricite   | N/A         | Modeste              |              |      |      |             |         |
      | BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant | H3   | Electricite   | N/A         | Standard             |              |      |      |             |         |
      | BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant | H1   | Combustible   | N/A         | Précaire énergétique |              |      |      |             |         |
      | BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant | H2   | Combustible   | N/A         | Modeste              |              |      |      |             |         |
      | BAR-EN-104 - Fenêtre ou porte-fenêtre complète avec vitrage isolant | H3   | Combustible   | N/A         | Standard             |              |      |      |             |         |
