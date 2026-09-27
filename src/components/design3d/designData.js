export const COURSE_INFO = {
  title: "Designing for 3D Printing",
  category: "Mini Courses",
  tagline: "Core design principles for FFF 3D printing",
  description:
    "In this short online course, you'll learn the core design principles for FFF (Fused Filament Fabrication) 3D printing. Through real CAD examples, you'll see how and why designs succeed or fail when printed. This course focuses on design rather than slicer settings, with all examples using standard settings to highlight the impact of design decisions. Each section focuses on a key principle, helping you understand how to design parts that print reliably and perform as intended.",
  followMethods: [
    {
      icon: "video",
      text: "You can simply watch the videos to understand the core design principles for 3D printing. Each section uses real CAD examples to show how and why designs succeed or fail.",
    },
    {
      icon: "printer",
      text: "For a more hands-on experience, you can also 3D print the demo model set and explore the principles physically as you progress through the course.",
    },
    {
      icon: "book",
      text: "Once you've completed the course, the Design Principles Guide can be used as a quick reference when designing your own models.",
    },
  ],
  modelSet: {
    title: "Design Principles Model Set",
    description:
      "A set of test models demonstrating key 3D printing principles such as overhangs, bridging and tolerance. Print and refer to them as you work through the course to see how each principle behaves in real life. Includes 30 mm (recommended) and 60 mm versions. The 60 mm models match the videos but do not include the base.",
    downloadUrl:
      "https://media.base44.com/files/public/69d386ad9523e2ce04536574/66dc7b894_Design-Principles-Demo-Model-Set.zip",
  },
};

export const SECTIONS = [
  {
    number: 1,
    title: "Overhangs",
    intro:
      "An overhang is any part of a 3D model that extends outward, with little or no material beneath it to support it during printing.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/78fc6693b_1-Overhangsf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, take a closer look at the overhang cube. Compare the surface quality across different angles and observe where the print begins to struggle.",
      topTip:
        "Try to minimise overhangs above 45 degrees when designing for FFF 3D printing. This helps reduce the need for support material and improves surface quality.",
      designTradeoffs:
        "Overhangs greater than 45 degrees can still be printed depending on the part and print settings. In some cases, it may be acceptable to sacrifice surface quality to reduce support material or simplify the design.",
      goFurther:
        "Reducing the nozzle temperature and print speed can help improve overhang quality by limiting sagging.",
    },
    keyLearnings: [
      {
        title: "The steeper the overhang angle, the worse the surface quality",
        description:
          "As the angle increases, each new layer has less material beneath it for support, often leading to sagging and rough undersides. As a general rule, aim to keep overhangs at 45° or less where possible.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a895f4233_1-Overhangs-Thesteepertheoverhangangletheworsethesurfacequality.png",
      },
      {
        title: "Splitting and reorienting parts is a common workaround",
        description:
          "By changing the orientation or breaking a model into multiple parts, overhangs can be reduced or eliminated. This allows each part to print cleanly without relying on support material.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/fe142c465_1-Overhangs-Splittingandreorientingpartsisacommonworkaround.png",
      },
      {
        title: "Support material can be used, but it has trade-offs",
        description:
          "Supports can hold up overhangs during printing and are broken off after printing, but increase print time and material use. They can also leave marks or rough surfaces when removed, reducing the final finish quality.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4d18ddc27_1-Overhangs-Supportmaterialcanbeusedbutithastrade-offs.png",
      },
    ],
  },
  {
    number: 2,
    title: "Bridging",
    intro:
      "A bridge is a horizontal span between two supported points, with no material beneath it during printing.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/29687df6b_2-Bridgingf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, take a closer look at the bridging cube. Compare the underside across different distances and observe how the filament behaves as the span increases.",
      topTip:
        "Keep bridges as short as possible, ideally under 12 mm. Shorter spans reduce sagging and produce cleaner undersides.",
      designTradeoffs:
        "Longer bridges can still be used where surface quality is not critical. In many cases, the top surface remains clean while the underside shows imperfections, so design decisions often depend on visibility, fit and function.",
      goFurther:
        "Increasing cooling and reducing print speed can help improve bridging by allowing the filament to solidify more quickly as it spans the gap.",
    },
    keyLearnings: [
      {
        title: "The longer the bridge span, the more the filament will sag",
        description:
          "As the distance between supports increases, sagging becomes more pronounced, leading to rough undersides. Aim to keep bridges under 12mm where possible, unless surface quality or fit is not critical.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/5a48ef750_2-Bridging-Thelongerthebridgespanthemorethefilamentwillsag.png",
      },
      {
        title: "Bridging mainly affects the underside of a print",
        description:
          "The top surface is usually supported by subsequent layers and often appears clean and well formed. Any roughness caused by bridging is typically limited to the underside of the span.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/7aa61e65d_2-Bridging-Bridgingmainlyaffectstheundersideofaprint.png",
      },
      {
        title: "Bridges are often better than steep overhangs",
        description:
          "A horizontal bridge can span a gap more cleanly than a steep overhang can print without support. Where possible, use bridging instead of steep angles to improve print quality.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/63a0ea604_2-Bridging-Bridgesareoftenbetterthansteepoverhangs.png",
      },
    ],
  },
  {
    number: 3,
    title: "Minimum Features",
    intro:
      "Minimum features refer to the smallest details a 3D printer can reliably produce, such as thin walls or fine surface details.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/c0425701b_3-MinimumFeaturesf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, take a closer look at the minimum features cube. Try gently bending the thinner walls to compare their strength, and run your finger over the embossed and engraved features to feel how clarity improves as the size increases. Notice which details print clearly and which begin to disappear.",
      topTip:
        "Design features to be at least twice the nozzle diameter. For most desktop 3D printers, this means a minimum of around 0.8 mm for reliable results. Where possible, use multiples of the nozzle size to improve consistency.",
      designTradeoffs:
        "Small features can be very useful for visual elements such as text or patterns. However, they are often less reliable and more fragile, so they are not well suited to functional parts where strength and durability are important.",
      goFurther:
        "Using a smaller nozzle can improve the resolution of fine details, allowing smaller features to print more clearly. However, this increases print time and may reduce strength.",
    },
    keyLearnings: [
      {
        title: "Minimum feature size is determined by nozzle diameter",
        description:
          "The printer lays down plastic in lines, typically around 0.4mm wide on most desktop machines. Features smaller than this are at the absolute limit and may not print reliably.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/75f7b2775_3-MinimumFeatures-Minimumfeaturesizeisdeterminedbynozzlediameter.png",
      },
      {
        title: "Aim for features of at least 0.8 mm or larger",
        description:
          "Designing at around twice the nozzle diameter allows multiple lines of material, improving strength and consistency. Features closer to the minimum are more fragile and less predictable.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/414fadab2_3-MinimumFeatures-Aimforfeaturesofatleast08mmorlarger.png",
      },
      {
        title: "Engraved details can be smaller than raised features",
        description:
          "Engraving creates gaps between printed lines rather than adding thin lines of material, allowing finer details to appear. However, designing too close to the limit can still reduce reliability.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e76825798_3-MinimumFeatures-Engraveddetailscanbesmallerthanraisedfeatures.png",
      },
    ],
  },
  {
    number: 4,
    title: "Orientation",
    intro:
      "Orientation refers to how a 3D model is positioned on the build plate during printing.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/562f99eb1_4-Orientationf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, compare this model to the original overhang cube from earlier in the course. Notice how rotating the part changes which faces require support, and try bending the thin fins to feel how strength varies depending on layer direction.",
      topTip:
        "Think about orientation early in the design process. Choosing the right orientation can reduce the need for support material and improve both print quality and strength.",
      designTradeoffs:
        "A single design can often be printed in multiple orientations, each with different advantages. Some orientations may reduce supports, while others improve strength or surface quality, so decisions often involve balancing these factors.",
      goFurther:
        "Most slicers allow you to preview layer direction and identify areas that may need support. Use these tools to test different orientations before printing.",
    },
    keyLearnings: [
      {
        title: "Orientation can be used to increase contact with the build plate",
        description:
          "Placing a larger, flatter face on the build plate improves adhesion and reduces the risk of the print detaching. Small or narrow contact areas are less stable and more likely to fail.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/bcf8790cf_4-Orientation-Orientationcanbeusedtoincreasecontactwiththebuildplate.png",
      },
      {
        title: "Changing orientation can reduce overhangs and supports",
        description:
          "By considering overhangs during the design process, you can rotate parts to turn unsupported features into supported ones. This allows models to print cleanly without support material, improving surface quality and efficiency.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/cf74f9d50_4-Orientation-Changingorientationcanreduceoverhangsandsupports.png",
      },
      {
        title: "Parts are stronger along the direction of the layers",
        description:
          "Because parts are built layer by layer, they are strongest along the layers and weaker between them. This is similar to wood grain, which is harder to break along the grain than across it.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/96c96b84a_4-Orientation-Partsarestrongeralongthedirectionofthelayers.png",
      },
    ],
  },
  {
    number: 5,
    title: "Fillets",
    intro:
      "A fillet is the rounding of an interior or exterior corner where two features meet. It creates a smooth, curved transition between surfaces.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/b9285f08a_5-Filletsf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, examine the different fillets on the cube. Compare how fillets behave depending on their position, and run your finger over each to feel differences in surface quality and smoothness.",
      topTip:
        "Use fillets to improve both strength and appearance, but consider their position and orientation. Vertical fillets tend to print cleanly, while underside fillets can behave like overhangs.",
      designTradeoffs:
        "Fillets can improve strength and create smoother, more refined forms, but their effectiveness depends on how they are positioned. Larger fillets may look better visually, but can introduce overhang issues or visible stair stepping in certain areas.",
      goFurther:
        "Reducing layer height can improve the appearance of curved surfaces by minimising the stair stepping effect.",
    },
    keyLearnings: [
      {
        title: "Fillets on undersides behave like overhangs",
        description:
          "When placed on downward-facing edges, fillets have no support beneath them and can sag during printing. Keep these fillets small to reduce overhang angles and improve surface quality.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/905c45321_5-Fillets-Filletsonundersidesbehavelikeoverhangs.png",
      },
      {
        title: "Internal fillets improve strength and print reliably",
        description:
          "Adding a radius to internal corners spreads stress more evenly and reduces weak points. These fillets are usually well supported during printing and produce consistent results.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/da54b7efb_5-Fillets-Internalfilletsimprovestrengthandprintreliably.png",
      },
      {
        title: "Fillet quality depends on their orientation",
        description:
          "Vertical fillets print as smooth curves, while horizontal fillets are built in layers and may show visible stepping. Choosing the right orientation can improve both appearance and performance.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/40fe91de1_5-Fillets-Filletqualitydependsontheirorientation.png",
      },
    ],
  },
  {
    number: 6,
    title: "Chamfers",
    intro:
      "A chamfer is an angled face added where two surfaces meet. It replaces a sharp edge with a flat, angled transition.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/944f27b68_6-Chamfersf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, examine the different chamfers on the cube. Compare how they behave in different positions, and run your finger along the edges to feel how the angled surfaces transition between faces.",
      topTip:
        "Use chamfers around 45 degrees to create reliable, support-free transitions. They are especially useful on bottom and underside edges where overhangs would normally occur.",
      designTradeoffs:
        "Chamfers are highly reliable and easy to print, but they create sharper, more angular forms compared to fillets. While fillets are often better for strength and comfort, chamfers are usually the safer choice for support-free printing.",
      goFurther:
        "Elephant's foot can be reduced through first layer settings, but designing chamfers into bottom edges is often a more reliable and consistent solution.",
    },
    keyLearnings: [
      {
        title: "Chamfers can improve strength and print reliably",
        description:
          "They reduce sharp corners and help spread stress through a part, improving durability, although not to the same extent as fillets. They are also more predictable to print, especially on underside edges, as they are typically around 45°.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/7b6a26475_6-Chamfers-Chamferscanimprovestrengthandprintreliably.png",
      },
      {
        title: "Chamfers can replace unsupported horizontal surfaces",
        description:
          "A flat edge would create an unsupported overhang, but a chamfer turns it into a gradual slope. This allows surfaces to print cleanly without supports, even on underside features.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c55bb7a65_6-Chamfers-Chamferscanreplaceunsupportedhorizontalsurfaces.png",
      },
      {
        title: "Chamfers produce controlled, consistent surfaces",
        description:
          "Because they are built at a constant angle, any stair stepping appears even and predictable. This often looks more consistent than curved features, where stair stepping can be more noticeable.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e5742dceb_6-Chamfers-Chamfersproducecontrolledconsistentsurfaces.png",
      },
    ],
  },
  {
    number: 7,
    title: "Tolerance",
    intro:
      "Tolerance describes the acceptable deviation from an intended size in a printed part. In 3D printing, parts are rarely exact, so designs need to account for these small differences.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/f35ccbb80_7-Tolerancef.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, test the different pins and holes. Insert each pin and compare how the fit changes with different clearances, noticing how friction and movement vary.",
      topTip:
        "Start with around 0.2 mm clearance for connecting parts. This provides a good balance between ease of assembly and a secure fit on most desktop 3D printers.",
      designTradeoffs:
        "Tighter clearances create more secure fits but increase the risk of parts not fitting or requiring force to assemble. Looser clearances improve ease of assembly and movement, but can feel less precise or stable.",
      goFurther:
        "Layer height can affect how parts fit together, so once you've dialled in a clearance that works well, it's a good idea to keep note of the layer height used.",
    },
    keyLearnings: [
      {
        title: "Clearance allows parts to fit and function reliably",
        description:
          "Clearance is a small intentional gap designed into parts in CAD to account for variations in 3D printing. Without it, parts may not fit together or move as intended.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/2158e5f17_7-Tolerance-Clearanceallowspartstofitandfunctionreliably.png",
      },
      {
        title: "Small clearances can be used for tighter fitting parts",
        description:
          "Clearances around 0.1 to 0.2mm are commonly used for parts that need to fit together securely, such as press fits or dovetail joints. These values provide a balance between accuracy and reliable assembly.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/54e257808_7-Tolerance-Smallclearancescanbeusedfortighterfittingparts.png",
      },
      {
        title: "Larger clearances can be used for moving parts",
        description:
          "Clearances around 0.3 to 0.4mm are better suited to mechanisms with rotation or sliding motion. The extra space helps reduce friction and allows parts to move freely and reliably.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/72b88017e_7-Tolerance-Largerclearancescanbeusedformovingparts.png",
      },
    ],
  },
  {
    number: 8,
    title: "Holes",
    intro:
      "A hole is an opening created by removing material from a solid body. In 3D printing, hole quality depends on size, orientation, and shape.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/7e477d55e_8-Holesf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, compare the vertical and horizontal holes. Look closely at the top of each opening and feel the surface with your finger to notice differences in shape and finish.",
      topTip:
        "Vertical holes tend to print more accurately than horizontal ones. For horizontal holes, consider using angled shapes such as teardrops or diamonds to reduce unsupported spans.",
      designTradeoffs:
        "Circular holes may be preferred for aesthetics or compatibility with standard parts, but when printed horizontally they can suffer from sagging. In these cases, design decisions often involve balancing ideal geometry with print reliability.",
      goFurther:
        "Bridging settings such as cooling and print speed can improve the quality of horizontal holes, but adapting the shape of the hole is often a more reliable solution.",
    },
    keyLearnings: [
      {
        title: "Vertical holes print very accurately",
        description:
          "When printed upright, each layer is supported by the one below, allowing the intended geometry to be reproduced cleanly and consistently.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4f73bce10_8-Holes-Verticalholesprintveryaccurately.png",
      },
      {
        title: "Horizontal holes may create overhangs",
        description:
          "When printed on their side, the top of the hole becomes an unsupported span, which can lead to sagging or a flattened surface.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b40199649_8-Holes-Horizontalholesmaycreateoverhangs.png",
      },
      {
        title: "Horizontal holes can be improved by changing shape",
        description:
          "Using shapes such as teardrops or diamonds replaces flat overhangs with angled surfaces, allowing layers to build gradually and print cleanly without support.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/55b0ded2c_8-Holes-Horizontalholescanbeimprovedbychangingshape.png",
      },
    ],
  },
  {
    number: 9,
    title: "Sharp + Narrow Points",
    intro:
      "Sharp points occur when geometry tapers down to an extremely small area or a perfect tip.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/b56d4319c_9-SharpandNarrowPointsf.mp4",
    toggles: {
      reviewModel:
        "If you've printed the demo model set, compare the sharp and flat-tipped spikes in both orientations. Look closely at the tips and notice where the geometry stops short, and try gently bending them to feel how strength varies.",
      topTip:
        "Add a small flat to the tip of narrow features. This ensures the geometry can be printed fully and improves strength.",
      designTradeoffs:
        "Sharp points can still be useful for visual features, even if the printed result is slightly rounded or shortened. However, for functional parts, adding a flat termination produces more reliable and durable results.",
      goFurther:
        "Tall, narrow features can be prone to stringing. Adjusting retraction and cooling settings can help improve print quality in these areas.",
    },
    keyLearnings: [
      {
        title: "Perfectly sharp tips cannot be printed",
        description:
          "As geometry narrows below the printer's minimum feature size, the slicer cannot generate toolpaths. This causes tips to be shortened or rounded instead of forming a true point.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/49d5349fb_9-SharpandNarrowPoints-Perfectlysharptipscannotbeprinted.png",
      },
      {
        title: "Adding a small flat tip improves reliability",
        description:
          "A defined flat surface ensures the feature remains within printable limits, allowing it to reach the intended size. This produces more consistent and predictable results.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1e6540a11_9-SharpandNarrowPoints-Addingasmallflattipimprovesreliability.png",
      },
      {
        title: "Vertical spikes snap very easily",
        description:
          "Because they are built layer by layer, vertical spikes are weak between layers and can break easily. Adjusting orientation or adding a flat tip helps improve strength and durability.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/7251c1b75_9-SharpandNarrowPoints-Verticalspikessnapveryeasily.png",
      },
    ],
  },
  {
    number: null,
    isBonus: true,
    title: "Multicolour",
    intro:
      "Multicolour 3D printing allows a single part to be produced using multiple filaments. This is commonly achieved using filament switching systems such as an AMS.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/80d80ff35_10-Multicolourf.mp4",
    toggles: {
      reviewModel: null,
      topTip:
        "Minimise colour changes across layers. Designing colour regions to appear in fewer layers can significantly reduce print time and material waste.",
      designTradeoffs:
        "Multicolour printing can improve appearance and clarity, but often increases print time and material waste due to filament switching. In some cases, printing parts separately and assembling them afterwards can be more efficient.",
      goFurther:
        "Some slicers allow purge material to be placed inside infill or less visible areas, helping reduce visible waste. However, minimising colour changes through design is often the most effective approach.",
    },
    keyLearnings: [
      {
        title: "Multicolour prints can significantly increase print time",
        description:
          "Each colour change requires the printer to switch filament and purge material, which adds time and waste. Designs with frequent colour changes across many layers are the least efficient.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6065e74ad_10-Multicolour-Multicolourprintscansignificantlyincreaseprinttime.png",
      },
      {
        title: "Separate parts can reduce time and waste",
        description:
          "Printing parts in different colours as separate components avoids filament switching and produces faster, more efficient prints. A small clearance, around 0.1mm, can be used to create a simple press fit for assembly.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/8140dc8b5_10-Multicolour-Separatepartscanreducetimeandwaste.png",
      },
      {
        title: "Limiting colour changes improves efficiency",
        description:
          "Restricting colour changes to specific areas, such as the top layers, reduces the number of filament swaps. This helps balance print time, material use, and overall appearance.",
        imageUrl:
          "https://media.base44.com/images/public/69d386ad9523e2ce04536574/fc7c81f63_10-Multicolour-Limitingcolourchangesimprovesefficiency.png",
      },
    ],
  },
];