import {
  Box,
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
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Search,
  Send,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { SandboxViewport, SpawnKind } from "./SandboxViewport";
import { humanoidAssets } from "./humanoidAssets";

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
  const [activeTopView, setActiveTopView] = useState<"sandbox" | "library">("sandbox");
  const [activeTool, setActiveTool] = useState("Select");
  const [renderMode, setRenderMode] = useState("RTX - Real-Time");
  const [cameraMode, setCameraMode] = useState("Perspective");
  const [stageLights, setStageLights] = useState(true);
  const [bottomTab, setBottomTab] = useState<"Content" | "Robot Assets" | "Console" | "Flow">("Robot Assets");
  const [stageTab, setStageTab] = useState<"Stage" | "Layer" | "Render Settings">("Stage");
  const [chatTab, setChatTab] = useState<"Luna" | "Tools" | "Logs">("Luna");
  const [isPlaying, setIsPlaying] = useState(true);
  const [spawnRequest, setSpawnRequest] = useState<{ kind: SpawnKind; id: number } | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [workflowRequest, setWorkflowRequest] = useState<{ id: number } | null>(null);
  const [workflowStatus, setWorkflowStatus] = useState("Idle");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "agent",
      text: "Luna online. I can help configure components, generate motion scripts, and reason about the scene graph.",
    },
    {
      role: "agent",
      text: `idō Library indexed ${humanoidAssets.length} humanoid STL assets. Ask me to assemble the humanoid and I will stream the build into the sandbox.`,
    },
  ]);
  const [prompt, setPrompt] = useState("");

  const spawn = (kind: SpawnKind) => {
    setActiveTopView("sandbox");
    setWorkflowStatus(`Spawned ${kind}`);
    setSpawnRequest({ kind, id: Date.now() });
  };

  const runAssemblyWorkflow = () => {
    setActiveTopView("sandbox");
    setBottomTab("Flow");
    setIsPlaying(true);
    setWorkflowStatus("Assembling humanoid");
    setWorkflowRequest({ id: Date.now() });
    setMessages((current) => [
      ...current,
      {
        role: "agent",
        text: "Starting humanoid assembly. I will place the core, legs, arms, hands, head, and logo link in sequence, then switch to training readiness.",
      },
    ]);
  };

  const sendMessage = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    const shouldAssemble = /\b(assemble|build|humanoid|robot|train|training)\b/i.test(trimmed);
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      {
        role: "agent",
        text: shouldAssemble
          ? "Understood. I am starting the humanoid assembly workflow from the idō Library assets."
          : "Queued. I can inspect the stage, spawn primitives, or assemble the humanoid when you ask.",
      },
    ]);
    setPrompt("");
    if (shouldAssemble) {
      window.setTimeout(runAssemblyWorkflow, 80);
    }
  };

  const toolButtons = [
    { label: "Select", icon: Move3D },
    { label: "Move", icon: Crosshair },
    { label: "Rotate", icon: RotateCw },
    { label: "Scale", icon: Maximize },
    { label: "Snap", icon: Grid3X3 },
    { label: isPlaying ? "Pause" : "Play", icon: isPlaying ? Pause : Play },
    { label: "Assemble", icon: Bot },
  ];

  const selectAsset = (label: string, source: string) => {
    setWorkflowStatus(`Selected ${label}`);
    setMessages((current) => [
      ...current,
      {
        role: "agent",
        text:
          source === "library"
            ? `${label} selected from idō Library. Ask me to assemble to place it in the full humanoid workflow.`
            : `${label} selected. I can spawn a matching robot placeholder or use it in the assembly flow.`,
      },
    ]);
  };

  const stageContent = {
    Stage: stageRows,
    Layer: [
      { name: "Root Layer", type: "USD", muted: false },
      { name: "Luna Assembly Session", type: "Live", muted: false },
    ],
    "Render Settings": [
      { name: "RTX - Real-Time", type: "Renderer", muted: false },
      { name: "Stage Lights", type: "Lighting", muted: false },
    ],
  }[stageTab];

  return (
    <main className="workbench">
      <header className="titlebar">
        <div className="app-chip">
          <img src="/moonshot-robotics-logo.png" alt="" />
          <span>Moonshot Robotics</span>
        </div>
        <nav className="top-nav" aria-label="Primary views">
          <button
            className={activeTopView === "sandbox" ? "active" : ""}
            onClick={() => setActiveTopView("sandbox")}
          >
            Current Sandbox
          </button>
          <button
            className={activeTopView === "library" ? "active" : ""}
            onClick={() => {
              setActiveTopView("library");
              setBottomTab("Robot Assets");
            }}
          >
            idō Library
          </button>
        </nav>
        <div className="runtime">
          <span className="live"><Zap size={13} /> LIVE</span>
          <span>CACHE: <b>ON</b></span>
        </div>
      </header>

      <section className="app-grid">
        <aside className="tool-rail" aria-label="Viewport tools">
          {toolButtons.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                aria-label={tool.label}
                className={activeTool === tool.label ? "active" : ""}
                key={tool.label}
                title={tool.label}
                onClick={() => {
                  setActiveTool(tool.label);
                  if (tool.label === "Pause" || tool.label === "Play") setIsPlaying((value) => !value);
                  if (tool.label === "Assemble") runAssemblyWorkflow();
                }}
              >
                <Icon />
              </button>
            );
          })}
        </aside>

        <section className="center-column">
          <div className="viewport-panel">
            <div className="viewport-title">
              <span>Viewport</span>
            </div>
            <div className="viewport-toolbar">
              <button
                aria-label="Render settings"
                onClick={() => setRenderMode((value) => (value === "RTX - Real-Time" ? "Path Preview" : "RTX - Real-Time"))}
              >
                <SlidersHorizontal size={18} />
              </button>
              <button onClick={() => setRenderMode((value) => (value === "RTX - Real-Time" ? "Path Preview" : "RTX - Real-Time"))}>
                <Lightbulb size={16} /> {renderMode}
              </button>
              <button aria-label="Frame scene" onClick={() => setWorkflowStatus("Viewport framed to robot assembly")}>
                <Gauge size={18} />
              </button>
              <button onClick={() => setCameraMode((value) => (value === "Perspective" ? "Orthographic" : "Perspective"))}>
                <Cpu size={16} /> {cameraMode}
              </button>
              <button aria-label="Center robot" onClick={() => setWorkflowStatus("Robot centered in viewport")}>
                <LocateFixed size={18} />
              </button>
              <div className="spacer" />
              <button onClick={() => setStageLights((value) => !value)}>
                <Lightbulb size={16} /> {stageLights ? "Stage Lights" : "Lights Muted"}
              </button>
              <button aria-label="Pin viewport" onClick={() => setWorkflowStatus("Viewport pinned")}>
                <LocateFixed size={18} />
              </button>
            </div>
            <SandboxViewport
              isPlaying={isPlaying}
              spawnRequest={spawnRequest}
              resetSignal={resetSignal}
              workflowRequest={workflowRequest}
              onWorkflowStatus={setWorkflowStatus}
              stageLights={stageLights}
              cameraMode={cameraMode}
            />
            <div className="viewport-scale">m</div>
          </div>

          <section className="bottom-panel">
            <div className="tabs">
              {(["Content", "Robot Assets", "Console", "Flow"] as const).map((tabName) => (
                <button
                  className={bottomTab === tabName ? "active" : ""}
                  key={tabName}
                  onClick={() => setBottomTab(tabName)}
                >
                  {tabName}
                </button>
              ))}
            </div>
            <div className="asset-toolbar">
              <button onClick={() => spawn("box")}><Box size={14} /> Rigid Box</button>
              <button onClick={() => spawn("sphere")}><Circle size={14} /> Sphere</button>
              <button onClick={() => spawn("cylinder")}><Database size={14} /> Cylinder</button>
              <button onClick={() => spawn("robot")}><Bot size={14} /> Robot Part</button>
              <button onClick={runAssemblyWorkflow}><Sparkles size={14} /> Assemble Humanoid</button>
              <div className="spacer" />
              <button onClick={() => setIsPlaying((value) => !value)}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={() => setResetSignal((value) => value + 1)}><RotateCcw size={14} /> Reset</button>
            </div>
            {bottomTab === "Robot Assets" && (
              <div className="asset-grid">
                {(activeTopView === "library" ? humanoidAssets : assets).map((asset) => {
                  const Icon = "icon" in asset ? asset.icon : Bot;
                  return (
                    <button
                      className="asset-tile"
                      key={"file" in asset ? asset.file : asset.name}
                      onClick={() => {
                        if ("file" in asset) {
                          selectAsset(asset.label, "library");
                        } else {
                          selectAsset(asset.name, "sandbox");
                          spawn("robot");
                        }
                      }}
                    >
                      <div className="asset-preview"><Icon size={24} /></div>
                      <div>
                        <strong>{"label" in asset ? asset.label : asset.name}</strong>
                        <span>{"group" in asset ? `${asset.group} / STL` : asset.meta}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            {bottomTab === "Content" && (
              <div className="panel-readout">
                <strong>Current view</strong>
                <span>{activeTopView === "library" ? "idō Library asset browser" : "Live robotics sandbox"}</span>
              </div>
            )}
            {bottomTab === "Console" && (
              <div className="panel-readout mono">
                <span>[luna] {workflowStatus}</span>
                <span>[stage] {humanoidAssets.length} humanoid mesh assets available</span>
                <span>[physics] gravity enabled, rigid body primitives online</span>
              </div>
            )}
            {bottomTab === "Flow" && (
              <div className="flow-list">
                {["Index idō Library", "Place pelvis and torso", "Attach legs", "Attach arms", "Attach hands", "Attach head and logo", "Training readiness"].map((step) => (
                  <div className="flow-step" key={step}>
                    <Sparkles size={14} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>

        <aside className="right-column">
          <section className="stage-panel">
            <div className="tabs compact">
              {(["Stage", "Layer", "Render Settings"] as const).map((tabName) => (
                <button
                  className={stageTab === tabName ? "active" : ""}
                  key={tabName}
                  onClick={() => setStageTab(tabName)}
                >
                  {tabName}
                </button>
              ))}
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
              {stageContent.map((row) => (
                <div className="stage-row" key={row.name}>
                  <span><Layers size={14} /> {row.name}</span>
                  <span>{row.type}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="chat-panel">
            <div className="tabs compact">
              {([
                ["Luna", MessageSquare],
                ["Tools", Settings],
                ["Logs", Terminal],
              ] as const).map(([tabName, Icon]) => (
                <button
                  className={chatTab === tabName ? "active" : ""}
                  key={tabName}
                  onClick={() => setChatTab(tabName)}
                >
                  <Icon size={14} /> {tabName}
                </button>
              ))}
            </div>
            <div className="agent-status">
              <span><Sparkles size={14} /> Luna</span>
              <span className="status-dot">online</span>
            </div>
            {chatTab === "Luna" && (
              <div className="messages">
                {messages.map((message, index) => (
                  <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                    <span>{message.role === "agent" ? "Luna" : "You"}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            )}
            {chatTab === "Tools" && (
              <div className="messages tool-list">
                <button onClick={() => spawn("box")}><Box size={14} /> Spawn rigid box</button>
                <button onClick={() => spawn("sphere")}><Circle size={14} /> Spawn sphere</button>
                <button onClick={runAssemblyWorkflow}><Sparkles size={14} /> Run Luna assembly</button>
                <button onClick={() => setResetSignal((value) => value + 1)}><RotateCcw size={14} /> Reset scene</button>
              </div>
            )}
            {chatTab === "Logs" && (
              <div className="messages mono">
                <span>[library] idō humanoid assets: {humanoidAssets.length}</span>
                <span>[workflow] {workflowStatus}</span>
                <span>[runtime] live canvas ready</span>
              </div>
            )}
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
                placeholder="Ask Luna to inspect, script, or assemble..."
              />
              <button onClick={sendMessage} aria-label="Send message"><Send size={16} /></button>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
