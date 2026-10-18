const V = {
  intro: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/8c10815bf_GettingStartedwithYour3DPrinter-IntroVideo.mp4",
  l1: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/902fc0b1b_1-3DPrinterBasics.mp4",
  l4: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/5191ffb5d_4-GettingSuccessfulPrints.mp4",
  l5: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/288ffe140_5-CommonProblemsandFixes.mp4",
  o6a: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/88dcda544_6a-PrintinginMultipleColours.mp4",
  o6b: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/aab37d658_6b-WhentouseSupports.mp4",
  o6c: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/bde9f6095_6c-ChoosingLayerHeights.mp4",
  o6d: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/e02fbef8f_6d-MakingStrongerPrints.mp4",
};

export const COURSE = {
  title: "Getting Started with Your 3D Printer",
  tagline:
    "Learn the fundamentals of FFF (Fused Filament Fabrication) 3D printing through a series of informative videos.",
  description:
    "In this short online course, you'll learn the fundamentals of FFF (Fused Filament Fabrication) 3D printing. Through a series of informative videos, you'll explore how 3D printers work, how to find and prepare models, how to achieve successful prints, and how to troubleshoot common issues. Rather than covering every aspect of 3D printing in depth, this course is designed to provide a digestible foundation that introduces the key concepts and skills needed to get started.",
  note:
    "While the demonstrations use Bambu Lab printers and Bambu Studio, the principles covered apply to almost all FFF 3D printers and slicing software. You can simply watch the videos, or try the optional \"Things to Try\" activities included throughout the course. At the end of the course is a quiz, and if you achieve over 70%, you can download a certificate.",
  difficulty: "Beginner",
  difficultyNote:
    "This course is rated as beginner and is designed for learners of all ages and experience levels.",
  length: "~1 hour",
  lengthNote:
    "The estimated course length is 1 hour, not including time you may spend rewatching videos or participating in the optional activities.",
  equipment: ["A laptop or computer with internet access."],
  introVideo: V.intro,
};

export const LESSONS = [
  {
    num: 1,
    title: "3D Printer Basics",
    video: V.l1,
    takeaways: [
      "FFF 3D printers create objects by melting plastic and depositing it layer by layer.",
      "Most FFF 3D printers work in a similar way, even though they may differ in size, appearance, and features.",
      "PLA is the most common material for beginners because it is easy to print and suitable for many everyday applications.",
      "The extruder pushes filament into the nozzle, where it is melted and deposited onto the print bed.",
      "The printer moves along the X, Y, and Z axes to build the object one layer at a time.",
      "A useful way to think about an FFF 3D printer is as a very precise hot glue gun that can create complex shapes automatically.",
    ],
    thingsToTry: [
      "Identify the key components of your printer, including the filament, extruder, nozzle, print bed, and X, Y, and Z axes.",
      "Start a small print and watch how the nozzle moves along the X and Y axes to create each layer. Can you identify when the printer moves in the Z direction?",
      "Search online for a few different FFF 3D printers and compare their appearance. What similarities can you spot between the machines?",
      "Choose an everyday object and imagine how it would be built layer by layer using a 3D printer.",
    ],
  },
  {
    num: 2,
    title: "Finding Models",
    video: null,
    takeaways: [
      "Digital 3D models are typically shared as STL or 3MF files.",
      "There are three main ways to obtain 3D printable models: creating them with 3D CAD software, capturing them with a 3D scanner, or downloading them online.",
      "Starting with simple, well-tested models will give you a higher chance of success.",
    ],
    thingsToTry: [
      "Find a model that uses multiple colours. How many colours are used, and would your printer be able to create it?",
      "Choose a model and read through the description, comments, and user photos. What information helps you decide whether the model is worth printing?",
      "Download an STL or 3MF file that you'd like to print and save it ready for the next lesson.",
    ],
  },
  {
    num: 3,
    title: "Setting Up Your Print",
    video: null,
    takeaways: [
      "A slicer converts a 3D model into G-code, which contains the instructions used by the printer.",
      "Good model orientation can improve print quality, reduce overhangs, and minimise the need for supports.",
      "A layer height of around 0.2 mm is a good starting point for most prints.",
      "The preview mode is one of the most useful tools in a slicer, allowing you to check the print before it begins.",
      "Default slicer settings often produce excellent results and are a good place to start.",
    ],
    thingsToTry: [
      "Rotate a model and observe how the overhangs change. Can you find an orientation that reduces the need for supports?",
      "Slice a model and explore the preview mode. What information can you find about print time, filament usage, and cost?",
      "Adjust the layer height and compare the estimated print times. How much difference does this make?",
    ],
    usefulLinks: [
      { name: "Bambu Studio", url: "https://bambulab.com/en/download/studio", by: "by Bambu Lab" },
      { name: "Prusa Slicer", url: "https://www.prusa3d.com/page/prusaslicer_424/", by: "by Prusa Research" },
      { name: "Cura", url: "https://ultimaker.com/software/ultimaker-cura", by: "by UltiMaker" },
    ],
    linksNote:
      "Even if you don't have access to a 3D printer yet, you can still download and experiment with slicing software to explore model orientation, supports, layer heights, and print previews. Here are some free, popular options:",
  },
  {
    num: 4,
    title: "Getting Successful Prints",
    video: V.l4,
    takeaways: [
      "Checking the slicer preview before printing can help identify problems before they waste time and material.",
      "A clean print bed and correct calibration are two of the most important factors for successful printing.",
      "The first layer forms the foundation of the entire print and is the most important stage to monitor.",
      "Allow prints to cool before removal and perform basic maintenance to help keep your printer running smoothly.",
    ],
    thingsToTry: [
      "Start a small print and observe the first layer. Can you see how each line of filament is slightly squished onto the build plate to create a strong foundation for the rest of the print?",
      "Inspect your print bed and clean it according to your manufacturer's recommendations before starting a print.",
      "Watch a print begin and identify the heating, calibration, and printing stages.",
      "After a print completes, compare how easily it removes from the build plate when warm versus after it has fully cooled.",
    ],
  },
  {
    num: 5,
    title: "Common Problems & Fixes",
    video: V.l5,
    takeaways: [
      "Poor bed adhesion is often caused by a dirty build plate, incorrect calibration, or insufficient first-layer adhesion.",
      "Print temperature, model orientation, and supports can have a significant impact on print quality.",
      "If a problem appears repeatedly in the same place, the issue may be with the model itself rather than the printer.",
    ],
    thingsToTry: [
      "Print a model that requires supports without enabling supports. How does the unsupported area compare to the rest of the print?",
      "Print the same model at two different temperatures and compare the results. Do you notice any differences in stringing or overhang quality?",
      "Inspect a spool of filament and identify how it is secured when not in use. Why is this important?",
      "On your next print, apply one or more of the tips from this lesson to see if you can improve printability, even if the print is already successful.",
    ],
  },
];

export const OPTIONAL_EXTRAS = {
  intro:
    "These optional extras explore a few common 3D printing topics in more detail. While they aren't essential for getting started, they can help you better understand how different settings and techniques affect print quality, strength, speed, and appearance.",
  items: [
    {
      id: "6a",
      title: "Printing in Multiple Colours",
      blurb:
        "Learn how multi-colour 3D prints are created using systems such as the AMS. You'll see how printers switch between filaments, why multi-colour prints take longer, and what to consider when choosing multi-colour models.",
      video: V.o6a,
    },
    {
      id: "6b",
      title: "When to Use Supports",
      blurb:
        "Discover when supports are necessary and when you're better off without them. Using a simple overhang test, this video demonstrates the trade-offs between print quality, material usage, and support removal.",
      video: V.o6b,
    },
    {
      id: "6c",
      title: "Choosing Layer Heights",
      blurb:
        "Compare prints created at different layer heights and see how they affect print quality and print time. This video explains why lower layer heights aren't always better and when they make the biggest difference.",
      video: V.o6c,
    },
    {
      id: "6d",
      title: "Making Stronger Prints",
      blurb:
        "Explore one of the most important factors affecting print strength: model orientation. Through a simple strength test, you'll see how layer direction influences durability and how slicer settings can further improve strength.",
      video: V.o6d,
    },
  ],
};

export const QUIZ = [
  {
    question: "What does the nozzle do in an FFF 3D printer?",
    options: [
      "It stores the filament",
      "It heats and deposits the melted material",
      "It creates the digital 3D model",
      "It cools the print bed",
    ],
    answer: 1,
  },
  {
    question: "What does the Z axis control during printing?",
    options: [
      "The speed of the filament spool",
      "Left and right movement",
      "Forwards and backwards movement",
      "Vertical movement between layers",
    ],
    answer: 3,
  },
  {
    question: "What are the three main ways to obtain 3D printable models?",
    options: [
      "Slicing, printing, and scanning",
      "Printing, modelling, and painting",
      "Drawing, painting, and scanning",
      "CAD, 3D scanning, and downloading models",
    ],
    answer: 3,
  },
  {
    question:
      "Before printing a downloaded model, which of the following is most useful for assessing whether it is likely to print successfully?",
    options: [
      "The file size of the model",
      "The date the model was uploaded",
      "The number of colours shown in the thumbnail image",
      "Comments and photos shared by other users",
    ],
    answer: 3,
  },
  {
    question: "When orientating a model for printing, what are the two main goals?",
    options: [
      "Reduce infill density and improve surface finish",
      "Reduce overhangs and place a flat surface on the build plate",
      "Increase the number of layers and minimise print time",
      "Maximise support material and increase strength",
    ],
    answer: 1,
  },
  {
    question: "Why is preview mode useful before starting a print?",
    options: [
      "It increases print quality",
      "It shows how the printer will build the object layer by layer",
      "It allows you to change the colour of the filament",
      "It automatically repairs all model errors",
    ],
    answer: 1,
  },
  {
    question: "Before starting a print, which three things should be checked?",
    options: [
      "The filament colour, model name, and print time",
      "The nozzle size, room temperature, and printer age",
      "The infill density, support settings, and wall count",
      "The slicer preview, print bed, and calibration",
    ],
    answer: 3,
  },
  {
    question: "Why is the first layer so important?",
    options: [
      "It forms the foundation of the entire print",
      "It determines the colour of the print",
      "It uses the most material",
      "It is usually the strongest layer",
    ],
    answer: 0,
  },
  {
    question: "What is stringing?",
    options: [
      "The rough surface left after removing supports",
      "Visible layer lines on curved surfaces",
      "Gaps caused by a blocked nozzle",
      "Fine strands of material between different parts of a print",
    ],
    answer: 3,
  },
  {
    question: "If a print repeatedly fails in the same location, what should you check?",
    options: [
      "The room lighting",
      "The build plate temperature",
      "The colour of the filament",
      "The model itself",
    ],
    answer: 3,
  },
];