import { useState, useEffect } from "react";
import LiquidEther from "../components/LiquidEther";

export default function Maintenance() {
  const [clickRipples, setClickRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [rippleId, setRippleId] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: rippleId,
        x: e.clientX,
        y: e.clientY,
      };
      setClickRipples((prev) => [...prev, newRipple]);
      setRippleId((prev) => prev + 1);

      // Remove ripple after animation
      setTimeout(() => {
        setClickRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [rippleId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* LiquidEther Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <LiquidEther
          // colors={["#ff0000ff", "#e00e0eff", "#e94d4dff"]}
          mouseForce={20}
          cursorSize={180}
          isViscous={false}
          viscous={35}
          iterationsViscous={42}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.1}
          autoResumeDelay={100}
          autoRampDuration={0.2}
        />
      </div>

      {/* Click Ripple effects */}
      {clickRipples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: "absolute",
            top: ripple.y - 100,
            left: ripple.x - 100,
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 180, 255, 0.4) 0%, rgba(0, 150, 255, 0.2) 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
            pointerEvents: "none",
            animation: "clickRipple 1s ease-out forwards",
          }}
        />
      ))}

      {/* TEDx Logo */}
      <div className="logo">
        <img src="/images/logo-white.png" alt="TEDx" />
      </div>

      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 5px #da9b9bff, 0 0 3px #ff2d92;
          }
          50% {
            text-shadow: 0 0 5px #ff0000ff, 0 0 3px #ffffffff;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes clickRipple {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          30% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          70% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        /* Removed unused keyframes (pulse, sparkle) to clean up the stylesheet */

        .main-title {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(45deg, #8b0000, #dc143c, #b22222);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow 3s ease-in-out infinite alternate;
          margin-bottom: 2rem;
          margin-top: 12rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: "Arial Black", Arial, sans-serif;
          position: relative;
          z-index: 2;
        }

        .subtitle {
          font-size: 1.5rem;
          margin-top: 2rem;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          animation: fadeInUp 1s ease-out 0.5s both;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 2;
        }

        .cooking-text {
          font-size: 2rem;
          font-weight: 700 !important;
          background: linear-gradient(45deg, #8b0000, #a30a28ff, #b22222);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow 3s ease-in-out infinite alternate;
          margin-top: 2rem;
          margin-bottom: 2rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: "Arial Black", "Arial", sans-serif;
          -webkit-font-smoothing: antialiased;
          position: relative;
          z-index: 2;
        }

        .highlight {
          background: linear-gradient(45deg, #ff2d92, #ff6b6b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        .tedx-red {
          color: #dc143c !important;
          font-weight: 600;
        }

        .logo {
          position: absolute;
          top: calc(20% - 30px);
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
        }

        .logo img {
          width: 700px;
          height: auto;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem;
            margin-top: 4rem;
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
          }
          .cooking-text {
            font-size: 1.3rem;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .subtitle {
            font-size: 1rem;
            margin-top: 1.5rem;
            line-height: 1.4;
            padding: 0 10px;
          }
          .logo img {
            width: 70vw;
            max-width: 350px;
            min-width: 180px;
            height: auto;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 1.5rem;
            margin-top: 3rem;
            margin-bottom: 1rem;
          }
          .cooking-text {
            font-size: 1.1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .subtitle {
            font-size: 0.9rem;
            margin-top: 1rem;
          }
          .logo img {
            width: 90vw;
            max-width: 350px;
            min-width: 150px;
            height: auto;
          }
        }
      `}</style>

      <h1 className="main-title">Website Under Maintenance</h1>
      <h3 className="cooking-text">Stay curious. We will be live soon!</h3>
      <div className="subtitle">
        
          &ldquo;The new TEDx NIITUniversity site is coming soon. 
            Stay tuned for something extraordinary!&rdquo;
      </div>
    </div>
  );
}
