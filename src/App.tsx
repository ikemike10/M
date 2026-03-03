import React, { useState, useEffect } from 'react';
import { Calculator, Beaker, Pipette, Info, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [saltWeight, setSaltWeight] = useState<string>('');
  const [targetPercent, setTargetPercent] = useState<string>('');
  const [dyeWeight, setDyeWeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const s = parseFloat(saltWeight);
    const p = parseFloat(targetPercent);
    const d = parseFloat(dyeWeight);

    if (!isNaN(s) && !isNaN(p) && !isNaN(d) && p !== 0) {
      // Formula: (芒硝重量 / (目標芒硝% / 100)) - 染料重量
      const x = (s / (p / 100)) - d;
      setResult(x);
    } else {
      setResult(null);
    }
  }, [saltWeight, targetPercent, dyeWeight]);

  const handleReset = () => {
    setSaltWeight('');
    setTargetPercent('');
    setDyeWeight('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans selection:bg-[#5A5A40] selection:text-white p-4 md:p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-xl shadow-black/5 overflow-hidden border border-black/5"
      >
        {/* Header */}
        <div className="bg-[#5A5A40] p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Beaker className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-medium tracking-tight">染色配方計算器</h1>
          </div>
          <p className="text-white/70 text-sm font-light">專業染色工藝精確計算工具</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Salt Weight */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#5A5A40]/70 ml-1">
                <Pipette className="w-3 h-3" />
                芒硝重量 (g)
              </label>
              <input
                type="number"
                value={saltWeight}
                onChange={(e) => setSaltWeight(e.target.value)}
                placeholder="請輸入重量"
                className="w-full bg-[#F5F5F0] border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none placeholder:text-black/20"
              />
            </div>

            {/* Target Percent */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#5A5A40]/70 ml-1">
                <Info className="w-3 h-3" />
                目標芒硝百分比 (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={targetPercent}
                  onChange={(e) => setTargetPercent(e.target.value)}
                  placeholder="例如: 5"
                  className="w-full bg-[#F5F5F0] border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none placeholder:text-black/20 pr-12"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 font-medium">%</span>
              </div>
            </div>

            {/* Dye Weight */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#5A5A40]/70 ml-1">
                <Calculator className="w-3 h-3" />
                染料重量 (g)
              </label>
              <input
                type="number"
                value={dyeWeight}
                onChange={(e) => setDyeWeight(e.target.value)}
                placeholder="請輸入重量"
                className="w-full bg-[#F5F5F0] border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none placeholder:text-black/20"
              />
            </div>
          </div>

          {/* Result Area */}
          <AnimatePresence mode="wait">
            {result !== null ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#5A5A40]/5 border border-[#5A5A40]/10 rounded-2xl p-6 text-center"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5A5A40]/60 mb-1">計算結果 X</p>
                <p className="text-4xl font-serif font-semibold text-[#5A5A40]">
                  {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </p>
                <p className="text-[10px] text-[#5A5A40]/40 mt-2 italic">
                  公式: (芒硝重量 / 目標%) - 染料重量
                </p>
              </motion.div>
            ) : (
              <div className="h-[116px] flex items-center justify-center border border-dashed border-black/10 rounded-2xl">
                <p className="text-sm text-black/30 font-light italic">請輸入完整數據以開始計算</p>
              </div>
            )}
          </AnimatePresence>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-4 text-sm font-medium text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white rounded-2xl transition-all duration-300 border border-[#5A5A40]/20"
          >
            <RefreshCw className="w-4 h-4" />
            重置計算
          </button>
        </div>

        {/* Footer Info */}
        <div className="px-8 pb-8 pt-0">
          <div className="p-4 bg-black/5 rounded-xl flex gap-3 items-start">
            <Info className="w-4 h-4 text-black/40 mt-0.5 shrink-0" />
            <p className="text-[11px] leading-relaxed text-black/50">
              此工具專為染色工藝設計。請確保輸入的單位一致（通常為克）。目標百分比請輸入數值（如 5% 請輸入 5）。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
