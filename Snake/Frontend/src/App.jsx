import React, { useEffect, useState, useRef, useTransition } from "react";

const GRID_SIZE = 18;
const BASE_SPEED = 130;

// Web Audio API Synthesizer (Zero external dependencies)
const playSfx = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "eat") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "turn") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "die") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch {
    // Audio contexts might be blocked until first user interaction
  }
};

function getRandomFood(snake, size) {
  const empty = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!snake.some((s) => s.row === r && s.col === c)) {
        empty.push({ row: r, col: c });
      }
    }
  }
  if (!empty.length) return null;
  return empty[Math.floor(Math.random() * empty.length)];
}

const INITIAL_SNAKE = [
  { row: 9, col: 9 },
  { row: 10, col: 9 },
  { row: 11, col: 9 },
];

export default function PremiumSnake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => getRandomFood(INITIAL_SNAKE, GRID_SIZE));
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("vip_snake_hs") || "0", 10);
  });

  const directionRef = useRef([-1, 0]);
  const lastDirRef = useRef([-1, 0]);
  const comboTimer = useRef(null);

  const restartGame = () => {
    directionRef.current = [-1, 0];
    lastDirRef.current = [-1, 0];
    setSnake(INITIAL_SNAKE);
    setFood(getRandomFood(INITIAL_SNAKE, GRID_SIZE));
    setScore(0);
    setCombo(1);
    setIsGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const [dr, dc] = lastDirRef.current;
      let newDir = null;

      if ((e.key === "ArrowUp" || e.key === "w") && dr !== 1) newDir = [-1, 0];
      if ((e.key === "ArrowDown" || e.key === "s") && dr !== -1) newDir = [1, 0];
      if ((e.key === "ArrowLeft" || e.key === "a") && dc !== 1) newDir = [0, -1];
      if ((e.key === "ArrowRight" || e.key === "d") && dc !== -1) newDir = [0, 1];

      if (newDir) {
        directionRef.current = newDir;
        playSfx("turn");
      }
      if (e.code === "Space" && isGameOver) {
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver || !food) return;

    // Dynamically speeds up as snake lengthens
    const speed = Math.max(75, BASE_SPEED - Math.floor(snake.length * 1.5));

    const loop = setTimeout(() => {
      setSnake((prev) => {
        const [dr, dc] = directionRef.current;
        lastDirRef.current = [dr, dc];

        const head = prev[0];
        const newHead = { row: head.row + dr, col: head.col + dc };

        // 1. Boundary & Collision checks
        if (
          newHead.row < 0 ||
          newHead.row >= GRID_SIZE ||
          newHead.col < 0 ||
          newHead.col >= GRID_SIZE ||
          prev.some((s) => s.row === newHead.row && s.col === newHead.col)
        ) {
          playSfx("die");
          setIsGameOver(true);
          return prev;
        }

        // 2. Eating food
        if (newHead.row === food.row && newHead.col === food.col) {
          playSfx("eat");

          // Combo Multiplier
          clearTimeout(comboTimer.current);
          setCombo((prevC) => Math.min(prevC + 1, 5));
          comboTimer.current = setTimeout(() => setCombo(1), 3000);

          const addedScore = 10 * combo;
          setScore((s) => {
            const nextScore = s + addedScore;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem("vip_snake_hs", nextScore.toString());
            }
            return nextScore;
          });

          const grown = [newHead, ...prev];
          setFood(getRandomFood(grown, GRID_SIZE));
          return grown;
        }

        // Normal walk
        return [newHead, ...prev.slice(0, -1)];
      });
    }, speed);

    return () => clearTimeout(loop);
  }, [snake, food, isGameOver, combo, highScore]);

  // Head Rotation Angle
  const [dr, dc] = lastDirRef.current;
  const headAngle = dr === -1 ? 0 : dr === 1 ? 180 : dc === -1 ? 270 : 90;

  return (
    <div style={ui.wrapper}>
      {/* HUD Bar */}
      <header style={ui.hud}>
        <div style={ui.hudColumn}>
          <span style={ui.hudLabel}>SCORE</span>
          <div style={ui.hudValueContainer}>
            <span style={ui.hudValue}>{score}</span>
            {combo > 1 && <span style={ui.comboBadge}>x{combo}</span>}
          </div>
        </div>

        <div style={ui.logoBadge}>
          <div style={ui.logoGlow} />
          <span style={ui.logoText}>VIPER 2.0</span>
          <span style={ui.logoSub}>NEON PROTOCOL</span>
        </div>

        <div style={{ ...ui.hudColumn, alignItems: "flex-end" }}>
          <span style={ui.hudLabel}>BEST RUN</span>
          <span style={{ ...ui.hudValue, color: "#facc15" }}>{highScore}</span>
        </div>
      </header>

      {/* Main Glass Screen */}
      <main style={ui.arcadeChassis}>
        <div style={ui.crtOverlay} />

        <div
          style={{
            ...ui.grid,
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: GRID_SIZE }).map((_, r) =>
            Array.from({ length: GRID_SIZE }).map((_, c) => {
              const isHead = snake[0].row === r && snake[0].col === c;
              const bodyIndex = snake.findIndex((s) => s.row === r && s.col === c);
              const isFood = food && food.row === r && food.col === c;

              return (
                <div key={`${r}-${c}`} style={ui.cell}>
                  {/* Food Orb */}
                  {isFood && (
                    <div style={ui.foodContainer}>
                      <div style={ui.foodAura} />
                      <div style={ui.foodOrb} />
                    </div>
                  )}

                  {/* Snake Head */}
                  {isHead && (
                    <div
                      style={{
                        ...ui.head,
                        transform: `rotate(${headAngle}deg)`,
                      }}
                    >
                      <div style={ui.eyePair}>
                        <div style={ui.eye}><div style={ui.pupil} /></div>
                        <div style={ui.eye}><div style={ui.pupil} /></div>
                      </div>
                    </div>
                  )}

                  {/* Snake Body Segment */}
                  {!isHead && bodyIndex > 0 && (
                    <div
                      style={{
                        ...ui.bodySegment,
                        opacity: Math.max(0.35, 1 - (bodyIndex / snake.length) * 0.7),
                        transform: `scale(${Math.max(0.72, 1 - (bodyIndex / snake.length) * 0.25)})`,
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Overlay for Game Over */}
        {isGameOver && (
          <div style={ui.modal}>
            <div style={ui.modalCard}>
              <h2 style={ui.modalTitle}>CRITICAL FAILURE</h2>
              <div style={ui.scoreRow}>
                <span style={ui.scoreDesc}>FINAL SCORE</span>
                <span style={ui.scoreStat}>{score}</span>
              </div>
              <div style={ui.scoreRow}>
                <span style={ui.scoreDesc}>TOTAL LENGTH</span>
                <span style={ui.scoreStat}>{snake.length}</span>
              </div>
              <button style={ui.restartBtn} onClick={restartGame}>
                REBOOT SYSTEM (SPACE)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Nav Controls info */}
      <footer style={ui.footer}>
        <span>CONTROLS: <b style={ui.keyCap}>W</b> <b style={ui.keyCap}>A</b> <b style={ui.keyCap}>S</b> <b style={ui.keyCap}>D</b> OR <b style={ui.keyCap}>ARROWS</b></span>
      </footer>

      {/* Global Embedded Animations */}
      <style>{`
        @keyframes foodPulse {
          0%, 100% { transform: scale(0.92); opacity: 0.9; }
          50% { transform: scale(1.16); opacity: 1; filter: drop-shadow(0 0 16px #ff0055); }
        }
        @keyframes auraSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const ui = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#030712",
    backgroundImage: "radial-gradient(circle at 50% 20%, #0f172a 0%, #030712 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#f8fafc",
    userSelect: "none",
    padding: "24px",
  },
  hud: {
    width: "480px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 22px",
    marginBottom: "16px",
    background: "rgba(15, 23, 42, 0.65)",
    backdropFilter: "blur(16px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.6)",
  },
  hudColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  hudLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "#64748b",
  },
  hudValueContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  hudValue: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#00f0ff",
    fontVariantNumeric: "tabular-nums",
    textShadow: "0 0 12px rgba(0, 240, 255, 0.4)",
  },
  comboBadge: {
    fontSize: "10px",
    fontWeight: "900",
    color: "#000",
    backgroundColor: "#00f0ff",
    padding: "2px 6px",
    borderRadius: "12px",
  },
  logoBadge: {
    textAlign: "center",
    position: "relative",
  },
  logoGlow: {
    position: "absolute",
    inset: "0",
    background: "linear-gradient(90deg, #00f0ff, #a855f7)",
    filter: "blur(16px)",
    opacity: 0.25,
  },
  logoText: {
    display: "block",
    fontSize: "18px",
    fontWeight: "900",
    letterSpacing: "3px",
    background: "linear-gradient(135deg, #fff 0%, #cbd5e1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoSub: {
    fontSize: "9px",
    letterSpacing: "2px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  arcadeChassis: {
    position: "relative",
    padding: "10px",
    borderRadius: "24px",
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    boxShadow: "0 0 50px -10px rgba(0, 240, 255, 0.15), inset 0 2px 4px rgba(255,255,255,0.1)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  crtOverlay: {
    position: "absolute",
    inset: 10,
    borderRadius: "16px",
    pointerEvents: "none",
    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%)",
    backgroundSize: "100% 4px",
    zIndex: 10,
    opacity: 0.45,
  },
  grid: {
    display: "grid",
    width: "450px",
    height: "450px",
    backgroundColor: "#020617",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    position: "relative",
    overflow: "hidden",
  },
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  head: {
    width: "92%",
    height: "92%",
    backgroundColor: "#10b981",
    borderRadius: "8px 8px 4px 4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "4px",
    boxShadow: "0 0 16px #10b981, inset 0 2px 4px rgba(255,255,255,0.4)",
    zIndex: 4,
    transition: "transform 0.08s ease-out",
  },
  eyePair: {
    display: "flex",
    gap: "6px",
  },
  eye: {
    width: "6px",
    height: "6px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pupil: {
    width: "3px",
    height: "3px",
    backgroundColor: "#022c22",
    borderRadius: "50%",
  },
  bodySegment: {
    width: "88%",
    height: "88%",
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    borderRadius: "5px",
    boxShadow: "0 0 8px rgba(16, 185, 129, 0.3)",
    transition: "transform 0.1s ease-out",
  },
  foodContainer: {
    position: "relative",
    width: "80%",
    height: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  foodOrb: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #ff4d79, #e11d48)",
    boxShadow: "0 0 14px #f43f5e, 0 0 24px #e11d48",
    animation: "foodPulse 1.2s infinite ease-in-out",
  },
  foodAura: {
    position: "absolute",
    inset: "-3px",
    borderRadius: "50%",
    border: "1.5px dashed rgba(244, 63, 94, 0.5)",
    animation: "auraSpin 6s linear infinite",
  },
  modal: {
    position: "absolute",
    inset: 10,
    backgroundColor: "rgba(2, 6, 23, 0.88)",
    backdropFilter: "blur(8px)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  modalCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
    width: "280px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "900",
    color: "#f43f5e",
    letterSpacing: "2px",
    textShadow: "0 0 16px rgba(244, 63, 94, 0.6)",
  },
  scoreRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "6px",
  },
  scoreDesc: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  scoreStat: {
    fontSize: "14px",
    color: "#fff",
    fontWeight: "800",
  },
  restartBtn: {
    marginTop: "8px",
    width: "100%",
    padding: "12px 18px",
    backgroundColor: "#00f0ff",
    color: "#020617",
    border: "none",
    borderRadius: "10px",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1px",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)",
    transition: "transform 0.15s ease",
  },
  footer: {
    marginTop: "20px",
    fontSize: "11px",
    color: "#475569",
    letterSpacing: "1px",
  },
  keyCap: {
    display: "inline-block",
    padding: "2px 6px",
    margin: "0 2px",
    backgroundColor: "#1e293b",
    borderRadius: "4px",
    color: "#94a3b8",
    border: "1px solid #334155",
  },
};