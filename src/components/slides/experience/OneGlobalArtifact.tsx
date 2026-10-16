import { cssVars } from "@/design-system/ui";
import { artifact } from "./artifact.style";
import { ArtifactFrame, type ArtifactProps } from "./ArtifactFrame";
import { oneGlobalArtifact as s } from "./OneGlobalArtifact.style";

// Illustrative only: an abstract IoT fleet and an agent-assisted workflow, not real data.
const devices = [
  { name: "node-01", state: "online", signal: 3 },
  { name: "node-02", state: "online", signal: 2 },
  { name: "node-03", state: "offline", signal: 0 },
  { name: "node-04", state: "online", signal: 3 },
  { name: "node-05", state: "online", signal: 1 },
  { name: "node-06", state: "online", signal: 2 },
] as const;

const workflow = [
  { step: "plan", result: "4 small tasks", ok: false },
  { step: "agent", result: "draft: device filter", ok: false },
  { step: "review", result: "approved by Hugo", ok: true },
  { step: "test", result: "e2e passed", ok: true },
] as const;

/** 1global: an IoT fleet beside a plan → agent → review → test workflow, played step by step. */
export function OneGlobalArtifact({ active, className }: ArtifactProps) {
  return (
    <ArtifactFrame title="iot.portal" active={active} className={className}>
      <div>
        <p className={artifact.caption}>Devices</p>
        <ul className={s.devices}>
          {devices.map((device, index) => (
            <li key={device.name} className={s.device} style={cssVars({ i: index })}>
              <span className={s.deviceTop}>
                <span className={s.deviceName}>{device.name}</span>
                <span className={s.deviceDot} data-state={device.state} />
              </span>
              <span className={s.signal}>
                {[1, 2, 3].map((level) => (
                  <span
                    key={level}
                    className={s.bar}
                    data-lit={level <= device.signal}
                    style={cssVars({ h: level })}
                  />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={artifact.caption}>Workflow</p>
        <ol className={s.terminal}>
          {workflow.map((line, index) => (
            <li key={line.step} className={s.line} style={cssVars({ i: devices.length + index })}>
              <span className={s.prompt}>$ {line.step}</span>
              <span className={line.ok ? s.ok : s.result}>
                {line.ok ? "✓ " : "→ "}
                {line.result}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </ArtifactFrame>
  );
}
