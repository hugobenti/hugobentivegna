import { artifact } from "./artifact.style";
import { ArtifactFrame, type ArtifactProps } from "./ArtifactFrame";
import { devices, workflow } from "./OneGlobalArtifact.data";
import { oneGlobalArtifact as s } from "./OneGlobalArtifact.style";

/** 1global: an IoT fleet beside a plan → agent → review → test workflow, played step by step. */
export function OneGlobalArtifact({ active, className }: ArtifactProps) {
  return (
    <ArtifactFrame title="iot.portal" active={active} className={className}>
      <div>
        <p className={artifact.caption}>Devices</p>
        <ul className={s.devices}>
          {devices.map((device) => (
            <li key={device.name} className={s.device} style={device.style}>
              <span className={s.deviceTop}>
                <span className={s.deviceName}>{device.name}</span>
                <span className={s.deviceDot} data-state={device.state} />
              </span>
              <span className={s.signal}>
                {device.bars.map((bar) => (
                  <span key={bar.level} className={s.bar} data-lit={bar.lit} style={bar.style} />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={artifact.caption}>Workflow</p>
        <ol className={s.terminal}>
          {workflow.map((line) => (
            <li key={line.step} className={s.line} style={line.style}>
              <span className={s.prompt}>{line.step}</span>
              <span className={s.tone[line.tone]}>{line.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </ArtifactFrame>
  );
}
