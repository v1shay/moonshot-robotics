import {
  Box,
  Bot,
  Circle,
  Cpu,
  Crosshair,
  Database,
  Layers,
  Lightbulb,
  LocateFixed,
  MessageSquare,
  Move3D,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Search,
  Send,
  Settings,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RobotModel, libraryAssets } from "./libraryAssets";
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

const quickAssets = [
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
  const [bottomTab, setBottomTab] = useState<"idō Library" | "Console">("idō Library");
  const [stageTab, setStageTab] = useState<"Stage" | "Layer" | "Render Settings">("Stage");
  const [overlayTab, setOverlayTab] = useState<"Stage" | "Layer" | "Render Settings" | null>(null);
  const [chatTab, setChatTab] = useState<"Luna" | "Tools" | "Logs">("Luna");
  const [isPlaying, setIsPlaying] = useState(true);
  const [spawnRequest, setSpawnRequest] = useState<{ kind: SpawnKind; id: number } | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [workflowRequest, setWorkflowRequest] = useState<{ id: number; model: RobotModel; training: boolean } | null>(null);
  const [workflowStatus, setWorkflowStatus] = useState("Idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [trainingCode, setTrainingCode] = useState("// Ask Luna to build or train a robot.");
  const [prompt, setPrompt] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, trainingCode]);

  const spawn = (kind: SpawnKind) => {
    setActiveTopView("sandbox");
    setWorkflowStatus(`Spawned ${kind}`);
    setSpawnRequest({ kind, id: Date.now() });
  };

  const runAssemblyWorkflow = (model: RobotModel, training = false) => {
    setActiveTopView("sandbox");
    setBottomTab("Console");
    setIsPlaying(true);
    const modelName = model === "humanoid" ? "Unitree G1" : model === "nova" ? "Luna Rover" : training ? "Franka Panda sorting cell" : "Franka Panda arm";
    setWorkflowStatus(`Luna assembling ${modelName}`);
    setWorkflowRequest({ id: Date.now(), model, training });
    setTrainingCode(getTrainingCode(model, training));
  };

  const sendMessage = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    const shouldAssemble = /\b(assemble|build|robot|train|training|nova|carter|rover|humanoid|unitree|g1|franka|panda|desktop|arm|sort|sorting|boxes)\b/i.test(trimmed);
    const shouldTrain = /\b(train|training|sort|sorting|boxes|cube|sphere|cylinder|task)\b/i.test(trimmed);
    const requestedModel: RobotModel = /\b(nova|carter|rover)\b/i.test(trimmed)
      ? "nova"
      : /\b(franka|panda|desktop|arm|sort|sorting|boxes)\b/i.test(trimmed)
        ? "desktop"
        : "humanoid";
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setPrompt("");
    if (shouldAssemble) {
      const modelName = requestedModel === "humanoid" ? "Unitree G1 humanoid" : requestedModel === "nova" ? "Luna Rover" : shouldTrain ? "Franka Panda sorting cell" : "Franka Panda arm";
      [
        `Thinking... I am reading the viewport, parsing the request, and deciding how to build the ${modelName}.`,
        "Sourcing from idō Library... I am selecting the required components from the randomized asset set.",
        "Assembling pieces... I am placing parts into the sandbox one at a time and checking alignment in the viewport.",
        requestedModel === "desktop" && shouldTrain
          ? "Training... I am spawning shapes and bins, then running the sorting policy."
          : shouldTrain
            ? "Training... I am preparing the generated control policy shown above."
            : "Finalizing... I am checking the assembled robot in the viewport and preparing it for the next instruction.",
      ].forEach((text, index) => {
        window.setTimeout(() => setMessages((current) => [...current, { role: "agent", text }]), 250 + index * 650);
      });
      window.setTimeout(() => runAssemblyWorkflow(requestedModel, shouldTrain), 2150);
    }
  };

  const toolButtons = [
    { label: "Select", icon: Move3D },
    { label: "Move", icon: Crosshair },
    { label: "Rotate", icon: RotateCw },
    { label: isPlaying ? "Pause" : "Play", icon: isPlaying ? Pause : Play },
    { label: "Reset", icon: RotateCcw },
  ];

  const selectAsset = (label: string, source: string) => {
    setWorkflowStatus(`Selected ${label}`);
    setMessages((current) => [
      ...current,
      {
        role: "agent",
        text:
          source === "library"
            ? `${label} selected from idō Library. I can place it as part of the correct robot assembly.`
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
              setBottomTab("idō Library");
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

      {activeTopView === "library" && (
        <section className="library-screen">
          <div className="library-head">
            <strong>idō Library</strong>
            <span>{libraryAssets.length} randomized components across Unitree G1, Luna Rover, and Franka Panda systems</span>
          </div>
          <div className="library-grid">
            {libraryAssets.map((asset) => {
              return (
                <button className="asset-tile" key={asset.id} onClick={() => selectAsset(asset.label, "library")}>
                  <div className={`asset-preview tone-${asset.iconTone}`}>
                    <img src={asset.icon} alt="" />
                  </div>
                  <div>
                    <strong>{asset.label}</strong>
                    <span>{asset.model} / {asset.group}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
      <section className={`app-grid ${activeTopView === "library" ? "is-hidden" : ""}`}>
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
                  if (tool.label === "Reset") setResetSignal((value) => value + 1);
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
              <div className="overlay-launchers">
                {(["Stage", "Layer", "Render Settings"] as const).map((tabName) => (
                  <button key={tabName} onClick={() => setOverlayTab(tabName)}>{tabName}</button>
                ))}
              </div>
            </div>
            <div className="viewport-toolbar">
              <button onClick={() => setRenderMode((value) => (value === "RTX - Real-Time" ? "Path Preview" : "RTX - Real-Time"))}>
                <Lightbulb size={16} /> {renderMode}
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
              {(["idō Library", "Console"] as const).map((tabName) => (
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
              <div className="spacer" />
              <button onClick={() => spawn("box")}><Box size={14} /> Box</button>
              <button onClick={() => spawn("sphere")}><Circle size={14} /> Sphere</button>
              <button onClick={() => setIsPlaying((value) => !value)}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={() => setResetSignal((value) => value + 1)}><RotateCcw size={14} /> Reset</button>
            </div>
            {bottomTab === "idō Library" && (
              <div className="asset-grid">
                {(activeTopView === "library" ? libraryAssets : quickAssets).map((asset) => {
                  const QuickIcon = "id" in asset ? null : asset.icon;
                  return (
                    <button
                      className="asset-tile"
                      key={"id" in asset ? asset.id : asset.name}
                      onClick={() => {
                        if ("id" in asset) {
                          selectAsset(asset.label, "library");
                        } else {
                          selectAsset(asset.name, "sandbox");
                          spawn("robot");
                        }
                      }}
                    >
                      {"id" in asset ? (
                        <div className={`asset-preview tone-${asset.iconTone}`}>
                          <img src={asset.icon} alt="" />
                        </div>
                      ) : (
                        <div className="asset-preview">{QuickIcon ? <QuickIcon size={24} /> : null}</div>
                      )}
                      <div>
                        <strong>{"label" in asset ? asset.label : asset.name}</strong>
                        <span>{"group" in asset ? `${asset.model} / ${asset.group}` : asset.meta}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            {bottomTab === "Console" && (
              <div className="panel-readout mono">
                <span>[luna] {workflowStatus}</span>
                <span>[library] {libraryAssets.length} scrambled assets indexed</span>
                <span>[physics] gravity enabled, rigid body primitives online</span>
              </div>
            )}
          </section>
        </section>

        <aside className="right-column">
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
            <pre className="code-panel">{trainingCode}</pre>
            {chatTab === "Luna" && (
              <div className="messages" ref={messagesRef}>
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
                <button onClick={() => setResetSignal((value) => value + 1)}><RotateCcw size={14} /> Reset scene</button>
              </div>
            )}
            {chatTab === "Logs" && (
              <div className="messages mono">
                <span>[library] idō assets: {libraryAssets.length}</span>
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
        {overlayTab && (
          <section className="stage-overlay">
            <div className="overlay-head">
              <strong>{overlayTab}</strong>
              <button onClick={() => setOverlayTab(null)}>Close</button>
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
              {({
                Stage: stageRows,
                Layer: [
                  { name: "Root Layer", type: "USD", muted: false },
                  { name: "Luna Assembly Session", type: "Live", muted: false },
                ],
                "Render Settings": [
                  { name: renderMode, type: "Renderer", muted: false },
                  { name: stageLights ? "Stage Lights" : "Lights Muted", type: "Lighting", muted: false },
                ],
              }[overlayTab]).map((row) => (
                <div className="stage-row" key={row.name}>
                  <span><Layers size={14} /> {row.name}</span>
                  <span>{row.type}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function getTrainingCode(model: RobotModel, training = false) {
  if (model === "desktop") {
    if (!training) {
      return `from luna.sim import World\n\nworld = World(viewport=\"current\")\narm = luna.assemble(\"franka_panda\", source=\"idō/franka_emika_panda/panda.xml\")\narm.apply_brand(\"moonshot_robotics\")\narm.enable_joint_animation(mode=\"inspection\")\n\nworld.add(arm)\nviewport.frame(arm)\nluna.report(\"Franka Panda assembled from XML body tree\")`;
    }

    return `from luna.sim import World, VisionEncoder, PickPlacePolicy, TrajectoryOptimizer\n\nworld = World(viewport=\"current\")\narm = luna.assemble(\"franka_panda\", source=\"idō/franka_emika_panda/panda.xml\")\narm.apply_brand(\"moonshot_robotics\")\nobjects = world.spawn_shapes([\"cube\", \"sphere\", \"cylinder\"], randomized_pose=True)\nbins = world.spawn_cardboard_bins(labels=[\"cube\", \"sphere\", \"cylinder\"])\nvision = VisionEncoder(camera=\"viewport\", features=[\"shape\", \"pose\", \"bin_label\"])\npolicy = PickPlacePolicy(robot=arm, task=\"shape_sort\")\noptimizer = TrajectoryOptimizer(robot=arm, collision_scene=world)\n\nfor epoch in range(36):\n    obs = vision.observe(world)\n    plan = policy.plan_pick_place(obs, objects, bins)\n    for pick, place in plan:\n        trajectory = optimizer.solve(\n            start=arm.joint_state(),\n            grasp_pose=pick.pose,\n            release_pose=place.pose,\n            constraints=[\"clear_table\", \"upright_gripper\", \"bin_centerline\"],\n        )\n        arm.follow(trajectory.approach)\n        arm.close_gripper(force=pick.grasp_force)\n        arm.follow(trajectory.transfer)\n        arm.open_gripper()\n        world.step_until_settled()\n    reward = world.score_bins(objects, bins) + policy.smoothness_bonus(arm)\n    policy.update(obs, plan, reward)\n\nluna.deploy(policy, robot=arm)`;
  }

  if (model === "nova") {
    return `from luna.rovers import RoverPolicy\n\nrover = luna.assemble(\"luna_rover\", source=\"idō/nova_carter\")\ntextures.apply(rover, source=\"idō/nova_carter/materials\")\npolicy = RoverPolicy(task=\"sim_navigation\", robot=rover)\n\nfor step in range(train_steps):\n    obs = viewport.observe()\n    action = policy.action(obs)\n    rover.drive(action.linear, action.angular)\n    reward = route_progress(obs) - collision_penalty(obs)\n    policy.update(obs, action, reward)\n\nluna.deploy(policy, robot=rover)`;
  }

  return `from luna.humanoids import BalancePolicy, WholeBodyController\n\nhumanoid = luna.assemble(\"unitree_g1\", source=\"idō/unitree_g1/g1_with_hands.xml\")\nhumanoid.apply_brand(\"moonshot_robotics\")\ncontroller = WholeBodyController(humanoid)\npolicy = BalancePolicy(task=\"upright_locomotion\", controller=controller)\n\nfor step in range(train_steps):\n    obs = viewport.observe()\n    torques = policy.action(obs)\n    humanoid.apply_torques(torques)\n    reward = upright_stability(obs) + gait_progress(obs)\n    policy.update(obs, torques, reward)\n\nluna.deploy(policy, robot=humanoid)`;
}
