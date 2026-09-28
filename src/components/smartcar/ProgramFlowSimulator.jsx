import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";

// ── Shared types ───────────────────────────────────────────
// Node: { id, label, type: 'terminal'|'process'|'decision', x, y, w, h }
// Edge: { from, to, label?, side? }  side = 'yes'|'no' for decisions
// Flow: { name, nodes, edges, inputs, evaluate(inputs) -> Set<nodeId active path>, startId }

const NODE_STYLE = {
  terminal: { fill: "#e8f5e9", stroke: "#2e7d32", rx: 22 },
  process: { fill: "#e3f2fd", stroke: "#1565c0", rx: 8 },
  decision: { fill: "#fff8e1", stroke: "#f9a825", rx: 4 },
  start: { fill: "#e8f5e9", stroke: "#2e7d32", rx: 22 },
  end: { fill: "#ffebee", stroke: "#c62828", rx: 22 },
};

function FlowNode({ node, active, dimmed }) {
  const style = NODE_STYLE[node.type] || NODE_STYLE.process;
  const isDecision = node.type === "decision";
  const w = node.w || 140;
  const h = node.h || (isDecision ? 50 : 36);
  return (
    <g style={{ opacity: dimmed ? 0.35 : 1, transition: "opacity 0.3s" }}>
      {isDecision ? (
        <polygon
          points={`${node.x},${node.y - h / 2} ${node.x + w / 2},${node.y} ${node.x},${node.y + h / 2} ${node.x - w / 2},${node.y}`}
          fill={active ? "#fff3b0" : style.fill}
          stroke={active ? "#e65100" : style.stroke}
          strokeWidth={active ? 3 : 1.5}
        />
      ) : (
        <rect
          x={node.x - w / 2}
          y={node.y - h / 2}
          width={w}
          height={h}
          rx={style.rx}
          fill={active ? "#bbdefb" : style.fill}
          stroke={active ? "#0d47a1" : style.stroke}
          strokeWidth={active ? 3 : 1.5}
        />
      )}
      <text
        x={node.x}
        y={node.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#212121"
        style={{ fontSize: 9, fontWeight: active ? 700 : 500, fontFamily: "monospace" }}
      >
        {node.label}
      </text>
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

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke={isActive ? "#e65100" : "#90a4ae"}
        strokeWidth={isActive ? 2.5 : 1.2}
        strokeOpacity={isActive ? 1 : 0.5}
        markerEnd="url(#arrowhead)"
      />
      {edge.label && (
        <text
          x={from.x + (edge.side === "no" ? (edge.dir === "right" ? 25 : -25) : 12)}
          y={from.y + (edge.side === "no" ? -5 : 15)}
          textAnchor={edge.side === "no" ? (edge.dir === "right" ? "start" : "end") : "start"}
          fill={isActive ? "#e65100" : "#78909c"}
          style={{ fontSize: 8, fontWeight: 600 }}
        >
          {edge.label}
        </text>
      )}
    </g>
  );
}

function FlowchartSVG({ flow, activePath, height = 520 }) {
  return (
    <div className="rounded-xl border border-border/60 bg-slate-50/50 p-3 overflow-x-auto">
      <svg viewBox={`0 0 400 ${height}`} className="w-full" style={{ minWidth: 380 }}>
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="#90a4ae" />
          </marker>
          <marker id="arrowhead-active" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="#e65100" />
          </marker>
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
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-foreground">Distance ahead: <span className="text-primary font-bold">{inputs.distance} cm</span></label>
        <input type="range" min="2" max="100" value={inputs.distance} onChange={(e) => setInputs({ ...inputs, distance: +e.target.value })} className="w-full accent-primary" />
      </div>
      {inputs.distance <= 25 && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-foreground">Left scan: <span className="text-primary font-bold">{inputs.left} cm</span></label>
            <input type="range" min="2" max="100" value={inputs.left} onChange={(e) => setInputs({ ...inputs, left: +e.target.value })} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">Right scan: <span className="text-primary font-bold">{inputs.right} cm</span></label>
            <input type="range" min="2" max="100" value={inputs.right} onChange={(e) => setInputs({ ...inputs, right: +e.target.value })} className="w-full accent-primary" />
          </div>
        </div>
      )}
    </div>
  );
}

function LineInputs({ inputs, setInputs }) {
  const toggle = (key) => setInputs({ ...inputs, [key]: !inputs[key] });
  const sensors = [
    { key: "s1", label: "S1 (w=−3)", color: "bg-red-500" },
    { key: "s2", label: "S2 (w=−1)", color: "bg-orange-500" },
    { key: "s3", label: "S3 (w=+1)", color: "bg-green-500" },
    { key: "s4", label: "S4 (w=+3)", color: "bg-blue-500" },
  ];
  const seen = [inputs.s1, inputs.s2, inputs.s3, inputs.s4].filter(Boolean).length;
  const weights = [-3, -1, 1, 3];
  const sum = sensors.reduce((acc, s, i) => acc + (inputs[s.key] ? weights[i] : 0), 0);
  const error = seen > 0 ? (sum / seen).toFixed(1) : "—";
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Toggle which sensors see black (the line):</p>
      <div className="grid grid-cols-2 gap-2">
        {sensors.map((s) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
              inputs[s.key] ? `${s.color} text-white border-transparent` : "bg-muted/40 text-muted-foreground border-border/40"
            }`}
          >
            <span className={`w-3 h-3 rounded-full ${inputs[s.key] ? "bg-white" : "bg-muted-foreground/30"}`} />
            {s.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-muted/40 border border-border/40 p-2.5 font-mono text-xs space-y-0.5">
        <p>seen = {seen} → {seen === 0 ? "line lost" : seen === 4 ? "cross/finish" : "follow"}</p>
        <p>error = {error}</p>
      </div>
    </div>
  );
}

function MazeLineInputs({ inputs, setInputs }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => setInputs({ ...inputs, replay: false })}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${!inputs.replay ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground"}`}
        >
          EXPLORE (D12 open)
        </button>
        <button
          onClick={() => setInputs({ ...inputs, replay: true })}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${inputs.replay ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground"}`}
        >
          REPLAY (D12→GND)
        </button>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={inputs.allBlack} onChange={(e) => setInputs({ ...inputs, allBlack: e.target.checked })} className="accent-primary" />
        <span className="text-xs font-medium text-foreground">All 4 sensors black (FINISH square)</span>
      </label>
      <p className="text-xs text-muted-foreground italic">
        {inputs.replay
          ? "Replay mode: the car follows the saved shortest path from EEPROM."
          : "Explore mode: the car uses the Left-Hand Rule and records each turn, then simplifies dead ends (x B y → single turn)."}
      </p>
    </div>
  );
}

function WallMazeInputs({ inputs, setInputs }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { key: "left", label: "Left", color: "text-green-600" },
          { key: "front", label: "Front", color: "text-blue-600" },
          { key: "right", label: "Right", color: "text-orange-600" },
        ].map((s) => (
          <div key={s.key}>
            <label className={`text-xs font-bold ${s.color}`}>{s.label}: {inputs[s.key]}cm</label>
            <input type="range" min="5" max="200" value={inputs[s.key]} onChange={(e) => setInputs({ ...inputs, [s.key]: +e.target.value })} className="w-full accent-primary" />
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-muted/40 border border-border/40 p-2.5 font-mono text-xs">
        {inputs.left > 150 && inputs.front > 150 && inputs.right > 150
          ? "→ All open: EXIT reached!"
          : inputs.left > 30
          ? "→ LEFT open: turn left"
          : inputs.front > 30
          ? "→ FRONT open: go straight"
          : inputs.right > 30
          ? "→ RIGHT open: turn right"
          : "→ Blocked: U-turn"}
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
      <p className="text-sm text-muted-foreground leading-relaxed">
        These flowcharts match the actual code logic. Adjust the inputs below and watch the active path light up — or press Step to walk through the execution one node at a time.
      </p>

      {/* Flow tabs */}
      <div className="flex flex-wrap gap-2">
        {FLOWS.map((f) => (
          <button
            key={f.id}
            onClick={() => switchFlow(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFlow === f.id ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground/70 hover:bg-muted/60"
            }`}
          >
            {f.id}: {f.flow.name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {!stepMode ? (
          <button onClick={startStep} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">
            <Play size={13} /> Step Through
          </button>
        ) : (
          <>
            <button onClick={() => setRunning(!running)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">
              {running ? <Pause size={13} /> : <Play size={13} />} {running ? "Pause" : "Auto-play"}
            </button>
            <button onClick={stepNext} disabled={running} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 text-foreground text-xs font-medium hover:bg-muted/80 disabled:opacity-50">
              <StepForward size={13} /> Next Step
            </button>
          </>
        )}
        <button onClick={reset} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 text-foreground/70 text-xs font-medium hover:bg-muted/60">
          <RotateCcw size={13} /> Reset
        </button>
        {stepMode && <span className="text-xs text-muted-foreground">Step {stepIndex + 1} / {[...fullPath].length}</span>}
      </div>

      {/* Flowchart + inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FlowchartSVG flow={flow} activePath={activePath} height={flowHeight} />
        <Card className="p-4 border-border/60 shadow-sm">
          <p className="font-poppins font-bold text-sm text-foreground mb-3">Simulated Inputs</p>
          <InputComp inputs={inputs} setInputs={setInputs} />
        </Card>
      </div>
    </div>
  );
}