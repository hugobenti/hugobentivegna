import { designSystemCase } from "@/content/cases";
import { Button } from "@/design-system/ui";
import { Avatar } from "./Avatar";
import { rebrandScene } from "./RebrandSlide.style";
import type { TRebrandSceneProps } from "./RebrandScene.type";

const { rebrand } = designSystemCase;

/** One act of the rebrand scene: decorative, the slide's copy and summaries tell the story. */
export function RebrandScene({ view, layout }: TRebrandSceneProps) {
  return (
    <div data-act={view.act} className={rebrandScene.act}>
      <div className={rebrandScene.header}>
        <div>
          {layout === "compact" ? <p className={rebrandScene.actLabel}>{view.label}</p> : null}
          <p className={rebrandScene.actTitle}>{view.title}</p>
        </div>
        <div className={rebrandScene.counters}>
          <p className={rebrandScene.counter}>
            <span className={rebrandScene.count}>{view.developers}</span>
          </p>
          <p className={rebrandScene.counter}>
            <span className={rebrandScene.count}>{view.count}</span>
            <span className={rebrandScene.counterLabel}>{rebrand.rebrandedLabel}</span>
          </p>
        </div>
      </div>

      {view.system.visible ? (
        <div data-state={view.system.state} className={rebrandScene.system}>
          <Avatar className={rebrandScene.systemAvatar} />
          <span className={rebrandScene.systemText}>
            <span className={rebrandScene.systemName}>{rebrand.system.name}</span>
            <span className={rebrandScene.systemTrack}>
              <span className={rebrandScene.fill} style={view.system.progress} />
            </span>
          </span>
          <span className={rebrandScene.systemStatus}>
            <span className={rebrandScene.statusText}>{view.system.status}</span>
            <span className={rebrandScene.statusSizer} aria-hidden="true">
              {rebrand.system.released}
            </span>
          </span>
        </div>
      ) : (
        <div className={rebrandScene.noSystem}>{rebrand.system.missing}</div>
      )}

      <div data-visible={view.system.visible} className={rebrandScene.wires[layout]}>
        {view.products.map((product) => (
          <span key={product.name} data-lit={product.wired} className={rebrandScene.wire} />
        ))}
      </div>

      <ul className={rebrandScene.products[layout]}>
        {view.products.map((product) => (
          <li
            key={product.name}
            data-rebranded={product.rebranded}
            className={rebrandScene.product}
          >
            <div className={rebrandScene.productBar}>
              <span className={rebrandScene.productName}>{product.name}</span>
              <span className={rebrandScene.productVersion}>{product.version}</span>
            </div>
            <div className={rebrandScene.productBody}>
              <span className={rebrandScene.balanceLabel}>{rebrand.product.balanceLabel}</span>
              <span className={rebrandScene.balance}>{rebrand.product.balance}</span>
              <Button tabIndex={-1} className={rebrandScene.action}>
                {rebrand.product.action}
              </Button>
            </div>
            <div
              data-visible={view.showDevelopers}
              data-state={product.developer}
              className={rebrandScene.developer}
            >
              <Avatar className={rebrandScene.avatar} />
              <span className={rebrandScene.track}>
                <span className={rebrandScene.fill} style={product.progress} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
