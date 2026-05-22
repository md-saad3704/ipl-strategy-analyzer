import { useEffect, useState } from "react";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend
} from "recharts";

import { motion } from "framer-motion";

import {
  Trophy,
  ShieldCheck,
  Flame,
  Activity,
  BrainCircuit,
  Radar,
  Target,
  TrendingUp
} from "lucide-react";

const COLORS = [
  "#D4AF37",
  "#22C55E",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6"
];

function Dashboard() {

  const [metrics, setMetrics] =
    useState(null);

  const [pressureData, setPressureData] =
    useState([]);

  const [strategyData, setStrategyData] =
    useState([]);

  const [timelineData, setTimelineData] =
    useState([]);

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {

    fetchMetrics();

    fetchPressureAnalysis();

    fetchStrategyAnalysis();

    fetchTimeline();

  }, []);

  // =====================================================
  // API CALLS
  // =====================================================

  const fetchMetrics = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/success-metrics"
      );

      setMetrics(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchPressureAnalysis =
    async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/pressure-analysis"
      );

      setPressureData(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchStrategyAnalysis =
    async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/strategy-analysis"
      );

      setStrategyData(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchTimeline =
    async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/timeline"
      );

      setTimelineData(
        response.data.slice(0, 8)
      );

    } catch (error) {

      console.error(error);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#03140F]
        via-[#06281C]
        to-[#0B3D2E]
        text-white
        p-6
      "
    >

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <motion.div

        initial={{
          opacity: 0,
          y: -50
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.8
        }}

        className="
          flex
          flex-col
          lg:flex-row
          justify-between
          items-start
          lg:items-center
          gap-6
        "
      >

        <div>

          <h1
            className="
              text-6xl
              font-extrabold
              bg-gradient-to-r
              from-yellow-300
              to-yellow-500
              bg-clip-text
              text-transparent
            "
          >

            IPL Strategy Analyzer

          </h1>

          <p
            className="
              text-green-100
              mt-4
              text-xl
              max-w-3xl
            "
          >

            AI-powered tactical intelligence system
            analyzing captaincy behavior, pressure
            handling, bowling reactions, and
            strategic momentum shifts in IPL matches.

          </p>

        </div>

        <div
          className="
            bg-gradient-to-r
            from-yellow-400
            to-yellow-600
            text-black
            px-6
            py-4
            rounded-2xl
            font-bold
            shadow-2xl
            text-lg
          "
        >

          LIVE MATCH INTELLIGENCE

        </div>

      </motion.div>

      {/* ============================================= */}
      {/* METRIC CARDS */}
      {/* ============================================= */}

      {
        metrics && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-8
              mt-12
            "
          >

            <MetricCard
              title="Total Tactical Decisions"
              value={metrics.total_decisions}
              icon={<Trophy size={32} />}
              subtitle="All detected captain decisions"
            />

            <MetricCard
              title="Tactical Success Rate"
              value={`${metrics.success_rate}%`}
              icon={<ShieldCheck size={32} />}
              subtitle="Successful tactical outcomes"
            />

            <MetricCard
              title="Successful Decisions"
              value={metrics.successful_decisions}
              icon={<TrendingUp size={32} />}
              subtitle="Positive captaincy responses"
            />

            <MetricCard
              title="Aggression Index"
              value={metrics.average_aggression}
              icon={<Flame size={32} />}
              subtitle="Captain tactical aggression"
            />

          </div>
        )
      }

      {/* ============================================= */}
      {/* INSIGHT PANELS */}
      {/* ============================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-8
          mt-14
        "
      >

        <InsightCard
          title="Pressure Intelligence"
          icon={<Radar />}
          text="
          Detects batting collapses, death-over
          pressure, powerplay wickets, and
          momentum swings automatically.
          "
        />

        <InsightCard
          title="Captain Strategy Engine"
          icon={<BrainCircuit />}
          text="
          Evaluates tactical bowling changes,
          aggressive continuations, and strategic
          pressure responses.
          "
        />

        <InsightCard
          title="Outcome Evaluation"
          icon={<Target />}
          text="
          Measures whether captain decisions
          reduced runs, took wickets, or shifted
          momentum successfully.
          "
        />

      </div>

      {/* ============================================= */}
      {/* CHARTS */}
      {/* ============================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-10
          mt-14
        "
      >

        {/* Pressure Chart */}

        <ChartContainer
          title="Pressure Moments Distribution"
        >

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <BarChart data={pressureData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
              />

              <XAxis
                dataKey="pressure_type"
                stroke="#E5E7EB"
              />

              <YAxis stroke="#E5E7EB" />

              <Tooltip />

              <Bar
                dataKey="count"
                radius={[10, 10, 0, 0]}
                fill="#22C55E"
              />

            </BarChart>

          </ResponsiveContainer>

        </ChartContainer>

        {/* Strategy Pie */}

        <ChartContainer
          title="Strategic Decision Breakdown"
        >

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <PieChart>

              <Pie
                data={strategyData}
                dataKey="count"
                nameKey="strategic_decision"
                outerRadius={140}
                innerRadius={70}
                paddingAngle={4}
                label
              >

                {
                  strategyData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    )
                  )
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </ChartContainer>

      </div>

      {/* ============================================= */}
      {/* TIMELINE TABLE */}
      {/* ============================================= */}

      <div
        className="
          mt-14
          bg-white/5
          backdrop-blur-lg
          border
          border-green-900
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            text-yellow-400
            mb-8
          "
        >

          Tactical Timeline Events

        </h2>

        <div className="overflow-x-auto">

          <table
            className="
              w-full
              border-collapse
            "
          >

            <thead>

              <tr
                className="
                  text-left
                  border-b
                  border-green-800
                "
              >

                <th className="pb-4">
                  Match
                </th>

                <th className="pb-4">
                  Over
                </th>

                <th className="pb-4">
                  Pressure Type
                </th>

                <th className="pb-4">
                  Strategy
                </th>

                <th className="pb-4">
                  Outcome
                </th>

              </tr>

            </thead>

            <tbody>

              {
                timelineData.map(
                  (event, index) => (

                    <tr
                      key={index}
                      className="
                        border-b
                        border-green-950
                        hover:bg-green-950/30
                      "
                    >

                      <td className="py-4">
                        {event.match_id}
                      </td>

                      <td>
                        {event.over}.{event.ball}
                      </td>

                      <td>
                        {event.pressure_type}
                      </td>

                      <td>
                        {
                          event.strategic_decision
                        }
                      </td>

                      <td>

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-bold

                            ${
                              event.decision_success
                              === "Successful"

                              ? "bg-green-600"

                              : "bg-red-600"
                            }
                          `}
                        >

                          {
                            event.decision_success
                          }

                        </span>

                      </td>

                    </tr>
                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;


// =======================================================
// METRIC CARD
// =======================================================

function MetricCard({
  title,
  value,
  subtitle,
  icon
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.04,
        y: -5
      }}

      className="
        bg-white/5
        backdrop-blur-lg
        border
        border-green-900
        rounded-3xl
        p-8
        shadow-2xl
        relative
        overflow-hidden
      "
    >

      <div
        className="
          absolute
          top-0
          right-0
          w-24
          h-24
          bg-yellow-400/10
          blur-3xl
        "
      />

      <div
        className="
          flex
          justify-between
          items-start
        "
      >

        <div>

          <p
            className="
              text-gray-300
              text-lg
            "
          >

            {title}

          </p>

          <h2
            className="
              text-5xl
              font-extrabold
              mt-4
              text-yellow-400
            "
          >

            {value}

          </h2>

          <p
            className="
              text-gray-400
              mt-4
            "
          >

            {subtitle}

          </p>

        </div>

        <div
          className="
            text-yellow-400
          "
        >

          {icon}

        </div>

      </div>

    </motion.div>
  );
}


// =======================================================
// INSIGHT CARD
// =======================================================

function InsightCard({
  title,
  text,
  icon
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.03
      }}

      className="
        bg-white/5
        backdrop-blur-lg
        border
        border-green-900
        rounded-3xl
        p-8
        shadow-2xl
      "
    >

      <div
        className="
          text-yellow-400
          mb-4
        "
      >

        {icon}

      </div>

      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >

        {title}

      </h2>

      <p
        className="
          text-gray-300
          leading-8
        "
      >

        {text}

      </p>

    </motion.div>
  );
}


// =======================================================
// CHART CONTAINER
// =======================================================

function ChartContainer({
  title,
  children
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      className="
        bg-white/5
        backdrop-blur-lg
        border
        border-green-900
        rounded-3xl
        p-8
        shadow-2xl
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          text-yellow-400
          mb-8
        "
      >

        {title}

      </h2>

      {children}

    </motion.div>
  );
}