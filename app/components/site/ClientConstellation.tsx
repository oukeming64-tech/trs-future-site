"use client";

import { useState } from "react";
import { clientGroups } from "../../data/site-content";

export function ClientConstellation() {
  const [activeId, setActiveId] = useState(clientGroups[0].id);
  const active =
    clientGroups.find((group) => group.id === activeId) ?? clientGroups[0];

  return (
    <div className="client-constellation">
      <div className="client-constellation__tabs" role="tablist">
        {clientGroups.map((group) => {
          const Icon = group.icon;
          const selected = group.id === active.id;
          return (
            <button
              key={group.id}
              id={`client-tab-${group.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`client-panel-${group.id}`}
              className={selected ? "is-active" : ""}
              onClick={() => setActiveId(group.id)}
            >
              <Icon size={17} aria-hidden="true" />
              {group.label}
            </button>
          );
        })}
      </div>

      <div
        id={`client-panel-${active.id}`}
        className="client-constellation__panel"
        role="tabpanel"
        aria-labelledby={`client-tab-${active.id}`}
        key={active.id}
      >
        <div className="client-constellation__map" aria-hidden="true">
          <div className="client-constellation__radar" />
          <span className="client-node client-node--one" />
          <span className="client-node client-node--two" />
          <span className="client-node client-node--three" />
          <span className="client-node client-node--four" />
          <div className="client-constellation__center">
            <strong>10,000+</strong>
            <span>ENTERPRISE USERS</span>
          </div>
        </div>

        <div className="client-constellation__names">
          <span className="micro-label">SELECTED CLIENT ECOSYSTEM</span>
          <h3>{active.label}</h3>
          <div>
            {active.names.map((name, index) => (
              <span key={name} style={{ "--name-index": index } as React.CSSProperties}>
                {name}
              </span>
            ))}
          </div>
          <p>
            以上为拓尔思官网公开信息中的代表性用户与项目类型，用于本概念站的信息架构演示。
          </p>
        </div>
      </div>
    </div>
  );
}
