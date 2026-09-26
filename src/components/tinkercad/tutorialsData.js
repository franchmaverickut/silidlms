const VIDEO_BASE = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/";

export const TUTORIALS = [
  {
    num: 1,
    title: "Intro + Navigation",
    description: "In this first tutorial, you'll learn how to open an existing model in Tinkercad and navigate around the 3D workspace using a range of view tools.",
    videoUrl: VIDEO_BASE + "a6b82f031_1-IntroandNavigationf.mp4",
    modelUrl: "https://www.tinkercad.com/things/5cIiTxVHdFA-1-intro-and-navigation?sharecode=nVHvFY9_pASktlH2Be27x6SeJoBSfTMfF0D5BdyXTPs",
    keyTakeaways: [
      "The workplane is the flat surface where shapes are placed and positioned.",
      "Hold the right mouse button and drag to orbit your view around the design.",
      "Hold the middle mouse button and drag to pan across the workspace.",
      "Use the mouse scroll wheel to zoom in and out.",
      "The View Cube can be used to quickly view your design from different angles.",
      "Perspective View shows objects with realistic depth, while Orthographic View removes perspective and is often better for precise positioning.",
    ],
    aiActivity: {
      prompt: "I'm learning how to use 3D CAD. Give me 5 examples of how CAD is used in [choose an industry]. For each example, briefly explain what CAD is used for and why it is useful.",
      keepExploring: null,
    },
  },
  {
    num: 2,
    title: "Place + Move Shapes",
    description: "In this tutorial, you'll learn how to place shapes onto the workplane and use different techniques to move and accurately position them.",
    videoUrl: VIDEO_BASE + "db903bf92_2-PlacingandMovingShapesf.mp4",
    modelUrl: "https://www.tinkercad.com/things/8UJCjtWf68K-2-placing-and-moving-shapes?sharecode=Gimcwf6ptSu74rdB5iH9sN9JJtnXJcM_WzT3Ib4839w",
    keyTakeaways: [
      "Drag shapes from the Basic Shapes library onto the workplane to add them to your design.",
      "Shapes can be dragged freely across the workplane, while the black handle above a shape moves it perpendicular to the workplane.",
      "Cruising lets you place new shapes directly onto different surfaces by hovering over them as you drag the shape into the workspace.",
      "The Workplane tool lets you move the main workplane onto a chosen surface, which is useful when placing or building multiple shapes on the same plane.",
      "Reducing the Snap Grid, such as from 1mm to 0.1mm, allows finer and more precise positioning.",
    ],
    aiActivity: {
      prompt: "I'm designing the 3D printable shape sorting toy shown in the attached image for young children. Review the design and identify 5 potential safety considerations I should think about. For each one, explain why it could be a concern and suggest how I could improve the design. Do not assume the design is safe based on the image alone, and highlight anything that would need to be physically tested or checked.",
      keepExploring: "Choose one of the safety considerations and ask the AI to explore it in more detail. You could ask what changes might reduce the risk, what would need to be physically tested, or what further information it would need to give more useful feedback.",
    },
  },
  {
    num: 3,
    title: "Scaling",
    description: "In this tutorial, you'll learn how to accurately scale shapes and use different scaling techniques to create furniture and equipment for a 1:100 scale classroom model.",
    videoUrl: VIDEO_BASE + "bc08e4982_3-Scalingf.mp4",
    modelUrl: "https://www.tinkercad.com/things/37f7rxnPmaz-3-scaling?sharecode=3EybvBWrvogU1L5nzCUy44Mfui31zmiBM2AjewQbhOw",
    keyTakeaways: [
      "The black centre handles scale a shape along one axis, while the white corner handles scale it in two directions at once.",
      "The top white handle scales a shape perpendicular to the workplane.",
      "Click a dimension field and type a value to scale a shape to an exact size.",
      "Hold Shift while dragging a white corner handle to keep the shape in proportion.",
      "Scale models use a consistent ratio between the model and the real object. At 1:100 scale, 1mm in the model represents 100mm in real life.",
    ],
    aiActivity: {
      prompt: "The attached images show my 1:100 scale classroom model from different angles. The real room is 10m × 8m. Use the exact same number and types of shapes shown in my model, but rearrange them to create 3 different classroom layout options. Red shapes represent tables and chairs, yellow shapes represent storage, and green shapes represent equipment and display items. I want the classroom to feel like a busy, practical makerspace, with space for students to work on different activities at the same time. Consider collaboration, movement around the room, access to equipment and storage, and areas for displaying or discussing work. Show each option as a simple 3D room layout, using the same simplified shapes and colour coding as my model. Briefly explain the thinking behind each layout and the advantages it could offer.",
      keepExploring: "Choose the layout you prefer and tell the AI what you like and dislike about it. Ask it to create a refined version based on your feedback, while keeping the elements you want to preserve.",
    },
  },
  {
    num: 4,
    title: "Grouping",
    description: "In this tutorial, you'll learn how to group multiple shapes together so they behave as single objects, and combine shapes to create new ones.",
    videoUrl: VIDEO_BASE + "83f2f36a2_4-Groupingf.mp4",
    modelUrl: "https://www.tinkercad.com/things/bQWOCJyhjqf-4-grouping?sharecode=JIJF7G4a7L-k2ZLBupj1KbD2FeuY_-ILn5TKlV6xQKE",
    keyTakeaways: [
      "Bundle Group makes multiple objects behave as a single object while keeping their positions relative to one another.",
      "Union Group combines multiple shapes to create a single new shape.",
      "Bundle groups are useful for temporarily keeping collections of objects together and preventing individual parts from being accidentally moved.",
      "Both bundle groups and union groups can be ungrouped when you need to work with the individual objects again.",
    ],
    aiActivity: {
      prompt: "The attached image shows a 3D printable chess set I designed. The design uses simple geometric forms, with each chess piece created by combining basic shapes. The overall style is modern, minimal and abstract. Suggest 10 potential product names for the chess set. I prefer short names of one or two words that feel clever and memorable. I like subtle references to geometry or chess, but I don't want names that are too literal or obvious. For each name, briefly explain the idea behind it. Then select the 3 strongest names and explain why you think they suit the design.",
      keepExploring: "Tell the AI which names or ideas you like and dislike, and why. Ask it to generate another set of names based on your feedback until you find a direction you're happy with.",
    },
  },
  {
    num: 5,
    title: "Rotating",
    description: "In this tutorial, you'll learn how to rotate shapes to create new forms and position objects in different orientations.",
    videoUrl: VIDEO_BASE + "2b880bbe0_5-Rotatingf.mp4",
    modelUrl: "https://www.tinkercad.com/things/dJZ6Cx9UkhL-5-rotating?sharecode=Riw2v8BTI7XYmEY1iwdDN6Hs1-3f8lkSKKpOqBe_lNw",
    keyTakeaways: [
      "Drag a double-ended arrow around a selected shape to rotate it around that axis.",
      "The outer rotation circle allows precise rotation in 1° increments.",
      "The inner rotation circle snaps to 22.5° increments for quicker rotation to common angles.",
      "Rotating shapes before grouping them can help create more complex forms from simple shapes.",
    ],
    aiActivity: {
      prompt: "The attached images show a modular pegboard and hooks I designed. Create 10 different pegboard attachment concepts that use the exact same connection mechanism at the back of the existing hooks. This mechanism slots through the pegboard holes and must remain unchanged so that every new concept connects to the pegboard in the same way. Only redesign the part that extends outwards from this connection mechanism. Explore attachments for holding or organising a variety of small everyday objects, with clearly different forms and purposes. Show all 10 concepts together as a simple product design concept sheet.",
      keepExploring: "Review the concepts and look for shapes, features or ideas that could inspire your own pegboard attachments. You don't need to copy a concept exactly. You could combine elements from several ideas or develop a completely different design of your own.",
    },
  },
  {
    num: 6,
    title: "Holes",
    description: "In this tutorial, you'll learn how to use hole shapes to remove material and create different cutouts for a modular stationery organiser.",
    videoUrl: VIDEO_BASE + "71596f40a_6-Holesf.mp4",
    modelUrl: "https://www.tinkercad.com/things/fqYCbSXwMYl-6-holes?sharecode=j66QQfqho3X-gqcPSe-C3jmAIhMDI5ZlT3l86cf6mPg",
    keyTakeaways: [
      "When a hole shape intersects with a solid shape and they are Union Grouped, the intersecting material is removed.",
      "Bundle Grouping a hole with a solid does not remove material. The objects are simply bundled together.",
      "Multiple hole shapes can be combined to create custom hole shapes for more complex cutouts.",
      "The position and depth of a hole determines how much material is removed, so a hole can create either a shallow indent or a deeper cutout.",
    ],
    aiActivity: {
      prompt: "The attached image shows a modular 3D printable stationery organiser I designed. Each module is 80mm × 80mm × 25mm and is created by cutting different shaped holes and recesses into the top. Existing modules hold items such as pens, paperclips, business cards, sticky notes and SD cards. Suggest 10 ideas for new modules that could hold different everyday desk, classroom or makerspace items. For each idea, suggest the type of hole or cutout that could be used. The outer 80mm × 80mm × 25mm form must stay the same, and I can only remove material to create the storage features, not add any additional material.",
      keepExploring: "Choose an idea you would like to develop and tell the AI the dimensions of the item you want it to hold. Ask it to suggest suitable starting dimensions for the cutout, including any clearance that might be needed. Treat these dimensions as a starting point and physically test the fit before relying on them.",
    },
  },
  {
    num: 7,
    title: "Duplicating",
    description: "In this tutorial, you'll learn how to use the Duplicate tool to quickly and accurately create repeating patterns for a 3D printable texture swatch.",
    videoUrl: VIDEO_BASE + "743d6597b_7-Duplicatef.mp4",
    modelUrl: "https://www.tinkercad.com/things/5AbJnMGnA13-7-duplicate?sharecode=8ehJzDng46vWJ8RmoAzpa7669coygVfV1gU1ILz9WL0",
    keyTakeaways: [
      "The Duplicate tool remembers the previous movement, allowing the same spacing to be repeated across a pattern.",
      "Duplicate can also repeat a rotation, making it possible to create patterns around a full 360°.",
      "Multiple shapes can be selected and duplicated together, allowing more complex repeating patterns to be built quickly.",
    ],
    aiActivity: {
      prompt: "The attached image shows a geometric surface texture I created in Tinkercad. Create a photorealistic product visualisation of a circular coaster that uses this exact repeating texture across its top surface. Adapt the pattern to the circular shape while keeping its original geometry, spacing and arrangement as close as possible to the reference image. Make the coaster look 3D printed in [choose a colour] PLA and place it on a simple tabletop in a contemporary interior. Use natural lighting and realistic shadows, with a camera angle that clearly shows the surface texture.",
      keepExploring: "Review the result and experiment with refinements to the texture, such as changing its scale, spacing or depth. You could also try different textures from your swatch or apply them to completely different products.",
    },
  },
  {
    num: 8,
    title: "Aligning",
    description: "In this tutorial, you'll learn how to use the Align tool to accurately position shapes relative to one another.",
    videoUrl: VIDEO_BASE + "5cff1eda1_8-Aligningf.mp4",
    modelUrl: "https://www.tinkercad.com/things/3EyYCEXboqm-8-aligning?sharecode=NTuSPuCL3Tp_AvmhvJB4yF0wVx0WjPqSAE2dimcL5Rk",
    keyTakeaways: [
      "The Align tool accurately positions multiple shapes relative to one another.",
      "The outer alignment handles align objects to either edge, while the centre handles align them centrally.",
      "Click one of the selected objects before choosing an alignment handle to keep that object fixed while the others align to it.",
      "Alignment can be more accurate than manually positioning objects using the Snap Grid, as the required position may fall between grid increments.",
    ],
    aiActivity: {
      prompt: "I'm designing a 3D printable measuring tool with raised ruler markings. Each marking is 0.4mm wide and raised 0.8mm above the surface, with a 0.6mm gap between adjacent markings. I plan to print it on a typical FFF 3D printer with a 0.4mm nozzle and PLA material. Are these features likely to print clearly and accurately? Explain how the nozzle diameter, extrusion width and layer height could affect features this small, identify any potential problems, and suggest any changes you would recommend. Clearly distinguish between general guidelines and anything that would need to be confirmed by slicing or test printing.",
      keepExploring: "Change one of the design or printing variables in your prompt, such as the marking width, height, gap or nozzle diameter, and ask the AI how this might affect the result. Compare its advice and decide what you would test before printing the final design.",
    },
  },
  {
    num: 9,
    title: "Mirroring",
    description: "In this tutorial, you'll learn how to use the Mirror tool to create a reverse copy of a shape and accurately join mirrored shapes together.",
    videoUrl: VIDEO_BASE + "281385703_9-Mirroringf.mp4",
    modelUrl: "https://www.tinkercad.com/things/kn9U5V49CpG-9-mirror?sharecode=1D_dwa9dXkP8ZuhMbFmWlmzcC7Gg1ys7dF59NWaCh4E",
    keyTakeaways: [
      "The Mirror tool flips a shape across an axis rather than rotating it.",
      "When Mirror is activated, three double-ended arrow handles let you flip the shape across different axes.",
      "Mirroring is useful when a reversed version of a shape cannot be achieved through rotation alone.",
    ],
    aiActivity: {
      prompt: "The attached image shows a 3D printable assistive bag carrier I designed. It is held in the hand and is designed to carry the weight of several shopping bags using the two hooks at the bottom. I plan to print it using an FFF 3D printer. Suggest suitable 3D printing materials, print orientations and slicer settings that could help make the part strong and durable. Explain the advantages and disadvantages of your recommendations, including how layer direction could affect the strength of the hooks. Do not assume the part is safe to carry a particular load without physical testing.",
      keepExploring: "Ask the AI how the shape and geometry of the bag carrier could affect its strength. Explore which areas might experience the most stress and what types of design changes could potentially make them stronger.",
    },
  },
  {
    num: 10,
    title: "Sketching",
    description: "In this tutorial, you'll learn how to use the Sketch tool to draw a custom 2D shape and extrude it into a 3D phone stand.",
    videoUrl: VIDEO_BASE + "a4202a9b5_10-SketchToolf.mp4",
    modelUrl: "https://www.tinkercad.com/things/1VxdouUXa0e-10-sketch-tool?sharecode=UKmCYCJhgZVa9uFt7WjtKUj2TJgH0iK5nh-ioA-lSAY",
    keyTakeaways: [
      "The Sketch tool provides a 2D environment where you can draw and edit custom geometry.",
      "Sketches can use closed shapes or stroked lines to create custom geometry that is extruded into 3D when you finish the sketch.",
      "The Bezier Curve tool creates curved lines, with handles that allow you to control their curvature.",
      "Double-click a sketch outline to edit individual points and curves and refine the shape.",
      "Existing objects can be used as templates when sketching custom shapes around them.",
    ],
    aiActivity: {
      prompt: "The attached image shows a 3D phone stand I designed in Tinkercad. Create a photorealistic product visualisation that keeps the shape and proportions of my design as closely as possible. Show the stand holding a modern smartphone on a light oak bedside table in a calm, contemporary bedroom. Include a small bedside lamp, a book and a few subtle personal objects in the background. Make the phone stand look 3D printed in [choose a colour] PLA with a subtle layer-line texture. Use warm evening lighting from the bedside lamp, soft realistic shadows and a shallow depth of field. Frame the image from a slightly elevated three-quarter angle, with the phone stand as the main focus.",
      keepExploring: "Experiment with the environment, lighting, material, colour or camera angle to see how the same product can be presented in completely different ways.",
    },
  },
  {
    num: 11,
    title: "Revolving",
    description: "In this tutorial, you'll learn how to use the Revolve tool to rotate a 2D profile around a centre line and create rounded 3D shapes like a pen shell.",
    videoUrl: null,
    modelUrl: "https://www.tinkercad.com/things/1VxdouUXa0e-10-sketch-tool?sharecode=UKmCYCJhgZVa9uFt7WjtKUj2TJgH0iK5nh-ioA-lSAY",
    keyTakeaways: [
      "The Revolve tool rotates a 2D profile around a centre line to create a 3D shape.",
      "A full 360° revolve is useful for creating rounded and cylindrical objects such as bottles, bowls, handles and pen shells.",
      "Existing objects can be used as references to accurately position and dimension a revolve profile around them.",
      "The 2D profile can be edited by moving points and lines, or by converting straight lines into curves and adjusting their curvature.",
      "The 3D preview lets you see how changes to the 2D profile affect the revolved shape as you work.",
    ],
    aiActivity: {
      prompt: "The attached image shows a 3D printable shell I designed for a standard Bic Cristal pen. The shell measures approximately [length] × [width] × [height] mm and I am considering 3D printing and selling small batches of them. Help me develop a simple business concept for the product. Suggest 3 potential target customers, explain why the product might appeal to each one, and recommend which audience I should focus on first. Then suggest a possible selling price range, sales channels, packaging approach and marketing ideas. Finally, identify 5 things I should research or test before deciding whether this could be a viable product. Clearly identify any assumptions you make and any information you would need from me to make your recommendations more accurate.",
      keepExploring: "Choose the target customer you find most interesting and ask the AI to develop the business concept specifically for that audience. Add further information about your product and your own ideas as you go to make its recommendations more relevant.",
    },
  },
];

export const QUIZ_QUESTIONS = [
  {
    question: "Which view mode is generally best for precise positioning in Tinkercad?",
    options: ["Orthographic", "Perspective", "Transparent"],
    answer: 0,
  },
  {
    question: "What does changing the Snap Grid to a smaller value allow you to do?",
    options: ["Automatically align shapes to each other", "Move shapes in larger increments", "Position shapes more precisely"],
    answer: 2,
  },
  {
    question: "When scaling a shape, holding Shift while dragging a corner handle will...",
    options: ["keep its proportions the same", "automatically scale the shape to twice its size", "scale only the height of the shape"],
    answer: 0,
  },
  {
    question: "What is the difference between Bundle Group and Union Group?",
    options: [
      "Bundle Group keeps objects separate, while Union Group combines them into a new shape",
      "Bundle Group changes the colour, while Union Group changes the size",
      "Bundle Group creates holes, while Union Group fills them",
    ],
    answer: 0,
  },
  {
    question: "When rotating a shape, the outer rotation circle allows you to rotate in...",
    options: ["22.5 degree increments", "1 degree increments", "5 degree increments"],
    answer: 1,
  },
  {
    question: "What happens when a hole shape is Union Grouped with a solid shape?",
    options: ["The intersecting material is removed", "The two shapes remain separate", "The hole becomes solid"],
    answer: 0,
  },
  {
    question: "After duplicating and immediately moving an object, selecting Duplicate again will...",
    options: [
      "copy the object and repeat the previous movement",
      "create another copy in the original position",
      "create another copy without repeating the movement",
    ],
    answer: 0,
  },
  {
    question: "What do the centre handles of the Align tool do?",
    options: ["Align objects to an outer edge", "Rotate objects around their centre", "Align objects centrally"],
    answer: 2,
  },
  {
    question: "When using the Align tool, clicking one of the selected objects before choosing an alignment handle will...",
    options: [
      "group the objects together",
      "deselect that object",
      "keep that object in position while the others align to it",
    ],
    answer: 2,
  },
  {
    question: "How is the Mirror tool different from rotating a shape?",
    options: ["It creates a hole inside the shape", "It flips the shape across an axis", "It changes the dimensions of the shape"],
    answer: 1,
  },
  {
    question: "What happens to a closed 2D shape created with the Sketch tool when you finish the sketch?",
    options: ["It is extruded into a 3D shape", "It is automatically converted into a hole", "It remains as a flat drawing"],
    answer: 0,
  },
  {
    question: "How does the Revolve tool create a 3D shape?",
    options: [
      "It rotates a 2D profile 360 degrees around a centre line",
      "It mirrors a 2D profile across a centre line",
      "It stretches a 2D profile upwards",
    ],
    answer: 0,
  },
  {
    question: "When exporting only one object from a Tinkercad design for 3D printing, which option should you choose?",
    options: ["Everything in the design", "The selected shape", "The workplane"],
    answer: 1,
  },
  {
    question: "Which file type is commonly used to export a model for 3D printing?",
    options: ["JPG", "PDF", "STL"],
    answer: 2,
  },
];