// ─── Grade 1 · Stage 1: Maker — All 10 Lessons ──────────────────────────────
// Each lesson: { id, accentColor, badge, typeBadge, title, subtitle, readings[], revealCards[], dragActivity, quiz[] }

export const GRADE1_MAKER_LESSONS = [
  // ── Lesson 1 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a802d",
    accentColor: "#4F46E5",
    badge: "Grade 1 · Lesson 1 of 10 · Maker Stage",
    typeBadge: "Reading",
    title: "Review of Basic Shapes",
    subtitle: "Let's remember the shapes we know — circles, squares, triangles, and rectangles!",
    readings: [
      {
        svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#4F46E5"></circle></svg>`,
        heading: "Circle",
        body: "A circle is perfectly round with no corners and no straight sides. You can see circles everywhere — in coins, wheels, clocks, and the sun!",
      },
      {
        svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="4" width="44" height="44" rx="4" fill="#4F46E5"></rect></svg>`,
        heading: "Square",
        body: "A square has 4 equal sides and 4 corners. Every side is exactly the same length. Look for squares in tiles, windows, and board games!",
      },
      {
        svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 50,48 2,48" fill="#4F46E5"></polygon></svg>`,
        heading: "Triangle",
        body: "A triangle has 3 sides and 3 corners. Triangles are very strong shapes — you can find them in roof tops, slices of pizza, and warning signs!",
      },
      {
        svgIcon: `<svg width="52" height="36" viewBox="0 0 52 36"><rect x="3" y="3" width="46" height="30" rx="4" fill="#4F46E5"></rect></svg>`,
        heading: "Rectangle",
        body: "A rectangle has 4 sides and 4 corners. Two sides are long and two sides are short. Books, doors, and phone screens are all rectangles!",
      },
    ],
    revealLabel: "Explore — tap each shape to learn more",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#4F46E5"></circle></svg>`, name: "Circle", desc: "Round with no corners. Like a wheel or a coin!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="4" width="44" height="44" rx="4" fill="#4F46E5"></rect></svg>`, name: "Square", desc: "4 equal sides. Like a tile or a window!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 50,48 2,48" fill="#4F46E5"></polygon></svg>`, name: "Triangle", desc: "3 sides and 3 corners. Like a rooftop!" },
      { frontSvg: `<svg width="52" height="36" viewBox="0 0 52 36"><rect x="3" y="3" width="46" height="30" rx="4" fill="#4F46E5"></rect></svg>`, name: "Rectangle", desc: "2 long + 2 short sides. Like a door!" },
    ],
    dragLabel: "Activity — drag the shape name to its picture",
    dragChips: [
      { label: "Circle", val: "Circle" },
      { label: "Square", val: "Square" },
      { label: "Triangle", val: "Triangle" },
      { label: "Rectangle", val: "Rectangle" },
    ],
    dragZones: [
      { answer: "Circle", label: "Circle", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" fill="none" stroke="#A5B4FC" stroke-width="2.5"></circle></svg>` },
      { answer: "Square", label: "Square", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="3" fill="none" stroke="#A5B4FC" stroke-width="2.5"></rect></svg>` },
      { answer: "Triangle", label: "Triangle", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,3 33,33 3,33" fill="none" stroke="#A5B4FC" stroke-width="2.5"></polygon></svg>` },
      { answer: "Rectangle", label: "Rectangle", svgContent: `<svg width="36" height="22" viewBox="0 0 36 22"><rect x="2" y="2" width="32" height="18" rx="3" fill="none" stroke="#A5B4FC" stroke-width="2.5"></rect></svg>` },
    ],
    quizLabel: "Quiz — how well do you know your shapes?",
    quiz: [
      { text: "Which shape has NO corners?", options: [{ label: "Square", correct: false }, { label: "Triangle", correct: false }, { label: "Circle", correct: true }, { label: "Rectangle", correct: false }] },
      { text: "How many sides does a triangle have?", options: [{ label: "2", correct: false }, { label: "4", correct: false }, { label: "3", correct: true }, { label: "5", correct: false }] },
      { text: "A door is shaped like a…", options: [{ label: "Circle", correct: false }, { label: "Triangle", correct: false }, { label: "Square", correct: false }, { label: "Rectangle", correct: true }] },
    ],
  },

  // ── Lesson 2 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a802e",
    accentColor: "#0EA5E9",
    badge: "Grade 1 · Lesson 2 of 10 · Maker Stage",
    typeBadge: "Activity",
    title: "Flat Shapes vs Solid Shapes",
    subtitle: "Flat shapes are 2D — solid shapes are 3D! Learn the difference.",
    readings: [
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="4" width="44" height="44" rx="4" fill="#0EA5E9" opacity=".2" stroke="#0EA5E9" stroke-width="2.5"></rect><text x="26" y="31" text-anchor="middle" font-size="13" font-weight="800" fill="#0EA5E9" font-family="Nunito">FLAT</text></svg>`, heading: "Flat shapes (2D)", body: `Flat shapes have only length and width. You can draw them on paper! Examples: circle, square, triangle, rectangle. The "2D" means two dimensions.` },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="18" width="28" height="28" rx="2" fill="#0EA5E9"></rect><polygon points="4,18 16,6 44,6 32,18" fill="#38BDF8"></polygon><polygon points="32,18 44,6 44,34 32,46" fill="#0284C7"></polygon></svg>`, heading: "Solid shapes (3D)", body: `Solid shapes have length, width, AND height — you can hold them in your hand! Examples: cube, sphere, cylinder, pyramid. The "3D" means three dimensions.` },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="4" width="22" height="22" rx="2" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="2"></rect><text x="15" y="20" text-anchor="middle" font-size="10" font-weight="800" fill="#0EA5E9">2D</text><rect x="26" y="20" width="22" height="20" rx="2" fill="#0EA5E9" opacity=".5"></rect><polygon points="26,20 36,10 48,10 38,20" fill="#0EA5E9" opacity=".7"></polygon><polygon points="38,20 48,10 48,30 38,40" fill="#0369A1"></polygon></svg>`, heading: "2D becomes 3D", body: "When you fold a flat shape or stack it up, it becomes a 3D solid! A flat square folded into a box becomes a cube." },
    ],
    revealLabel: "Explore — tap to see each shape type",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#0EA5E9"></circle></svg>`, name: "Circle → Sphere", desc: "A flat circle becomes a solid sphere when it has depth — like a ball!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="4" width="44" height="44" rx="4" fill="#0EA5E9"></rect></svg>`, name: "Square → Cube", desc: "A flat square becomes a solid cube — like a dice or a box!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 50,48 2,48" fill="#0EA5E9"></polygon></svg>`, name: "Triangle → Pyramid", desc: "A flat triangle becomes a pointy pyramid when it stands up in 3D!" },
      { frontSvg: `<svg width="52" height="36" viewBox="0 0 52 36"><rect x="3" y="3" width="46" height="30" rx="4" fill="#0EA5E9"></rect></svg>`, name: "Rectangle → Cylinder", desc: "A flat rectangle rolled into a tube becomes a cylinder — like a can!" },
    ],
    dragLabel: "Activity — is it flat (2D) or solid (3D)?",
    dragChips: [
      { label: "2D", val: "2D" }, { label: "3D", val: "3D" }, { label: "2D", val: "2D" }, { label: "3D", val: "3D" },
    ],
    dragZones: [
      { answer: "2D", label: "2D", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="3" fill="none" stroke="#7DD3FC" stroke-width="2.5"></rect><text x="18" y="22" text-anchor="middle" font-size="11" fill="#7DD3FC" font-weight="700">Square</text></svg>` },
      { answer: "3D", label: "3D", svgContent: `<svg width="36" height="36" viewBox="0 0 52 52"><circle cx="18" cy="18" r="14" fill="#0EA5E9"></circle><ellipse cx="18" cy="18" rx="7" ry="14" fill="#38BDF8" opacity=".4"></ellipse></svg>` },
      { answer: "2D", label: "2D", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,3 33,33 3,33" fill="none" stroke="#7DD3FC" stroke-width="2.5"></polygon><text x="18" y="27" text-anchor="middle" font-size="9" fill="#7DD3FC" font-weight="700">Triangle</text></svg>` },
      { answer: "3D", label: "3D", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="12" width="20" height="20" rx="1" fill="none" stroke="#7DD3FC" stroke-width="2"></rect><polygon points="4,12 11,5 31,5 24,12" fill="none" stroke="#7DD3FC" stroke-width="1.5"></polygon><polygon points="24,12 31,5 31,25 24,32" fill="none" stroke="#7DD3FC" stroke-width="1.5"></polygon></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "Which shape is FLAT (2D)?", options: [{ label: "Cube", correct: false }, { label: "Sphere", correct: false }, { label: "Circle", correct: true }, { label: "Cylinder", correct: false }] },
      { text: "Which shape is SOLID (3D)?", options: [{ label: "Triangle", correct: false }, { label: "Rectangle", correct: false }, { label: "Square", correct: false }, { label: "Pyramid", correct: true }] },
      { text: "A ball is an example of a…", options: [{ label: "Flat shape", correct: false }, { label: "2D shape", correct: false }, { label: "Solid shape", correct: true }, { label: "Drawn shape", correct: false }] },
    ],
  },

  // ── Lesson 3 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a802f",
    accentColor: "#7C3AED",
    badge: "Grade 1 · Lesson 3 of 10 · Maker Stage",
    typeBadge: "Reading",
    title: "Introduction to 3D Shapes",
    subtitle: "Meet the amazing world of 3D shapes — cube, sphere, cylinder, and pyramid!",
    readings: [
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="18" width="28" height="28" rx="2" fill="#7C3AED"></rect><polygon points="4,18 16,6 44,6 32,18" fill="#A78BFA"></polygon><polygon points="32,18 44,6 44,34 32,46" fill="#5B21B6"></polygon></svg>`, heading: "Cube", body: "A cube has 6 flat faces, 12 edges, and 8 corners. Every face is a square. Think of a dice, a sugar cube, or a cardboard box!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#7C3AED"></circle><ellipse cx="26" cy="26" rx="10" ry="22" fill="#A78BFA" opacity=".4"></ellipse></svg>`, heading: "Sphere", body: "A sphere is perfectly round with no flat faces, no edges, and no corners. Examples: a ball, a globe, an orange, or a bubble!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="14" width="36" height="28" fill="#7C3AED"></rect><ellipse cx="26" cy="14" rx="18" ry="7" fill="#A78BFA"></ellipse><ellipse cx="26" cy="42" rx="18" ry="7" fill="#5B21B6"></ellipse></svg>`, heading: "Cylinder", body: "A cylinder has 2 flat circular faces and 1 curved surface. Examples: a can, a glass, a drum, or a toilet paper roll!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 50,48 2,48" fill="#7C3AED"></polygon><polygon points="26,4 50,48 38,48" fill="#5B21B6"></polygon></svg>`, heading: "Pyramid", body: "A pyramid has a flat base and triangular sides that meet at a pointy top. Examples: the Egyptian pyramids, a party hat, or a tent!" },
    ],
    revealLabel: "Explore — tap to discover each 3D shape",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="18" width="28" height="28" rx="2" fill="#7C3AED"></rect><polygon points="4,18 16,6 44,6 32,18" fill="#A78BFA"></polygon><polygon points="32,18 44,6 44,34 32,46" fill="#5B21B6"></polygon></svg>`, name: "Cube", desc: "6 square faces. Like a dice or a box!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#7C3AED"></circle><ellipse cx="26" cy="26" rx="10" ry="22" fill="#A78BFA" opacity=".4"></ellipse></svg>`, name: "Sphere", desc: "Perfectly round. Like a ball or an orange!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="14" width="36" height="28" fill="#7C3AED"></rect><ellipse cx="26" cy="14" rx="18" ry="7" fill="#A78BFA"></ellipse><ellipse cx="26" cy="42" rx="18" ry="7" fill="#5B21B6"></ellipse></svg>`, name: "Cylinder", desc: "Round and tall. Like a can or a glass!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 50,48 2,48" fill="#7C3AED"></polygon><polygon points="26,4 50,48 38,48" fill="#5B21B6"></polygon></svg>`, name: "Pyramid", desc: "Pointy top. Like the pyramids of Egypt!" },
    ],
    dragLabel: "Activity — match each 3D shape to its real-life object",
    dragChips: [{ label: "Cube", val: "Cube" }, { label: "Sphere", val: "Sphere" }, { label: "Cylinder", val: "Cylinder" }, { label: "Pyramid", val: "Pyramid" }],
    dragZones: [
      { answer: "Cube", label: "Cube", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><text x="18" y="22" text-anchor="middle" font-size="11" fill="#C4B5FD" font-weight="700" font-family="Nunito">Dice</text><rect x="4" y="4" width="28" height="28" rx="2" fill="none" stroke="#C4B5FD" stroke-width="2"></rect></svg>` },
      { answer: "Sphere", label: "Sphere", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="13" fill="none" stroke="#C4B5FD" stroke-width="2"></circle><text x="18" y="22" text-anchor="middle" font-size="10" fill="#C4B5FD" font-weight="700" font-family="Nunito">Ball</text></svg>` },
      { answer: "Cylinder", label: "Cylinder", svgContent: `<svg width="32" height="36" viewBox="0 0 32 36"><rect x="2" y="8" width="28" height="22" fill="none" stroke="#C4B5FD" stroke-width="2"></rect><ellipse cx="16" cy="8" rx="14" ry="5" fill="none" stroke="#C4B5FD" stroke-width="1.5"></ellipse><text x="16" y="26" text-anchor="middle" font-size="9" fill="#C4B5FD" font-weight="700" font-family="Nunito">Can</text></svg>` },
      { answer: "Pyramid", label: "Pyramid", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,3 33,33 3,33" fill="none" stroke="#C4B5FD" stroke-width="2"></polygon><text x="18" y="28" text-anchor="middle" font-size="9" fill="#C4B5FD" font-weight="700" font-family="Nunito">Hat</text></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "Which 3D shape has NO flat faces?", options: [{ label: "Cube", correct: false }, { label: "Cylinder", correct: false }, { label: "Sphere", correct: true }, { label: "Pyramid", correct: false }] },
      { text: "How many faces does a CUBE have?", options: [{ label: "4", correct: false }, { label: "5", correct: false }, { label: "6", correct: true }, { label: "8", correct: false }] },
      { text: "A tin can is shaped like a…", options: [{ label: "Cube", correct: false }, { label: "Pyramid", correct: false }, { label: "Cylinder", correct: true }, { label: "Sphere", correct: false }] },
    ],
  },

  // ── Lesson 4 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a8030",
    accentColor: "#059669",
    badge: "Grade 1 · Lesson 4 of 10 · Maker Stage",
    typeBadge: "Activity",
    title: "Objects Built from Shapes",
    subtitle: "Look around — almost everything is built using basic shapes!",
    readings: [
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="24" width="36" height="24" rx="2" fill="#059669"></rect><polygon points="26,4 48,24 4,24" fill="#34D399"></polygon><rect x="20" y="34" width="12" height="14" rx="1" fill="white" opacity=".5"></rect></svg>`, heading: "House", body: "A house has a rectangle body and a triangle roof. Some houses also have circle windows and a rectangle door!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="28" width="44" height="18" rx="4" fill="#059669"></rect><rect x="12" y="16" width="28" height="16" rx="3" fill="#34D399"></rect><circle cx="12" cy="46" r="8" fill="#064E3B"></circle><circle cx="40" cy="46" r="8" fill="#064E3B"></circle></svg>`, heading: "Car", body: "A car body is a rectangle. The windows are smaller rectangles. The wheels are circles. Cars are made of many shapes working together!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="18" y="8" width="16" height="36" rx="8" fill="#059669"></rect><polygon points="18,40 34,40 26,50" fill="#047857"></polygon><rect x="18" y="8" width="16" height="8" rx="8" fill="#064E3B"></rect></svg>`, heading: "Pencil", body: "A pencil is a long cylinder (rectangle rolled up) with a triangle tip at the bottom and a small cylinder on top for the eraser!" },
    ],
    revealLabel: "Explore — tap to see what shapes make each object",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="24" width="36" height="24" rx="2" fill="#059669"></rect><polygon points="26,4 48,24 4,24" fill="#34D399"></polygon><rect x="20" y="34" width="12" height="14" rx="1" fill="white" opacity=".5"></rect></svg>`, name: "House", desc: "Rectangle + Triangle + Rectangle door!" },
      { frontSvg: `<svg width="52" height="40" viewBox="0 0 52 40"><polygon points="26,2 46,26 6,26" fill="#059669"></polygon><circle cx="26" cy="10" r="8" fill="#6EE7B7"></circle></svg>`, name: "Ice cream", desc: "A cone (triangle) + a scoop (circle)!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="10" y="18" width="32" height="26" rx="2" fill="#059669"></rect><rect x="18" y="8" width="16" height="14" rx="2" fill="#34D399"></rect></svg>`, name: "Robot", desc: "Rectangle body + Square head!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="20" y="28" width="12" height="22" rx="1" fill="#047857"></rect><polygon points="26,4 46,28 6,28" fill="#34D399"></polygon></svg>`, name: "Tree", desc: "Rectangle trunk + Triangle of leaves!" },
    ],
    dragLabel: "Activity — which shapes make up this object?",
    dragChips: [{ label: "Triangle", val: "Triangle" }, { label: "Circle", val: "Circle" }, { label: "Rectangle", val: "Rectangle" }, { label: "Square", val: "Square" }],
    dragZones: [
      { answer: "Triangle", label: "Triangle", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,3 33,32 3,32" fill="none" stroke="#6EE7B7" stroke-width="2"></polygon><text x="18" y="26" text-anchor="middle" font-size="9" fill="#6EE7B7" font-weight="700" font-family="Nunito">Roof</text></svg>` },
      { answer: "Circle", label: "Circle", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="13" fill="none" stroke="#6EE7B7" stroke-width="2"></circle><text x="18" y="22" text-anchor="middle" font-size="9" fill="#6EE7B7" font-weight="700" font-family="Nunito">Wheel</text></svg>` },
      { answer: "Rectangle", label: "Rectangle", svgContent: `<svg width="36" height="22" viewBox="0 0 36 22"><rect x="2" y="2" width="32" height="18" rx="2" fill="none" stroke="#6EE7B7" stroke-width="2"></rect><text x="18" y="14" text-anchor="middle" font-size="9" fill="#6EE7B7" font-weight="700" font-family="Nunito">Door</text></svg>` },
      { answer: "Square", label: "Square", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="2" fill="none" stroke="#6EE7B7" stroke-width="2"></rect><text x="18" y="22" text-anchor="middle" font-size="9" fill="#6EE7B7" font-weight="700" font-family="Nunito">Window</text></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "What shape is a house roof?", options: [{ label: "Circle", correct: false }, { label: "Rectangle", correct: false }, { label: "Triangle", correct: true }, { label: "Square", correct: false }] },
      { text: "Car wheels are shaped like…", options: [{ label: "Squares", correct: false }, { label: "Triangles", correct: false }, { label: "Rectangles", correct: false }, { label: "Circles", correct: true }] },
      { text: "Which two shapes make a simple tree?", options: [{ label: "Cube + Sphere", correct: false }, { label: "Square + Circle", correct: false }, { label: "Rectangle + Triangle", correct: true }, { label: "Cylinder + Rectangle", correct: false }] },
    ],
  },

  // ── Lesson 5 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a8031",
    accentColor: "#D97706",
    badge: "Grade 1 · Lesson 5 of 10 · Maker Stage",
    typeBadge: "Activity",
    title: "Drawing Objects Using Shapes",
    subtitle: "Break any object into basic shapes — then draw it step by step!",
    readings: [
      { svgIcon: `<svg width="52" height="36" viewBox="0 0 52 36"><ellipse cx="26" cy="18" rx="22" ry="14" fill="none" stroke="#D97706" stroke-width="3"></ellipse><circle cx="26" cy="18" r="7" fill="#D97706"></circle><circle cx="29" cy="15" r="2.5" fill="white"></circle></svg>`, heading: "Step 1 — Look and observe", body: "Look at the object carefully. Ask: what shapes can I see? A face is a circle with smaller circles for eyes. A car is rectangles and circles." },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="18" y="6" width="16" height="32" rx="4" fill="#D97706"></rect><polygon points="18,38 34,38 26,50" fill="#059669"></polygon><rect x="18" y="6" width="16" height="8" rx="4" fill="#1e3a2f"></rect></svg>`, heading: "Step 2 — Sketch the shapes", body: "Draw the big shapes first. Then add the smaller shapes on top. Use light, soft lines — you can always erase and fix them!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#D97706"></circle><polyline points="14,26 22,34 38,18" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>`, heading: "Step 3 — Check and refine", body: "Compare your drawing with the real object. Does it match? Add details like doors, windows, or handles to make it better." },
    ],
    revealLabel: "Explore — tap to see how objects are drawn using shapes",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="18" r="12" fill="#D97706" opacity=".3" stroke="#D97706" stroke-width="2"></circle><circle cx="21" cy="16" r="3" fill="#D97706"></circle><circle cx="31" cy="16" r="3" fill="#D97706"></circle><path d="M20,24 Q26,29 32,24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round"></path><rect x="18" y="30" width="16" height="18" rx="4" fill="#D97706" opacity=".4" stroke="#D97706" stroke-width="2"></rect></svg>`, name: "Person", desc: "Head = circle. Body = rectangle. Eyes = small circles!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="24" width="36" height="24" rx="2" fill="#D97706"></rect><polygon points="26,4 48,24 4,24" fill="#FBBF24"></polygon><rect x="20" y="34" width="12" height="14" rx="1" fill="white" opacity=".5"></rect></svg>`, name: "House", desc: "Body = big rectangle. Roof = triangle on top!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="26" width="44" height="18" rx="4" fill="#D97706" opacity=".5" stroke="#D97706" stroke-width="2"></rect><rect x="14" y="16" width="22" height="14" rx="3" fill="#D97706" opacity=".3" stroke="#D97706" stroke-width="1.5"></rect><circle cx="14" cy="44" r="7" fill="#92400E" stroke="#D97706" stroke-width="1.5"></circle><circle cx="38" cy="44" r="7" fill="#92400E" stroke="#D97706" stroke-width="1.5"></circle></svg>`, name: "Car", desc: "Body = rectangle. Top = smaller rectangle. Wheels = circles!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="20" y="26" width="12" height="22" rx="1" fill="#92400E" stroke="#D97706" stroke-width="2"></rect><polygon points="26,4 46,26 6,26" fill="#D97706" opacity=".6" stroke="#D97706" stroke-width="2"></polygon></svg>`, name: "Tree", desc: "Trunk = rectangle. Leaves = triangle on top!" },
    ],
    dragLabel: "Put the drawing steps in order",
    dragChips: [{ label: "Observe the object", val: "Observe the object" }, { label: "Sketch big shapes", val: "Sketch big shapes" }, { label: "Add small details", val: "Add small details" }, { label: "Check and refine", val: "Check and refine" }],
    dragZones: [
      { answer: "Observe the object", label: "First", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#D97706"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">1</text></svg>` },
      { answer: "Sketch big shapes", label: "Second", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#D97706"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">2</text></svg>` },
      { answer: "Add small details", label: "Third", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#D97706"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">3</text></svg>` },
      { answer: "Check and refine", label: "Fourth", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#D97706"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">4</text></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "What should you do FIRST before drawing?", options: [{ label: "Add color", correct: false }, { label: "Observe the object", correct: true }, { label: "Erase mistakes", correct: false }, { label: "Show your friend", correct: false }] },
      { text: "When drawing an object, start with…", options: [{ label: "Small details", correct: false }, { label: "Colors", correct: false }, { label: "Big shapes first", correct: true }, { label: "Labels", correct: false }] },
      { text: "How do you make your drawing better after sketching?", options: [{ label: "Start over", correct: false }, { label: "Add details and refine", correct: true }, { label: "Draw faster", correct: false }, { label: "Use more paper", correct: false }] },
    ],
  },

  // ── Lesson 6 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a8032",
    accentColor: "#DB2777",
    badge: "Grade 1 · Lesson 6 of 10 · Maker Stage",
    typeBadge: "Activity",
    title: "Creative Shape Designs",
    subtitle: "Use shapes in creative ways to design something no one has ever seen before!",
    readings: [
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="6" y="6" width="40" height="40" rx="4" fill="none" stroke="#DB2777" stroke-width="2.5"></rect><circle cx="26" cy="26" r="8" fill="#DB2777"></circle><line x1="26" y1="6" x2="26" y2="18" stroke="#DB2777" stroke-width="2"></line><line x1="26" y1="34" x2="26" y2="46" stroke="#DB2777" stroke-width="2"></line><line x1="6" y1="26" x2="18" y2="26" stroke="#DB2777" stroke-width="2"></line><line x1="34" y1="26" x2="46" y2="26" stroke="#DB2777" stroke-width="2"></line></svg>`, heading: "What is creative design?", body: "Creative design means using shapes in new and imaginative ways. You take simple shapes — circle, square, triangle — and arrange them to make something original and useful!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,3 31,20 49,20 36,30 41,47 26,37 11,47 16,30 3,20 21,20" fill="#DB2777"></polygon></svg>`, heading: "There is no wrong answer!", body: "In creative design, there is no single correct answer. Two students can use the same shapes and make completely different, equally great designs. Your idea is unique!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="20" r="14" fill="#DB2777"></circle><rect x="20" y="34" width="12" height="5" rx="2" fill="#B45309"></rect><rect x="21" y="39" width="10" height="5" rx="2" fill="#92400E"></rect></svg>`, heading: "Get inspired by problems", body: "The best designs solve a problem. Think: what does someone need? Then design a shape-based object that could help them. That's how inventors think!" },
    ],
    revealLabel: "Explore — tap to see creative shape combinations",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="16" width="36" height="30" rx="4" fill="#DB2777" opacity=".7"></rect><polygon points="26,2 46,16 6,16" fill="#F472B6"></polygon><rect x="20" y="32" width="12" height="14" rx="1" fill="#9D174D"></rect></svg>`, name: "Dream house", desc: "Rectangle + Triangle + Rectangle = a cozy home!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="16" r="12" fill="#DB2777" opacity=".5" stroke="#DB2777" stroke-width="2"></circle><circle cx="18" cy="14" r="3" fill="#DB2777"></circle><circle cx="28" cy="14" r="3" fill="#DB2777"></circle><path d="M16,22 Q22,27 30,22" fill="none" stroke="#DB2777" stroke-width="2"></path><polygon points="26,28 18,46 34,46" fill="#F472B6"></polygon></svg>`, name: "Shape robot", desc: "Circle head + Triangle body = a friendly robot!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 50,28 2,28" fill="#DB2777"></polygon><rect x="10" y="28" width="32" height="20" rx="2" fill="#F472B6"></rect><circle cx="26" cy="36" r="6" fill="#9D174D"></circle></svg>`, name: "Space rocket", desc: "Triangle nose + Rectangle body = blast off!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="20" y="10" width="12" height="32" rx="2" fill="#DB2777"></rect><rect x="8" y="20" width="36" height="12" rx="2" fill="#F472B6"></rect><circle cx="26" cy="26" r="5" fill="#9D174D"></circle></svg>`, name: "Plus-sign bridge", desc: "Two rectangles crossing = a plus-sign structure!" },
    ],
    dragLabel: "Activity — match the creative object to the shapes that make it",
    dragChips: [{ label: "Circle + Triangle", val: "Circle + Triangle" }, { label: "Rectangle + Triangle", val: "Rectangle + Triangle" }, { label: "Square + Rectangle", val: "Square + Rectangle" }, { label: "Triangle + Rectangle", val: "Triangle + Rectangle" }],
    dragZones: [
      { answer: "Rectangle + Triangle", label: "House", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="18" width="28" height="16" rx="2" fill="none" stroke="#F9A8D4" stroke-width="2"></rect><polygon points="18,3 32,18 4,18" fill="none" stroke="#F9A8D4" stroke-width="2"></polygon></svg>` },
      { answer: "Circle + Triangle", label: "Ice cream", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,16 28,34 8,34" fill="none" stroke="#F9A8D4" stroke-width="2"></polygon><circle cx="18" cy="10" r="8" fill="none" stroke="#F9A8D4" stroke-width="2"></circle></svg>` },
      { answer: "Triangle + Rectangle", label: "Rocket", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,2 32,14 4,14" fill="none" stroke="#F9A8D4" stroke-width="2"></polygon><rect x="6" y="14" width="24" height="20" rx="2" fill="none" stroke="#F9A8D4" stroke-width="2"></rect></svg>` },
      { answer: "Square + Rectangle", label: "Robot", svgContent: `<svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#F9A8D4" stroke-width="2"></rect><rect x="16" y="8" width="18" height="10" rx="2" fill="none" stroke="#F9A8D4" stroke-width="2"></rect></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "In creative design, is there a single correct answer?", options: [{ label: "Yes, always", correct: false }, { label: "No, many ideas work", correct: true }, { label: "Only if your teacher agrees", correct: false }, { label: "Only for shapes", correct: false }] },
      { text: "The BEST designs…", options: [{ label: "Use the most shapes", correct: false }, { label: "Look the prettiest", correct: false }, { label: "Solve a problem", correct: true }, { label: "Take the longest time", correct: false }] },
      { text: "What shapes make a simple rocket?", options: [{ label: "Circle + Square", correct: false }, { label: "Triangle + Rectangle", correct: true }, { label: "Square + Triangle", correct: false }, { label: "Circle + Rectangle", correct: false }] },
    ],
  },

  // ── Lesson 7 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a8033",
    accentColor: "#B45309",
    badge: "Grade 1 · Lesson 7 of 10 · Maker Stage",
    typeBadge: "Activity",
    title: "Model Building with Clay",
    subtitle: "Roll, press, and shape clay to make real 3D models with your hands!",
    readings: [
      { svgIcon: `<svg width="52" height="44" viewBox="0 0 52 44"><ellipse cx="26" cy="36" rx="20" ry="7" fill="#B45309" opacity=".7"></ellipse><ellipse cx="26" cy="24" rx="13" ry="13" fill="#B45309"></ellipse></svg>`, heading: "Why clay?", body: "Clay is the perfect material for early model building. You can roll it into spheres, press it flat into discs, and shape it into cubes and cylinders — then start over if you make a mistake!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#B45309"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">1</text></svg>`, heading: "Basic clay techniques", body: "Roll into a ball (sphere). Press flat with your palm (disc). Roll into a log (cylinder). Press into a box shape (cube). Pinch a top to a point (pyramid)!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#B45309"></circle><polyline points="14,26 22,34 38,18" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>`, heading: "Compare to the plan", body: `After building, hold your clay model up to your sketch. Does the shape match? Are the sizes right? This is called "checking your prototype"!` },
    ],
    revealLabel: "Explore — tap to see each clay technique",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#B45309"></circle><ellipse cx="26" cy="26" rx="10" ry="22" fill="#FCD34D" opacity=".4"></ellipse></svg>`, name: "Roll into a ball", desc: "Cup your hands and roll clay in circles — you get a sphere!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="14" width="36" height="28" fill="#B45309"></rect><ellipse cx="26" cy="14" rx="18" ry="7" fill="#FCD34D"></ellipse><ellipse cx="26" cy="42" rx="18" ry="7" fill="#92400E"></ellipse></svg>`, name: "Roll into a log", desc: "Roll clay back and forth on a flat surface — you get a cylinder!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="18" width="28" height="28" rx="2" fill="#B45309"></rect><polygon points="4,18 16,6 44,6 32,18" fill="#FCD34D"></polygon><polygon points="32,18 44,6 44,34 32,46" fill="#78350F"></polygon></svg>`, name: "Press into a cube", desc: "Flatten 6 sides evenly and press them together — you get a cube!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 50,48 2,48" fill="#B45309"></polygon><polygon points="26,4 50,48 38,48" fill="#78350F"></polygon></svg>`, name: "Pinch into a pyramid", desc: "Start with a cube base and pinch the top to a point — pyramid!" },
    ],
    dragLabel: "Put the clay model-building steps in order",
    dragChips: [{ label: "Sketch your plan", val: "Sketch your plan" }, { label: "Gather clay", val: "Gather clay" }, { label: "Shape the clay", val: "Shape the clay" }, { label: "Compare to sketch", val: "Compare to sketch" }],
    dragZones: [
      { answer: "Sketch your plan", label: "Step 1", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#B45309"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">1</text></svg>` },
      { answer: "Gather clay", label: "Step 2", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#B45309"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">2</text></svg>` },
      { answer: "Shape the clay", label: "Step 3", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#B45309"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">3</text></svg>` },
      { answer: "Compare to sketch", label: "Step 4", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#B45309"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">4</text></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "Which clay technique makes a SPHERE?", options: [{ label: "Press flat", correct: false }, { label: "Roll into a log", correct: false }, { label: "Cup hands and roll", correct: true }, { label: "Pinch the top", correct: false }] },
      { text: "What should you do AFTER building your clay model?", options: [{ label: "Throw it away", correct: false }, { label: "Compare it to your plan", correct: true }, { label: "Paint it immediately", correct: false }, { label: "Give it to a friend", correct: false }] },
      { text: "Clay is great for models because…", options: [{ label: "It is very expensive", correct: false }, { label: "You can reshape it if you make a mistake", correct: true }, { label: "It dries in 1 minute", correct: false }, { label: "It is very heavy", correct: false }] },
    ],
  },

  // ── Lesson 8 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a8034",
    accentColor: "#0891B2",
    badge: "Grade 1 · Lesson 8 of 10 · Maker Stage",
    typeBadge: "Reading",
    title: "Introduction to Design Ideas",
    subtitle: "Every great invention starts as a simple idea — learn how designers think!",
    readings: [
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="20" r="14" fill="#0891B2"></circle><rect x="20" y="34" width="12" height="5" rx="2" fill="#B45309"></rect><rect x="21" y="39" width="10" height="5" rx="2" fill="#92400E"></rect></svg>`, heading: "What is a design idea?", body: "A design idea is a thought about how to make something new or improve something that already exists. It starts in your mind, then becomes a sketch, then a model, then a real product!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="20" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.5"></circle><text x="26" y="32" text-anchor="middle" font-size="22" font-weight="900" fill="#0891B2" font-family="Nunito">?</text></svg>`, heading: "Start with a problem", body: "Good design ideas come from real problems. Ask: what is hard or annoying? What is missing? What could be better? The answer to those questions is your design problem to solve!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,4 48,44 4,44" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.5"></polygon><line x1="26" y1="20" x2="26" y2="32" stroke="#0891B2" stroke-width="3" stroke-linecap="round"></line><circle cx="26" cy="37" r="2.5" fill="#0891B2"></circle></svg>`, heading: "It is okay to have many ideas", body: "Designers write down ALL their ideas, even the silly ones! Sometimes the silliest idea leads to the greatest invention. Never throw away an idea before trying it." },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="18" y="6" width="16" height="32" rx="4" fill="#0891B2"></rect><polygon points="18,38 34,38 26,50" fill="#059669"></polygon><rect x="18" y="6" width="16" height="8" rx="4" fill="#1e3a2f"></rect></svg>`, heading: "Sketch your idea", body: "Once you have an idea, sketch it on paper. Label the parts. Show how it works. A sketch turns your invisible idea into something you can see and share with others!" },
    ],
    revealLabel: "Explore — tap to learn each part of the design thinking process",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="20" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.5"></circle><text x="26" y="31" text-anchor="middle" font-size="22" font-weight="900" fill="#0891B2" font-family="Nunito">?</text></svg>`, name: "Notice a problem", desc: "Look around — what could be improved or fixed?" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="20" r="14" fill="#0891B2"></circle><rect x="20" y="34" width="12" height="5" rx="2" fill="#B45309"></rect><rect x="21" y="39" width="10" height="5" rx="2" fill="#92400E"></rect></svg>`, name: "Get ideas", desc: "Think of many possible solutions — even wild ones!" },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="18" y="6" width="16" height="32" rx="4" fill="#0891B2"></rect><polygon points="18,38 34,38 26,50" fill="#059669"></polygon><rect x="18" y="6" width="16" height="8" rx="4" fill="#1e3a2f"></rect></svg>`, name: "Sketch it", desc: "Draw your best idea and label all the parts." },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#0891B2"></circle><polyline points="14,26 22,34 38,18" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>`, name: "Share it", desc: "Show others your sketch and get their feedback!" },
    ],
    dragLabel: "Put the design thinking steps in order",
    dragChips: [{ label: "Notice a problem", val: "Notice a problem" }, { label: "Get ideas", val: "Get ideas" }, { label: "Sketch it", val: "Sketch it" }, { label: "Share it", val: "Share it" }],
    dragZones: [
      { answer: "Notice a problem", label: "Step 1", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#0891B2"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">1</text></svg>` },
      { answer: "Get ideas", label: "Step 2", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#0891B2"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">2</text></svg>` },
      { answer: "Sketch it", label: "Step 3", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#0891B2"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">3</text></svg>` },
      { answer: "Share it", label: "Step 4", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#0891B2"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">4</text></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "Where do good design ideas come from?", options: [{ label: "Expensive stores", correct: false }, { label: "Real problems", correct: true }, { label: "Other people's drawings", correct: false }, { label: "The internet", correct: false }] },
      { text: "When should you throw away an idea?", options: [{ label: "If it sounds silly", correct: false }, { label: "If it is small", correct: false }, { label: "Never — write them all down", correct: true }, { label: "After 5 minutes", correct: false }] },
      { text: "Why do designers sketch their ideas?", options: [{ label: "To make art", correct: false }, { label: "To turn invisible ideas into something visible", correct: true }, { label: "Because teachers require it", correct: false }, { label: "To use up paper", correct: false }] },
    ],
  },

  // ── Lesson 9 ──────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a8035",
    accentColor: "#6D28D9",
    badge: "Grade 1 · Lesson 9 of 10 · Maker Stage",
    typeBadge: "Activity",
    title: "Observing 3D Printing",
    subtitle: "Watch how a 3D printer works — from digital design to real object, layer by layer!",
    readings: [
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="18" width="36" height="22" rx="3" fill="#6D28D9"></rect><rect x="14" y="8" width="24" height="12" rx="2" fill="#6D28D9" opacity=".6"></rect><rect x="14" y="34" width="24" height="14" rx="2" fill="white" stroke="#6D28D9" stroke-width="1.5"></rect><circle cx="38" cy="27" r="3" fill="white"></circle></svg>`, heading: "What is a 3D printer?", body: `A 3D printer is a machine that builds real objects layer by layer. It reads a digital design from a computer and slowly "prints" the object by melting and stacking thin layers of plastic called filament!` },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="6" y="36" width="40" height="6" rx="2" fill="#6D28D9" opacity=".3"></rect><rect x="6" y="28" width="40" height="6" rx="2" fill="#6D28D9" opacity=".5"></rect><rect x="6" y="20" width="40" height="6" rx="2" fill="#6D28D9" opacity=".7"></rect><rect x="6" y="12" width="40" height="6" rx="2" fill="#6D28D9"></rect></svg>`, heading: "Layer by layer", body: "3D printing builds objects from the bottom up, one thin layer at a time. Each layer is like one slice of bread — stack enough slices and you have a loaf! The layers fuse together to form the final shape." },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="6" width="44" height="32" rx="4" fill="#EDE9FE" stroke="#6D28D9" stroke-width="2"></rect><line x1="12" y1="16" x2="32" y2="16" stroke="#6D28D9" stroke-width="2"></line><line x1="12" y1="22" x2="28" y2="22" stroke="#C4B5FD" stroke-width="2"></line><line x1="12" y1="28" x2="22" y2="28" stroke="#C4B5FD" stroke-width="2"></line><polygon points="26,38 22,52 30,52" fill="#6D28D9"></polygon></svg>`, heading: "Design → Print", body: "First, someone designs the object on a computer using CAD software. Then they send the file to the printer. The printer does the rest — melting filament and building the object automatically!" },
    ],
    revealLabel: "Explore — tap to discover key 3D printing facts",
    revealCards: [
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="8" y="18" width="36" height="22" rx="3" fill="#6D28D9"></rect><rect x="14" y="8" width="24" height="12" rx="2" fill="#6D28D9" opacity=".6"></rect><rect x="14" y="34" width="24" height="14" rx="2" fill="white" stroke="#6D28D9" stroke-width="1.5"></rect><circle cx="38" cy="27" r="3" fill="white"></circle></svg>`, name: "3D printer", desc: "A machine that builds real objects from plastic filament, layer by layer!" },
      { frontSvg: `<svg width="52" height="36" viewBox="0 0 52 36"><rect x="2" y="4" width="48" height="8" rx="2" fill="#6D28D9"></rect><rect x="2" y="14" width="44" height="8" rx="2" fill="#8B5CF6"></rect><rect x="2" y="24" width="38" height="8" rx="2" fill="#A78BFA"></rect></svg>`, name: "Filament layers", desc: "The printer stacks thin layers of melted plastic to build up the shape." },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="6" y="6" width="40" height="40" rx="4" fill="#EDE9FE" stroke="#6D28D9" stroke-width="2"></rect><polyline points="14,34 20,22 28,30 34,16 40,22" fill="none" stroke="#6D28D9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>`, name: "CAD design", desc: "The object is drawn on a computer first, then sent to the printer." },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="4" y="18" width="28" height="28" rx="2" fill="#6D28D9"></rect><polygon points="4,18 16,6 44,6 32,18" fill="#A78BFA"></polygon><polygon points="32,18 44,6 44,34 32,46" fill="#5B21B6"></polygon></svg>`, name: "Finished object", desc: "After printing, you get a real, solid 3D object you can hold!" },
    ],
    dragLabel: "Put the 3D printing steps in order",
    dragChips: [{ label: "Design on computer", val: "Design on computer" }, { label: "Send to printer", val: "Send to printer" }, { label: "Printer builds layers", val: "Printer builds layers" }, { label: "Object is complete", val: "Object is complete" }],
    dragZones: [
      { answer: "Design on computer", label: "Step 1", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#6D28D9"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">1</text></svg>` },
      { answer: "Send to printer", label: "Step 2", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#6D28D9"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">2</text></svg>` },
      { answer: "Printer builds layers", label: "Step 3", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#6D28D9"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">3</text></svg>` },
      { answer: "Object is complete", label: "Step 4", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#6D28D9"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">4</text></svg>` },
    ],
    quizLabel: "Quiz — test what you know",
    quiz: [
      { text: "How does a 3D printer build objects?", options: [{ label: "All at once", correct: false }, { label: "Layer by layer", correct: true }, { label: "By melting a whole block", correct: false }, { label: "By carving wood", correct: false }] },
      { text: "What material does a common 3D printer use?", options: [{ label: "Metal wire", correct: false }, { label: "Wood chips", correct: false }, { label: "Plastic filament", correct: true }, { label: "Paper pulp", correct: false }] },
      { text: "Before printing, you must first…", options: [{ label: "Buy the object", correct: false }, { label: "Design it on a computer", correct: true }, { label: "Mix colors", correct: false }, { label: "Heat the room", correct: false }] },
    ],
  },

  // ── Lesson 10 ─────────────────────────────────────────────────────────────
  {
    id: "69ddc685f048754ba85a8036",
    accentColor: "#BE185D",
    badge: "Grade 1 · Lesson 10 of 10 · Maker Stage",
    typeBadge: "Project",
    title: "Simple Model Project",
    subtitle: "Put it all together — plan, design, build, and share your own shape-based model!",
    readings: [
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#BE185D"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">1</text></svg>`, heading: "Step 1 — Choose your object", body: "Think of a simple everyday object you want to build: a house, a car, a robot, a fruit, a bridge. Make sure it is made of basic shapes you know (circles, squares, triangles, rectangles)!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="18" y="6" width="16" height="32" rx="4" fill="#BE185D"></rect><polygon points="18,38 34,38 26,50" fill="#059669"></polygon><rect x="18" y="6" width="16" height="8" rx="4" fill="#1e3a2f"></rect></svg>`, heading: "Step 2 — Sketch and label", body: `Draw your object on paper. Label each part with its shape name. For example: "roof = triangle", "wall = rectangle", "window = square". This is your design plan!` },
      { svgIcon: `<svg width="52" height="44" viewBox="0 0 52 44"><ellipse cx="26" cy="36" rx="20" ry="7" fill="#BE185D" opacity=".7"></ellipse><ellipse cx="26" cy="24" rx="13" ry="13" fill="#BE185D"></ellipse></svg>`, heading: "Step 3 — Build your model", body: "Use clay, cardboard, blocks, or any materials available. Follow your sketch. Start with the biggest part, then add the smaller parts. Take your time!" },
      { svgIcon: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#BE185D"></circle><polyline points="14,26 22,34 38,18" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>`, heading: "Step 4 — Present your work", body: "When finished, show your model to the class. Say: what is it, what shapes did you use, what problem does it solve (or what do you like about it)?" },
    ],
    revealLabel: "Explore — tap to review all the skills you used in this lesson",
    revealCards: [
      { frontSvg: `<svg width="52" height="36" viewBox="0 0 52 36"><ellipse cx="26" cy="18" rx="22" ry="14" fill="none" stroke="#BE185D" stroke-width="3"></ellipse><circle cx="26" cy="18" r="7" fill="#BE185D"></circle><circle cx="29" cy="15" r="2.5" fill="white"></circle></svg>`, name: "Observe", desc: "You looked at real objects and identified the shapes inside them." },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><rect x="18" y="6" width="16" height="32" rx="4" fill="#BE185D"></rect><polygon points="18,38 34,38 26,50" fill="#059669"></polygon><rect x="18" y="6" width="16" height="8" rx="4" fill="#1e3a2f"></rect></svg>`, name: "Sketch", desc: "You drew objects using basic shapes and labeled their parts." },
      { frontSvg: `<svg width="52" height="44" viewBox="0 0 52 44"><ellipse cx="26" cy="36" rx="20" ry="7" fill="#BE185D" opacity=".7"></ellipse><ellipse cx="26" cy="24" rx="13" ry="13" fill="#BE185D"></ellipse></svg>`, name: "Build", desc: "You used clay or materials to build 3D models with your hands." },
      { frontSvg: `<svg width="52" height="52" viewBox="0 0 52 52"><polygon points="26,3 31,20 49,20 36,30 41,47 26,37 11,47 16,30 3,20 21,20" fill="#BE185D"></polygon></svg>`, name: "Share", desc: "You presented your creation and explained your design choices!" },
    ],
    dragLabel: "Put the project steps in the right order",
    dragChips: [{ label: "Choose your object", val: "Choose your object" }, { label: "Sketch and label", val: "Sketch and label" }, { label: "Build your model", val: "Build your model" }, { label: "Present your work", val: "Present your work" }],
    dragZones: [
      { answer: "Choose your object", label: "Step 1", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#BE185D"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">1</text></svg>` },
      { answer: "Sketch and label", label: "Step 2", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#BE185D"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">2</text></svg>` },
      { answer: "Build your model", label: "Step 3", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#BE185D"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">3</text></svg>` },
      { answer: "Present your work", label: "Step 4", svgContent: `<svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="#BE185D"></circle><text x="26" y="34" text-anchor="middle" font-size="26" font-weight="900" fill="white" font-family="Nunito,sans-serif">4</text></svg>` },
    ],
    quizLabel: "Final quiz — show what you learned all lesson!",
    quiz: [
      { text: "What should you do FIRST in the model project?", options: [{ label: "Build right away", correct: false }, { label: "Present to class", correct: false }, { label: "Choose your object", correct: true }, { label: "Paint it", correct: false }] },
      { text: "In your sketch, you should label…", options: [{ label: "Only the colors", correct: false }, { label: "Each part with its shape name", correct: true }, { label: "Only the big shapes", correct: false }, { label: "Nothing — just draw", correct: false }] },
      { text: "When presenting, you should explain…", options: [{ label: "How long it took", correct: false }, { label: "What it is and what shapes you used", correct: true }, { label: "Who helped you", correct: false }, { label: "Why you chose that color", correct: false }] },
    ],
  },
];