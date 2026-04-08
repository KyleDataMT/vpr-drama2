import { useState, useRef, useCallback } from "react";

const SEASONS = [
  { id: "S1", date: "Jan 2013", tagline: "The Beginning", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz"] },
  { id: "S2", date: "Nov 2013", tagline: "Betrayals Surface", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana"] },
  { id: "S3", date: "Nov 2014", tagline: "Stassi Returns", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James"] },
  { id: "S4", date: "Nov 2015", tagline: "New Blood", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany"] },
  { id: "S5", date: "Nov 2016", tagline: "Witches of WeHo", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany"] },
  { id: "S6", date: "Dec 2017", tagline: "Faith & Fallout", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany","Raquel"] },
  { id: "S7", date: "Dec 2018", tagline: "Cracks Form", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany","Raquel"] },
  { id: "S8", date: "Jan 2020", tagline: "The Last Stand", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany","Raquel"] },
  { id: "S9", date: "Sep 2021", tagline: "Post-Firings", cast: ["Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Raquel"] },
  { id: "S10", date: "Feb 2023", tagline: "SCANDOVAL", cast: ["Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Raquel"] },
  { id: "S11", date: "Jan 2024", tagline: "Aftermath", cast: ["Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala"] },
];

const COLORS = {
  Stassi: "#e84393", Jax: "#d63031", Kristen: "#a855f7", Sandoval: "#3b82f6",
  Katie: "#10b981", Scheana: "#f59e0b", Schwartz: "#8b5cf6", Ariana: "#06b6d4",
  James: "#f97316", Lala: "#ec4899", Brittany: "#fb923c", Raquel: "#94a3b8",
};

const REL = {};
function addRel(p1, p2, statuses, reasons) {
  const key = [p1, p2].sort().join("|");
  REL[key] = { statuses, reasons: reasons || {} };
}

addRel("Stassi","Scheana",["F","F","R",null,"F","R","R","R",null,null,null],{1:"Stassi labeled Scheana a homewrecker over Eddie Cibrian affair",2:"Stassi caught Scheana flirting with Jax at Gay Pride",3:"Brief truce — attended Scheana's wedding to Mike Shay",5:"Power dynamics tension as Stassi returned from NYC",6:"Gradually warmed up; bonded over motherhood later"});
addRel("Stassi","Jax",["F","F","F","R","R","R","R","R",null,null,null],{1:"Jax cheated in Vegas & got another woman pregnant — confessed in finale",2:"Jax slept with Kristen — Stassi's best friend",4:"Rebuilt friendship after Jax started dating Brittany"});
addRel("Stassi","Kristen",["R","F","F","R","R","R","F","F",null,null,null],{1:"Best friends — original SUR trio with Katie",2:"Kristen slept with Jax; Stassi slapped her on camera",4:"Reconciled — formed Witches of WeHo with Katie",7:"Stassi & Katie frustrated with Kristen's toxic relationship with Carter"});
addRel("Stassi","Katie",["R","F","F","R","R","R","R","R",null,null,null],{1:"Best friends from the start",2:"Stassi ghosted everyone when she left for NYC",4:"Rebuilt — became inseparable; Witches of WeHo"});
addRel("Stassi","Sandoval",["R","R","R","R","R","R","R","F",null,null,null],{8:"Sandoval had outburst over Stassi's book launch event"});
addRel("Stassi","Schwartz",["R","R","R","R","R","R","R","R",null,null,null],{});
addRel("Stassi","Ariana",[null,"F","F","F","F","R","R","R",null,null,null],{2:"Personality clash — Stassi felt Ariana was smug",6:"Joint birthday parties; genuine friendship formed"});
addRel("Stassi","James",[null,null,null,"F","F","F","F","F",null,null,null],{4:"General disdain; dismissed James as immature"});
addRel("Stassi","Lala",[null,null,null,"F","F","R","R","R",null,null,null],{4:"Joined the women's campaign against Lala",6:"Became close friends; both pregnant same time 2020"});
addRel("Stassi","Brittany",[null,null,null,"R","R","R","R","R",null,null,null],{4:"Close friends; pregnant at same time 2020"});
addRel("Stassi","Raquel",[null,null,null,null,null,"R","R","R",null,null,null],{});
addRel("Jax","Sandoval",["R","F","F","R","R","R","F","F",null,null,null],{1:"Best friends at start of show",2:"Jax slept with Kristen — Sandoval's girlfriend",4:"Slowly rebuilt bromance",7:"Best man snub — growing apart",8:"Called it friendship-ending at S8 reunion"});
addRel("Jax","Schwartz",["R","R","R","R","R","R","R","R",null,null,null],{1:"Consistently close; Schwartz stayed neutral"});
addRel("Jax","Kristen",["R","F","F","R","R","R","R","R",null,null,null],{2:"Hookup exposed — both lost friendships",4:"Rebuilt over time"});
addRel("Jax","Katie",["R","R","R","R","R","R","R","R",null,null,null],{});
addRel("Jax","Scheana",["R","R","R","R","R","R","R","F",null,null,null],{8:"Scheana accused Jax of bullying new SUR employees"});
addRel("Jax","Ariana",[null,"R","R","R","R","R","R","R",null,null,null],{});
addRel("Jax","James",[null,null,null,"F","R","F","F","F",null,null,null],{4:"Constant insults and clashing",5:"Surprise bonding at S5 reunion",6:"Right back to feuding"});
addRel("Jax","Lala",[null,null,null,"R","R","R","R","R",null,null,null],{});
addRel("Jax","Brittany",[null,null,null,"R","R","F","R","R",null,null,null],{6:"Jax cheated on Brittany with Faith Stowers",7:"Married in Kentucky June 2019"});
addRel("Jax","Raquel",[null,null,null,null,null,"R","R","R",null,null,null],{});
addRel("Kristen","Sandoval",["R","F","F","F","R","R","R","R",null,null,null],{1:"Dating (toxic relationship)",2:"Breakup — mutual cheating",3:"Miami girl scheme to sabotage Sandoval & Ariana",5:"Finally cordial"});
addRel("Kristen","Katie",["R","R","R","R","R","R","F","F",null,null,null],{1:"Original friend trio",7:"Katie frustrated over Carter; Witches dissolved"});
addRel("Kristen","Schwartz",["R","R","R","R","R","R","R","R",null,null,null],{});
addRel("Kristen","Scheana",["R","R","R","R","R","R","R","R",null,null,null],{});
addRel("Kristen","Ariana",[null,"F","F","F","F","R","R","R",null,null,null],{2:"Resented Ariana for dating Sandoval",3:"Miami girl scheme to break them up",6:"Became genuine friends"});
addRel("Kristen","James",[null,null,"R","F","F","F","F","F",null,null,null],{3:"Started dating — James was new busboy",4:"Toxic breakup; cheating on both sides"});
addRel("Kristen","Lala",[null,null,null,"R","R","R","R","R",null,null,null],{});
addRel("Kristen","Brittany",[null,null,null,"R","F","R","R","R",null,null,null],{5:"Angry at reunion over hookup rumors",6:"Made up"});
addRel("Kristen","Raquel",[null,null,null,null,null,"R","R","R",null,null,null],{});
addRel("Sandoval","Katie",["R","R","R","R","F","R","F","F","F","F","F"],{5:"Business tension over Schwartz in TomTom deals",6:"Brief truce for TomTom opening",7:"Felt he chronically disrespected Schwartz",10:"Katie blamed him for the downfall of her marriage"});
addRel("Sandoval","Schwartz",["R","R","R","R","R","R","R","R","R","R","F"],{1:"Inseparable bromance → TomTom partners",11:"Accused of knowing about Scandoval; friendship strained"});
addRel("Sandoval","Scheana",["R","R","R","R","R","R","R","R","R","F","F"],{10:"Scheana sided with Ariana; allegedly punched Raquel"});
addRel("Sandoval","Ariana",[null,"R","R","R","R","R","R","R","R","F","F"],{2:"Started dating — would last 9 years",10:"SCANDOVAL — 7-month affair with Raquel discovered via phone"});
addRel("Sandoval","James",[null,null,"R","R","R","R","R","R","R","F","F"],{10:"Raquel was James' ex-fiancée — double betrayal"});
addRel("Sandoval","Lala",[null,null,null,"R","R","R","R","R","R","F","R"],{10:"Lala sided with Ariana post-Scandoval",11:"Lala softened; told Ariana to move on — caused rift with others"});
addRel("Sandoval","Brittany",[null,null,null,"R","R","R","R","R",null,null,null],{});
addRel("Sandoval","Raquel",[null,null,null,null,null,"R","R","R","R","F",null],{10:"Affair exposed — went from friend to pariah"});
addRel("Katie","Schwartz",["R","R","F","R","R","R","R","R","R","F","F"],{1:"Dating from before show",3:"Schwartz cheated; ultimatum",4:"Engaged",5:"Married — woodsy wedding by Lisa",10:"Divorced; Schwartz kissed Raquel at Scheana's wedding"});
addRel("Katie","Scheana",["R","F","R","R","F","R","R","R","R","R","R"],{2:"Motorboating rumor spread by Jax via Scheana",5:"Reunion confrontation over loyalty",6:"Stable friendship after"});
addRel("Katie","Ariana",[null,"R","R","R","R","R","R","R","R","R","R"],{2:"Steady growing friendship",9:"Co-opened Something About Her sandwich shop"});
addRel("Katie","James",[null,null,null,"F","F","F","F","R","R","R","R"],{4:"James body-shamed Katie; she got him fired as SUR DJ",8:"Warmed up after James got sober"});
addRel("Katie","Lala",[null,null,null,"F","F","R","R","R","R","R","F"],{4:"Led women against Lala; body-shaming drama",6:"Became close friends",11:"Verbal battles — Lala challenged Katie's authenticity"});
addRel("Katie","Brittany",[null,null,null,"R","R","R","R","R",null,null,null],{4:"Close friends; Valley neighbors"});
addRel("Katie","Raquel",[null,null,null,null,null,"R","R","R","R","F",null],{10:"Raquel kissed Katie's ex Schwartz → then Scandoval made it worse"});
addRel("Scheana","Schwartz",["R","R","R","R","R","R","R","R","R","R","R"],{11:"Secret Vegas makeout revealed at S11 reunion"});
addRel("Scheana","Ariana",["R","R","R","R","F","R","R","R","R","R","F"],{1:"Best friends — Ariana was her backup dancer",5:"Sketch comedy falling out",6:"Rebuilt best friendship",11:"Ariana upset Scheana couldn't cut Sandoval ties"});
addRel("Scheana","James",[null,null,"R","R","R","R","R","R","R","R","R"],{});
addRel("Scheana","Lala",[null,null,null,"F","F","R","R","R","F","R","R"],{4:"Part of group against Lala",6:"Became real friends",9:"Gender reveal party snub",11:"Bonded as mothers"});
addRel("Scheana","Brittany",[null,null,null,"R","R","R","R","R",null,null,null],{4:"Close; pregnant same time 2020"});
addRel("Scheana","Raquel",[null,null,null,null,null,"R","R","R","R","F",null],{10:"Scheana punched Raquel; Raquel filed a TRO"});
addRel("Schwartz","Ariana",[null,"R","R","R","R","R","R","R","R","R","F"],{3:"Good friends — she was groomsman at his wedding",11:"Ariana cut contact; accused him of knowing about affair"});
addRel("Schwartz","James",[null,null,"R","R","R","R","R","R","R","R","R"],{});
addRel("Schwartz","Lala",[null,null,null,null,null,"R","R","R","R","R","R"],{11:"Unlikely close friendship formed"});
addRel("Schwartz","Brittany",[null,null,null,"R","R","R","R","R",null,null,null],{});
addRel("Schwartz","Raquel",[null,null,null,null,null,"R","R","R","R","R",null],{10:"Kissed Raquel at Scheana's wedding; flirtation"});
addRel("Ariana","James",[null,null,"R","R","R","R","R","R","R","R","R"],{});
addRel("Ariana","Lala",[null,null,null,"R","R","R","R","R","F","F","F"],{4:"First person to welcome Lala at SUR",9:"Lala questioned Ariana's loyalty; fiery confrontation",11:"Lala told Ariana to move past rage — major rift"});
addRel("Ariana","Brittany",[null,null,null,"R","R","R","R","R",null,null,null],{});
addRel("Ariana","Raquel",[null,null,null,null,null,"R","R","R","R","F",null],{6:"Ariana defended Raquel as 'kind, sweet, loyal'",10:"Raquel had 7-month affair with Ariana's boyfriend"});
addRel("James","Lala",[null,null,null,"R","R","F","R","R","R","R","R"],{4:"Music collabs & hooked up",6:"Body-shaming both directions",7:"Rebuilt during James' sobriety"});
addRel("James","Brittany",[null,null,null,"R","R","R","R","R",null,null,null],{});
addRel("James","Raquel",[null,null,null,null,"R","R","R","R","F","F",null],{5:"Started dating",9:"Engagement broken at reunion",10:"Affair with Sandoval — double betrayal"});
addRel("Lala","Brittany",[null,null,null,null,null,"R","R","R",null,null,null],{6:"Close; pregnant same time 2020"});
addRel("Lala","Raquel",[null,null,null,null,null,"R","R","R","R","F",null],{10:"Sided with Ariana post-Scandoval"});
addRel("Brittany","Raquel",[null,null,null,null,null,"R","R","R",null,null,null],{});

function getStatus(a, b, si) {
  const key = [a, b].sort().join("|");
  const r = REL[key];
  if (!r) return null;
  return r.statuses[si];
}

function getReason(a, b, si) {
  const key = [a, b].sort().join("|");
  const r = REL[key];
  if (!r) return null;
  return r.reasons[si + 1] || null;
}

function getStats(cast, si) {
  let feuds = 0, friends = 0;
  for (let i = 0; i < cast.length; i++)
    for (let j = i + 1; j < cast.length; j++) {
      const s = getStatus(cast[i], cast[j], si);
      if (s === "F") feuds++;
      if (s === "R") friends++;
    }
  return { feuds, friends };
}

export default function VPRScroll() {
  const [tooltip, setTooltip] = useState(null);
  const pageRef = useRef(null);

  const handleEnter = useCallback((e, a, b, si) => {
    const status = getStatus(a, b, si);
    if (!status) return;
    const reason = getReason(a, b, si);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ a, b, status, reason, season: SEASONS[si], x: rect.left + rect.width / 2, y: rect.top });
  }, []);

  const handleLeave = useCallback(() => setTooltip(null), []);

  const CELL = 44;

  return (
    <div ref={pageRef} style={{
      background: "#08080e",
      minHeight: "100vh",
      fontFamily: "'JetBrains Mono','Fira Code',monospace",
      color: "#ccc",
      paddingBottom: 60,
    }}>
      {/* Fixed header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "#08080eee", backdropFilter: "blur(8px)",
        borderBottom: "1px solid #1a1a2e",
        padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6,
      }}>
        <div>
          <h1 style={{
            margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: "0.1em",
            background: "linear-gradient(90deg,#ff4757,#ff6b81,#ffa502,#2ed573,#1e90ff,#a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>VANDERPUMP RULES — DRAMA MAP</h1>
          <p style={{ margin: "2px 0 0", fontSize: 9, color: "#444", letterSpacing: "0.06em" }}>
            SCROLL DOWN THROUGH 11 SEASONS · HOVER CELLS FOR DETAILS
          </p>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 14, height: 10, borderRadius: 2, background: "#ff4757", display: "inline-block", opacity: 0.8 }}/>FEUD
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 14, height: 10, borderRadius: 2, background: "#2ed573", display: "inline-block", opacity: 0.8 }}/>GOOD
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 14, height: 10, borderRadius: 2, background: "#16161e", display: "inline-block", border: "1px solid #222" }}/>N/A
          </span>
        </div>
      </div>

      {/* Seasons stacked vertically */}
      {SEASONS.map((season, si) => {
        const cast = season.cast;
        const stats = getStats(cast, si);
        const gridW = cast.length * CELL + 80;

        return (
          <div key={season.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "32px 12px 12px",
            borderBottom: "1px solid #111",
          }}>
            {/* Season header */}
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "0.06em" }}>
                {season.id}
              </div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{season.date}</div>
              <div style={{ fontSize: 10, color: si === 9 ? "#ff4757" : "#444", fontStyle: "italic", marginTop: 2 }}>
                {season.tagline}
              </div>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 6, fontSize: 10 }}>
                <span><span style={{ color: "#ff4757", fontWeight: 700 }}>{stats.feuds}</span> <span style={{ color: "#555" }}>feuds</span></span>
                <span><span style={{ color: "#2ed573", fontWeight: 700 }}>{stats.friends}</span> <span style={{ color: "#555" }}>friendships</span></span>
              </div>
            </div>

            {/* Matrix */}
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <div style={{ display: "inline-block" }}>
                {/* Top labels */}
                <div style={{ display: "flex", marginLeft: 80 }}>
                  {cast.map(name => (
                    <div key={name} style={{
                      width: CELL, height: 70,
                      display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4,
                    }}>
                      <span style={{
                        transform: "rotate(-55deg)", transformOrigin: "bottom center",
                        fontSize: 9, fontWeight: 700, color: COLORS[name], whiteSpace: "nowrap",
                      }}>{name}</span>
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {cast.map((rowName, ri) => (
                  <div key={rowName} style={{ display: "flex", height: CELL }}>
                    <div style={{
                      width: 80, display: "flex", alignItems: "center", justifyContent: "flex-end",
                      paddingRight: 8, fontSize: 9, fontWeight: 700, color: COLORS[rowName],
                    }}>{rowName}</div>
                    {cast.map((colName, ci) => {
                      if (ri === ci) {
                        return (
                          <div key={colName} style={{
                            width: CELL, height: CELL,
                            background: `${COLORS[rowName]}15`,
                            border: "1px solid #141420",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS[rowName], opacity: 0.3 }}/>
                          </div>
                        );
                      }

                      const status = getStatus(rowName, colName, si);
                      const reason = getReason(rowName, colName, si);
                      const isHov = tooltip && tooltip.a === rowName && tooltip.b === colName && tooltip.season.id === season.id;

                      let bg, hovBg;
                      if (status === "F") { bg = "#ff475728"; hovBg = "#ff475755"; }
                      else if (status === "R") { bg = "#2ed57322"; hovBg = "#2ed57348"; }
                      else { bg = "#0c0c14"; hovBg = "#0c0c14"; }

                      return (
                        <div key={colName}
                          onMouseEnter={e => handleEnter(e, rowName, colName, si)}
                          onMouseLeave={handleLeave}
                          style={{
                            width: CELL, height: CELL,
                            background: isHov ? hovBg : bg,
                            border: `1px solid ${isHov && status ? (status === "F" ? "#ff475588" : "#2ed57388") : "#141420"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: status ? "pointer" : "default",
                            transition: "background 0.12s, border-color 0.12s",
                            position: "relative",
                          }}
                        >
                          {status === "F" && (
                            <div style={{
                              width: "62%", height: "62%", borderRadius: 3,
                              background: isHov ? "linear-gradient(135deg,#ff4757,#c0392b)" : "linear-gradient(135deg,#ff475799,#c0392b77)",
                              transition: "background 0.12s",
                            }}/>
                          )}
                          {status === "R" && (
                            <div style={{
                              width: "62%", height: "62%", borderRadius: 3,
                              background: isHov ? "linear-gradient(135deg,#2ed573,#1abc9c)" : "linear-gradient(135deg,#2ed57377,#1abc9c66)",
                              transition: "background 0.12s",
                            }}/>
                          )}
                          {!status && (
                            <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#1a1a25" }}/>
                          )}
                          {reason && (
                            <span style={{
                              position: "absolute", top: 1, right: 2,
                              fontSize: 5, color: status === "F" ? "#ff4757" : "#2ed573", opacity: 0.8,
                            }}>◆</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed",
          left: Math.max(16, Math.min(tooltip.x, typeof window !== "undefined" ? window.innerWidth - 300 : 400)),
          top: tooltip.y - 8,
          transform: "translate(-50%, -100%)",
          background: "#1a1a2e",
          border: `1px solid ${tooltip.status === "F" ? "#ff475766" : "#2ed57366"}`,
          borderRadius: 8,
          padding: "10px 14px",
          maxWidth: 300,
          zIndex: 100,
          pointerEvents: "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontWeight: 800, color: COLORS[tooltip.a], fontSize: 12 }}>{tooltip.a}</span>
            <span style={{ color: "#444", fontSize: 10 }}>×</span>
            <span style={{ fontWeight: 800, color: COLORS[tooltip.b], fontSize: 12 }}>{tooltip.b}</span>
            <span style={{
              marginLeft: "auto", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
              color: tooltip.status === "F" ? "#ff4757" : "#2ed573",
            }}>
              {tooltip.status === "F" ? "FEUD" : "GOOD TERMS"}
            </span>
          </div>
          <div style={{ fontSize: 9, color: "#666", marginBottom: tooltip.reason ? 5 : 0 }}>
            {tooltip.season.id} · {tooltip.season.date} · {tooltip.season.tagline}
          </div>
          {tooltip.reason && (
            <div style={{ fontSize: 10, color: "#bbb", lineHeight: 1.5 }}>{tooltip.reason}</div>
          )}
          <div style={{
            position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
            borderTop: `5px solid ${tooltip.status === "F" ? "#ff475766" : "#2ed57366"}`,
          }}/>
        </div>
      )}
    </div>
  );
}
