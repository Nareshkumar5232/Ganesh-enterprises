"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const STATS = [
  { value: 100,   suffix: "+",  label: "Trusted Brands",     desc: "Authorised distributor" },
  { value: 5000,  suffix: "+",  label: "Products",            desc: "Across all categories" },
  { value: 1000,  suffix: "+",  label: "Business Clients",    desc: "Retailers & institutions" },
  { value: 10,    suffix: "+",  label: "Years Experience",    desc: "Serving Chennai" },
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
    <span className="text-4xl font-bold text-[#0F172A] dark:text-white tabular-nums">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section className="section-gray">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16" ref={ref}>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white mb-2">
            Why Businesses Choose <span className="text-[#2563EB]">Sri Ganesh Enterprises</span>
          </h2>
          <p className="text-[#64748B] text-sm max-w-lg mx-auto">
            Trusted by retailers, institutions and enterprises across Tamil Nadu for reliable supply of genuine technology products.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="enterprise-card p-6 text-center"
            >
              <Counter value={s.value} suffix={s.suffix} active={visible} />
              <p className="text-[#0F172A] dark:text-white font-semibold text-sm mt-1">{s.label}</p>
              <p className="text-[#64748B] text-xs mt-0.5">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
