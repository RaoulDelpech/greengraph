#!/usr/bin/env python3
"""
Script pour ajouter des images aux définitions GreenGraph.
Utilise des images Wikimedia Commons (libres de droit, stables).
"""

import json
import os

# Mapping des images par catégorie et terme
# Format: { "terme_id": {"src": "url", "alt": "description", "credit": "source", "type": "photo|schema|logo"} }

IMAGES_ENERGIE_CLIMAT = {
    "changement-climatique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Global_Temperature_Anomaly.svg/800px-Global_Temperature_Anomaly.svg.png",
        "alt": "Anomalie de température mondiale depuis 1880",
        "credit": "NASA/GISS - Wikimedia Commons",
        "type": "schema",
        "legende": "Évolution des anomalies de température mondiale (1880-2023)"
    },
    "gaz-effet-serre": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Atmospheric_CO2_with_glacial_cycles.svg/800px-Atmospheric_CO2_with_glacial_cycles.svg.png",
        "alt": "Concentration atmosphérique de CO2 sur 800 000 ans",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "CO2 atmosphérique : cycles glaciaires et pic actuel sans précédent"
    },
    "empreinte-carbone": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Carbon_footprint_breakdown.svg/800px-Carbon_footprint_breakdown.svg.png",
        "alt": "Répartition de l'empreinte carbone par secteur",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Répartition typique d'une empreinte carbone"
    },
    "neutralite-carbone": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Net_zero_emissions.svg/800px-Net_zero_emissions.svg.png",
        "alt": "Schéma de la neutralité carbone",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Équilibre émissions-absorptions pour atteindre le net zéro"
    },
    "energie-renouvelable": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Renewable_energy_sources.svg/800px-Renewable_energy_sources.svg.png",
        "alt": "Sources d'énergies renouvelables",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Les principales sources d'énergie renouvelable"
    },
    "transition-energetique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Energy_transition.svg/800px-Energy_transition.svg.png",
        "alt": "Transition énergétique",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Du fossile au renouvelable"
    },
    "energie-fossile": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Oil_Pumpjack.jpg/800px-Oil_Pumpjack.jpg",
        "alt": "Pompe à pétrole (pumpjack)",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Extraction pétrolière - énergie fossile dominante"
    },
    "efficacite-energetique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Energy_efficiency_label.svg/400px-Energy_efficiency_label.svg.png",
        "alt": "Étiquette efficacité énergétique",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Étiquette énergie européenne"
    },
    "sobriete-energetique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Negawatt_logo.svg/400px-Negawatt_logo.svg.png",
        "alt": "Logo négaWatt",
        "credit": "Wikimedia Commons",
        "type": "logo",
        "legende": "Association négaWatt - pionnière de la sobriété"
    },
    "giec": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/IPCC_logo.svg/400px-IPCC_logo.svg.png",
        "alt": "Logo du GIEC/IPCC",
        "credit": "IPCC - Wikimedia Commons",
        "type": "logo",
        "legende": "Groupe d'experts intergouvernemental sur l'évolution du climat"
    },
    "adaptation-climatique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Flood_protection_barrier.jpg/800px-Flood_protection_barrier.jpg",
        "alt": "Barrière anti-inondation",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Infrastructure d'adaptation aux risques climatiques"
    },
    "attenuation-climatique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Wind_turbines_at_sunrise.jpg/800px-Wind_turbines_at_sunrise.jpg",
        "alt": "Éoliennes au lever du soleil",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Énergie renouvelable - levier d'atténuation"
    },
    "boucle-retroaction": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Climate_feedback_loops.svg/800px-Climate_feedback_loops.svg.png",
        "alt": "Schéma des boucles de rétroaction climatique",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Mécanismes d'amplification du réchauffement"
    },
    "point-basculement": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Tipping_points_in_the_climate_system.svg/800px-Tipping_points_in_the_climate_system.svg.png",
        "alt": "Points de basculement climatiques",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Éléments du système climatique à risque de basculement"
    }
}

IMAGES_BIODIVERSITE = {
    "biodiversite": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Biodiversity_wetland.jpg/800px-Biodiversity_wetland.jpg",
        "alt": "Zone humide riche en biodiversité",
        "credit": "Wikimedia Commons - CC BY-SA",
        "type": "photo",
        "legende": "Écosystème de zone humide illustrant la richesse du vivant"
    },
    "ecosysteme": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Food_web.svg/800px-Food_web.svg.png",
        "alt": "Réseau trophique d'un écosystème",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Interactions trophiques au sein d'un écosystème"
    },
    "erosion-biodiversite": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Biodiversity_loss.svg/800px-Biodiversity_loss.svg.png",
        "alt": "Graphique perte de biodiversité",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Déclin des populations animales sauvages"
    },
    "services-ecosystemiques": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ecosystem_services.svg/800px-Ecosystem_services.svg.png",
        "alt": "Services écosystémiques",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Les quatre catégories de services écosystémiques"
    },
    "corridors-ecologiques": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Wildlife_corridor.jpg/800px-Wildlife_corridor.jpg",
        "alt": "Corridor écologique",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Passage permettant la circulation de la faune"
    },
    "aire-protegee": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Protected_area.jpg/800px-Protected_area.jpg",
        "alt": "Aire protégée",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Parc national - zone de protection de la biodiversité"
    },
    "espece-envahissante": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Invasive_species.jpg/800px-Invasive_species.jpg",
        "alt": "Espèce envahissante",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Exemple d'espèce exotique envahissante"
    },
    "capital-naturel": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Natural_capital.svg/800px-Natural_capital.svg.png",
        "alt": "Capital naturel",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Stocks de ressources naturelles"
    }
}

IMAGES_ECONOMIE_CIRCULAIRE = {
    "economie-circulaire": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Circular_economy.svg/800px-Circular_economy.svg.png",
        "alt": "Schéma de l'économie circulaire",
        "credit": "Wikimedia Commons - CC BY-SA",
        "type": "schema",
        "legende": "Les boucles de valeur de l'économie circulaire"
    },
    "economie-lineaire": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Linear_economy.svg/800px-Linear_economy.svg.png",
        "alt": "Schéma économie linéaire",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Modèle extraire-produire-jeter"
    },
    "analyse-cycle-vie": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Life_cycle_assessment.svg/800px-Life_cycle_assessment.svg.png",
        "alt": "Analyse du cycle de vie",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Évaluation des impacts environnementaux du berceau à la tombe"
    },
    "ecoconception": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ecodesign.svg/800px-Ecodesign.svg.png",
        "alt": "Écoconception",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Intégration de l'environnement dès la conception"
    },
    "recyclage": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Recycling_symbol.svg/400px-Recycling_symbol.svg.png",
        "alt": "Symbole du recyclage",
        "credit": "Wikimedia Commons",
        "type": "logo",
        "legende": "Les trois flèches du recyclage"
    },
    "reemploi": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Reuse_symbol.svg/400px-Reuse_symbol.svg.png",
        "alt": "Symbole du réemploi",
        "credit": "Wikimedia Commons",
        "type": "logo",
        "legende": "Réutilisation des produits"
    }
}

IMAGES_DECHETS = {
    "zero-dechet": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zero_waste.svg/400px-Zero_waste.svg.png",
        "alt": "Logo zéro déchet",
        "credit": "Wikimedia Commons",
        "type": "logo",
        "legende": "Objectif zéro déchet"
    },
    "compostage": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Compost_bin.jpg/800px-Compost_bin.jpg",
        "alt": "Bac à compost",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Compostage des déchets organiques"
    },
    "methanisation": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Biogas_plant.jpg/800px-Biogas_plant.jpg",
        "alt": "Unité de méthanisation",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Production de biogaz par méthanisation"
    },
    "tri-selectif": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Recycling_bins.jpg/800px-Recycling_bins.jpg",
        "alt": "Poubelles de tri sélectif",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Conteneurs de tri sélectif"
    }
}

IMAGES_EAU = {
    "cycle-eau": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Water_cycle.svg/800px-Water_cycle.svg.png",
        "alt": "Cycle de l'eau",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Le cycle hydrologique naturel"
    },
    "stress-hydrique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Water_stress.svg/800px-Water_stress.svg.png",
        "alt": "Carte du stress hydrique mondial",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Régions sous stress hydrique"
    },
    "zone-humide": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Wetland.jpg/800px-Wetland.jpg",
        "alt": "Zone humide",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Écosystème de zone humide"
    },
    "eutrophisation": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Eutrophication.jpg/800px-Eutrophication.jpg",
        "alt": "Lac eutrophisé",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Prolifération d'algues due à l'eutrophisation"
    }
}

IMAGES_DEVELOPPEMENT_DURABLE = {
    "developpement-durable": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Sustainable_development.svg/800px-Sustainable_development.svg.png",
        "alt": "Piliers du développement durable",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Les trois piliers : économique, social, environnemental"
    },
    "odd": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Sustainable_Development_Goals.png/800px-Sustainable_Development_Goals.png",
        "alt": "Objectifs de Développement Durable",
        "credit": "ONU - Wikimedia Commons",
        "type": "logo",
        "legende": "Les 17 ODD de l'Agenda 2030"
    },
    "limites-planetaires": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Planetary_boundaries.svg/800px-Planetary_boundaries.svg.png",
        "alt": "Limites planétaires",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Les 9 limites planétaires (Rockström et al.)"
    },
    "greenwashing": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Greenwashing.svg/400px-Greenwashing.svg.png",
        "alt": "Illustration greenwashing",
        "credit": "Wikimedia Commons",
        "type": "illustration",
        "legende": "Écoblanchiment - communication trompeuse"
    },
    "rse": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/CSR_diagram.svg/800px-CSR_diagram.svg.png",
        "alt": "Schéma RSE",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Responsabilité Sociétale des Entreprises"
    }
}

IMAGES_FORETS_OCEANS = {
    "deforestation": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Deforestation_in_the_Amazon.jpg/800px-Deforestation_in_the_Amazon.jpg",
        "alt": "Déforestation en Amazonie",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Front de déforestation en forêt amazonienne"
    },
    "reforestation": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Reforestation.jpg/800px-Reforestation.jpg",
        "alt": "Plantation d'arbres",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Reforestation - restauration des forêts"
    },
    "recif-corallien": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Coral_reef_at_palmyra.jpg/800px-Coral_reef_at_palmyra.jpg",
        "alt": "Récif corallien",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Écosystème de récif corallien"
    },
    "mangrove": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Red_mangrove.jpg/800px-Red_mangrove.jpg",
        "alt": "Mangrove",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Forêt de mangrove - écosystème côtier"
    },
    "ocean-acidification": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Ocean_acidification.svg/800px-Ocean_acidification.svg.png",
        "alt": "Acidification des océans",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Mécanisme d'acidification des océans"
    },
    "plastique-ocean": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ocean_plastic.jpg/800px-Ocean_plastic.jpg",
        "alt": "Pollution plastique océanique",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Déchets plastiques dans l'océan"
    },
    "agroforesterie": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Agroforestry.jpg/800px-Agroforestry.jpg",
        "alt": "Parcelle agroforestière",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Culture associant arbres et productions agricoles"
    }
}

IMAGES_FINANCE_VERTE = {
    "finance-durable": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Green_finance.svg/800px-Green_finance.svg.png",
        "alt": "Finance durable",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Concept de finance durable"
    },
    "criteres-esg": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/ESG_criteria.svg/800px-ESG_criteria.svg.png",
        "alt": "Critères ESG",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Environnement, Social, Gouvernance"
    },
    "obligation-verte": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Green_bond.svg/400px-Green_bond.svg.png",
        "alt": "Obligation verte",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Financement de projets environnementaux"
    },
    "credit-carbone": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Carbon_credit.svg/800px-Carbon_credit.svg.png",
        "alt": "Crédit carbone",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Marché des quotas d'émission"
    }
}

IMAGES_DROIT_ENVIRONNEMENT = {
    "accord-paris": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Paris_Agreement.svg/800px-Paris_Agreement.svg.png",
        "alt": "Accord de Paris",
        "credit": "Wikimedia Commons",
        "type": "logo",
        "legende": "Accord climatique de 2015"
    },
    "ecocide": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Stop_ecocide.svg/400px-Stop_ecocide.svg.png",
        "alt": "Stop écocide",
        "credit": "Wikimedia Commons",
        "type": "logo",
        "legende": "Campagne pour la reconnaissance de l'écocide"
    },
    "convention-biodiversite": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/CBD_logo.svg/400px-CBD_logo.svg.png",
        "alt": "Logo CBD",
        "credit": "Convention on Biological Diversity",
        "type": "logo",
        "legende": "Convention sur la diversité biologique"
    }
}

IMAGES_TECHNOLOGIES_VERTES = {
    "energie-solaire-photovoltaique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Solar_panels.jpg/800px-Solar_panels.jpg",
        "alt": "Panneaux solaires",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Installation photovoltaïque"
    },
    "eolien": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Wind_turbines_at_sunrise.jpg/800px-Wind_turbines_at_sunrise.jpg",
        "alt": "Éoliennes",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Parc éolien terrestre"
    },
    "hydrogene-vert": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Hydrogen_electrolyzer.jpg/800px-Hydrogen_electrolyzer.jpg",
        "alt": "Électrolyseur hydrogène",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Production d'hydrogène par électrolyse"
    },
    "vehicule-electrique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Electric_car_charging.jpg/800px-Electric_car_charging.jpg",
        "alt": "Véhicule électrique en charge",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Recharge d'un véhicule électrique"
    },
    "pompe-chaleur": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Heat_pump.jpg/800px-Heat_pump.jpg",
        "alt": "Pompe à chaleur",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Unité extérieure de pompe à chaleur"
    },
    "smart-grid": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Smart_grid.svg/800px-Smart_grid.svg.png",
        "alt": "Réseau intelligent",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Architecture d'un smart grid"
    },
    "geothermie": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Geothermal_power_plant.jpg/800px-Geothermal_power_plant.jpg",
        "alt": "Centrale géothermique",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Exploitation de la chaleur terrestre"
    },
    "batterie-lithium": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lithium_battery.jpg/800px-Lithium_battery.jpg",
        "alt": "Batterie lithium-ion",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Cellules de batteries lithium-ion"
    }
}

IMAGES_AGRICULTURE = {
    "agroecologie": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Agroecology_farm.jpg/800px-Agroecology_farm.jpg",
        "alt": "Ferme agroécologique",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Pratiques agroécologiques diversifiées"
    },
    "agriculture-biologique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Organic_farming.jpg/800px-Organic_farming.jpg",
        "alt": "Agriculture biologique",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Culture sans pesticides ni engrais chimiques"
    },
    "permaculture": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Permaculture_garden.jpg/800px-Permaculture_garden.jpg",
        "alt": "Jardin en permaculture",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Design inspiré des écosystèmes naturels"
    },
    "souverainete-alimentaire": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Local_food.jpg/800px-Local_food.jpg",
        "alt": "Marché local",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Circuits courts et production locale"
    },
    "agriculture-regenerative": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Cover_crops.jpg/800px-Cover_crops.jpg",
        "alt": "Cultures de couverture",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Régénération des sols par les couverts végétaux"
    }
}

IMAGES_URBANISME = {
    "ville-durable": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sustainable_city.jpg/800px-Sustainable_city.jpg",
        "alt": "Ville durable",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Aménagement urbain durable"
    },
    "mobilite-douce": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Bicycle_lane.jpg/800px-Bicycle_lane.jpg",
        "alt": "Piste cyclable",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Infrastructure de mobilité douce"
    },
    "ilot-chaleur-urbain": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Urban_heat_island.svg/800px-Urban_heat_island.svg.png",
        "alt": "Îlot de chaleur urbain",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Différence de température ville-campagne"
    },
    "vegetalisation-urbaine": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Green_roof.jpg/800px-Green_roof.jpg",
        "alt": "Toit végétalisé",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Végétalisation des toitures urbaines"
    },
    "transport-collectif": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Tramway.jpg/800px-Tramway.jpg",
        "alt": "Tramway",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Transport en commun électrique"
    }
}

IMAGES_POLLUTION = {
    "pollution-air": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Air_pollution.jpg/800px-Air_pollution.jpg",
        "alt": "Pollution de l'air",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Smog urbain dû à la pollution atmosphérique"
    },
    "pollution-plastique": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ocean_plastic.jpg/800px-Ocean_plastic.jpg",
        "alt": "Pollution plastique",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Déchets plastiques dans l'environnement"
    },
    "perturbateur-endocrinien": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Endocrine_disruptors.svg/800px-Endocrine_disruptors.svg.png",
        "alt": "Perturbateurs endocriniens",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Sources et effets des perturbateurs endocriniens"
    },
    "qualite-air": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Air_quality_index.svg/800px-Air_quality_index.svg.png",
        "alt": "Indice de qualité de l'air",
        "credit": "Wikimedia Commons",
        "type": "schema",
        "legende": "Échelle de qualité de l'air"
    },
    "depollution": {
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Phytoremediation.jpg/800px-Phytoremediation.jpg",
        "alt": "Phytoremédiation",
        "credit": "Wikimedia Commons",
        "type": "photo",
        "legende": "Dépollution des sols par les plantes"
    }
}

ALL_IMAGES = {
    "energie-climat": IMAGES_ENERGIE_CLIMAT,
    "biodiversite": IMAGES_BIODIVERSITE,
    "economie-circulaire": IMAGES_ECONOMIE_CIRCULAIRE,
    "dechets": IMAGES_DECHETS,
    "eau": IMAGES_EAU,
    "developpement-durable": IMAGES_DEVELOPPEMENT_DURABLE,
    "forets-oceans": IMAGES_FORETS_OCEANS,
    "finance-verte": IMAGES_FINANCE_VERTE,
    "droit-environnement": IMAGES_DROIT_ENVIRONNEMENT,
    "technologies-vertes": IMAGES_TECHNOLOGIES_VERTES,
    "agriculture-alimentation": IMAGES_AGRICULTURE,
    "urbanisme-durable": IMAGES_URBANISME,
    "pollution": IMAGES_POLLUTION
}

def add_images_to_category(category_file, images_dict):
    """Ajoute les images aux définitions d'une catégorie."""
    with open(category_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    modified = False
    for definition in data.get('definitions', []):
        term_id = definition.get('id')
        if term_id in images_dict and 'image' not in definition:
            definition['image'] = images_dict[term_id]
            modified = True
            print(f"  + Image ajoutée pour: {term_id}")

    if modified:
        with open(category_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  -> Fichier mis à jour: {category_file}")

    return modified

def main():
    """Ajoute les images à toutes les catégories."""
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    categories_path = os.path.join(base_path, 'public', 'data', 'categories')

    print("Ajout des images aux définitions GreenGraph")
    print("=" * 50)

    for category_id, images_dict in ALL_IMAGES.items():
        category_file = os.path.join(categories_path, f"{category_id}.json")
        if os.path.exists(category_file):
            print(f"\nTraitement: {category_id}")
            add_images_to_category(category_file, images_dict)
        else:
            print(f"\n[!] Fichier non trouvé: {category_file}")

    print("\n" + "=" * 50)
    print("Terminé!")

if __name__ == "__main__":
    main()
