import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";

const STYLES = {
  start: { fill: "#dcfce7", active: "#bbf7d0", stroke: "#16a34a", text: "#14532d" },
  process: { fill: "#dbeafe", active: "#bfdbfe", stroke: "#2563eb", text: "#1e3a8a" },
  decision: { fill: "#ffedd5", active: "#fed7aa", stroke: "#ea580c", text: "#7c2d12" },
  end: { fill: "#fee2e2", active: "#fecaca", stroke: "#dc2626", text: "#7f1d1d" },
};

function n(id, label, type, x, y, w, h) {
  return { id, label, type, x, y, w, h };
}

const FLOWS = {
  A: {
    name: "Obstacle Avoidance",
    w: 780,
    h: 780,
    defaults: { distance: 50, left: 40, right: 40 },
    nodes: [
      n("loop", "loop()", "start", 390, 46, 140, 40),
      n("read", "d = distanceFiltered()\nmedian of 3 readings", "process", 390, 122, 220, 52),
      n("stop_check", "d ≤ 25?", "decision", 390, 214, 156, 74),
      n("avoid", "avoid()", "process", 150, 330, 130, 42),
      n("slow_check", "d < 45?", "decision", 590, 330, 146, 74),
      n("backup", "stop + backup\n300 ms", "process", 150, 414, 150, 50),
      n("look", "right = lookAt(20°)\nleft = lookAt(160°)", "process", 150, 500, 180, 50),
      n("both_check", "both < 25?", "decision", 150, 598, 156, 74),
      n("turn_around", "turn 180°\nTURN_MS × 3", "process", 150, 710, 150, 50),
      n("lr_check", "left > right?", "decision", 400, 598, 156, 74),
      n("spin_left", "spin left\nTURN_MS", "process", 320, 710, 120, 48),
      n("spin_right", "spin right\nTURN_MS", "process", 490, 710, 124, 48),
      n("slow", "forward\n3/4 speed", "process", 500, 448, 130, 50),
      n("cruise", "forward\nCRUISE_SPEED", "process", 670, 448, 140, 50),
    ],
    edges: [
      { from: "loop", to: "read" },
      { from: "read", to: "stop_check" },
      { from: "stop_check", to: "avoid", label: "Yes", side: "left" },
      { from: "stop_check", to: "slow_check", label: "No", side: "right" },
      { from: "avoid", to: "backup" },
      { from: "backup", to: "look" },
      { from: "look", to: "both_check" },
      { from: "both_check", to: "turn_around", label: "Yes" },
      { from: "both_check", to: "lr_check", label: "No", side: "right" },
      { from: "lr_check", to: "spin_left", label: "Yes", side: "left" },
      { from: "lr_check", to: "spin_right", label: "No", side: "right" },
      { from: "slow_check", to: "slow", label: "Yes", side: "left" },
      { from: "slow_check", to: "cruise", label: "No", side: "right" },
    ],
    evaluate(i) {
      const p = ["loop", "read", "stop_check"];
      if (i.distance <= 25) {
        p.push("avoid", "backup", "look", "both_check");
        if (i.left < 25 && i.right < 25) p.push("turn_around");
        else p.push("lr_check", i.left > i.right ? "spin_left" : "spin_right");
      } else p.push("slow_check", i.distance < 45 ? "slow" : "cruise");
      return p;
    },
    explain: {
      loop: "The car checks the world again and again.",
      read: "It beeps three times and keeps the middle number, so one bad ping does not scare it.",
      stop_check: "25 cm or closer is too near. Stop and look for a way around.",
      avoid: "Do not keep driving into the thing ahead.",
      backup: "Reverse a little so the next look has room.",
      look: "Turn the eye right, then left, and remember both distances.",
      both_check: "If both sides are blocked too, turn all the way around.",
      turn_around: "Spin about halfway around and try a new direction.",
      lr_check: "Pick the side with more empty space.",
      spin_left: "Left is more open, so spin left.",
      spin_right: "Right is clearer, so spin right.",
      slow_check: "Not an emergency. Still close enough to slow down?",
      slow: "Something is ahead. Creep.",
      cruise: "The road is open. Drive at full cruise speed.",
    },
  },
  B: {
    name: "Line Follower (PD)",
    w: 760,
    h: 700,
    defaults: { s1: false, s2: true, s3: true, s4: false, lastError: 0 },
    nodes: [
      n("loop", "loop()", "start", 380, 46, 140, 40),
      n("read", "seen = readLine(&err)\nerr = average weight of black sensors", "process", 380, 124, 250, 52),
      n("seen0", "seen == 0?", "decision", 380, 222, 150, 74),
      n("last_err", "lastError < 0?", "decision", 150, 350, 164, 74),
      n("seen4", "seen == 4?", "decision", 590, 350, 150, 74),
      n("search_l", "spin left\nsearch for line", "process", 70, 490, 140, 50),
      n("search_r", "spin right\nsearch for line", "process", 230, 490, 146, 50),
      n("pd", "correction = KP×err\n+ KD×(err − lastErr)", "process", 430, 490, 190, 52),
      n("cross", "drive straight\ncross or finish", "process", 640, 490, 150, 50),
      n("motor", "left = BASE + corr\nright = BASE − corr", "process", 430, 590, 180, 50),
      n("back", "delay(5) → loop", "process", 380, 660, 160, 40),
    ],
    edges: [
      { from: "loop", to: "read" },
      { from: "read", to: "seen0" },
      { from: "seen0", to: "last_err", label: "Yes", side: "left" },
      { from: "seen0", to: "seen4", label: "No", side: "right" },
      { from: "last_err", to: "search_l", label: "Yes", side: "left" },
      { from: "last_err", to: "search_r", label: "No", side: "right" },
      { from: "seen4", to: "cross", label: "Yes" },
      { from: "seen4", to: "pd", label: "No", side: "left" },
      { from: "pd", to: "motor" },
      { from: "motor", to: "back" },
      { from: "search_l", to: "back" },
      { from: "search_r", to: "back" },
      { from: "cross", to: "back" },
    ],
    evaluate(i) {
      const seen = [i.s1, i.s2, i.s3, i.s4].filter(Boolean).length;
      const p = ["loop", "read", "seen0"];
      if (seen === 0) p.push("last_err", i.lastError < 0 ? "search_l" : "search_r", "back");
      else if (seen === 4) p.push("seen4", "cross", "back");
      else p.push("seen4", "pd", "motor", "back");
      return p;
    },
    explain: {
      loop: "Start of the fast line-follow loop.",
      read: "Count how many eyes see black. Left eyes pull the error negative.",
      seen0: "No eye sees the tape. The line is lost.",
      last_err: "Search back toward the side where the tape was last seen.",
      search_l: "The tape was to the left. Spin left.",
      search_r: "The tape was to the right, or straight ahead. Spin right.",
      seen4: "At least one eye sees the tape. Are all four black?",
      cross: "All four black usually means a cross or the finish bar. Drive straight over it.",
      pd: "Steer back to the tape. P fixes the miss. D stops a wild swing.",
      motor: "Speed up the wheel on the far side so the car turns toward the tape.",
      back: "Wait a tiny moment, then look again.",
    },
  },
  C1: {
    name: "Line Maze Solver (C1)",
    w: 820,
    h: 1020,
    defaults: { replay: false, allBlack: false },
    nodes: [
      n("setup", "setup()", "start", 400, 46, 140, 40),
      n("mode", "D12 == LOW?", "decision", 400, 136, 164, 76),
      n("replay", "loadPath()\nfrom EEPROM", "process", 160, 262, 160, 52),
      n("explore", "EXPLORE mode", "process", 640, 262, 156, 44),
      n("follow", "followSegment()\nfollow the line until a\nbranch or a dead end", "process", 400, 390, 230, 64),
      n("junction", "handleJunction()\ninch forward, then\ncheck left / straight / right", "process", 400, 500, 240, 64),
      n("all_black", "all 4 black?", "decision", 400, 612, 168, 78),
      n("finish", "FINISH\nsave path, blink LED", "end", 400, 748, 184, 52),
      n("is_replay", "replay?", "decision", 660, 748, 146, 74),
      n("choose", "chooseLeftHand\nL, then S, then R, then B\nrecord the decision", "process", 175, 900, 210, 64),
      n("use_stored", "use path[i++]", "process", 660, 900, 150, 44),
      n("simplify", "simplifyPath()\ncollapse xBx dead ends", "process", 175, 980, 196, 52),
      n("turn", "turn(d)\nL / R / B / S", "process", 430, 980, 140, 50),
    ],
    edges: [
      { from: "setup", to: "mode" },
      { from: "mode", to: "replay", label: "Yes", side: "left" },
      { from: "mode", to: "explore", label: "No", side: "right" },
      { from: "replay", to: "follow" },
      { from: "explore", to: "follow" },
      { from: "follow", to: "junction" },
      { from: "junction", to: "all_black" },
      { from: "all_black", to: "finish", label: "Yes" },
      { from: "all_black", to: "is_replay", label: "No", side: "right" },
      { from: "is_replay", to: "choose", label: "No", side: "left" },
      { from: "is_replay", to: "use_stored", label: "Yes" },
      { from: "choose", to: "simplify" },
      { from: "simplify", to: "turn" },
      { from: "use_stored", to: "turn" },
      { from: "turn", to: "follow", back: true },
    ],
    evaluate(i) {
      const p = ["setup", "mode", i.replay ? "replay" : "explore", "follow", "junction", "all_black"];
      if (i.allBlack) p.push("finish");
      else p.push("is_replay", ...(i.replay ? ["use_stored"] : ["choose", "simplify"]), "turn");
      return p;
    },
    explain: {
      setup: "The car wakes up and checks the mode pin.",
      mode: "A wire from D12 to GND means replay. No wire means explore.",
      replay: "Read the short path saved last time.",
      explore: "No saved path. Prefer left, and write every turn down.",
      follow: "Stay on the tape until a branch or the tape disappears.",
      junction: "Creep forward so the eyes sit on the crossing, then test left, straight, and right.",
      all_black: "All four eyes black is the finish square, not a normal turn.",
      finish: "Save the short path, blink the light, and stop.",
      is_replay: "Not the finish. Replay reads the next saved letter. Explore must choose.",
      choose: "Left if you can, else straight, else right, else turn around. Write that letter.",
      simplify: "If the last three letters are xBx, replace them with one turn. LBL becomes S. That cuts the dead end.",
      use_stored: "Take the next saved letter.",
      turn: "Do L, R, B, or S, then follow the next piece of tape. The loop goes back to followSegment.",
    },
  },
  C2: {
    name: "Wall Maze Solver (C2)",
    w: 780,
    h: 860,
    defaults: { left: 50, front: 50, right: 50 },
    nodes: [
      n("loop", "loop()", "start", 360, 46, 140, 40),
      n("scan", "left = lookAt(175°)\nfront = lookAt(90°)\nright = lookAt(5°)", "process", 360, 124, 210, 62),
      n("exit_check", "all > 150?", "decision", 360, 224, 156, 74),
      n("exit", "EXIT reached\nstop forever", "end", 140, 350, 164, 50),
      n("left_check", "left > 30?", "decision", 520, 350, 150, 74),
      n("go_left", "spinLeft90()", "process", 300, 478, 140, 42),
      n("front_check", "front > 30?", "decision", 580, 478, 154, 74),
      n("go_straight", "go straight", "process", 400, 600, 130, 42),
      n("right_check", "right > 30?", "decision", 620, 600, 154, 74),
      n("go_right", "spinRight90()", "process", 500, 724, 140, 42),
      n("uturn", "U-turn\nR90° × 2", "process", 680, 724, 120, 50),
      n("forward", "forwardOneCell() → loop", "process", 430, 812, 210, 42),
    ],
    edges: [
      { from: "loop", to: "scan" },
      { from: "scan", to: "exit_check" },
      { from: "exit_check", to: "exit", label: "Yes", side: "left" },
      { from: "exit_check", to: "left_check", label: "No", side: "right" },
      { from: "left_check", to: "go_left", label: "Yes", side: "left" },
      { from: "left_check", to: "front_check", label: "No" },
      { from: "front_check", to: "go_straight", label: "Yes", side: "left" },
      { from: "front_check", to: "right_check", label: "No", side: "right" },
      { from: "right_check", to: "go_right", label: "Yes", side: "left" },
      { from: "right_check", to: "uturn", label: "No", side: "right" },
      { from: "go_left", to: "forward" },
      { from: "go_straight", to: "forward" },
      { from: "go_right", to: "forward" },
      { from: "uturn", to: "forward" },
    ],
    evaluate(i) {
      const p = ["loop", "scan", "exit_check"];
      if (i.left > 150 && i.front > 150 && i.right > 150) p.push("exit");
      else {
        p.push("left_check");
        if (i.left > 30) p.push("go_left");
        else {
          p.push("front_check");
          if (i.front > 30) p.push("go_straight");
          else p.push("right_check", i.right > 30 ? "go_right" : "uturn");
        }
        p.push("forward");
      }
      return p;
    },
    explain: {
      loop: "Start of a square. Look before you move.",
      scan: "Point the eye left, forward, and right.",
      exit_check: "If every way is wide open, this is the way out.",
      exit: "Stop and stay stopped.",
      left_check: "Left-hand rule: take an open left first.",
      go_left: "Left is open. Turn left, then drive one square.",
      front_check: "Left is a wall. Is straight open?",
      go_straight: "Front is open. Keep going.",
      right_check: "Left and front are walls. Check the right.",
      go_right: "Only the right is open. Turn right.",
      uturn: "Three walls. Turn around.",
      forward: "Drive one square, then look again.",
    },
  },
};

const FLOW_ORDER = ["A", "B", "C1", "C2"];

function byId(flow, id) {
  return flow.nodes.find((node) => node.id === id);
}

function route(edge, flow) {
  const a = byId(flow, edge.from);
  const b = byId(flow, edge.to);
  if (edge.back) return `M ${a.x - a.w / 2} ${a.y} H 36 V ${b.y} H ${b.x - b.w / 2}`;
  const aBottom = a.y + a.h / 2;
  const bTop = b.y - b.h / 2;
  if (!edge.side && Math.abs(a.x - b.x) < 8) return `M ${a.x} ${aBottom} V ${bTop}`;
  const mid = aBottom + Math.max(28, (bTop - aBottom) * 0.42);
  return `M ${a.x} ${aBottom} V ${mid} H ${b.x} V ${bTop}`;
}

function labelPos(edge, flow) {
  const a = byId(flow, edge.from);
  if (edge.side === "left") return { x: a.x - a.w / 2 - 8, y: a.y - 8 };
  if (edge.side === "right") return { x: a.x + a.w / 2 + 8, y: a.y - 8 };
  return { x: a.x + 22, y: a.y + a.h / 2 + 16 };
}

function Flowchart({ flow, active }) {
  return (
    <svg className="block h-auto w-full min-w-[640px]" viewBox={`0 0 ${flow.w} ${flow.h}`} role="img" aria-label={flow.name}>
      <defs>
        {[["arr", "#94a3b8"], ["arrA", "#2563eb"], ["arrY", "#16a34a"], ["arrN", "#dc2626"]].map(([id, fill]) => (
          <marker key={id} id={id} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill={fill} />
          </marker>
        ))}
      </defs>
      {flow.edges.map((edge) => {
        const on = active.has(edge.from) && active.has(edge.to);
        const color = edge.label === "Yes" ? (on ? "#16a34a" : "#86efac") : edge.label === "No" ? (on ? "#dc2626" : "#fca5a5") : on ? "#2563eb" : "#cbd5e1";
        const marker = edge.label === "Yes" ? "arrY" : edge.label === "No" ? "arrN" : on ? "arrA" : "arr";
        const pill = edge.label ? labelPos(edge, flow) : null;
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path d={route(edge, flow)} fill="none" stroke={color} strokeWidth={on ? 3.5 : 2} strokeLinejoin="round" strokeLinecap="round" markerEnd={`url(#${marker})`} />
            {pill && (
              <g>
                <rect x={pill.x - 16} y={pill.y - 9} width="32" height="16" rx="8" fill={edge.label === "Yes" ? "#16a34a" : "#dc2626"} />
                <text x={pill.x} y={pill.y} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="10" fontWeight="800" fontFamily="Poppins, sans-serif">{edge.label}</text>
              </g>
            )}
          </g>
        );
      })}
      {flow.nodes.map((node) => {
        const on = active.has(node.id);
        const style = STYLES[node.type];
        const lines = node.label.split("\n");
        return (
          <g key={node.id} opacity={active.size && !on ? 0.38 : 1}>
            {node.type === "decision" ? (
              <polygon points={`${node.x},${node.y - node.h / 2} ${node.x + node.w / 2},${node.y} ${node.x},${node.y + node.h / 2} ${node.x - node.w / 2},${node.y}`} fill={on ? style.active : style.fill} stroke={style.stroke} strokeWidth={on ? 3.5 : 2} strokeLinejoin="round" />
            ) : (
              <rect x={node.x - node.w / 2} y={node.y - node.h / 2} width={node.w} height={node.h} rx={node.type === "process" ? 14 : 22} fill={on ? style.active : style.fill} stroke={style.stroke} strokeWidth={on ? 3.5 : 2} />
            )}
            {lines.map((line, i) => (
              <text key={line} x={node.x} y={node.y + (i - (lines.length - 1) / 2) * 13} textAnchor="middle" dominantBaseline="middle" fill={style.text} fontSize="11" fontWeight={on ? 800 : 650} fontFamily="Poppins, sans-serif">{line}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function Controls({ id, inputs, setInputs }) {
  if (id === "A") {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-700">Distance ahead <span className="float-right text-blue-600">{inputs.distance} cm</span>
          <input className="mt-2 w-full" type="range" min="2" max="100" value={inputs.distance} onChange={(e) => setInputs({ ...inputs, distance: +e.target.value })} />
        </label>
        {inputs.distance <= 25 && (
          <div className="grid grid-cols-2 gap-3">
            {[["left", "Left scan", "text-green-600"], ["right", "Right scan", "text-orange-600"]].map(([key, label, color]) => (
              <label key={key} className="text-xs font-bold text-slate-700">{label} <span className={`float-right ${color}`}>{inputs[key]} cm</span>
                <input className="mt-2 w-full" type="range" min="2" max="100" value={inputs[key]} onChange={(e) => setInputs({ ...inputs, [key]: +e.target.value })} />
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }
  if (id === "B") {
    const sensors = [["s1", "S1  −3"], ["s2", "S2  −1"], ["s3", "S3  +1"], ["s4", "S4  +3"]];
    const seen = sensors.filter(([key]) => inputs[key]).length;
    return (
      <div className="space-y-3">
        <p className="text-xs font-bold text-slate-600">Tap the eyes that see black tape.</p>
        <div className="grid grid-cols-2 gap-2">
          {sensors.map(([key, label]) => (
            <button key={key} onClick={() => setInputs({ ...inputs, [key]: !inputs[key] })} className={`rounded-2xl border-2 px-3 py-2 text-xs font-bold ${inputs[key] ? "border-blue-600 bg-blue-500 text-white" : "border-slate-200 bg-white text-slate-500"}`}>{label}</button>
          ))}
        </div>
        <label className="block text-xs font-bold text-slate-700">Last error <span className="float-right">{inputs.lastError}</span>
          <input className="mt-2 w-full" type="range" min="-3" max="3" step="0.5" value={inputs.lastError} onChange={(e) => setInputs({ ...inputs, lastError: +e.target.value })} />
        </label>
        <p className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-xs font-bold text-slate-700">seen = {seen}. {seen === 0 ? "Tape lost." : seen === 4 ? "Cross or finish." : "Follow the tape."}</p>
      </div>
    );
  }
  if (id === "C1") {
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <button onClick={() => setInputs({ ...inputs, replay: false })} className={`flex-1 rounded-2xl border-2 px-3 py-2 text-xs font-bold ${inputs.replay ? "border-slate-200 bg-white text-slate-500" : "border-blue-600 bg-blue-500 text-white"}`}>EXPLORE</button>
          <button onClick={() => setInputs({ ...inputs, replay: true })} className={`flex-1 rounded-2xl border-2 px-3 py-2 text-xs font-bold ${inputs.replay ? "border-orange-600 bg-orange-500 text-white" : "border-slate-200 bg-white text-slate-500"}`}>REPLAY</button>
        </div>
        <button onClick={() => setInputs({ ...inputs, allBlack: !inputs.allBlack })} className={`w-full rounded-2xl border-2 px-3 py-2 text-xs font-bold ${inputs.allBlack ? "border-green-600 bg-green-500 text-white" : "border-slate-200 bg-white text-slate-500"}`}>All 4 sensors black (FINISH)</button>
        <p className="text-xs italic leading-relaxed text-slate-500">{inputs.replay ? "Replay follows the saved short path." : "Explore prefers left, writes each turn, then cuts dead ends."}</p>
      </div>
    );
  }
  const msg = inputs.left > 150 && inputs.front > 150 && inputs.right > 150 ? "All open: this is the exit." : inputs.left > 30 ? "Left open: turn left." : inputs.front > 30 ? "Front open: go straight." : inputs.right > 30 ? "Right open: turn right." : "Three walls: turn around.";
  return (
    <div className="space-y-3">
      {[["left", "Left"], ["front", "Front"], ["right", "Right"]].map(([key, label]) => (
        <label key={key} className="block text-sm font-bold text-slate-700">{label} <span className="float-right">{inputs[key]} cm</span>
          <input className="mt-2 w-full" type="range" min="5" max="200" value={inputs[key]} onChange={(e) => setInputs({ ...inputs, [key]: +e.target.value })} />
        </label>
      ))}
      <p className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-xs font-bold text-slate-700">{msg}</p>
    </div>
  );
}

export default function ProgramFlowSimulator({ defaultFlow = "A" }) {
  const [id, setId] = useState(defaultFlow);
  const [inputs, setInputs] = useState(FLOWS[defaultFlow].defaults);
  const [stepMode, setStepMode] = useState(false);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const flow = FLOWS[id];
  const path = useMemo(() => flow.evaluate(inputs), [flow, inputs]);
  const shown = stepMode ? path.slice(0, step + 1) : path;
  const active = new Set(shown);
  const current = byId(flow, shown[shown.length - 1]);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setTimeout(() => {
      setStep((value) => {
        if (value >= path.length - 1) {
          setRunning(false);
          return value;
        }
        return value + 1;
      });
    }, 850);
    return () => clearTimeout(timer);
  }, [running, step, path.length]);

  const switchFlow = (next) => {
    setId(next);
    setInputs(FLOWS[next].defaults);
    setStepMode(false);
    setStep(0);
    setRunning(false);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-slate-600">Green is Yes and goes down. Red is No and leaves to the side. Change a sense, then walk one choice at a time.</p>
      <div className="flex flex-wrap gap-2">
        {FLOW_ORDER.map((key) => (
          <button key={key} onClick={() => switchFlow(key)} className={`rounded-2xl border-2 px-4 py-2 text-xs font-bold ${id === key ? "border-blue-600 bg-blue-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{FLOWS[key].name}</button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {!stepMode ? (
          <button onClick={() => { setStepMode(true); setStep(0); setRunning(true); }} className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-green-600 bg-green-500 px-4 py-2 text-xs font-bold text-white"><Play size={14} /> Step through</button>
        ) : (
          <>
            <button onClick={() => setRunning((value) => !value)} className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-blue-600 bg-blue-500 px-4 py-2 text-xs font-bold text-white">{running ? <Pause size={14} /> : <Play size={14} />} {running ? "Pause" : "Auto-play"}</button>
            <button disabled={running} onClick={() => setStep((value) => Math.min(path.length - 1, value + 1))} className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-orange-600 bg-orange-500 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"><StepForward size={14} /> Next</button>
          </>
        )}
        <button onClick={() => { setStepMode(false); setStep(0); setRunning(false); }} className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600"><RotateCcw size={14} /> Reset</button>
        <span className="text-xs font-bold text-slate-500">{stepMode ? `Step ${step + 1} / ${path.length}` : `${path.length} steps on this path`}</span>
      </div>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_300px]">
        <div className="max-h-[720px] overflow-auto rounded-2xl border-2 border-blue-200 bg-sky-50/40 p-3">
          <Flowchart flow={flow} active={active} />
        </div>
        <Card className="border-2 border-orange-200 bg-orange-50/40 p-4">
          <p className="font-poppins text-base font-extrabold text-slate-800">Robot controls</p>
          <p className="mb-3 text-xs text-slate-500">Change a sense. The bright path updates.</p>
          <div className="mb-3 rounded-2xl border border-blue-200 bg-blue-50 p-3 text-sm leading-relaxed">
            <strong>{current.label.replaceAll("\n", " ")}</strong>
            <br />{flow.explain[current.id]}
          </div>
          <Controls id={id} inputs={inputs} setInputs={setInputs} />
        </Card>
      </div>
    </div>
  );
}