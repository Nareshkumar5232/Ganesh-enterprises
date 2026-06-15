"use client";

import { useState, useEffect, useCallback } from "react";

type StockStatus = "IN STOCK" | "AVAILABLE" | "READY FOR DISPATCH" | "LIMITED";

interface InventoryItem {
  id: string;
  product: string;
  model: string;
  category: string;
  status: StockStatus;
  qty: string;
  lastUpdate: string;
}

const BASE_INVENTORY: InventoryItem[] = [
  { id: "1", product: "Samsung Neo QLED TV", model: "QN85C", category: "TV", status: "IN STOCK", qty: "42 units", lastUpdate: "09:15" },
  { id: "2", product: "Dell Latitude 5540", model: "i5-1335U", category: "Laptop", status: "AVAILABLE", qty: "28 units", lastUpdate: "09:22" },
  { id: "3", product: "HP LaserJet Pro M404", model: "W1A52A", category: "Printer", status: "READY FOR DISPATCH", qty: "15 units", lastUpdate: "09:31" },
  { id: "4", product: "Hikvision CCTV Kit", model: "DS-7108", category: "Security", status: "IN STOCK", qty: "60 kits", lastUpdate: "09:40" },
  { id: "5", product: "Cisco Catalyst Switch", model: "WS-C2960", category: "Networking", status: "AVAILABLE", qty: "22 units", lastUpdate: "09:45" },
  { id: "6", product: "Samsung Galaxy S24", model: "SM-S921B", category: "Mobile", status: "IN STOCK", qty: "35 units", lastUpdate: "09:50" },
  { id: "7", product: "LG OLED 65\" C3", model: "OLED65C3", category: "TV", status: "LIMITED", qty: "8 units", lastUpdate: "09:55" },
  { id: "8", product: "Lenovo ThinkPad X1", model: "Carbon Gen11", category: "Laptop", status: "AVAILABLE", qty: "12 units", lastUpdate: "10:02" },
  { id: "9", product: "TP-Link WiFi 6 Router", model: "Archer AX73", category: "Networking", status: "IN STOCK", qty: "50 units", lastUpdate: "10:10" },
  { id: "10", product: "Daikin 1.5T Split AC", model: "FTKF35TV", category: "Appliance", status: "READY FOR DISPATCH", qty: "18 units", lastUpdate: "10:15" },
  { id: "11", product: "CP Plus Turret Cam", model: "CP-UNC-TA21L3", category: "Security", status: "IN STOCK", qty: "80 units", lastUpdate: "10:20" },
  { id: "12", product: "Apple iPhone 15 Pro", model: "A17 Pro", category: "Mobile", status: "LIMITED", qty: "6 units", lastUpdate: "10:28" },
  { id: "13", product: "Sony Bravia XR 55\"", model: "XR-55A80L", category: "TV", status: "AVAILABLE", qty: "14 units", lastUpdate: "10:35" },
  { id: "14", product: "HP EliteBook 840 G10", model: "i7-1355U", category: "Laptop", status: "IN STOCK", qty: "30 units", lastUpdate: "10:40" },
  { id: "15", product: "Samsung Refrigerator", model: "RT65K7058BS", category: "Appliance", status: "AVAILABLE", qty: "10 units", lastUpdate: "10:45" },
  { id: "16", product: "D-Link 24-Port Switch", model: "DGS-1024D", category: "Networking", status: "IN STOCK", qty: "45 units", lastUpdate: "10:50" },
];

const STATUS_CONFIG: Record<StockStatus, { color: string; bg: string; dot: string }> = {
  "IN STOCK":          { color: "#15803D", bg: "rgba(21,128,61,0.1)",   dot: "#22C55E" },
  "AVAILABLE":         { color: "#B45309", bg: "rgba(180,83,9,0.1)",    dot: "#F59E0B" },
  "READY FOR DISPATCH":{ color: "#1D4ED8", bg: "rgba(29,78,216,0.08)",  dot: "#60A5FA" },
  "LIMITED":           { color: "#DC2626", bg: "rgba(220,38,38,0.08)",  dot: "#F87171" },
};

function formatTime(): string {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function LiveInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(BASE_INVENTORY);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(formatTime());

  const triggerUpdate = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * BASE_INVENTORY.length);
    const statuses: StockStatus[] = ["IN STOCK", "AVAILABLE", "READY FOR DISPATCH", "LIMITED"];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const id = BASE_INVENTORY[randomIdx].id;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, lastUpdate: formatTime() }
          : item
      )
    );
    setFlashId(id);
    setTimeout(() => setFlashId(null), 1200);
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(triggerUpdate, 2800);
    const clockInterval = setInterval(() => setCurrentTime(formatTime()), 30000);
    return () => {
      clearInterval(updateInterval);
      clearInterval(clockInterval);
    };
  }, [triggerUpdate]);

  return (
    <section className="section-light py-20" aria-label="Live inventory board">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-2">
              ━━ Live Stock Board ━━
            </p>
            <h2 className="text-3xl font-black text-[#111827]">
              Real-Time Inventory
            </h2>
            <p className="text-[#6B7280] text-sm mt-1">
              Live availability from our Chennai warehouse
            </p>
          </div>

          {/* Terminal clock */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-mono text-sm"
            style={{ background: "#111827", border: "1px solid #1F2937" }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 badge-pulse" />
              <span className="text-green-400 font-bold text-xs">LIVE</span>
            </span>
            <span className="text-[#D4AF37] font-bold">{currentTime}</span>
            <span className="text-[#4B5563] text-xs">IST · Chennai WH</span>
          </div>
        </div>

        {/* Stock board */}
        <div
          className="rounded-xl overflow-hidden scan-overlay relative"
          style={{ background: "#111827", border: "1px solid #1F2937" }}
        >
          {/* Board header */}
          <div
            className="grid font-mono text-[11px] font-bold uppercase tracking-widest py-3 px-6"
            style={{
              gridTemplateColumns: "2fr 1.2fr 0.8fr 1.2fr 0.8fr 0.8fr",
              background: "#0F172A",
              borderBottom: "1px solid #1F2937",
              color: "#D4AF37",
            }}
          >
            <span>Product</span>
            <span>Model</span>
            <span>Category</span>
            <span>Status</span>
            <span>Qty</span>
            <span className="text-right">Updated</span>
          </div>

          {/* Rows */}
          {inventory.map((item) => {
            const cfg = STATUS_CONFIG[item.status];
            const isFlashing = flashId === item.id;
            return (
              <div
                key={item.id}
                className="grid items-center py-3.5 px-6 border-b font-mono text-[12px] transition-colors"
                style={{
                  gridTemplateColumns: "2fr 1.2fr 0.8fr 1.2fr 0.8fr 0.8fr",
                  borderColor: "#1F2937",
                  background: isFlashing
                    ? "rgba(212,175,55,0.06)"
                    : "transparent",
                  transition: "background 0.3s ease",
                }}
              >
                <span
                  className="font-bold text-[13px] truncate pr-4"
                  style={{ color: isFlashing ? "#D4AF37" : "#F3F4F6" }}
                >
                  {item.product}
                </span>
                <span className="text-[#6B7280] text-[11px] truncate pr-2">
                  {item.model}
                </span>
                <span className="text-[#4B5563] text-[11px] uppercase tracking-wider">
                  {item.category}
                </span>
                <span>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: cfg.dot,
                        animation: isFlashing ? "badge-pulse 0.8s ease infinite" : undefined,
                      }}
                    />
                    {item.status}
                  </span>
                </span>
                <span className="text-[#9CA3AF] text-[11px]">{item.qty}</span>
                <span
                  className="text-right text-[11px]"
                  style={{ color: isFlashing ? "#D4AF37" : "#4B5563" }}
                >
                  {item.lastUpdate}
                </span>
              </div>
            );
          })}

          {/* Board footer */}
          <div
            className="flex items-center justify-between px-6 py-3 font-mono text-[11px]"
            style={{ background: "#0F172A", borderTop: "1px solid #1F2937" }}
          >
            <span className="text-[#4B5563]">
              Showing {inventory.length} of 5000+ products
            </span>
            <span className="text-[#6B7280]">
              Auto-updating every few seconds · Live from warehouse
            </span>
            <a
              href="/products"
              className="text-[#D4AF37] font-bold hover:text-[#F5E07A] transition-colors uppercase tracking-wider"
            >
              View Full Catalog →
            </a>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mt-5 justify-center sm:justify-start">
          {(Object.entries(STATUS_CONFIG) as [StockStatus, typeof STATUS_CONFIG[StockStatus]][]).map(([status, cfg]) => (
            <div key={status} className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
              <span style={{ color: cfg.color }}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
