import { motion } from "framer-motion";

function About() {

  return (

    <div
      className="
        min-h-screen
        bg-[#04130d]
        text-white
        px-10
        py-16
      "
    >

      {/* HERO */}

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
          max-w-6xl
        "
      >

        <h1
          className="
            text-7xl
            font-black
            text-yellow-400
            leading-tight
          "
        >

          Redefining Cricket
          Intelligence Through Data

        </h1>

        <p
          className="
            mt-10
            text-2xl
            text-green-100
            leading-relaxed
            max-w-5xl
          "
        >

          IPL Strategy Analyzer is a next-generation
          cricket analytics platform designed to
          decode tactical decision-making under
          pressure using real IPL ball-by-ball data.

        </p>

      </motion.div>

      {/* PLATFORM VISION */}

      <section
        className="
          mt-24
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-10
        "
      >

        <InfoCard
          title="Tactical Intelligence"

          description="
            Understand how captains respond
            during high-pressure moments,
            momentum swings, batting collapses,
            and death-over situations.
          "
        />

        <InfoCard
          title="Pressure Analytics"

          description="
            Detect tactical pressure events
            automatically using advanced
            cricket event analysis powered
            by structured IPL datasets.
          "
        />

        <InfoCard
          title="Captain Insights"

          description="
            Compare leadership styles,
            aggression levels, bowling
            changes, and tactical success
            rates across IPL seasons.
          "
        />

        <InfoCard
          title="Match Intelligence"

          description="
            Replay tactical moments and
            analyze momentum shifts through
            interactive cricket intelligence
            visualizations.
          "
        />

      </section>

      {/* PLATFORM EXPERIENCE */}

      <section
        className="
          mt-24
          bg-white/5
          border
          border-green-900
          rounded-3xl
          p-12
        "
      >

        <h2
          className="
            text-4xl
            font-black
            text-yellow-400
          "
        >

          Built For Modern Cricket Analytics

        </h2>

        <p
          className="
            mt-8
            text-green-100
            text-xl
            leading-relaxed
            max-w-5xl
          "
        >

          The platform combines sports
          analytics, tactical intelligence,
          event-driven data engineering,
          and modern visualization systems
          to create an immersive cricket
          intelligence experience.

        </p>

        <div
          className="
            mt-12
            grid
            grid-cols-2
            md:grid-cols-4
            gap-8
          "
        >

          <StatBox
            value="2008-2026"
            label="IPL Seasons"
          />

          <StatBox
            value="Ball-by-Ball"
            label="Match Data"
          />

          <StatBox
            value="Real-Time"
            label="Analytics Engine"
          />

          <StatBox
            value="Advanced"
            label="Tactical Insights"
          />

        </div>

      </section>

      {/* TECH STACK */}

      <section
        className="
          mt-24
        "
      >

        <h2
          className="
            text-4xl
            font-black
            text-yellow-400
            mb-12
          "
        >

          Platform Stack

        </h2>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          <TechCard
            title="Backend"
            items={[
              "Python",
              "Flask",
              "Pandas",
              "NumPy"
            ]}
          />

          <TechCard
            title="Frontend"
            items={[
              "React.js",
              "Vite",
              "Tailwind CSS",
              "Framer Motion"
            ]}
          />

          <TechCard
            title="Analytics"
            items={[
              "Pressure Detection",
              "Captain Intelligence",
              "Momentum Analysis",
              "Tactical Modeling"
            ]}
          />

          <TechCard
            title="Data Source"
            items={[
              "Cricsheet IPL",
              "Ball-by-Ball Data",
              "Structured Match Data",
              "Historical IPL Matches"
            ]}
          />

        </div>

      </section>

    </div>
  );
}

// =========================================================
// INFO CARD
// =========================================================

function InfoCard({
  title,
  description
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.02
      }}

      className="
        bg-white/5
        border
        border-green-900
        rounded-3xl
        p-10
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          text-yellow-400
        "
      >

        {title}

      </h2>

      <p
        className="
          mt-6
          text-green-100
          text-lg
          leading-relaxed
        "
      >

        {description}

      </p>

    </motion.div>
  );
}

// =========================================================
// STAT BOX
// =========================================================

function StatBox({
  value,
  label
}) {

  return (

    <div
      className="
        text-center
      "
    >

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

// =========================================================
// TECH CARD
// =========================================================

function TechCard({
  title,
  items
}) {

  return (

    <div
      className="
        bg-white/5
        border
        border-green-900
        rounded-3xl
        p-8
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          text-yellow-400
        "
      >

        {title}

      </h2>

      <div
        className="
          mt-6
          space-y-4
        "
      >

        {
          items.map(
            (
              item,
              index
            ) => (

              <div
                key={index}

                className="
                  text-green-100
                "
              >

                • {item}

              </div>
            )
          )
        }

      </div>

    </div>
  );
}

export default About;