export const LESSONS = [
  {
    num: 1,
    title: "The Technology",
    description:
      "An introduction to what 3D printing is, how it works, and the core additive manufacturing technologies — including FDM/FFF, SLA, and SLS — that underpin the industry.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/7f0f956f8_1-3DPrintingTechnologyf.mp4",
    keyTakeaways: [
      "3D printing is an additive manufacturing process — objects are built up layer by layer.",
      "Main technologies include FDM/FFF (filament), SLA (resin), and SLS (powder fusion).",
      "Each technology suits different materials, resolutions, and use cases.",
    ],
  },
  {
    num: 2,
    title: "Rapid Prototyping",
    description:
      "How 3D printing has transformed product development by enabling designers and engineers to quickly iterate on physical prototypes — reducing time-to-market from months to days.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/8ee8ce5b4_2-RapidPrototypingf.mp4",
    keyTakeaways: [
      "Rapid prototyping is the process of quickly and efficiently creating prototypes that can be analysed in form and function.",
      "Going from digital design to prototype within hours dramatically speeds up the product development cycle.",
      "Faster iteration means more design cycles and better end products.",
    ],
  },
  {
    num: 3,
    title: "Local Manufacturing",
    description:
      "How 3D printing enables on-demand, distributed manufacturing — producing parts closer to where they're needed and simplifying the supply chain.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/c5478cb20_3-LocalManufacturingf.mp4",
    keyTakeaways: [
      "Local manufacturing reduces transport emissions and simplifies the supply chain.",
      "It strengthens relationships between manufacturers and end users.",
      "Material options may be more limited than centralised mass production.",
    ],
  },
  {
    num: 4,
    title: "On-Demand Manufacturing",
    description:
      "The shift from holding large inventories to manufacturing only when an order is placed — enabled by digital warehouses of product blueprints.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/0870c2404_4-OnDemandManufacturingf.mp4",
    keyTakeaways: [
      "A digital warehouse is an online library of product 'blueprints' that allows manufacturing to occur on-demand.",
      "On-demand manufacturing removes the need for physical warehouse space and excess stock.",
      "Meeting modern consumer lead times remains a key challenge.",
    ],
  },
  {
    num: 5,
    title: "Customisation",
    description:
      "How 3D printing makes mass customisation economically viable — from personalised medical implants to bespoke consumer products — without the tooling cost penalty of traditional manufacturing.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/21d5c7378_5-Customisationf.mp4",
    keyTakeaways: [
      "3D printing excels at creating customised, perfect-fit solutions for the human body.",
      "Each part can be uniquely designed with no additional tooling cost.",
      "Part consolidation can reduce packaged product size and shipping costs.",
    ],
  },
  {
    num: 6,
    title: "Sustainability",
    description:
      "The environmental implications of 3D printing: additive manufacturing produces less waste than subtractive methods, and emerging bio-based filaments are opening greener possibilities.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/f7a7475e1_6-Sustainabilityf.mp4",
    keyTakeaways: [
      "Additive manufacturing adds material only where needed, reducing waste.",
      "Bio-based filaments offer a greener alternative to petroleum-based plastics.",
      "Local and on-demand production further cut transport and inventory waste.",
    ],
  },
  {
    num: 7,
    title: "Access",
    description:
      "How falling hardware costs and open-source technology are democratising fabrication — giving makers, students, and entrepreneurs worldwide access to manufacturing capability.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/cf0dbe215_7-Accessf.mp4",
    keyTakeaways: [
      "More accessible, affordable 3D printers enable more product startups and more innovation.",
      "Fabrication capability is reaching people worldwide regardless of resources.",
      "Lower barriers to entry expand who can design and make products.",
    ],
  },
  {
    num: 8,
    title: "Complexity",
    description:
      "Why 3D printing inverts the traditional complexity-cost relationship — complex geometries are often no more expensive to print than simple ones.",
    videoUrl:
      "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/8e15dc3b5_8-Complexityf.mp4",
    keyTakeaways: [
      "In traditional manufacturing, more complex parts cost more to make.",
      "With 3D printing, cost generally depends on how much material is required — not complexity.",
      "This unlocks geometries impossible or uneconomical with subtractive methods.",
    ],
  },
];

export const QUIZ_QUESTIONS = [
  {
    question: "3D printing is...",
    options: [
      "a subtractive manufacturing process",
      "a hybrid manufacturing process of additive and subtractive",
      "another word for manufacturing in general",
      "an additive manufacturing process",
    ],
    answer: 3,
  },
  {
    question: "Selective laser sintering (SLS) involves...",
    options: [
      "the use of lasers to cut material",
      "the use of lasers to fuse powdered material together",
      "the use of lasers to cure a liquid photopolymer",
      "melting plastic filament",
    ],
    answer: 1,
  },
  {
    question: "Rapid prototyping is...",
    options: [
      "the process of quickly and efficiently creating prototypes that can be analysed in form and function",
      "the term used to describe a fast manufacturing process",
      "another word for manufacturing",
      "the process of creating prototypes from readily available materials such as cardboard, foam etc.",
    ],
    answer: 0,
  },
  {
    question:
      "With 3D printing, you can go from digital design to prototype within hours, which...",
    options: [
      "makes it a faster manufacturing process than CNC machining",
      "makes more accurate prototypes",
      "can dramatically speed up the product development cycle",
      "can make prototyping more expensive",
    ],
    answer: 2,
  },
  {
    question:
      "Which of the following is generally NOT true when it comes to local manufacturing?",
    options: [
      "there are more material options",
      "emissions from transport are dramatically reduced",
      "relationships between manufacturers and end users are strengthened",
      "the supply chain is simplified and less vulnerable",
    ],
    answer: 0,
  },
  {
    question: "A digital warehouse refers to...",
    options: [
      "an online library of product 'blueprints' that allows manufacturing to occur on-demand",
      "a warehouse filled with 3D printed inventory",
      "a warehouse filled with computers that store 3D models",
      "an online shop that allows you to view products in a 3D viewer application",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is a big challenge for on-demand manufacturing?",
    options: [
      "knowing how much stock to produce",
      "having enough physical warehouse space",
      "meeting the lead times expected of modern day consumers",
      "the cost of machine setup and tooling",
    ],
    answer: 2,
  },
  {
    question: "3D printing excels in...",
    options: [
      "creating products with more precision than any other manufacturing process",
      "creating products with a better surface finish than injection moulding",
      "large volume manufacturing",
      "creating customised, perfect-fit solutions for the human body",
    ],
    answer: 3,
  },
  {
    question: "Using 3D printing to consolidate parts...",
    options: [
      "generally decreases the size of the overall packaged product - reducing shipping costs",
      "makes it much easier to assemble and disassemble products",
      "makes it more difficult to assemble and disassemble products",
      "generally decreases the strength of the overall product",
    ],
    answer: 0,
  },
  {
    question: "As 3D printers become more accessible and affordable,...",
    options: [
      "more product startups will form, which will result in less innovations coming to market",
      "less product startups will form as more people will be able to make their own products at home",
      "there will be no need for other manufacturing processes",
      "more product startups will form, which will result in more innovations coming to market",
    ],
    answer: 3,
  },
  {
    question: "In traditional manufacturing, the more complex the part,...",
    options: [
      "the cheaper it becomes to manufacture",
      "the more expensive it becomes to manufacture",
      "the quicker is becomes to manufacture",
      "the more material is required",
    ],
    answer: 1,
  },
  {
    question:
      "With 3D printing, the cost of manufacturing the part generally depends on...",
    options: [
      "the number of faces the part has",
      "how many components the part is made up of",
      "the complexity of the part",
      "how much material is required",
    ],
    answer: 3,
  },
];