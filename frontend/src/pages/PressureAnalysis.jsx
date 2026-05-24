import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import { motion } from "framer-motion";

const COLORS = [
  "#facc15",
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f97316"
];

function PressureAnalysis() {

  const [pressureData, setPressureData] =
    useState([]);

  useEffect(() => {

    fetchPressureData();

  }, []);

  // =====================================================
  // FETCH PRESSURE ANALYTICS
  // =====================================================

  const fetchPressureData =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/api/pressure-analysis"
          );

        setPressureData(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.error(error);
      }
    };

  return (

    <div
      className="
        min-h-screen
        bg-[#04130d]
        text-white
        p-10
      "
    >

      {/* Header */}

      <div className="mb-12">

        <h1
          className="
            text-5xl
            font-black
            text-yellow-400
          "
        >

          Pressure Intelligence Engine

        </h1>

        <p
          className="
            mt-4
            text-green-100
            text-lg
          "
        >

          Analyze high-pressure IPL
          situations using real
          ball-by-ball tactical data.

        </p>

      </div>

      {/* KPI Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-14
        "
      >

        <PressureCard
          title="Pressure Events"
          value={pressureData.length}
        />

        <PressureCard
          title="Boundary Pressure"
          value={
            pressureData.find(
              p =>
                p.pressure_type ===
                "Consecutive Boundaries"
            )?.count || 0
          }
        />

        <PressureCard
          title="Collapse Events"
          value={
            pressureData.find(
              p =>
                p.pressure_type ===
                "Batting Collapse"
            )?.count || 0
          }
        />

        <PressureCard
          title="Death Over Pressure"
          value={
            pressureData.find(
              p =>
                p.pressure_type ===
                "Death Over Acceleration"
            )?.count || 0
          }
        />

      </div>

      {/* Charts */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-10
        "
      >

        {/* Pie Chart */}

        <motion.div

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}

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
              text-3xl
              font-bold
              text-yellow-400
              mb-8
            "
          >

            Pressure Distribution

          </h2>

          <ResponsiveContainer
            width="100%"
            height={420}
          >

            <PieChart>

              <Pie
                data={pressureData}
                dataKey="count"
                nameKey="pressure_type"
                outerRadius={140}
                label
              >

                {
                  pressureData.map(
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

        </motion.div>

        {/* Bar Chart */}

        <motion.div

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}

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
              text-3xl
              font-bold
              text-yellow-400
              mb-8
            "
          >

            Pressure Event Frequency

          </h2>

          <ResponsiveContainer
            width="100%"
            height={420}
          >

            <BarChart
              data={pressureData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#14532d"
              />

              <XAxis
                dataKey="pressure_type"
                stroke="#fff"
              />

              <YAxis stroke="#fff" />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </motion.div>

      </div>

    </div>
  );
}

// =========================================================
// PRESSURE CARD
// =========================================================

function PressureCard({
  title,
  value
}) {

  return (

    <div
      className="
        bg-white/5
        border
        border-green-900
        rounded-3xl
        p-6
        shadow-xl
      "
    >

      <h3
        className="
          text-green-100
          text-lg
        "
      >

        {title}

      </h3>

      <p
        className="
          text-4xl
          font-black
          text-yellow-400
          mt-4
        "
      >

        {value}

      </p>

    </div>
  );
}

export default PressureAnalysis;