import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

import { motion } from "framer-motion";

function MatchCenter() {

    const [timeline, setTimeline] =
        useState([]);

    useEffect(() => {

        fetchTimeline();

    }, []);

    // =====================================================
    // FETCH TIMELINE
    // =====================================================

    const fetchTimeline =
        async () => {

            try {

                const response =
                    await axios.get(
                        "http://127.0.0.1:5000/api/timeline"
                    );

                const formatted =
                    response.data.map(
                        (event, index) => ({

                            ...event,

                            sequence: index + 1
                        })
                    );

                setTimeline(
                    Array.isArray(formatted)
                        ? formatted
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

                    Match Intelligence Center

                </h1>

                <p
                    className="
            text-green-100
            mt-4
            text-lg
          "
                >

                    Replay tactical pressure moments,
                    momentum shifts, and captain
                    decisions from real IPL matches.

                </p>

            </div>

            {/* Momentum Heat Strip */}

            <motion.div

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}

                className="
    mb-16
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

                    Match Momentum Flow

                </h2>

                <div
                    className="
      bg-white/5
      border
      border-green-900
      rounded-3xl
      p-8
    "
                >

                    <div
                        className="
        flex
        overflow-x-auto
        gap-2
        pb-4
      "
                    >

                        {
                            timeline
                                .slice(0, 60)
                                .map(
                                    (
                                        event,
                                        index
                                    ) => (

                                        <motion.div

                                            key={index}

                                            whileHover={{
                                                scale: 1.1
                                            }}

                                            className={`
                  min-w-[70px]
                  h-[160px]
                  rounded-2xl
                  flex
                  flex-col
                  justify-end
                  items-center
                  p-3
                  text-xs
                  font-bold
                  transition-all

                  ${event.decision_success
                                                    === "Successful"

                                                    ? `
                      bg-gradient-to-t
                      from-green-700
                      to-green-400
                    `

                                                    : `
                      bg-gradient-to-t
                      from-red-700
                      to-red-400
                    `
                                                }
                `}
                                        >

                                            <span
                                                className="
                    text-white
                    text-center
                  "
                                            >

                                                {
                                                    event.over
                                                }.
                                                {
                                                    event.ball
                                                }

                                            </span>

                                        </motion.div>
                                    )
                                )
                        }

                    </div>

                    {/* Legend */}

                    <div
                        className="
        flex
        gap-8
        mt-6
      "
                    >

                        <div
                            className="
          flex
          items-center
          gap-3
        "
                        >

                            <div
                                className="
            w-5
            h-5
            rounded-full
            bg-green-500
          "
                            />

                            <span>
                                Successful Tactical Response
                            </span>

                        </div>

                        <div
                            className="
          flex
          items-center
          gap-3
        "
                        >

                            <div
                                className="
            w-5
            h-5
            rounded-full
            bg-red-500
          "
                            />

                            <span>
                                Failed Tactical Response
                            </span>

                        </div>

                    </div>

                </div>

            </motion.div>

            {/* Tactical Timeline */}

            <div>

                <h2
                    className="
            text-3xl
            font-bold
            text-yellow-400
            mb-8
          "
                >

                    Tactical Event Timeline

                </h2>

                <div
                    className="
            space-y-6
          "
                >

                    {
                        timeline
                            .slice(0, 40)
                            .map(
                                (
                                    event,
                                    index
                                ) => (

                                    <motion.div

                                        key={index}

                                        whileHover={{
                                            scale: 1.01
                                        }}

                                        className="
                      bg-white/5
                      border
                      border-green-900
                      rounded-2xl
                      p-6
                      backdrop-blur-lg
                    "
                                    >

                                        <div
                                            className="
                        flex
                        justify-between
                        items-start
                        flex-wrap
                        gap-6
                      "
                                        >

                                            {/* Left */}

                                            <div>

                                                <h3
                                                    className="
                            text-xl
                            font-bold
                            text-yellow-400
                          "
                                                >

                                                    {
                                                        event.pressure_type
                                                    }

                                                </h3>

                                                <p
                                                    className="
                            text-green-100
                            mt-2
                          "
                                                >

                                                    {
                                                        event.strategic_decision
                                                    }

                                                </p>

                                            </div>

                                            {/* Right */}

                                            <div
                                                className="
                          text-right
                        "
                                            >

                                                <p
                                                    className="
                            text-white
                            font-bold
                          "
                                                >

                                                    Over {
                                                        event.over
                                                    }.
                                                    {
                                                        event.ball
                                                    }

                                                </p>

                                                <p
                                                    className="
                            text-green-300
                            mt-2
                          "
                                                >

                                                    {
                                                        event.decision_success
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </motion.div>
                                )
                            )
                    }

                </div>

            </div>

        </div>
    );
}

export default MatchCenter;