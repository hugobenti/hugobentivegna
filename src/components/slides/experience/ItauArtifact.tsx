import { artifact } from "./artifact.style";
import { ArtifactFrame, type ArtifactProps } from "./ArtifactFrame";
import { chartPoints, services } from "./ItauArtifact.data";
import { itauArtifact } from "./ItauArtifact.style";

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
        {services.map((service) => (
          <li key={service.name} className={itauArtifact.row} style={service.rowStyle}>
            <span className={itauArtifact.service}>{service.name}</span>
            <span className={itauArtifact.status}>
              <span className={itauArtifact.statusDot} data-state={service.state}>
                {service.warn && <span className={itauArtifact.statusPing} />}
              </span>
              {service.state}
            </span>
            <span className={itauArtifact.loadTrack}>
              <span className={itauArtifact.loadFill} style={service.loadStyle} />
            </span>
          </li>
        ))}
      </ul>
    </ArtifactFrame>
  );
}
