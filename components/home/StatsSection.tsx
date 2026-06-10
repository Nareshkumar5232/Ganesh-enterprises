"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ShieldCheck, Package, Users, Award } from "lucide-react";

const STATS = [
  { 
    value: 100, 
    suffix: "+", 
    label: "Trusted Brands", 
    desc: "Authorised distributor",
    icon: ShieldCheck,
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-500 dark:text-blue-400",
    borderColor: "hover:border-blue-500/50 hover:shadow-blue-500/10"
  },
  { 
    value: 5000, 
    suffix: "+", 
    label: "Products", 
    desc: "Across all categories",
    icon: Package,
    color: "from-red-500/20 to-transparent",
    iconColor: "text-red-600 dark:text-red-400",
    borderColor: "hover:border-red-500/50 hover:shadow-red-500/10"
  },
  { 
    value: 1000, 
    suffix: "+", 
    label: "Business Clients", 
    desc: "Retailers & institutions",
    icon: Users,
    color: "from-amber-500/20 to-transparent",
    iconColor: "text-amber-500 dark:text-amber-400",
    borderColor: "hover:border-amber-500/50 hover:shadow-amber-500/10"
  },
  { 
    value: 10, 
    suffix: "+", 
    label: "Years Experience", 
    desc: "Serving Chennai",
    icon: Award,
    color: "from-indigo-500/20 to-transparent",
    iconColor: "text-indigo-500 dark:text-indigo-400",
    borderColor: "hover:border-indigo-500/50 hover:shadow-indigo-500/10"
  },
];

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const steps = 60, duration = 1800;
    const inc = value / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(t);
  }, [active, value]);
  return (
    <span className="text-4xl font-extrabold text-[#0F172A] dark:text-white tabular-nums tracking-tight">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section className="section-gray">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16" ref={ref}>
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white mb-3 tracking-tight">
            Why Businesses Choose <span className="text-[#2563EB]">Sri Ganesh Enterprises</span>
          </h2>
          <p className="text-[#64748B] text-sm max-w-lg mx-auto leading-relaxed">
            Trusted by retailers, institutions and enterprises across Tamil Nadu for reliable supply of genuine technology products.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative overflow-hidden p-6 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${s.borderColor} group`}
            >
              {/* Decorative gradient blob background */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br ${s.color} blur-xl opacity-40 transition-opacity duration-300 group-hover:opacity-80`} />
              
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 ${s.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  <s.icon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="flex items-baseline gap-0.5">
                <Counter value={s.value} suffix={s.suffix} active={visible} />
              </div>
              
              <p className="text-[#0F172A] dark:text-white font-bold text-sm mt-3">{s.label}</p>
              <p className="text-[#64748B] text-xs mt-1 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
