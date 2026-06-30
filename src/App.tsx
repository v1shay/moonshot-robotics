import {
  Box,
  Circle,
  Cpu,
  Crosshair,
  Layers,
  Lightbulb,
  LocateFixed,
  MessageSquare,
  Mic,
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
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { LibraryAsset, RobotModel, libraryAssets } from "./libraryAssets";
import { AssetPreviewRequest, SandboxViewport, SpawnKind } from "./SandboxViewport";

type ChatMessage = {
  role: "agent" | "user";
  text: string;
  preview?: {
    label: string;
    file: string;
  };
  imagePreview?: {
    label: string;
    file: string;
    detail: string;
  };
};

type ModelSession = {
  id: string;
  title: string;
  model: RobotModel | null;
  training: boolean;
  messages: ChatMessage[];
  trainingCode: string;
  status: string;
  startedAt?: number;
  demo?: boolean;
};

const stageRows = [
  { name: "World (defaultPrim)", type: "Xform", muted: false },
  { name: "Environment", type: "Xform", muted: false },
  { name: "RobotAssembly", type: "Xform", muted: false },
  { name: "PhysicsScene", type: "Scope", muted: true },
];

const initialSession: ModelSession = {
  id: "session-home",
  title: "Sandbox",
  model: null,
  training: false,
  messages: [],
  trainingCode: "// Ask Luna to build or train a robot.",
  status: "Idle",
};

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
  const [workflowRequest, setWorkflowRequest] = useState<{ id: number; model: RobotModel; training: boolean; demo?: boolean } | null>(null);
  const [assetPreviewRequest, setAssetPreviewRequest] = useState<AssetPreviewRequest | null>(null);
  const [sessions, setSessions] = useState<ModelSession[]>([initialSession]);
  const [activeSessionId, setActiveSessionId] = useState(initialSession.id);
  const [prompt, setPrompt] = useState("");
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const activeSession = sessions.find((session) => session.id === activeSessionId) ?? sessions[0];
  const messages = activeSession.messages;
  const trainingCode = activeSession.trainingCode;
  const workflowStatus = activeSession.status;
  const bottomLibraryAssets = libraryAssets.slice(0, 48);
  const [clockTick, setClockTick] = useState(Date.now());

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, trainingCode]);

  useEffect(() => {
    const tick = window.setInterval(() => setClockTick(Date.now()), 500);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.getVoices();
    const refreshVoices = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", refreshVoices);
  }, []);

  useEffect(() => {
    if (!activeSession.model) return;
    setActiveTopView("sandbox");
    setWorkflowRequest({ id: Date.now(), model: activeSession.model, training: activeSession.training, demo: activeSession.demo });
  }, [activeSessionId]);

  const updateSession = (sessionId: string, updater: (session: ModelSession) => ModelSession) => {
    setSessions((current) => current.map((session) => (session.id === sessionId ? updater(session) : session)));
  };

  const appendMessage = (sessionId: string, message: ChatMessage) => {
    updateSession(sessionId, (session) => ({ ...session, messages: [...session.messages, message] }));
  };

  const appendAgentMessage = (sessionId: string, message: ChatMessage) => {
    appendMessage(sessionId, message);
    const speechSummary = getSpeechSummary(message);
    if (speechEnabled && speechSummary) {
      speakLuna(speechSummary);
    }
  };

  const speakLuna = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text.replace(/\.\.\./g, "."));
    utterance.voice = getPreferredLunaVoice();
    utterance.rate = 0.96;
    utterance.pitch = 1.06;
    utterance.volume = 0.78;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      appendAgentMessage(activeSessionId, {
        role: "agent",
        text: "I can use browser speech input in Chrome or Safari. This browser did not expose SpeechRecognition, so text input is still active.",
      });
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) setPrompt((value) => `${value}${value ? " " : ""}${transcript}`);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const setSessionStatus = (status: string) => {
    updateSession(activeSessionId, (session) => ({ ...session, status }));
  };

  const ensureSession = (model: RobotModel, promptText: string) => {
    const id = `session-${model}-${Date.now()}`;
    const title = makeSessionTitle(model, promptText);
    setSessions((current) => [
      ...current,
      {
        id,
        title,
        model: null,
        training: false,
        messages: [],
        trainingCode: "// Luna is sourcing assets before touching the viewport.",
        status: "Sourcing",
      },
    ]);
    setActiveSessionId(id);
    return id;
  };

  const spawn = (kind: SpawnKind) => {
    setActiveTopView("sandbox");
    setSessionStatus(`Spawned ${kind}`);
    setSpawnRequest({ kind, id: Date.now() });
  };

  const runAssemblyWorkflow = (model: RobotModel, training = false, sessionId = activeSessionId, demo = false) => {
    setActiveTopView("sandbox");
    setBottomTab("Console");
    setIsPlaying(true);
    const modelName = model === "humanoid" ? "humanoid worker" : model === "nova" ? "Luna Rover" : training ? "desktop sorting cell" : "desktop arm";
    updateSession(sessionId, (session) => ({
      ...session,
      model,
      training,
      demo,
      startedAt: Date.now(),
      status: demo ? `Luna running 15-minute timelapse for ${modelName}` : `Luna assembling ${modelName}`,
    }));
    setWorkflowRequest({ id: Date.now(), model, training, demo });
    if (training) {
      streamTrainingCode(sessionId, model);
    } else {
      updateSession(sessionId, (session) => ({ ...session, trainingCode: getTrainingCode(model, training) }));
    }
  };

  const streamTrainingCode = (sessionId: string, model: RobotModel) => {
    const code = makeTrainingCode(model);
    updateSession(sessionId, (session) => ({ ...session, trainingCode: "" }));
    const chunkSize = 92;
    for (let offset = 0; offset < code.length; offset += chunkSize) {
      window.setTimeout(() => {
        const chunk = code.slice(offset, offset + chunkSize);
        updateSession(sessionId, (session) => ({ ...session, trainingCode: session.trainingCode + chunk }));
      }, 220 + (offset / chunkSize) * 185);
    }
  };

  const sendMessage = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    const demoMode = /(^|\s)--demo(\s|$)/i.test(trimmed);
    const commandText = trimmed.replace(/(^|\s)--demo(\s|$)/gi, " ").replace(/\s+/g, " ").trim();
    const promptForRouting = commandText || trimmed;
    const shouldAssemble = /\b(assemble|build|construct|generate|make|spawn|create|fabricate|rig|robot|train|training|nova|carter|rover|vehicle|drive|humanoid|biped|walker|unitree|g1|franka|panda|desktop|arm|manipulator|sort|sorting|boxes|pick|place|disaster|recovery|warehouse|recycle|recycling)\b/i.test(promptForRouting);
    const shouldTrain = demoMode || /\b(train|training|sort|sorting|boxes|cube|sphere|cylinder|task|disaster|recovery|warehouse|recycle|recycling)\b/i.test(promptForRouting);
    const mentionsModel = /\b(nova|carter|rover|vehicle|drive|wheeled|mobile|franka|panda|desktop|arm|manipulator|humanoid|biped|walker|unitree|g1)\b/i.test(promptForRouting);
    const requestedModel: RobotModel = shouldTrain && !mentionsModel && activeSession.model
      ? activeSession.model
      : /\b(nova|carter|rover|vehicle|drive|wheeled|mobile|disaster|recovery)\b/i.test(promptForRouting)
      ? "nova"
      : /\b(franka|panda|desktop|arm|manipulator|pick|place|sort|sorting|boxes|recycle|recycling)\b/i.test(promptForRouting)
        ? "desktop"
        : "humanoid";
    const targetSessionId = shouldAssemble && !shouldTrain ? ensureSession(requestedModel, promptForRouting) : activeSessionId;
    appendMessage(targetSessionId, { role: "user", text: trimmed });
    setPrompt("");
    if (shouldAssemble) {
      if (!shouldTrain) {
        setResetSignal((value) => value + 1);
        setWorkflowRequest(null);
      }
      const modelName = requestedModel === "humanoid" ? "humanoid worker" : requestedModel === "nova" ? "Luna Rover" : shouldTrain ? "desktop sorting cell" : "desktop arm";
      const parts = shouldTrain ? getTrainingPreviewParts(requestedModel) : getPreviewParts(requestedModel);
      const chatStream: ChatMessage[] = [
        { role: "agent", text: `Thinking... I am reading the request, checking the active sandbox, and deciding what ${modelName} needs before I touch the viewport.` },
        { role: "agent", text: "Searching idō..." },
        { role: "agent", text: "Thinking... I need parts that match the robot body tree, actuator limits, ground contact, and the scene objective. I will source them one by one before rendering anything in the sandbox." },
        { role: "agent", text: "Checking constraints..." },
        {
          role: "agent",
          text: "Talking to idō Library via MongoDB... I am querying the idō index for sequential mesh candidates, socket metadata, and task assets.",
          imagePreview: {
            label: "idō Library query route",
            file: "/assets/brand/mongo-db-logo.png",
            detail: "MongoDB-backed asset index",
          },
        },
        { role: "agent", text: "Searching parts..." },
        { role: "agent", text: `Found ${parts[0].label}. ${shouldTrain ? "I will keep this as a training asset until the task scene starts." : "This is the first structural part I need from idō Library."}`, preview: parts[0] },
        { role: "agent", text: "Resolving socket fit..." },
        { role: "agent", text: `Found ${parts[1].label}. I am matching it against the next socket and constraint set.`, preview: parts[1] },
        { role: "agent", text: "Checking material and joint limits..." },
        { role: "agent", text: `Found ${parts[2].label}. I am adding it to the ${shouldTrain ? "curriculum" : "build"} queue before the viewport sequence starts.`, preview: parts[2] },
        { role: "agent", text: "Preparing final viewport render..." },
        { role: "agent", text: shouldTrain ? "Spawning evaluator agents... early rollouts will fail visibly, then I will tighten rewards until the task completes cleanly." : "Assembling pieces... I am streaming the parts into the sandbox sequentially and checking alignment in the viewport." },
        {
          role: "agent",
          text: requestedModel === "desktop" && shouldTrain
          ? demoMode
            ? "Training... I am running a 15-minute sorting trial as a one-minute timelapse, streaming controller updates while the arm repeats pick-place rollouts."
            : "Training... I am generating recycling bins and objects, then running pick-place rollouts until the arm sorts cleanly."
          : shouldTrain
            ? demoMode
              ? "Training... I am running a 15-minute trial as a one-minute timelapse, keeping the robot motion visible while the evaluator agents score each episode."
              : "Training... I am generating the task scene and running staged agents until the motion becomes stable."
            : "Finalizing... I am checking the assembled robot in the viewport and preparing it for the next instruction.",
        },
      ];
      chatStream.forEach((message, index) => {
        window.setTimeout(() => appendAgentMessage(targetSessionId, message), 520 + index * 1350);
      });
      window.setTimeout(() => runAssemblyWorkflow(requestedModel, shouldTrain, targetSessionId, demoMode), 1700 + chatStream.length * 1350);
    } else {
      window.setTimeout(() => {
        appendAgentMessage(activeSessionId, {
          role: "agent",
          text: getSmallTalkReply(trimmed),
        });
      }, 360);
    }
  };

  const toolButtons = [
    { label: "Select", icon: Move3D },
    { label: "Move", icon: Crosshair },
    { label: "Rotate", icon: RotateCw },
    { label: isPlaying ? "Pause" : "Play", icon: isPlaying ? Pause : Play },
    { label: "Reset", icon: RotateCcw },
  ];

  const selectAsset = (asset: LibraryAsset, source: string) => {
    const label = displayAssetLabel(asset);
    setSessionStatus(`Selected ${label}`);
    appendMessage(activeSessionId, {
      role: "agent",
      text:
        source === "library"
          ? `${label} selected from idō Library. I am opening a sandbox preview for the real mesh when one is attached.`
          : `${label} selected. I can spawn a matching robot placeholder or use it in the assembly flow.`,
    });
    if (asset.real && isPreviewableAsset(asset)) {
      setActiveTopView("sandbox");
      setAssetPreviewRequest({ id: `${asset.id}-${Date.now()}`, model: asset.model, file: asset.file, label });
    }
  };

  const simulationHud = getSimulationHud(activeSession, clockTick);

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
            <span>{libraryAssets.length} randomized robotic components indexed</span>
          </div>
          <div className="library-grid">
            {libraryAssets.map((asset) => {
              return (
                <button className="asset-tile" key={asset.id} onClick={() => selectAsset(asset, "library")}>
                  <div className={`asset-preview tone-${asset.iconTone}`}>
                    <img src={asset.icon} alt="" />
                  </div>
                  <div>
                    <strong>{displayAssetLabel(asset)}</strong>
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
              <button aria-label="Center robot" onClick={() => setSessionStatus("Robot centered in viewport")}>
                <LocateFixed size={18} />
              </button>
              <div className="spacer" />
              <button onClick={() => setStageLights((value) => !value)}>
                <Lightbulb size={16} /> {stageLights ? "Stage Lights" : "Lights Muted"}
              </button>
              <button aria-label="Pin viewport" onClick={() => setSessionStatus("Viewport pinned")}>
                <LocateFixed size={18} />
              </button>
            </div>
            <SandboxViewport
              isPlaying={isPlaying}
              spawnRequest={spawnRequest}
              resetSignal={resetSignal}
              workflowRequest={workflowRequest}
              assetPreviewRequest={assetPreviewRequest}
              onWorkflowStatus={setSessionStatus}
              stageLights={stageLights}
              cameraMode={cameraMode}
            />
            {simulationHud && (
              <div className="sim-hud">
                <span>{simulationHud.title}</span>
                <strong>{simulationHud.timer}</strong>
                <em>{simulationHud.status}</em>
              </div>
            )}
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
                {bottomLibraryAssets.map((asset) => {
                  return (
                    <button
                      className="asset-tile"
                      key={asset.id}
                      onClick={() => {
                        selectAsset(asset, "library");
                      }}
                    >
                      <div className={`asset-preview tone-${asset.iconTone}`}>
                        <img src={asset.icon} alt="" />
                      </div>
                      <div>
                        <strong>{displayAssetLabel(asset)}</strong>
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
            <div className="session-tabs" aria-label="Model sessions">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  className={session.id === activeSessionId ? "active" : ""}
                  onClick={() => setActiveSessionId(session.id)}
                  title={session.status}
                >
                  {session.title}
                </button>
              ))}
            </div>
            <pre className="code-panel">{trainingCode}</pre>
            {chatTab === "Luna" && (
              <div className="messages" ref={messagesRef}>
                {messages.map((message, index) => {
                  const activeBuffer = index === messages.length - 1 && isBufferMessage(message.text);
                  return (
                    <div className={`message ${message.role} ${activeBuffer ? "buffering" : ""}`} key={`${message.role}-${index}`}>
                      <span>{message.role === "agent" ? "Luna" : "You"}</span>
                      <p>{message.text}</p>
                      {message.preview && <PartPreview label={message.preview.label} file={message.preview.file} />}
                      {message.imagePreview && <ImagePreview {...message.imagePreview} />}
                    </div>
                  );
                })}
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
              <button
                className={isListening ? "active" : ""}
                onClick={startListening}
                aria-label="Speak to Luna"
                title="Speak to Luna"
              >
                <Mic size={16} />
              </button>
              <button
                className={speechEnabled ? "active" : ""}
                onClick={() => setSpeechEnabled((value) => !value)}
                aria-label="Toggle Luna voice"
                title="Toggle Luna voice"
              >
                {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
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
      return `from luna.sim import World\n\nworld = World(viewport=\"current\")\narm = luna.assemble(\"desktop_sorting_arm\", source=\"idō/requested_arm/body_tree.xml\")\narm.apply_brand(\"moonshot_robotics\")\narm.enable_joint_animation(mode=\"inspection\")\n\nworld.add(arm)\nviewport.frame(arm)\nluna.report(\"Desktop arm assembled from sourced body tree\")`;
    }

    return `from luna.sim import World, VisionEncoder, PickPlacePolicy, TrajectoryOptimizer\n\nworld = World(viewport=\"current\")\narm = luna.assemble(\"desktop_sorting_arm\", source=\"idō/requested_arm/body_tree.xml\")\narm.apply_brand(\"moonshot_robotics\")\nobjects = world.spawn_shapes([\"bottle\", \"wrapper\", \"organic\"], randomized_pose=True)\nbins = world.spawn_bins(labels=[\"recycle\", \"landfill\", \"compost\"], height=\"arm_reachable\")\nvision = VisionEncoder(camera=\"viewport\", features=[\"object_type\", \"pose\", \"bin_label\"])\npolicy = PickPlacePolicy(robot=arm, task=\"recycling_sort\")\noptimizer = TrajectoryOptimizer(robot=arm, collision_scene=world)\n\nfor epoch in range(128):\n    obs = vision.observe(world)\n    plan = policy.plan_pick_place(obs, objects, bins)\n    for pick, place in plan:\n        trajectory = optimizer.solve(\n            start=arm.joint_state(),\n            grasp_pose=pick.pose,\n            release_pose=place.pose,\n            constraints=[\"clear_table\", \"upright_gripper\", \"bin_centerline\"],\n        )\n        arm.follow(trajectory.approach)\n        arm.close_gripper(force=pick.grasp_force)\n        arm.follow(trajectory.transfer)\n        arm.open_gripper()\n        world.step_until_settled()\n    reward = world.score_bins(objects, bins) + policy.smoothness_bonus(arm)\n    policy.update(obs, plan, reward)\n\nluna.deploy(policy, robot=arm)`;
  }

  if (model === "nova") {
    return `from luna.rovers import RoverPolicy\n\nrover = luna.assemble(\"luna_rover\", source=\"idō/nova_carter\")\ntextures.apply(rover, source=\"idō/nova_carter/materials\")\npolicy = RoverPolicy(task=\"sim_navigation\", robot=rover)\n\nfor step in range(train_steps):\n    obs = viewport.observe()\n    action = policy.action(obs)\n    rover.drive(action.linear, action.angular)\n    reward = route_progress(obs) - collision_penalty(obs)\n    policy.update(obs, action, reward)\n\nluna.deploy(policy, robot=rover)`;
  }

  return `from luna.humanoids import BalancePolicy, WholeBodyController\n\nhumanoid = luna.assemble(\"warehouse_humanoid\", source=\"idō/requested_humanoid/body_tree.xml\")\nhumanoid.apply_brand(\"moonshot_robotics\")\ncontroller = WholeBodyController(humanoid)\npolicy = BalancePolicy(task=\"warehouse_tote_loading\", controller=controller)\n\nfor step in range(train_steps):\n    obs = viewport.observe()\n    torques = policy.action(obs)\n    humanoid.apply_torques(torques)\n    reward = upright_stability(obs) + box_delivery_speed(obs)\n    policy.update(obs, torques, reward)\n\nluna.deploy(policy, robot=humanoid)`;
}

function makeSessionTitle(model: RobotModel, promptText: string) {
  const generic = model === "humanoid" ? "Humanoid" : model === "nova" ? "Rover" : "Desktop Arm";
  const cleaned = promptText
    .replace(/\b(please|can you|make|build|create|generate|train|training|the|a|an|robot|model|to|for)\b/gi, " ")
    .replace(/[^a-z0-9 ]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return generic;
  const words = cleaned.split(" ").slice(0, 3).join(" ");
  return words.replace(/\b\w/g, (char) => char.toUpperCase()) || generic;
}

function displayAssetLabel(asset: LibraryAsset) {
  return asset.label.replace(/^(Unitree G1|Franka Panda|Luna Rover) /, "");
}

function isPreviewableAsset(asset: LibraryAsset) {
  return asset.kind === "mesh" && /\.(obj|stl|STL)$/i.test(asset.file);
}

function isBufferMessage(text: string) {
  return /^(thinking|searching|checking|resolving|preparing)/i.test(text.trim()) && text.trim().endsWith("...");
}

function getPreferredLunaVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const preferredNames = /(samantha|ava|allison|susan|victoria|zoe|jenny|aria|natural|neural|google us english|google uk english)/i;
  return (
    voices.find((voice) => voice.lang.startsWith("en") && preferredNames.test(voice.name)) ??
    voices.find((voice) => voice.lang.startsWith("en") && !/compact|robot|novelty/i.test(voice.name)) ??
    voices.find((voice) => voice.lang.startsWith("en")) ??
    null
  );
}

function getSpeechSummary(message: ChatMessage) {
  if (message.role !== "agent") return "";
  if (message.preview) return `I found ${message.preview.label} in idō Library and I am adding it in.`;
  if (message.imagePreview) return "I am checking the idō index through MongoDB.";
  const text = message.text.trim();
  if (!text) return "";
  if (/^thinking/i.test(text)) return "I am checking the request and planning the next step.";
  if (/^searching idō/i.test(text)) return "Searching idō Library.";
  if (/^searching parts/i.test(text)) return "Finding the next robot parts.";
  if (/^checking constraints/i.test(text)) return "Checking constraints.";
  if (/^resolving socket fit/i.test(text)) return "Resolving the next socket fit.";
  if (/^checking material/i.test(text)) return "Checking materials and joint limits.";
  if (/^preparing final/i.test(text)) return "Preparing the viewport render.";
  if (/^spawning evaluator/i.test(text)) return "Starting evaluator agents.";
  if (/^training/i.test(text)) return "Training is starting in the sandbox.";
  if (/^assembling/i.test(text)) return "I am assembling the sourced parts now.";
  if (/^finalizing/i.test(text)) return "Final checks are running.";
  return text.length > 120 ? `${text.slice(0, 116).trim()}...` : text;
}

function getSimulationHud(session: ModelSession, now: number) {
  if (!session.training || !session.model || !session.startedAt) return null;
  const elapsed = Math.max(0, (now - session.startedAt) / 1000);
  const demoSeconds = session.demo ? Math.max(0, 900 - Math.min(elapsed, 60) * 15) : 0;
  const episode = session.demo ? Math.floor(elapsed / 10) + 1 : Math.floor(elapsed / 12) + 1;
  const timer = session.demo ? formatCountdown(demoSeconds) : formatTimer(elapsed % 60);
  const titlePrefix = session.demo ? "15 Minute Demo: " : "";
  if (session.model === "nova") {
    const pass = session.demo ? elapsed >= 52 : episode >= 5;
    return {
      title: `${titlePrefix}Disaster Recovery Trial`,
      timer,
      status: pass ? "PASS: 3/3 people marked green under target time" : `Timelapse episode ${episode}: avoiding debris and reducing path time`,
    };
  }
  if (session.model === "desktop") {
    const pass = session.demo ? elapsed >= 54 : episode >= 6;
    return {
      title: `${titlePrefix}Sorting Arm Training`,
      timer,
      status: pass ? "TRAINED: 3 correct bins repeated" : `Timelapse episode ${episode}: bin reward still adjusting`,
    };
  }
  const pass = session.demo ? elapsed >= 52 : episode >= 5;
  return {
    title: `${titlePrefix}Warehouse Tote Trial`,
    timer,
    status: pass ? "PASS: 3 packages placed before reset" : `Timelapse episode ${episode}: speed and handoff reward tuning`,
  };
}

function formatTimer(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  const tenths = Math.floor((value % 1) * 10);
  return `${minutes}:${seconds.toString().padStart(2, "0")}.${tenths}`;
}

function formatCountdown(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getSmallTalkReply(promptText: string) {
  if (/\b(hi|hello|hey|how are you|what'?s up)\b/i.test(promptText)) {
    return "I am online and watching the sandbox. Ask me for a robot build, a training run, or a scene inspection and I will source the pieces through idō.";
  }
  if (/\b(thanks|thank you)\b/i.test(promptText)) {
    return "You got it. I will keep the viewport stable and only change the scene when you explicitly ask for a build or training run.";
  }
  if (/\b(status|what are you doing|ready)\b/i.test(promptText)) {
    return "I am ready. The current session is isolated, chat history is pinned to this tab, and the canvas will frame the next model before assembly starts.";
  }
  return "I can answer quick questions, inspect the current sandbox, or start a build/training workflow when you ask for a humanoid worker, Luna Rover, or desktop sorting arm.";
}

function getPreviewParts(model: RobotModel) {
  if (model === "desktop") {
    return [
      { label: "Arm base link", file: "/assets/franka_emika_panda/assets/link0.stl" },
      { label: "Actuator shell", file: "/assets/franka_emika_panda/assets/link4.stl" },
      { label: "Parallel gripper hand", file: "/assets/franka_emika_panda/assets/hand.stl" },
    ];
  }

  if (model === "nova") {
    return [
      { label: "Luna Rover chassis", file: "/assets/nova-carter/meshes/chassis_link.obj" },
      { label: "Luna Rover drive wheel", file: "/assets/nova-carter/meshes/nova_carter_wheel_left.obj" },
      { label: "Luna Rover caster wheel", file: "/assets/nova-carter/meshes/caster_wheel.obj" },
    ];
  }

  return [
    { label: "Humanoid pelvis", file: "/assets/unitree_g1/assets/pelvis.STL" },
    { label: "Torso actuator frame", file: "/assets/unitree_g1/assets/torso_link_rev_1_0.STL" },
    { label: "Shoulder pitch link", file: "/assets/unitree_g1/assets/left_shoulder_pitch_link.STL" },
  ];
}

function getTrainingPreviewParts(model: RobotModel) {
  if (model === "desktop") {
    return [
      { label: "Blue recycling bin", file: "/assets/training-demo/robotic-arm-trash-picking/blue_recycling_bin_detailed.stl" },
      { label: "Green compost bin", file: "/assets/training-demo/robotic-arm-trash-picking/green_compost_bin_detailed.stl" },
      { label: "Realistic plastic bottle", file: "/assets/training-demo/robotic-arm-trash-picking/realistic_plastic_bottle.stl" },
    ];
  }

  if (model === "nova") {
    return [
      { label: "Fractured concrete and rebar", file: "/assets/training-demo/rover-debris-training/debris_01_fractured_concrete_rebar.stl" },
      { label: "Disaster recovery person", file: "/assets/training-demo/rover-people/10688_GenericMale_v2.obj" },
      { label: "Broken pipe rubble cluster", file: "/assets/training-demo/rover-debris-training/debris_03_broken_pipe_rubble_cluster.stl" },
    ];
  }

  return [
    { label: "Warehouse conveyor", file: "/assets/training-demo/humanoid-warehouse/conveyor_simple.stl" },
    { label: "Open tote bin", file: "/assets/training-demo/humanoid-warehouse/tote_open_bin.stl" },
    { label: "Package cube", file: "/assets/training-demo/humanoid-warehouse/package_cube.stl" },
  ];
}

function makeTrainingCode(model: RobotModel) {
  const robot = model === "desktop" ? "DesktopSorter" : model === "nova" ? "LunaRover" : "WarehouseHumanoid";
  const task =
    model === "desktop"
      ? "RecycleSort"
      : model === "nova"
        ? "DisasterRecoveryNavigation"
        : "WarehouseToteLoading";

  return `// Luna generated C++ training controller\n// target=${robot} task=${task}\n#include <ido/runtime/World.hpp>\n#include <ido/runtime/AssetQuery.hpp>\n#include <ido/control/TrajectoryOptimizer.hpp>\n#include <ido/control/PolicyGradient.hpp>\n#include <ido/vision/SemanticTracker.hpp>\n#include <moonshot/robots/${robot}.hpp>\n\nusing namespace ido;\nusing namespace moonshot;\n\nstruct RewardTerms {\n  float progress = 0.0f;\n  float contact = 0.0f;\n  float stability = 0.0f;\n  float completion = 0.0f;\n};\n\nclass Luna${task}Trainer {\n public:\n  Luna${task}Trainer(World& world, ${robot}& robot)\n      : world_(world), robot_(robot), assets_(world.assetQuery()),\n        tracker_(world.viewportCamera()), optimizer_(robot.kinematicTree()) {}\n\n  void buildScene() {\n    assets_.queryMongo(\"ido.assets\", \"robot=${robot};task=${task};quality=showcase\");\n    assets_.streamSequentially([&](const Asset& asset) {\n      world_.spawn(asset).withCollision(true).withMaterial(asset.suggestedMaterial());\n      world_.waitForViewportFrame();\n    });\n    tracker_.indexScene(world_);\n  }\n\n  void train() {\n    PolicyGradient policy(robot_.actionSpace());\n    for (int episode = 0; episode < 96; ++episode) {\n      world_.resetTaskState();\n      bool failedEarly = episode < 18;\n      for (int step = 0; step < 420; ++step) {\n        Observation obs = tracker_.observe(world_);\n        Action action = failedEarly ? policy.noisyAction(obs, 0.65f) : policy.action(obs);\n        Trajectory trajectory = optimizer_.solve(robot_.state(), action.targetPose, Constraints{\n          .avoidCollisions = true,\n          .smoothJoints = true,\n          .preserveBalance = ${model === "humanoid" ? "true" : "false"},\n          .respectGroundContact = true,\n        });\n        robot_.execute(trajectory);\n        RewardTerms reward = score(obs, action, failedEarly);\n        policy.update(obs, action, reward.progress + reward.contact + reward.stability + reward.completion);\n        if (reward.completion > 0.98f) break;\n      }\n      world_.logEpisode(episode, policy.lastReturn(), failedEarly ? \"exploration\" : \"refined\");\n    }\n    policy.freeze(\"moonshot_${task}_final.policy\");\n  }\n\n private:\n  RewardTerms score(const Observation& obs, const Action& action, bool failedEarly) {\n    RewardTerms r;\n    r.progress = taskProgress(obs);\n    r.contact = cleanContactScore(obs, action);\n    r.stability = robot_.stabilityMargin();\n    r.completion = failedEarly ? r.progress * 0.35f : taskCompletion(obs);\n    return r;\n  }\n\n  World& world_;\n  ${robot}& robot_;\n  AssetQuery assets_;\n  SemanticTracker tracker_;\n  TrajectoryOptimizer optimizer_;\n};\n\nint main() {\n  World world(\"current_viewport\");\n  ${robot} robot = world.spawn${robot}();\n  Luna${task}Trainer trainer(world, robot);\n  trainer.buildScene();\n  trainer.train();\n  world.playFinalPolicy(\"moonshot_${task}_final.policy\");\n  return 0;\n}\n`;
}

function PartPreview({ label, file }: { label: string; file: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let frame = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#15191b");
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
    camera.position.set(2.1, 1.4, 2.4);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(86, 86, false);
    scene.add(new THREE.AmbientLight("#a9b4b8", 1.9));
    const light = new THREE.DirectionalLight("#ffffff", 2.4);
    light.position.set(3, 4, 5);
    scene.add(light);
    const group = new THREE.Group();
    scene.add(group);
    const fallback = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.34, 0.095, 64, 8),
      new THREE.MeshNormalMaterial(),
    );
    group.add(fallback);

    const replacePreview = (object: THREE.Object3D) => {
      if (disposed) return;
      group.clear();
      fitPreviewObject(object);
      group.add(object);
    };

    if (file.toLowerCase().endsWith(".obj")) {
      new OBJLoader().load(file, (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshNormalMaterial();
          }
        });
        replacePreview(object);
      });
    } else {
      new STLLoader().load(file, (geometry) => {
        geometry.computeVertexNormals();
        const mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshNormalMaterial(),
        );
        replacePreview(mesh);
      });
    }

    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.012;
      group.rotation.x = -0.35;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      renderer.dispose();
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          const material = child.material;
          if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
          else material.dispose();
        }
      });
    };
  }, [file]);

  return (
    <div className="part-preview">
      <canvas ref={canvasRef} width={86} height={86} />
      <div>
        <strong>{label}</strong>
        <small>{file.split("/").pop()}</small>
      </div>
    </div>
  );
}

function ImagePreview({ label, file, detail }: { label: string; file: string; detail: string }) {
  return (
    <div className="part-preview image-card">
      <img src={file} alt="" />
      <div>
        <strong>{label}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}

function fitPreviewObject(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const scale = 1.35 / Math.max(size.x, size.y, size.z, 0.001);
  object.scale.multiplyScalar(scale);
  object.position.addScaledVector(center, -scale);
}
