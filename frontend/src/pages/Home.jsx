import { motion } from "framer-motion";

import {
  Shield,
  Activity,
  BarChart3,
  BrainCircuit
} from "lucide-react";

function Home() {

  return (

    <div
      className="
        min-h-screen
        bg-[#04130d]
        text-white
        overflow-hidden
      "
    >

      {/* HERO SECTION */}

      <section
        className="
          px-10
          py-24
          relative
        "
      >

        {/* Background Glow */}

        <div
          className="
            absolute
            top-0
            right-0
            w-[500px]
            h-[500px]
            bg-green-500/10
            blur-[120px]
            rounded-full
          "
        />

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1
          }}

          className="
            relative
            z-10
            max-w-5xl
          "
        >

          <h1
            className="
              text-7xl
              font-black
              leading-tight
              text-yellow-400
            "
          >

            IPL Tactical
            Intelligence Platform

          </h1>

          <p
            className="
              mt-8
              text-2xl
              text-green-100
              leading-relaxed
              max-w-4xl
            "
          >

            Analyze real IPL captain decisions,
            pressure moments, bowling strategies,
            and tactical outcomes using
            ball-by-ball cricket intelligence.

          </p>

          {/* Buttons */}

          <div
            className="
              flex
              gap-6
              mt-10
            "
          >

            <a
              href="/dashboard"
              className="
                bg-yellow-400
                text-black
                px-8
                py-4
                rounded-2xl
                font-bold
                hover:scale-105
                transition
              "
            >

              Explore Dashboard

            </a>

            <a
              href="/captains"
              className="
                border
                border-green-700
                px-8
                py-4
                rounded-2xl
                font-bold
                hover:bg-green-900/30
                transition
              "
            >

              Captain Intelligence

            </a>

          </div>

        </motion.div>

      </section>

      {/* FEATURE GRID */}

      <section
        className="
          px-10
          pb-24
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          <FeatureCard
            icon={<Shield size={40} />}
            title="Pressure Detection"
            description="
              Detect batting collapses,
              death-over pressure,
              and momentum shifts.
            "
          />

          <FeatureCard
            icon={<Activity size={40} />}
            title="Captain Intelligence"
            description="
              Analyze tactical captaincy
              decisions using real IPL data.
            "
          />

          <FeatureCard
            icon={<BarChart3 size={40} />}
            title="Advanced Analytics"
            description="
              Tactical distributions,
              aggression metrics,
              and strategic outcomes.
            "
          />

          <FeatureCard
            icon={<BrainCircuit size={40} />}
            title="Match Intelligence"
            description="
              Tactical replay engine with
              momentum and event tracking.
            "
          />

        </div>

      </section>

      {/* STATS SECTION */}

      <section
        className="
          px-10
          pb-24
        "
      >

        <div
          className="
            bg-white/5
            border
            border-green-900
            rounded-3xl
            p-12
            grid
            grid-cols-2
            md:grid-cols-4
            gap-10
            text-center
          "
        >

          <StatCard
            value="2008-2026"
            label="IPL Seasons"
          />

          <StatCard
            value="10+"
            label="Teams Analyzed"
          />

          <StatCard
            value="1000+"
            label="Pressure Events"
          />

          <StatCard
            value="Real Data"
            label="Cricsheet Powered"
          />

        </div>

      </section>

    </div>
  );
}

// =========================================================
// FEATURE CARD
// =========================================================

function FeatureCard({
  icon,
  title,
  description
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.03
      }}

      className="
        bg-white/5
        border
        border-green-900
        rounded-3xl
        p-8
        backdrop-blur-lg
      "
    >

      <div className="text-yellow-400">

        {icon}

      </div>

      <h2
        className="
          text-2xl
          font-bold
          mt-6
        "
      >

        {title}

      </h2>

      <p
        className="
          mt-4
          text-green-100
          leading-relaxed
        "
      >

        {description}

      </p>

    </motion.div>
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  value,
  label
}) {

  return (

    <div>

      <h2
        className="
          text-4xl
          font-black
          text-yellow-400
        "
      >

        {value}

      </h2>

      <p
        className="
          mt-3
          text-green-100
        "
      >

        {label}

      </p>

    </div>
  );
}

export default Home;