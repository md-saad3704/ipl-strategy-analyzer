import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { motion } from "framer-motion";

function Captains() {

  const [captains, setCaptains] =
    useState([]);

  const [comparison, setComparison] =
    useState([]);

  useEffect(() => {

    fetchCaptains();

    fetchComparison();

  }, []);

  // =====================================================
  // FETCH CAPTAIN DATA
  // =====================================================

  const fetchCaptains =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/api/captains"
          );

        setCaptains(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.error(error);
      }
    };

  // =====================================================
  // FETCH COMPARISON
  // =====================================================

  const fetchComparison =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/api/captain-comparison"
          );

        setComparison(
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

          Captain Intelligence Center

        </h1>

        <p
          className="
            text-green-100
            mt-4
            text-lg
          "
        >

          Tactical leadership analytics
          powered by real IPL data.

        </p>

      </div>

      {/* Captain Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
        "
      >

        {
          captains.map(
            (captain, index) => (

              <motion.div

                key={index}

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
                  shadow-2xl
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-yellow-400
                  "
                >

                  {captain.captain}

                </h2>

                <div
                  className="
                    mt-6
                    space-y-4
                  "
                >

                  <CaptainStat
                    label="Success Rate"
                    value={
                      `${captain.success_rate}%`
                    }
                  />

                  <CaptainStat
                    label="Aggression"
                    value={
                      captain.average_aggression
                    }
                  />

                  <CaptainStat
                    label="Total Decisions"
                    value={
                      captain.total_decisions
                    }
                  />

                  <CaptainStat
                    label="Successful"
                    value={
                      captain.successful_decisions
                    }
                  />

                  <CaptainStat
                    label="Failed"
                    value={
                      captain.failed_decisions
                    }
                  />

                </div>

              </motion.div>
            )
          )
        }

      </div>

      {/* Comparison Chart */}

      <div
        className="
          mt-16
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

          Tactical Success Comparison

        </h2>

        <ResponsiveContainer
          width="100%"
          height={450}
        >

          <BarChart data={comparison}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#14532d"
            />

            <XAxis
              dataKey="captain"
              stroke="#fff"
            />

            <YAxis stroke="#fff" />

            <Tooltip />

            <Bar
              dataKey="success_rate"
              fill="#facc15"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

// =========================================================
// CAPTAIN STAT
// =========================================================

function CaptainStat({
  label,
  value
}) {

  return (

    <div
      className="
        flex
        justify-between
        border-b
        border-green-950
        pb-2
      "
    >

      <span
        className="
          text-gray-300
        "
      >

        {label}

      </span>

      <span
        className="
          font-bold
        "
      >

        {value}

      </span>

    </div>
  );
}

export default Captains;