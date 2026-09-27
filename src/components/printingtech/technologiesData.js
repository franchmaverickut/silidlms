const IMG_BASE = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/";

export const TECHNOLOGIES = [
  {
    number: 1,
    name: "FFF — Fused Filament Fabrication",
    tagline: "Melting plastic filament and depositing it layer by layer",
    howItWorks:
      "FFF melts a plastic filament and pushes it through a heated nozzle. The material is deposited onto the print bed layer by layer, where it cools and solidifies. Additional layers are added until the object is complete. Support material may be added for overhangs and removed or dissolved after printing.",
    diagramUrl: IMG_BASE + "3eba9aeba_FFF.png",
    videoId: "R-a7skMoiKw",
    materials: [
      "PLA – Easy to print, inexpensive, ideal for prototypes and educational models.",
      "ABS – Tough and more heat-resistant than PLA; commonly used for functional parts.",
      "PET-G – Strong, durable, and relatively easy to print.",
      "Nylon – Strong, flexible, and wear-resistant; useful for mechanical components.",
      "TPU – Flexible and rubber-like; suitable for flexible parts.",
      "Polycarbonate (PC) – High strength, impact resistance, and heat resistance.",
      "Metal/Plastic Composites – Plastic filament containing metal or other reinforcing particles.",
      "PVA – Water-soluble material mainly used for removable supports.",
    ],
    applications: [
      "Rapid prototyping",
      "Product and concept models",
      "Functional components with moderate mechanical requirements",
      "Educational and demonstration models",
      "Jigs and fixtures",
      "Customized and low-volume parts",
    ],
    benefits: [
      "Relatively low-cost printers and materials",
      "Easy to learn and operate",
      "Wide variety of available materials",
      "Fast and economical for prototypes",
      "Minimal post-processing for simple parts",
      "Material and color can easily be changed",
    ],
    limitations: [
      "Visible layer lines, resulting in lower surface quality.",
      "Anisotropic strength — parts are generally weaker between printed layers.",
      "Overhangs may require support structures.",
      "Dimensional accuracy and fine detail can be lower than resin-based printing.",
      "Mechanical performance depends heavily on print orientation, temperature, infill, and layer adhesion.",
    ],
    keyLearnings: [
      "FFF creates objects by depositing melted thermoplastic layer by layer.",
      "It is affordable, accessible, and versatile for prototypes and functional parts.",
      "Its major weaknesses are visible layers and weaker interlayer bonding.",
    ],
  },
  {
    number: 2,
    name: "SLA / DLP — Stereolithography / Digital Light Processing",
    tagline: "UV-cured resin for ultra-high detail",
    howItWorks:
      "SLA and DLP 3D printers work in a very similar way. A light source is directed onto a vat of photopolymer resin via a mirror, which cures/hardens the resin to create one layer of an object. After a layer hardens, the print bed moves upwards, creating space to form the next layer. This process is repeated until the object is complete. SLA machines trace the layer's area with a laser, whereas DLP machines shine a single projector image to cure a whole layer at one time.",
    diagramUrl: IMG_BASE + "c605d3985_SLA.png",
    videoId: "CNdqu3C9UAk",
    materials: [
      "Standard resin",
      "Tough resin",
      "Flexible resin",
      "Clear resin",
      "Dental resin",
    ],
    applications: [
      "Dental/medical products",
      "Jewellery",
      "High-detail prototyping",
      "Fashion/consumer products",
    ],
    benefits: [
      "High accuracy and precision",
      "Extremely smooth surface finish",
    ],
    limitations: [
      "Standard resins can be fragile and low in strength",
      "Long exposure to sunlight can degrade models",
      "Post-print curing process required",
    ],
    keyLearnings: [
      "SLA/DLP uses a light source to cure liquid photopolymer resin layer by layer.",
      "It produces extremely smooth, high-detail surfaces ideal for dental and jewellery applications.",
      "Parts can be brittle and require post-print curing and careful handling.",
    ],
  },
  {
    number: 3,
    name: "SLS — Selective Laser Sintering",
    tagline: "Laser-fused powder for functional, support-free parts",
    howItWorks:
      "SLS machines consist of a build chamber filled with powdered plastic. Once preheated to just below the powder's melting point, a laser scans across the top surface of the powder, fusing the powder together to create a solid layer. The z-axis then moves down and another coat of powder is spread evenly across by a roller/recoater. The process is repeated until the object is complete, at which point it is left to cool before being cleaned and blasted with compressed air to obtain the final part.",
    diagramUrl: IMG_BASE + "bc26eed67_SLS.png",
    videoId: "jCb8AOMzxWk",
    materials: [
      "Nylon",
      "Polypropylene",
      "TPU",
    ],
    applications: [
      "Small production runs",
      "Medical devices",
      "Functional parts (automotive, aerospace etc)",
      "Functional prototyping",
    ],
    benefits: [
      "No support material required",
      "Build chamber can be 'filled' with multiple parts",
      "Can achieve strong and complex parts",
    ],
    limitations: [
      "Grainy surface finish",
      "Post-processing (cooling/cleaning) time",
      "Expensive equipment",
    ],
    keyLearnings: [
      "SLS fuses powdered plastic with a laser, requiring no support structures.",
      "It produces strong, complex functional parts suitable for batch production.",
      "Parts have a grainy surface and require cooling and cleaning post-processing.",
    ],
  },
  {
    number: 4,
    name: "Material Jetting",
    tagline: "Inkjet-style printing for multi-material and full-colour parts",
    howItWorks:
      "Similarly to 2D inkjet printers, material jetting involves a print head spraying droplets of liquid resin onto a print bed in a single pass on the x-axis. A UV light source simultaneously cures/hardens the droplets, forming a solid layer. The print bed then moves downwards and the process is repeated until the object is complete. A key benefit of material jetting is the ability to print in multiple materials, such as dissolvable support material for overhanging features, as well as the ability to print in full colour.",
    diagramUrl: IMG_BASE + "c623c713e_MaterialJetting.jpg",
    videoId: "2JkoR3iK7_k",
    materials: [
      "Standard resin",
      "Tough resin",
      "Flexible resin",
      "Clear resin",
      "Dental resin",
      "Castable wax",
    ],
    applications: [
      "Full colour prototypes",
      "Medical models (e.g. replica organs for education)",
      "Injection molds/casting patterns",
    ],
    benefits: [
      "Extremely smooth surface and high accuracy",
      "Ability to print multiple materials",
      "Ability to print full colour models",
      "One of the fastest 3D printing technologies",
    ],
    limitations: [
      "Standard resins can be fragile and low in strength",
      "Long exposure to sunlight can degrade models",
      "Generally small build volume",
      "High cost of machines and materials",
    ],
    keyLearnings: [
      "Material jetting sprays liquid resin droplets cured by UV light in a single pass.",
      "It enables multi-material and full-colour printing in a single build.",
      "It offers excellent surface finish but at high cost with limited build volume.",
    ],
  },
  {
    number: 5,
    name: "Binder Jetting",
    tagline: "Inkjet binder on powder bed — fast and scalable",
    howItWorks:
      "Binder jetting 3D printers consist of a build chamber filled with powdered material. A print head deposits a liquid 'glue-like' binding agent onto the powder, fusing particles together to form a solid layer. In some cases, machines have an additional print head that coats powder in colour droplets, allowing for full colour prints. The z-axis then moves down and another coat of powder is spread evenly across by a roller/recoater. The process is repeated until the object is complete, at which point it is left to cure before being cleaned and blasted with compressed air. Metal parts must also go through additional post-processing techniques such as sintering or bronze infiltration.",
    diagramUrl: IMG_BASE + "349b34d50_binderjetting.jpg",
    videoId: "gwHcDjeOIxc",
    materials: [
      "Metals (steel, titanium, alloys)",
      "Ceramics",
      "Sand",
    ],
    applications: [
      "Complex and large molds",
      "Full colour prototypes",
    ],
    benefits: [
      "Extremely cost effective",
      "Large build volumes available",
      "Complex geometries – no support required",
      "No heat involved – no warping effects",
      "Unused powder is 100% recyclable",
    ],
    limitations: [
      "High porosity – poor mechanical properties",
      "Limited material options",
    ],
    keyLearnings: [
      "Binder jetting uses a liquid binding agent to fuse powder particles together.",
      "It enables large, complex, full-colour parts without support structures.",
      "Metal parts require additional sintering or infiltration post-processing.",
    ],
  },
  {
    number: 6,
    name: "DMLS / SLM — Direct Metal Laser Sintering / Selective Laser Melting",
    tagline: "Laser-fused metal powder for high-performance parts",
    howItWorks:
      "DMLS and SLM machines consist of a build chamber filled with powdered metal. Once preheated, a laser scans across the top surface of the powder, fusing the powder together to create a solid layer. The z-axis then moves down and another coat of powder is spread evenly across by a roller/recoater. The process is repeated until the object is complete, at which point it is left to cool. Post-processing may involve manually removing support material, heat treatment and machining. DMLS and SLM use the exact same process with the exception that SLM works with pure metals (at a higher temperature that melts the powder) and DMLS works with metal alloys (at a lower temperature that fuses the powder).",
    diagramUrl: IMG_BASE + "73813fa41_DMLS.jpg",
    videoId: "lnYR0lJuaQE",
    materials: [
      "Stainless steel",
      "Titanium",
      "Aluminium alloys",
      "Cobalt chrome",
      "Nickel superalloys (Inconel)",
    ],
    applications: [
      "Aerospace structural parts",
      "Medical implants",
      "Tooling inserts",
      "High-performance motorsport parts",
      "Custom surgical instruments",
    ],
    benefits: [
      "Full-density metal parts",
      "Complex internal geometries (e.g. cooling channels)",
      "High strength-to-weight ratio",
      "Eliminates traditional tooling",
    ],
    limitations: [
      "Very high machine and operating cost",
      "Requires support structures (metal, hard to remove)",
      "Post-processing (heat treatment, machining)",
      "Specialist operators needed",
    ],
    keyLearnings: [
      "DMLS/SLM fuses powdered metal with a laser to create full-density metal parts.",
      "SLM fully melts pure metals; DMLS fuses metal alloys at a lower temperature.",
      "It enables complex, high-performance metal parts but at high cost with significant post-processing.",
    ],
  },
];

export const QUIZ_QUESTIONS = [
  {
    q: "A company requires a 3D printer for in-house prototyping of plastic casing units that hold electrical components. They would like a workflow that does not require post-processing.",
    options: ["DMLS/SLM", "FFF", "Binder Jetting"],
    correct: 1,
  },
  {
    q: "A dental company would like to use 3D printing technology to create a more efficient workflow for creating strong metal-alloy dental crowns.",
    options: ["FFF", "DMLS/SLM", "SLS"],
    correct: 1,
  },
  {
    q: "A medical research institution is looking to produce visual models of organs for educational purposes. They require full colour functionality for highly complex models.",
    options: ["DMLS/SLM", "SLA/DLP", "Material Jetting"],
    correct: 2,
  },
  {
    q: "A hearing aid manufacturer is looking to modernise their production by 3D scanning ear impressions before 3D printing hearing aids. An extremely smooth photopolymer surface finish is required.",
    options: ["DMLS/SLM", "Binder Jetting", "SLA/DLP"],
    correct: 2,
  },
  {
    q: "A security organisation is manufacturing complex drone chassis parts. The parts must be made of a rubber-like material and a batch of 1000 is required on a monthly basis.",
    options: ["SLS", "Material Jetting", "Binder Jetting"],
    correct: 0,
  },
  {
    q: "A startup architecture firm is looking for a low-cost 3D printer to develop architectural scale models of their concepts to present to clients.",
    options: ["DMLS/SLM", "FFF", "SLS"],
    correct: 1,
  },
  {
    q: "A custom truck manufacturer requires complex 3D printed molds to be used in the production of very large engine parts.",
    options: ["Binder Jetting", "SLA/DLP", "DMLS/SLM"],
    correct: 0,
  },
  {
    q: "A chain of orthodontists require 3D printers to create highly detailed and smooth dental models, which will be used to create clear aligners through a thermoforming process.",
    options: ["SLA/DLP", "FFF", "DMLS/SLM"],
    correct: 0,
  },
  {
    q: "A sports wearables company has developed a new smart watch. They are producing custom multi-colour watch straps for their customers and need fast 3D printers to keep up with demand.",
    options: ["FFF", "SLS", "Material Jetting"],
    correct: 2,
  },
  {
    q: "A jewellery brand is looking to produce a necklace collection with highly complex geometries that are unable to be produced using traditional methods. A solid silver material is required for the pieces.",
    options: ["Binder Jetting", "DMLS/SLM", "FFF"],
    correct: 1,
  },
  {
    q: "An eyewear company is exploring the use of 3D printed frames with screwless hinges for their sunglasses collection. They require a 3D printing technology that uses nylon material.",
    options: ["SLS", "DMLS/SLM", "Binder Jetting"],
    correct: 0,
  },
  {
    q: "A hobbyist is developing a new board game business and requires tiny figurines 3D printing, which will feature in games. The figurines will be painted so full-colour is not required.",
    options: ["Binder Jetting", "Material Jetting", "SLA/DLP"],
    correct: 2,
  },
];