import {
  Box,
  Boxes,
  Bot,
  Circle,
  Cpu,
  Crosshair,
  Database,
  Gauge,
  Grid3X3,
  Layers,
  Lightbulb,
  LocateFixed,
  Maximize,
  MessageSquare,
  Move3D,
  PanelBottom,
  Pause,
  Play,
  Plus,
  RotateCcw,
  RotateCw,
  Search,
  Send,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Square,
  Terminal,
  Trash2,
  Triangle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { SandboxViewport, SpawnKind } from "./SandboxViewport";

type ChatMessage = {
  role: "agent" | "user";
  text: string;
};

const stageRows = [
  { name: "World (defaultPrim)", type: "Xform", muted: false },
  { name: "Environment", type: "Xform", muted: false },
  { name: "RobotAssembly", type: "Xform", muted: false },
  { name: "PhysicsScene", type: "Scope", muted: true },
];

const assets = [
  { name: "Manipulator Arm", meta: "URDF-ready rig", icon: Bot },
  { name: "Drive Base", meta: "Wheeled platform", icon: Cpu },
  { name: "Sensor Mast", meta: "Camera/LiDAR slot", icon: LocateFixed },
  { name: "Joint Block", meta: "Revolute module", icon: RotateCw },
  { name: "End Effector", meta: "Gripper mount", icon: Crosshair },
];

export function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [spawnRequest, setSpawnRequest] = useState<{ kind: SpawnKind; id: number } | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "agent",
      text: "Robotics agent online. I can help configure components, generate motion scripts, and reason about the scene graph.",
    },
    {
      role: "agent",
      text: "The sandbox is running with gravity, rigid bodies, a robot arm animation loop, and asset placeholders for later imports.",
    },
  ]);
  const [prompt, setPrompt] = useState("");

  const spawn = (kind: SpawnKind) => {
    setSpawnRequest({ kind, id: Date.now() });
  };

  const sendMessage = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      {
        role: "agent",
        text: "Queued. I can turn that into a scene command once your robot asset pipeline is connected.",
      },
    ]);
    setPrompt("");
  };

  return (
    <main className="workbench">
      <header className="titlebar">
        <div className="app-chip">
          <span className="app-corner" />
          Isaac Sim
        </div>
        <nav className="menu">
          <span>File</span>
          <span>Edit</span>
          <span>Create</span>
          <span>Window</span>
          <span>Isaac Utils</span>
          <span>Isaac Examples</span>
          <span>Replicator</span>
          <span>Tools</span>
          <span>Profiler</span>
          <span>Layout</span>
          <span>Help</span>
        </nav>
        <div className="runtime">
          <span className="live"><Zap size={13} /> LIVE</span>
          <span>CACHE: <b>ON</b></span>
        </div>
      </header>

      <section className="app-grid">
        <aside className="tool-rail" aria-label="Viewport tools">
          <button aria-label="Select"><Move3D /></button>
          <button aria-label="Move"><Crosshair /></button>
          <button aria-label="Rotate"><RotateCw /></button>
          <button aria-label="Scale"><Maximize /></button>
          <button aria-label="Snap"><Grid3X3 /></button>
          <button aria-label="Play"><Play /></button>
          <button aria-label="Robot"><Bot /></button>
        </aside>

        <section className="center-column">
          <div className="viewport-panel">
            <div className="viewport-title">
              <span>Viewport</span>
            </div>
            <div className="viewport-toolbar">
              <button aria-label="Render settings"><SlidersHorizontal size={18} /></button>
              <button><Lightbulb size={16} /> RTX - Real-Time</button>
              <button aria-label="Eye"><Gauge size={18} /></button>
              <button><Cpu size={16} /> Perspective</button>
              <button aria-label="Broadcast"><LocateFixed size={18} /></button>
              <div className="spacer" />
              <button><Lightbulb size={16} /> Stage Lights</button>
              <button aria-label="Pin"><LocateFixed size={18} /></button>
            </div>
            <SandboxViewport isPlaying={isPlaying} spawnRequest={spawnRequest} resetSignal={resetSignal} />
            <div className="viewport-scale">m</div>
          </div>

          <section className="bottom-panel">
            <div className="tabs">
              <button>Content</button>
              <button className="active">Robot Assets</button>
              <button>Console</button>
              <button>Flow</button>
            </div>
            <div className="asset-toolbar">
              <button onClick={() => spawn("box")}><Box size={14} /> Rigid Box</button>
              <button onClick={() => spawn("sphere")}><Circle size={14} /> Sphere</button>
              <button onClick={() => spawn("cylinder")}><Database size={14} /> Cylinder</button>
              <button onClick={() => spawn("robot")}><Bot size={14} /> Robot Part</button>
              <div className="spacer" />
              <button onClick={() => setIsPlaying((value) => !value)}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={() => setResetSignal((value) => value + 1)}><RotateCcw size={14} /> Reset</button>
            </div>
            <div className="asset-grid">
              {assets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <article className="asset-tile" key={asset.name}>
                    <div className="asset-preview"><Icon size={24} /></div>
                    <div>
                      <strong>{asset.name}</strong>
                      <span>{asset.meta}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>

        <aside className="right-column">
          <section className="stage-panel">
            <div className="tabs compact">
              <button className="active">Stage</button>
              <button>Layer</button>
              <button>Render Settings</button>
            </div>
            <label className="search-field">
              <Search size={14} />
              <input placeholder="Search" />
            </label>
            <div className="stage-table">
              <div className="table-head">
                <span>Name (Old to New)</span>
                <span>Type</span>
              </div>
              {stageRows.map((row) => (
                <div className="stage-row" key={row.name}>
                  <span><Layers size={14} /> {row.name}</span>
                  <span>{row.type}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="chat-panel">
            <div className="tabs compact">
              <button className="active"><MessageSquare size={14} /> Agent</button>
              <button><Settings size={14} /> Tools</button>
              <button><Terminal size={14} /> Logs</button>
            </div>
            <div className="agent-status">
              <span><Sparkles size={14} /> Moonshot Robotics Agent</span>
              <span className="status-dot">online</span>
            </div>
            <div className="messages">
              {messages.map((message, index) => (
                <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                  <span>{message.role === "agent" ? "Agent" : "You"}</span>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask the agent to inspect, script, or assemble..."
              />
              <button onClick={sendMessage} aria-label="Send message"><Send size={16} /></button>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
