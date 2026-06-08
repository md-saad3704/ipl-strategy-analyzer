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

    const [captainData, setCaptainData] =
        useState([]);

    const [captains, setCaptains] =
        useState([]);

    const [
        executiveSummary,
        setExecutiveSummary
    ] = useState(null);
    // =====================================================
    // FETCH DATA
    // =====================================================

    useEffect(() => {

        fetchMetrics();

        fetchPressureAnalysis();

        fetchStrategyAnalysis();

        fetchTimeline();

        fetchCaptainComparison();

        fetchCaptains();

        fetchExecutiveSummary();

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


    const fetchCaptainComparison =
        async () => {

            try {

                const response = await axios.get(
                    "http://127.0.0.1:5000/api/captain-comparison"
                );

                setCaptainData(response.data);

            } catch (error) {

                console.error(error);
            }
        };


    const fetchCaptains =
        async () => {

            try {

                const response = await axios.get(
                    "http://127.0.0.1:5000/api/captains"
                );

                setCaptains(response.data);

            } catch (error) {

                console.error(error);
            }
        };

    const fetchExecutiveSummary =
        async () => {

            try {

                const response =
                    await axios.get(
                        "http://127.0.0.1:5000/api/executive-summary"
                    );

                setExecutiveSummary(
                    response.data
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

                

            </motion.div>



            {
                executiveSummary && (

                    <div
                        className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-5
                gap-6
                mt-12
            "
                    >

                        <SummaryCard
                            title="Most Successful Captain"
                            value={
                                executiveSummary
                                    .most_successful_captain
                                    .captain
                            }
                            stat={
                                executiveSummary
                                    .most_successful_captain
                                    .success_rate + "% Success Rate"
                            }
                        />

                        <SummaryCard
                            title="Best Pressure Handler"
                            value={
                                executiveSummary
                                    .best_pressure_handler
                                    .captain
                            }
                            stat={
                                executiveSummary
                                    .best_pressure_handler
                                    .successful_responses +
                                " Successful Responses"
                            }
                        />

                        <SummaryCard
                            title="Most Pressure Situations"
                            value={
                                executiveSummary
                                    .most_pressure_situations
                                    .captain
                            }
                            stat={
                                executiveSummary
                                    .most_pressure_situations
                                    .total_responses +
                                " Responses"
                            }
                        />

                        <SummaryCard
                            title="Total Pressure Events"
                            value={
                                executiveSummary
                                    .total_pressure_events
                            }
                            stat="Detected Across IPL Matches"
                        />

                        <SummaryCard
                            title="Most Common Pressure Event"
                            value={
                                executiveSummary
                                    .most_common_pressure_event
                                    .type
                            }
                            stat={
                                executiveSummary
                                    .most_common_pressure_event
                                    .count +
                                " Occurrences"
                            }
                        />

                    </div>
                )
            }

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
                            title="Pressure Responses Analyzed"
                            subtitle="Tactical responses detected after pressure situations"
                            value={metrics.total_decisions}
                            icon={<Trophy size={32} />}

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

                    </div>
                )
            }


            {/* ============================================= */}
            {/* Understanding The Metrics*/}
            {/* ============================================= */}


            <div
                className="
        mt-12
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
            mb-6
        "
                >
                    Understanding The Metrics
                </h2>

                <div className="space-y-4 text-green-100">

                    <p>
                        <strong>Pressure Response: </strong>
                        A tactical action identified after a pressure situation such as consecutive boundaries, batting collapse, powerplay wicket, or death-over acceleration.
                    </p>

                    <p>
                        <strong>Tactical Success Rate: </strong>
                        A response is considered successful if the next over either takes a wicket or concedes 6 runs or fewer.
                    </p>

                    <p>
                        <strong>Pressure Events: </strong>
                        Detected from real IPL ball-by-ball data and grouped into different pressure categories.
                    </p>

                </div>

            </div>


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
            {/* Key Insights */}
            {/* ============================================= */}

            <div
                className="
        mt-14
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
            mb-6
        "
                >
                    Key IPL Insights
                </h2>

                <div className="space-y-4 text-green-100">

                    <p>
                        • Pressure responses are generated whenever a tactical reaction follows a detected pressure event.
                    </p>

                    <p>
                        • Tactical success is determined by wicket-taking ability or run containment in the next over.
                    </p>

                    <p>
                        • Pressure events include consecutive boundaries, batting collapses, powerplay wickets and death-over acceleration.
                    </p>

                    <p>
                        • Aggression scores reflect how attacking or defensive a captain's tactical response was.
                    </p>

                </div>

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
                    title="IPL Pressure Event Breakdown"
                >

                    <p
                        className="
        text-green-100
        mb-6
    "
                    >
                        Frequency of pressure situations detected across all analyzed IPL matches.
                    </p>

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
                    title="Captain Tactical Responses"
                >

                    <p
                        className="
        text-green-100
        mb-6
    "
                    >
                        Shows how captains reacted after pressure situations were detected.
                    </p>

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

function CaptainStat({
    label,
    value
}) {

    return (

        <div
            className="
        flex
        justify-between
        items-center
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
          text-white
        "
            >

                {value}

            </span>

        </div>
    );
}

function SummaryCard({
    title,
    value,
    stat
}) {

    return (

        <motion.div

            whileHover={{
                scale: 1.03,
                y: -4
            }}

            className="
                bg-gradient-to-br
                from-[#0B2A1E]
                to-[#113D2C]
                border
                border-green-800
                rounded-3xl
                p-6
                shadow-2xl
            "
        >

            <p
                className="
                    text-green-200
                    text-sm
                "
            >
                {title}
            </p>

            <h2
                className="
                    mt-3
                    text-xl
                    font-black
                    text-yellow-400
                "
            >
                {value}
            </h2>

            <p
                className="
                    mt-3
                    text-green-300
                    text-sm
                "
            >
                {stat}
            </p>

        </motion.div>
    );
}


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