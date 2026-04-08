import { useState, useRef, useCallback, useEffect } from "react";

const SEASONS = [
  { id: "S1", date: "Jan '13", tagline: "The Beginning", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz"] },
  { id: "S2", date: "Nov '13", tagline: "Betrayals Surface", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana"] },
  { id: "S3", date: "Nov '14", tagline: "Stassi Returns", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James"] },
  { id: "S4", date: "Nov '15", tagline: "New Blood", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany"] },
  { id: "S5", date: "Nov '16", tagline: "Witches of WeHo", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany"] },
  { id: "S6", date: "Dec '17", tagline: "Faith & Fallout", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany","Raquel"] },
  { id: "S7", date: "Dec '18", tagline: "Cracks Form", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany","Raquel"] },
  { id: "S8", date: "Jan '20", tagline: "The Last Stand", cast: ["Stassi","Jax","Kristen","Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Brittany","Raquel"] },
  { id: "S9", date: "Sep '21", tagline: "Post-Firings", cast: ["Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Raquel"] },
  { id: "S10", date: "Feb '23", tagline: "SCANDOVAL", cast: ["Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala","Raquel"] },
  { id: "S11", date: "Jan '24", tagline: "Aftermath", cast: ["Sandoval","Katie","Scheana","Schwartz","Ariana","James","Lala"] },
];

const CAST_COLORS = {
  Stassi: "#b5366a", Jax: "#b83230", Kristen: "#7c3aad", Sandoval: "#2563a8",
  Katie: "#0d8c6a", Scheana: "#c47d10", Schwartz: "#5b46b5", Ariana: "#0891a2",
  James: "#c2510c", Lala: "#b8337a", Brittany: "#c46a2e", Raquel: "#5e7181",
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
  return REL[key]?.statuses[si] ?? null;
}
function getReason(a, b, si) {
  const key = [a, b].sort().join("|");
  return REL[key]?.reasons[si + 1] ?? null;
}

export default function VPR() {
  const [season, setSeason] = useState(0);
  const [tooltip, setTooltip] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let accum = 0;
    const handler = (e) => {
      e.preventDefault();
      accum += e.deltaY;
      if (accum > 70) { setSeason(p => Math.min(10, p + 1)); accum = 0; }
      else if (accum < -70) { setSeason(p => Math.max(0, p - 1)); accum = 0; }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let startY = 0;
    const onS = (e) => { startY = e.touches[0].clientY; };
    const onE = (e) => {
      const d = startY - e.changedTouches[0].clientY;
      if (d > 40) setSeason(p => Math.min(10, p + 1));
      else if (d < -40) setSeason(p => Math.max(0, p - 1));
    };
    el.addEventListener("touchstart", onS, { passive: true });
    el.addEventListener("touchend", onE, { passive: true });
    return () => { el.removeEventListener("touchstart", onS); el.removeEventListener("touchend", onE); };
  }, []);

  useEffect(() => { setTooltip(null); }, [season]);

  const handleEnter = useCallback((e, a, b) => {
    const status = getStatus(a, b, season);
    if (!status) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      a, b, status,
      reason: getReason(a, b, season),
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, [season]);

  const s = SEASONS[season];
  const cast = s.cast;
  const n = cast.length;

  let feuds = 0, friends = 0;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      const st = getStatus(cast[i], cast[j], season);
      if (st === "F") feuds++;
      if (st === "R") friends++;
    }

  const CELL = Math.min(50, Math.floor((Math.min(680, typeof window !== "undefined" ? window.innerWidth - 140 : 560)) / n));

  return (
    <div ref={rootRef} style={{
      background: "#f5f0e8",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#2a2520",
    }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <h1 style={{
          margin: 0, fontSize: 13, fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "#8a7e72",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>Vanderpump Rules</h1>
        <div style={{
          width: 40, height: 1, background: "#c4b9a8", margin: "6px auto",
        }}/>
      </div>

      {/* Season display */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 10 }}>
          {SEASONS.map((ss, i) => (
            <div key={ss.id} onClick={() => setSeason(i)} style={{
              width: i === season ? 28 : 8, height: 8, borderRadius: 4,
              background: i === season ? "#2a2520" : "#d4cbbf",
              cursor: "pointer", transition: "all 0.3s ease",
            }}/>
          ))}
        </div>
        <div style={{ fontSize: 42, fontWeight: 400, color: "#2a2520", lineHeight: 1, fontStyle: "italic" }}>
          {s.id}
        </div>
        <div style={{
          fontSize: 12, color: "#8a7e72", marginTop: 4,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: "0.06em",
        }}>{s.date}</div>
        <div style={{
          fontSize: 13, color: season === 9 ? "#a83232" : "#6b6058", fontStyle: "italic", marginTop: 3,
        }}>"{s.tagline}"</div>
        <div style={{
          display: "flex", gap: 24, justifyContent: "center", marginTop: 8,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: 11, letterSpacing: "0.04em",
        }}>
          <span>
            <span style={{ color: "#a83232", fontWeight: 700, fontSize: 18, fontFamily: "Georgia, serif" }}>{feuds}</span>
            <span style={{ color: "#8a7e72", marginLeft: 4 }}>feuds</span>
          </span>
          <span>
            <span style={{ color: "#2d7a4f", fontWeight: 700, fontSize: 18, fontFamily: "Georgia, serif" }}>{friends}</span>
            <span style={{ color: "#8a7e72", marginLeft: 4 }}>friendships</span>
          </span>
        </div>
      </div>

      {/* Lower-triangle matrix */}
      <div>
        {/* Top labels — offset to align with columns (skip first since row 0 has no cells) */}
        <div style={{ display: "flex", marginLeft: 90 }}>
          {cast.slice(0, -1).map((name, i) => (
            <div key={name} style={{
              width: CELL, height: 56,
              display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 5,
              overflow: "visible",
            }}>
              <span style={{
                display: "block",
                transform: "rotate(-55deg)",
                transformOrigin: "bottom center",
                fontSize: 11, fontWeight: 700, color: CAST_COLORS[name],
                whiteSpace: "nowrap",
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              }}>{name}</span>
            </div>
          ))}
        </div>

        {/* Rows — only show cells below diagonal */}
        {cast.map((rowName, ri) => {
          if (ri === 0) return null; // first row has no cells in lower triangle
          return (
            <div key={rowName} style={{ display: "flex", height: CELL }}>
              {/* Row label */}
              <div style={{
                width: 90, display: "flex", alignItems: "center", justifyContent: "flex-end",
                paddingRight: 10, fontSize: 11, fontWeight: 700, color: CAST_COLORS[rowName],
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              }}>{rowName}</div>

              {/* Cells — only columns 0..ri-1 */}
              {cast.slice(0, ri).map((colName, ci) => {
                const status = getStatus(rowName, colName, season);
                const reason = getReason(rowName, colName, season);
                const isHov = tooltip && (
                  (tooltip.a === rowName && tooltip.b === colName) ||
                  (tooltip.a === colName && tooltip.b === rowName)
                );

                let bg, border, innerBg, innerHov;
                if (status === "F") {
                  bg = isHov ? "#f0d0d0" : "#f7e8e8";
                  border = isHov ? "#c08080" : "#e8d4d4";
                  innerBg = isHov ? "#c44040" : "#d06060";
                  innerHov = "#b03030";
                } else if (status === "R") {
                  bg = isHov ? "#c8e8d4" : "#e4f2e8";
                  border = isHov ? "#80b090" : "#cce0d2";
                  innerBg = isHov ? "#2d8050" : "#48a068";
                  innerHov = "#1e6b3e";
                } else {
                  bg = "#ede8e0";
                  border = "#e0dbd0";
                  innerBg = null;
                  innerHov = null;
                }

                return (
                  <div key={ci}
                    onMouseEnter={e => handleEnter(e, rowName, colName)}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      width: CELL, height: CELL,
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: 3,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: status ? "pointer" : "default",
                      transition: "background 0.15s, border-color 0.15s",
                      position: "relative",
                      margin: 1,
                    }}
                  >
                    {innerBg && (
                      <div style={{
                        width: "58%", height: "58%", borderRadius: 3,
                        background: innerBg,
                        transition: "background 0.15s",
                      }}/>
                    )}
                    {!status && (
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#d8d2c8" }}/>
                    )}
                    {reason && (
                      <span style={{
                        position: "absolute", top: 1, right: 3,
                        fontSize: 7, fontWeight: 700,
                        color: status === "F" ? "#a83232" : "#2d7a4f",
                        opacity: 0.6,
                      }}>◆</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend & instructions */}
      <div style={{
        display: "flex", gap: 18, fontSize: 10, marginTop: 14,
        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        color: "#8a7e72", letterSpacing: "0.04em",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "#d06060", display: "inline-block" }}/>Feud
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "#48a068", display: "inline-block" }}/>Good terms
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "#ede8e0", display: "inline-block", border: "1px solid #ddd5c8" }}/>Not on show
        </span>
      </div>
      <p style={{
        fontSize: 10, color: "#b5aa9d", marginTop: 6, fontStyle: "italic",
      }}>scroll to change season · hover for details</p>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed",
          left: Math.max(12, Math.min(tooltip.x, typeof window !== "undefined" ? window.innerWidth - 290 : 400)),
          top: tooltip.y - 10,
          transform: "translate(-50%, -100%)",
          background: "#fffdf8",
          border: `1px solid ${tooltip.status === "F" ? "#d4a0a0" : "#a0c8b0"}`,
          borderRadius: 8,
          padding: "10px 14px",
          maxWidth: 280,
          zIndex: 100,
          pointerEvents: "none",
          boxShadow: "0 4px 20px rgba(42,37,32,0.12)",
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <span style={{ fontWeight: 700, color: CAST_COLORS[tooltip.a], fontSize: 12 }}>{tooltip.a}</span>
            <span style={{ color: "#c4b9a8", fontSize: 10 }}>&</span>
            <span style={{ fontWeight: 700, color: CAST_COLORS[tooltip.b], fontSize: 12 }}>{tooltip.b}</span>
            <span style={{
              marginLeft: "auto", fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              color: tooltip.status === "F" ? "#a83232" : "#2d7a4f",
            }}>
              {tooltip.status === "F" ? "Feud" : "Good terms"}
            </span>
          </div>
          <div style={{ fontSize: 10, color: "#8a7e72", marginBottom: tooltip.reason ? 5 : 0 }}>
            {s.id} · {s.date}
          </div>
          {tooltip.reason && (
            <div style={{ fontSize: 11, color: "#4a4440", lineHeight: 1.5, fontFamily: "Georgia, serif" }}>
              {tooltip.reason}
            </div>
          )}
          <div style={{
            position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
            borderTop: `6px solid ${tooltip.status === "F" ? "#d4a0a0" : "#a0c8b0"}`,
          }}/>
        </div>
      )}
    </div>
  );
}
