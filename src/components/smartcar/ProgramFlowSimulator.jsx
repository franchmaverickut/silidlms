import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";

// ── Shared types ───────────────────────────────────────────
// Node: { id, label, type: 'terminal'|'process'|'decision', x, y, w, h }
// Edge: { from, to, label?, side? }  side = 'yes'|'no' for decisions
// Flow: { name, nodes, edges, inputs, evaluate(inputs) -> Set<nodeId active path>, startId }

const NODE_STYLE = {
  terminal: { fill: "#dcfce7", active: "#bbf7d0", stroke: "#16a34a", rx: 26, text: "#14532d" },
  process: { fill: "#dbeafe", active: "#bfdbfe", stroke: "#2563eb", rx: 16, text: "#1e3a8a" },
  decision: { fill: "#ffedd5", active: "#fed7aa", stroke: "#ea580c", rx: 12, text: "#7c2d12" },
  start: { fill: "#dcfce7", active: "#bbf7d0", stroke: "#16a34a", rx: 26, text: "#14532d" },
  end: { fill: "#fee2e2", active: "#fecaca", stroke: "#dc2626", rx: 26, text: "#7f1d1d" },
};

function FlowNode({ node, active, dimmed }) {
  const style = NODE_STYLE[node.type] || NODE_STYLE.process;
  const isDecision = node.type === "decision";
  const w = node.w || 140;
  const h = node.h || (isDecision ? 50 : 36);
  const fill = active ? style.active : style.fill;
  const stroke = style.stroke;
  const sw = active ? 4.5 : 3;
  const lines = String(node.label).split("\n");
  return (
    <g style={{ opacity: dimmed ? 0.4 : 1, transition: "opacity 0.3s" }}>
      {isDecision ? (
        <polygon
          points={`${node.x},${node.y - h / 2} ${node.x + w / 2},${node.y} ${node.x},${node.y + h / 2} ${node.x - w / 2},${node.y}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      ) : (
        <rect
          x={node.x - w / 2}
          y={node.y - h / 2}
          width={w}
          height={h}
          rx={style.rx}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      )}
      {lines.map((ln, i) => (
        <text
          key={i}
          x={node.x}
          y={node.y + (i - (lines.length - 1) / 2) * 11 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={style.text}
          style={{ fontSize: 10, fontWeight: active ? 800 : 600, fontFamily: "Poppins, sans-serif" }}
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

function FlowEdge({ edge, nodes, activePath }) {
  const from = nodes.find((n) => n.id === edge.from);
  const to = nodes.find((n) => n.id === edge.to);
  if (!from || !to) return null;

  const isActive = activePath?.has(edge.from) && activePath?.has(edge.to);
  const isDecision = from.type === "decision";
  const fromY = isDecision ? from.y + (from.h || 50) / 2 : from.y + (from.h || 36) / 2;
  const toY = to.y - (to.h || 36) / 2;

  // For decision branches: yes goes down, no goes to the side
  let path;
  if (isDecision && edge.side === "no") {
    // Side branch — go right or left then down
    const dir = edge.dir || "right";
    const sideX = dir === "right" ? from.x + (from.w || 140) / 2 + 30 : from.x - (from.w || 140) / 2 - 30;
    path = `M ${from.x} ${from.y} L ${sideX} ${from.y} L ${sideX} ${toY} L ${to.x} ${toY}`;
  } else if (isDecision && edge.side === "yes") {
    path = `M ${from.x} ${fromY} L ${from.x} ${toY}`;
  } else {
    // Straight down or offset
    const midY = (fromY + toY) / 2;
    if (Math.abs(from.x - to.x) < 5) {
      path = `M ${from.x} ${fromY} L ${to.x} ${toY}`;
    } else {
      path = `M ${from.x} ${fromY} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${toY}`;
    }
  }

  const lbl = edge.label;
  const color =
    lbl === "Yes" ? (isActive ? "#16a34a" : "#86efac") :
    lbl === "No"  ? (isActive ? "#dc2626" : "#fca5a5") :
                    (isActive ? "#2563eb" : "#cbd5e1");
  const marker =
    lbl === "Yes" ? (isActive ? "arrow-yes-a" : "arrow-yes") :
    lbl === "No"  ? (isActive ? "arrow-no-a" : "arrow-no") :
                    (isActive ? "arrow-plain-a" : "arrow-plain");
  const sw = isActive ? 4 : 2.5;
  const labelBg = lbl === "Yes" ? "#16a34a" : lbl === "No" ? "#dc2626" : null;
  const lx = from.x + (edge.side === "no" ? (edge.dir === "right" ? 26 : -26) : 14);
  const ly = from.y + (edge.side === "no" ? -6 : 16);

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#${marker})`}
      />
      {lbl && (
        <g>
          {labelBg && <rect x={lx - 13} y={ly - 7} width="26" height="14" rx="7" fill={labelBg} />}
          <text
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={labelBg ? "#ffffff" : color}
            style={{ fontSize: 8.5, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}
          >
            {lbl}
          </text>
        </g>
      )}
    </g>
  );
}

function FlowchartSVG({ flow, activePath, height = 520 }) {
  return (
    <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-sky-50/70 to-white p-3 overflow-x-auto shadow-sm">
      <svg viewBox={`0 0 400 ${height}`} className="w-full" style={{ minWidth: 380 }}>
        <defs>
          {[["arrow-yes", "#86efac"], ["arrow-yes-a", "#16a34a"], ["arrow-no", "#fca5a5"], ["arrow-no-a", "#dc2626"], ["arrow-plain", "#cbd5e1"], ["arrow-plain-a", "#2563eb"]].map(([id, c]) => (
            <marker key={id} id={id} markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 7 3, 0 6" fill={c} />
            </marker>
          ))}
        </defs>
        {flow.edges.map((e, i) => (
          <FlowEdge key={i} edge={e} nodes={flow.nodes} activePath={activePath} />
        ))}
        {flow.nodes.map((n) => (
          <FlowNode key={n.id} node={n} active={activePath?.has(n.id)} dimmed={activePath && !activePath.has(n.id)} />
        ))}
      </svg>
    </div>
  );
}

// ── Flow 1: Obstacle Avoidance ─────────────────────────────
const OBSTACLE_FLOW = {
  name: "Obstacle Avoidance",
  nodes: [
    { id: "loop", label: "loop()", type: "start", x: 200, y: 20 },
    { id: "read", label: "d = distanceFiltered()\n(median of 3)", type: "process", x: 200, y: 70, w: 150, h: 40 },
    { id: "stop_check", label: "d <= 25?", type: "decision", x: 200, y: 140, w: 120, h: 50 },
    { id: "slow_check", label: "d < 45?", type: "decision", x: 330, y: 140, w: 100, h: 50 },
    { id: "cruise", label: "forward\nCRUISE_SPEED", type: "process", x: 330, y: 215, w: 110, h: 40 },
    { id: "slow", label: "forward\n3/4 speed", type: "process", x: 200, y: 215, w: 100, h: 40 },
    { id: "avoid", label: "avoid()", type: "process", x: 70, y: 140, w: 90, h: 36 },
    { id: "backup", label: "stop + backup\n300ms", type: "process", x: 70, y: 200, w: 100, h: 40 },
    { id: "look", label: "right=lookAt(20°)\nleft=lookAt(160°)", type: "process", x: 70, y: 260, w: 130, h: 40 },
    { id: "both_check", label: "both < 25?", type: "decision", x: 70, y: 325, w: 110, h: 50 },
    { id: "turn_around", label: "turn 180°\n(TURN_MS×3)", type: "process", x: 70, y: 400, w: 110, h: 40 },
    { id: "lr_check", label: "left > right?", type: "decision", x: 200, y: 325, w: 110, h: 50 },
    { id: "spin_left", label: "spin left\n(TURN_MS)", type: "process", x: 200, y: 400, w: 100, h: 40 },
    { id: "spin_right", label: "spin right\n(TURN_MS)", type: "process", x: 320, y: 400, w: 100, h: 40 },
    { id: "end_loop", label: "delay(40)\n→ loop", type: "process", x: 200, y: 470, w: 90, h: 36 },
  ],
  edges: [
    { from: "loop", to: "read" },
    { from: "read", to: "stop_check" },
    { from: "stop_check", to: "avoid", label: "Yes", side: "no", dir: "left" },
    { from: "stop_check", to: "slow_check", label: "No", side: "yes" },
    { from: "slow_check", to: "slow", label: "Yes", side: "yes" },
    { from: "slow_check", to: "cruise", label: "No", side: "no", dir: "right" },
    { from: "avoid", to: "backup" },
    { from: "backup", to: "look" },
    { from: "look", to: "both_check" },
    { from: "both_check", to: "turn_around", label: "Yes", side: "yes" },
    { from: "both_check", to: "lr_check", label: "No", side: "no", dir: "right" },
    { from: "lr_check", to: "spin_left", label: "Yes", side: "yes" },
    { from: "lr_check", to: "spin_right", label: "No", side: "no", dir: "right" },
    { from: "turn_around", to: "end_loop" },
    { from: "spin_left", to: "end_loop" },
    { from: "spin_right", to: "end_loop" },
    { from: "slow", to: "end_loop" },
    { from: "cruise", to: "end_loop" },
  ],
  evaluate: (inputs) => {
    const path = new Set(["loop", "read", "stop_check"]);
    if (inputs.distance <= 25) {
      path.add("avoid").add("backup").add("look").add("both_check");
      if (inputs.left < 25 && inputs.right < 25) {
        path.add("turn_around");
      } else {
        path.add("lr_check");
        if (inputs.left > inputs.right) path.add("spin_left");
        else path.add("spin_right");
      }
    } else if (inputs.distance < 45) {
      path.add("slow_check").add("slow");
    } else {
      path.add("slow_check").add("cruise");
    }
    path.add("end_loop");
    return path;
  },
};

// ── Flow 2: Line Follower ──────────────────────────────────
const LINE_FLOW = {
  name: "Line Follower (PD)",
  nodes: [
    { id: "loop", label: "loop()", type: "start", x: 200, y: 20 },
    { id: "read", label: "seen = readLine(&err)\nerr = avg weight\nof black sensors", type: "process", x: 200, y: 80, w: 150, h: 50 },
    { id: "seen0", label: "seen == 0?", type: "decision", x: 200, y: 160, w: 110, h: 50 },
    { id: "last_err", label: "lastError < 0?", type: "decision", x: 70, y: 160, w: 110, h: 50 },
    { id: "search_l", label: "spin left\n(search)", type: "process", x: 70, y: 240, w: 100, h: 36 },
    { id: "search_r", label: "spin right\n(search)", type: "process", x: 200, y: 240, w: 100, h: 36 },
    { id: "seen4", label: "seen == 4?", type: "decision", x: 330, y: 160, w: 100, h: 50 },
    { id: "cross", label: "drive straight\n(cross line)", type: "process", x: 330, y: 240, w: 110, h: 36 },
    { id: "pd", label: "correction =\nKP×err + KD×(err−lastErr)", type: "process", x: 200, y: 320, w: 160, h: 44 },
    { id: "motor", label: "left = BASE + corr\nright = BASE − corr\nsetMotor(L, R)", type: "process", x: 200, y: 390, w: 160, h: 50 },
    { id: "back", label: "delay(5)\n→ loop", type: "process", x: 200, y: 460, w: 80, h: 36 },
  ],
  edges: [
    { from: "loop", to: "read" },
    { from: "read", to: "seen0" },
    { from: "seen0", to: "last_err", label: "Yes", side: "no", dir: "left" },
    { from: "seen0", to: "seen4", label: "No", side: "yes" },
    { from: "last_err", to: "search_l", label: "Yes", side: "yes" },
    { from: "last_err", to: "search_r", label: "No", side: "no", dir: "right" },
    { from: "seen4", to: "cross", label: "Yes", side: "yes" },
    { from: "seen4", to: "pd", label: "No", side: "no", dir: "left" },
    { from: "pd", to: "motor" },
    { from: "motor", to: "back" },
    { from: "search_l", to: "back" },
    { from: "search_r", to: "back" },
    { from: "cross", to: "back" },
  ],
  evaluate: (inputs) => {
    const path = new Set(["loop", "read", "seen0"]);
    const seen = [inputs.s1, inputs.s2, inputs.s3, inputs.s4].filter(Boolean).length;
    if (seen === 0) {
      path.add("last_err");
      if (inputs.lastError < 0) path.add("search_l");
      else path.add("search_r");
    } else if (seen === 4) {
      path.add("seen4").add("cross");
    } else {
      path.add("seen4").add("pd").add("motor");
    }
    path.add("back");
    return path;
  },
};

// ── Flow 3: Line Maze Solver ────────────────────────────────
const MAZE_LINE_FLOW = {
  name: "Line Maze Solver (C1)",
  nodes: [
    { id: "setup", label: "setup()", type: "start", x: 200, y: 20 },
    { id: "mode", label: "D12 == LOW?", type: "decision", x: 200, y: 80, w: 120, h: 50 },
    { id: "replay", label: "loadPath()\nfrom EEPROM", type: "process", x: 70, y: 80, w: 110, h: 40 },
    { id: "explore", label: "EXPLORE mode", type: "process", x: 330, y: 80, w: 100, h: 36 },
    { id: "follow", label: "followSegment()\nfollow line until\nbranch or dead end", type: "process", x: 200, y: 160, w: 150, h: 50 },
    { id: "junction", label: "handleJunction()\ninch forward\ncheck L / S / R", type: "process", x: 200, y: 240, w: 150, h: 50 },
    { id: "all_black", label: "all 4\nblack?", type: "decision", x: 200, y: 320, w: 100, h: 55 },
    { id: "finish", label: "FINISH!\nsave path\nblink LED", type: "end", x: 200, y: 400, w: 110, h: 44 },
    { id: "is_replay", label: "replay?", type: "decision", x: 330, y: 320, w: 90, h: 50 },
    { id: "use_stored", label: "use\npath[i++]", type: "process", x: 330, y: 400, w: 80, h: 36 },
    { id: "choose", label: "chooseLeftHand\n(L>S>R>B)\nrecord decision", type: "process", x: 70, y: 320, w: 130, h: 50 },
    { id: "simplify", label: "simplifyPath()\nremove xBy", type: "process", x: 70, y: 400, w: 120, h: 40 },
    { id: "turn", label: "turn(d)\nL/R/B/S", type: "process", x: 200, y: 470, w: 90, h: 36 },
  ],
  edges: [
    { from: "setup", to: "mode" },
    { from: "mode", to: "replay", label: "Yes", side: "no", dir: "left" },
    { from: "mode", to: "explore", label: "No", side: "yes" },
    { from: "replay", to: "follow" },
    { from: "explore", to: "follow" },
    { from: "follow", to: "junction" },
    { from: "junction", to: "all_black" },
    { from: "all_black", to: "finish", label: "Yes", side: "yes" },
    { from: "all_black", to: "is_replay", label: "No", side: "no", dir: "right" },
    { from: "is_replay", to: "use_stored", label: "Yes", side: "yes" },
    { from: "is_replay", to: "choose", label: "No", side: "no", dir: "left" },
    { from: "choose", to: "simplify" },
    { from: "use_stored", to: "turn" },
    { from: "simplify", to: "turn" },
    { from: "turn", to: "follow" },
  ],
  evaluate: (inputs) => {
    const path = new Set(["setup", "mode"]);
    if (inputs.replay) path.add("replay");
    else path.add("explore");
    path.add("follow").add("junction").add("all_black");
    if (inputs.allBlack) {
      path.add("finish");
    } else {
      path.add("is_replay");
      if (inputs.replay) path.add("use_stored");
      else path.add("choose").add("simplify");
    }
    if (!inputs.allBlack) path.add("turn");
    return path;
  },
};

// ── Flow 4: Wall Maze Solver ────────────────────────────────
const WALL_MAZE_FLOW = {
  name: "Wall Maze Solver (C2)",
  nodes: [
    { id: "loop", label: "loop()", type: "start", x: 200, y: 20 },
    { id: "scan", label: "left = lookAt(175°)\nfront = lookAt(90°)\nright = lookAt(5°)", type: "process", x: 200, y: 75, w: 160, h: 50 },
    { id: "exit_check", label: "all > 150?", type: "decision", x: 200, y: 155, w: 110, h: 50 },
    { id: "exit", label: "EXIT reached\nstop forever", type: "end", x: 200, y: 230, w: 120, h: 40 },
    { id: "left_check", label: "left > 30?", type: "decision", x: 200, y: 230, w: 110, h: 50 },
    { id: "front_check", label: "front > 30?", type: "decision", x: 330, y: 230, w: 110, h: 50 },
    { id: "right_check", label: "right > 30?", type: "decision", x: 330, y: 310, w: 110, h: 50 },
    { id: "go_left", label: "spinLeft90()", type: "process", x: 70, y: 310, w: 100, h: 36 },
    { id: "go_straight", label: "go straight", type: "process", x: 200, y: 310, w: 90, h: 36 },
    { id: "go_right", label: "spinRight90()", type: "process", x: 330, y: 390, w: 100, h: 36 },
    { id: "uturn", label: "U-turn\n(R90° × 2)", type: "process", x: 200, y: 390, w: 100, h: 36 },
    { id: "forward", label: "forwardOneCell()\n→ loop", type: "process", x: 200, y: 460, w: 130, h: 36 },
  ],
  edges: [
    { from: "loop", to: "scan" },
    { from: "scan", to: "exit_check" },
    { from: "exit_check", to: "exit", label: "Yes", side: "yes" },
    { from: "exit_check", to: "left_check", label: "No", side: "no", dir: "left" },
    { from: "left_check", to: "go_left", label: "Yes", side: "no", dir: "left" },
    { from: "left_check", to: "front_check", label: "No", side: "yes" },
    { from: "front_check", to: "go_straight", label: "Yes", side: "no", dir: "left" },
    { from: "front_check", to: "right_check", label: "No", side: "yes" },
    { from: "right_check", to: "go_right", label: "Yes", side: "yes" },
    { from: "right_check", to: "uturn", label: "No", side: "no", dir: "left" },
    { from: "go_left", to: "forward" },
    { from: "go_straight", to: "forward" },
    { from: "go_right", to: "forward" },
    { from: "uturn", to: "forward" },
  ],
  evaluate: (inputs) => {
    const path = new Set(["loop", "scan", "exit_check"]);
    if (inputs.left > 150 && inputs.front > 150 && inputs.right > 150) {
      path.add("exit");
    } else {
      path.add("left_check");
      if (inputs.left > 30) {
        path.add("go_left");
      } else {
        path.add("front_check");
        if (inputs.front > 30) {
          path.add("go_straight");
        } else {
          path.add("right_check");
          if (inputs.right > 30) path.add("go_right");
          else path.add("uturn");
        }
      }
    }
    if (!(inputs.left > 150 && inputs.front > 150 && inputs.right > 150)) path.add("forward");
    return path;
  },
};

const FLOWS = [
  { id: "A", flow: OBSTACLE_FLOW, color: "green" },
  { id: "B", flow: LINE_FLOW, color: "blue" },
  { id: "C1", flow: MAZE_LINE_FLOW, color: "purple" },
  { id: "C2", flow: WALL_MAZE_FLOW, color: "amber" },
];

// ── Interactive input controls per flow ─────────────────────
function ObstacleInputs({ inputs, setInputs }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold text-slate-700">Distance ahead</span>
          <span className="font-poppins font-extrabold text-blue-600 text-base">{inputs.distance} cm</span>
        </div>
        <input type="range" min="2" max="100" value={inputs.distance} onChange={(e) => setInputs({ ...inputs, distance: +e.target.value })} className="kid-slider w-full" style={{ "--knob": "#2563eb" }} />
      </div>
      {inputs.distance <= 25 && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-bold text-slate-700">Left scan</span><span className="font-poppins font-extrabold text-green-600">{inputs.left} cm</span></div>
            <input type="range" min="2" max="100" value={inputs.left} onChange={(e) => setInputs({ ...inputs, left: +e.target.value })} className="kid-slider w-full" style={{ "--knob": "#16a34a" }} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-bold text-slate-700">Right scan</span><span className="font-poppins font-extrabold text-orange-600">{inputs.right} cm</span></div>
            <input type="range" min="2" max="100" value={inputs.right} onChange={(e) => setInputs({ ...inputs, right: +e.target.value })} className="kid-slider w-full" style={{ "--knob": "#ea580c" }} />
          </div>
        </div>
      )}
    </div>
  );
}

function LineInputs({ inputs, setInputs }) {
  const toggle = (key) => setInputs({ ...inputs, [key]: !inputs[key] });
  const sensors = [
    { key: "s1", label: "S1 (w=-3)", color: "bg-red-400", ring: "border-red-400" },
    { key: "s2", label: "S2 (w=-1)", color: "bg-orange-400", ring: "border-orange-400" },
    { key: "s3", label: "S3 (w=+1)", color: "bg-green-400", ring: "border-green-400" },
    { key: "s4", label: "S4 (w=+3)", color: "bg-blue-400", ring: "border-blue-400" },
  ];
  const seen = [inputs.s1, inputs.s2, inputs.s3, inputs.s4].filter(Boolean).length;
  const weights = [-3, -1, 1, 3];
  const sum = sensors.reduce((acc, s, i) => acc + (inputs[s.key] ? weights[i] : 0), 0);
  const error = seen > 0 ? (sum / seen).toFixed(1) : "—";
  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-slate-600">Tap the sensors that see the black line:</p>
      <div className="grid grid-cols-2 gap-2.5">
        {sensors.map((s) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className={`kid-pill flex items-center gap-2 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors ${
              inputs[s.key] ? `${s.color} text-white ${s.ring}` : "bg-white text-slate-500 border-slate-200"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full ${inputs[s.key] ? "bg-white" : "bg-slate-300"}`} />
            {s.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-blue-50 border-2 border-blue-200 p-3 font-mono text-xs space-y-0.5">
        <p className="text-slate-700">seen = {seen} → {seen === 0 ? "line lost" : seen === 4 ? "cross/finish" : "follow"}</p>
        <p className="text-slate-700">error = {error}</p>
      </div>
    </div>
  );
}

function MazeLineInputs({ inputs, setInputs }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setInputs({ ...inputs, replay: false })} className={`kid-pill flex-1 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors ${!inputs.replay ? "bg-blue-500 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"}`}>EXPLORE</button>
        <button onClick={() => setInputs({ ...inputs, replay: true })} className={`kid-pill flex-1 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors ${inputs.replay ? "bg-orange-500 text-white border-orange-600" : "bg-white text-slate-500 border-slate-200"}`}>REPLAY</button>
      </div>
      <button onClick={() => setInputs({ ...inputs, allBlack: !inputs.allBlack })} className={`kid-pill w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors ${inputs.allBlack ? "bg-green-500 text-white border-green-600" : "bg-white text-slate-500 border-slate-200"}`}>
        <span className={`w-4 h-4 rounded-md border-2 ${inputs.allBlack ? "bg-white border-white" : "border-slate-300"}`} /> All 4 sensors black (FINISH)
      </button>
      <p className="text-xs text-slate-500 italic leading-relaxed">
        {inputs.replay
          ? "Replay mode: the car follows the saved shortest path from memory."
          : "Explore mode: the car uses the Left-Hand Rule and records each turn, then removes dead ends."}
      </p>
    </div>
  );
}

function WallMazeInputs({ inputs, setInputs }) {
  const dirs = [
    { key: "left", label: "Left", color: "#16a34a", text: "text-green-600" },
    { key: "front", label: "Front", color: "#2563eb", text: "text-blue-600" },
    { key: "right", label: "Right", color: "#ea580c", text: "text-orange-600" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {dirs.map((s) => (
          <div key={s.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-sm font-bold ${s.text}`}>{s.label}</span>
              <span className="font-poppins font-extrabold text-slate-700">{inputs[s.key]} cm</span>
            </div>
            <input type="range" min="5" max="200" value={inputs[s.key]} onChange={(e) => setInputs({ ...inputs, [s.key]: +e.target.value })} className="kid-slider w-full" style={{ "--knob": s.color }} />
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-blue-50 border-2 border-blue-200 p-3 text-xs font-bold text-slate-700">
        {inputs.left > 150 && inputs.front > 150 && inputs.right > 150
          ? "All open: EXIT reached!"
          : inputs.left > 30
          ? "LEFT open: turn left"
          : inputs.front > 30
          ? "FRONT open: go straight"
          : inputs.right > 30
          ? "RIGHT open: turn right"
          : "Blocked: U-turn"}
      </div>
    </div>
  );
}

const INPUT_CONFIGS = {
  A: { defaults: { distance: 50, left: 40, right: 40 }, Comp: ObstacleInputs },
  B: { defaults: { s1: false, s2: true, s3: true, s4: false, lastError: 0 }, Comp: LineInputs },
  C1: { defaults: { replay: false, allBlack: false }, Comp: MazeLineInputs },
  C2: { defaults: { left: 50, front: 50, right: 50 }, Comp: WallMazeInputs },
};

const KID_CSS = `
.kid-slider{-webkit-appearance:none;appearance:none;height:16px;border-radius:999px;background:#eef2f7;outline:none;border:2px solid #d8e1ec}
.kid-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:30px;height:30px;border-radius:999px;background:var(--knob,#2563eb);border:4px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.25);cursor:pointer;transition:transform .1s}
.kid-slider::-webkit-slider-thumb:active{transform:scale(1.15)}
.kid-slider::-moz-range-thumb{width:30px;height:30px;border-radius:999px;background:var(--knob,#2563eb);border:4px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.25);cursor:pointer}
.kid-pill{transition:transform .1s}
.kid-pill:active{transform:scale(.95)}
`;

function RobotFace({ color = "#2563eb" }) {
  return (
    <svg width="58" height="58" viewBox="0 0 64 64" className="flex-shrink-0">
      <line x1="32" y1="3" x2="32" y2="13" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="6" r="4" fill="#f59e0b" />
      <rect x="9" y="14" width="46" height="34" rx="13" fill={color} />
      <rect x="5" y="25" width="6" height="12" rx="3" fill={color} />
      <rect x="53" y="25" width="6" height="12" rx="3" fill={color} />
      <circle cx="24" cy="28" r="4.5" fill="#fff" />
      <circle cx="40" cy="28" r="4.5" fill="#fff" />
      <circle cx="25" cy="29" r="2.2" fill="#1e293b" />
      <circle cx="41" cy="29" r="2.2" fill="#1e293b" />
      <path d="M24 38 Q32 44 40 38" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <rect x="26" y="48" width="12" height="4" rx="2" fill="#fff" opacity="0.85" />
    </svg>
  );
}

export default function ProgramFlowSimulator({ defaultFlow = "A" }) {
  const [activeFlow, setActiveFlow] = useState(defaultFlow);
  const [inputs, setInputs] = useState(INPUT_CONFIGS[defaultFlow].defaults);
  const [stepMode, setStepMode] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const flow = FLOWS.find((f) => f.id === activeFlow).flow;
  const fullPath = flow.evaluate(inputs);
  const activePath = stepMode
    ? new Set([...fullPath].slice(0, stepIndex + 1))
    : fullPath;

  const switchFlow = (id) => {
    setActiveFlow(id);
    setInputs(INPUT_CONFIGS[id].defaults);
    setStepMode(false);
    setStepIndex(0);
    setRunning(false);
  };

  const startStep = () => {
    setStepMode(true);
    setStepIndex(0);
    setRunning(true);
  };

  const stepNext = () => {
    const pathArr = [...fullPath];
    if (stepIndex < pathArr.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setRunning(false);
    }
  };

  useEffect(() => {
    if (running && stepMode) {
      timerRef.current = setTimeout(() => {
        const pathArr = [...fullPath];
        if (stepIndex < pathArr.length - 1) {
          setStepIndex(stepIndex + 1);
        } else {
          setRunning(false);
        }
      }, 800);
    }
    return () => clearTimeout(timerRef.current);
  }, [running, stepMode, stepIndex, fullPath]);

  const reset = () => {
    setStepMode(false);
    setStepIndex(0);
    setRunning(false);
  };

  const InputComp = INPUT_CONFIGS[activeFlow].Comp;
  const flowHeight = activeFlow === "C1" ? 530 : activeFlow === "C2" ? 510 : 500;

  return (
    <div className="space-y-4">
      <style>{KID_CSS}</style>
      <p className="text-sm text-slate-600 leading-relaxed">
        Move the knobs and watch the bright path light up. <span className="font-bold text-green-600">Green lines = "Yes"</span>, <span className="font-bold text-red-500">red lines = "No"</span>. Press Step to walk the robot through one choice at a time.
      </p>

      {/* Flow tabs */}
      <div className="flex flex-wrap gap-2">
        {FLOWS.map((f) => (
          <button
            key={f.id}
            onClick={() => switchFlow(f.id)}
            className={`kid-pill px-4 py-2 rounded-2xl text-xs font-bold border-2 transition-colors ${
              activeFlow === f.id ? "bg-blue-500 text-white border-blue-600 shadow" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
            }`}
          >
            {f.flow.name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {!stepMode ? (
          <button onClick={startStep} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-green-500 text-white text-xs font-bold border-2 border-green-600 shadow hover:bg-green-600">
            <Play size={14} /> Step Through
          </button>
        ) : (
          <>
            <button onClick={() => setRunning(!running)} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-500 text-white text-xs font-bold border-2 border-blue-600 shadow hover:bg-blue-600">
              {running ? <Pause size={14} /> : <Play size={14} />} {running ? "Pause" : "Auto-play"}
            </button>
            <button onClick={stepNext} disabled={running} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-orange-500 text-white text-xs font-bold border-2 border-orange-600 shadow hover:bg-orange-600 disabled:opacity-50">
              <StepForward size={14} /> Next Step
            </button>
          </>
        )}
        <button onClick={reset} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-slate-600 text-xs font-bold border-2 border-slate-200 hover:bg-slate-50">
          <RotateCcw size={14} /> Reset
        </button>
        {stepMode && <span className="text-xs font-bold text-slate-500 ml-1">Step {stepIndex + 1} / {[...fullPath].length}</span>}
      </div>

      {/* Flowchart + Robot Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FlowchartSVG flow={flow} activePath={activePath} height={flowHeight} />
        <Card className="p-5 border-2 border-orange-200 bg-gradient-to-b from-orange-50/70 to-white shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-orange-200/60">
            <RobotFace color="#ea580c" />
            <div>
              <p className="font-poppins font-extrabold text-base text-slate-800">Robot Controls</p>
              <p className="text-xs text-slate-500">Twist the knobs to change what the robot senses</p>
            </div>
          </div>
          <InputComp inputs={inputs} setInputs={setInputs} />
        </Card>
      </div>
    </div>
  );
}