import { cssVars } from "@/design-system/ui";
import { artifact } from "./artifact.style";
import { ArtifactFrame, type ArtifactProps } from "./ArtifactFrame";
import { itauArtifact } from "./ItauArtifact.style";

// Illustrative only: an abstract monitoring portal, not real systems or data.
const services = [
  { name: "payments-api", state: "ok", load: 72 },
  { name: "ledger", state: "ok", load: 48 },
  { name: "auth", state: "warn", load: 91 },
  { name: "statements", state: "ok", load: 35 },
] as const;

const chartPoints = "0,48 12,40 24,44 36,28 48,34 60,18 72,26 84,12 96,20 108,8 120,14";

/** Itaú: a monitoring dashboard whose rows, load bars and traffic line come alive. */
export function ItauArtifact({ active, className }: ArtifactProps) {
  return (
    <ArtifactFrame title="monitoring.portal" active={active} className={className}>
      <div>
        <p className={artifact.caption}>Traffic</p>
        <svg className={itauArtifact.chart} viewBox="0 0 120 56" preserveAspectRatio="none">
          <line className={itauArtifact.chartGrid} x1="0" y1="55" x2="120" y2="55" />
          <polyline className={itauArtifact.chartLine} points={chartPoints} pathLength={100} />
        </svg>
      </div>
      <ul className={itauArtifact.rows}>
        {services.map((service, index) => (
          <li key={service.name} className={itauArtifact.row} style={cssVars({ i: index + 1 })}>
            <span className={itauArtifact.service}>{service.name}</span>
            <span className={itauArtifact.status}>
              <span className={itauArtifact.statusDot} data-state={service.state}>
                {service.state === "warn" && <span className={itauArtifact.statusPing} />}
              </span>
              {service.state}
            </span>
            <span className={itauArtifact.loadTrack}>
              <span
                className={itauArtifact.loadFill}
                style={cssVars({ load: `${service.load}%`, i: index + 2 })}
              />
            </span>
          </li>
        ))}
      </ul>
    </ArtifactFrame>
  );
}
