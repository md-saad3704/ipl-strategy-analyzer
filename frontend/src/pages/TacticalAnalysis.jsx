import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

import { motion } from "framer-motion";

const COLORS = [
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#ef4444",
  "#f97316"
];

function TacticalAnalysis() {

  const [strategyData, setStrategyData] =
    useState([]);

  const [aggressionData, setAggressionData] =
    useState([]);

  const [successData, setSuccessData] =
    useState([]);

  useEffect(() => {

    fetchStrategyData();

    fetchAggressionData();

    fetchSuccessData();

  }, []);

  // =====================================================
  // STRATEGY ANALYTICS
  // =====================================================

  const fetchStrategyData =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/api/strategy-analysis"
          );

        setStrategyData(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.error(error);
      }
    };

  // =====================================================
  // AGGRESSION ANALYTICS
  // =====================================================

  const fetchAggressionData =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/api/aggression-analysis"
          );

        setAggressionData(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.error(error);
      }
    };

  // =====================================================
  // SUCCESS ANALYTICS
  // =====================================================

  const fetchSuccessData =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/api/strategy-success"
          );

        setSuccessData(
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

          Tactical Analytics Center

        </h1>

        <p
          className="
            text-green-100
            mt-4
            text-lg
          "
        >

          Analyze bowling strategies,
          aggression patterns, and
          tactical success rates from
          real IPL captain decisions.

        </p>

      </div>

      {/* Charts Grid */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-10
        "
      >

        {/* Strategy Distribution */}

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

            Tactical Strategy Distribution

          </h2>

          <ResponsiveContainer
            width="100%"
            height={420}
          >

            <PieChart>

              <Pie
                data={strategyData}
                dataKey="count"
                nameKey="strategic_decision"
                outerRadius={140}
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

        </motion.div>

        {/* Aggression Analysis */}

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

            Aggression Index Analysis

          </h2>

          <ResponsiveContainer
            width="100%"
            height={420}
          >

            <BarChart
              data={aggressionData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#14532d"
              />

              <XAxis
                dataKey="strategic_decision"
                stroke="#fff"
              />

              <YAxis stroke="#fff" />

              <Tooltip />

              <Bar
                dataKey="aggression_index"
                fill="#facc15"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </motion.div>

        {/* Success Analysis */}

        <motion.div

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}

          className="
            xl:col-span-2
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

            Tactical Success Analysis

          </h2>

          <ResponsiveContainer
            width="100%"
            height={500}
          >

            <BarChart
              data={successData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#14532d"
              />

              <XAxis
                dataKey="strategic_decision"
                stroke="#fff"
              />

              <YAxis stroke="#fff" />

              <Tooltip />

              <Legend />

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

export default TacticalAnalysis;