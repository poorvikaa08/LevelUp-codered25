import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Code2,
  FileText,
  Monitor,
  Sparkles,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  BarChart,
  Building,
  Star,
  Shield,
  Terminal,
  Cpu,
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "AI Interview Simulation",
      description:
        "Experience realistic interview scenarios powered by advanced AI that adapts to your responses",
      features: [
        "Natural Language Processing",
        "Real-time Feedback",
        "Adaptive Difficulty",
      ],
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Analysis",
      description:
        "Get detailed insights into your performance with our advanced analytics engine",
      features: [
        "Performance Metrics",
        "Improvement Tracking",
        "Skill Analysis",
      ],
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Technical Training",
      description:
        "Master technical interviews with our comprehensive coding challenges and assessments",
      features: [
        "Live Coding Environment",
        "Algorithm Analysis",
        "System Design",
      ],
    },
  ];

  const stats = [
    {
      number: "98%",
      label: "Positive Feedback",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "25+",
      label: "Interviews",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "All",
      label: "Companies",
      icon: <Building className="w-6 h-6" />,
    },
    {
      number: "92%",
      label: "Faster Prep",
      icon: <BarChart className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen font-mono bg-[var(--Neutral-5)] text-[var(--gray-200)]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--Neutral-10)_1px,transparent_1px),linear-gradient(to_bottom,var(--Neutral-10)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] bg-[radial-gradient(circle_400px_at_0%_0%,var(--Blue-800)_10%,transparent_70%)] animate-[move-background_15s_linear_infinite]" />
          <div className="absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] bg-[radial-gradient(circle_400px_at_100%_0%,var(--Green-700)_10%,transparent_70%)] animate-[move-background_15s_linear_infinite]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="mb-6">
                <motion.span
                  className="bg-[var(--accent-blue-active-bg)] text-[var(--accent-blue)] text-sm font-mono px-4 py-2 rounded-full border border-[var(--border-stroke)]"
                  whileHover={{ scale: 1.05 }}
                >
                  AI-POWERED PLACEMENT PRACTICE
                </motion.span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-8 text-[var(--accent-blue-headers)] space-mono-bold">
                _Get-Me-Placed_
                <br />
              </h1>
              <p className="text-xl md:text-2xl text-[var(--gray-300)] mb-12 max-w-3xl mx-auto space-mono-regular">
                One Platform. Endless Possibilities. Be Job-Ready Anytime,
                Anywhere.
              </p>
              <div className="flex gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[var(--accent-blue-active-bg)] text-[var(--accent-blue)] px-8 py-4 rounded-2xl font-mono text-lg border border-[var(--border-stroke)] hover:bg-[var(--Neutral-15)] transition-all duration-300"
                >
                  Practice DSA_
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[var(--Neutral-10)] text-[var(--gray-300)] px-8 py-4 rounded-2xl font-mono text-lg border border-[var(--border-stroke)] hover:bg-[var(--Neutral-15)] transition-all duration-300"
                >
                  _Give interview
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[var(--Neutral-10)] p-8 rounded-2xl border border-[var(--border-stroke)]"
                >
                  <div className="text-[var(--accent-blue)] mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2 text-[var(--accent-blue-headers)] space-mono-bold">
                    {stat.number}
                  </div>
                  <p className="text-[var(--gray-300)] space-mono-regular">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-[var(--Neutral-10)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-[var(--accent-blue-headers)] space-mono-bold">
                Advanced Features
              </h2>
              <p className="text-[var(--gray-300)] text-xl max-w-2xl mx-auto space-mono-regular">
                Powered by cutting-edge AI technology
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[var(--Neutral-5)] p-8 rounded-2xl border border-[var(--border-stroke)] hover:border-[var(--accent-blue)] transition-all duration-300"
                >
                  <div className="text-[var(--accent-blue)] p-3 bg-[var(--accent-blue-active-bg)] rounded-xl w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-4 text-[var(--accent-blue-headers)] space-mono-bold">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--gray-300)] mb-6 space-mono-regular">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[var(--gray-300)] space-mono-regular"
                      >
                        <span className="text-[var(--accent-blue)]">{">"}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6 text-[var(--accent-blue-headers)] space-mono-bold">
                Ready To Level Up?_
              </h2>
              <p className="text-[var(--gray-300)] text-xl mb-8 space-mono-regular">
                Join successful candidates who have mastered their interview
                skills
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--accent-blue-active-bg)] text-[var(--accent-blue)] px-8 py-4 rounded-2xl font-mono text-lg border border-[var(--border-stroke)] hover:bg-[var(--Neutral-15)] transition-all duration-300"
              >
                Give Free Test _
              </motion.button>
              <p className="mt-4 text-[var(--gray-500)] space-mono-regular">
                No credit card required • Totally Free (for now atleast)
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes move-background {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-44px, -44px);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
