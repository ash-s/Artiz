"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { submitConsultation } from "@/lib/api";
import { useStore } from "@/context/StoreContext";
import confetti from "canvas-confetti";
import { Check, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export default function ConsultationWizard() {
  const { consultationPreselect } = useStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    roomType: "Living Room",
    preferredStyle: "Japandi Serenity",
    budgetRange: "₹2.5 Lakh – ₹5 Lakh",
    projectNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (consultationPreselect) {
      setFormData((prev) => ({
        ...prev,
        projectNotes: `Inquiring about curated room look: ${consultationPreselect}`,
      }));
    }
  }, [consultationPreselect]);

  const handleStyleSelect = (style: string) => {
    setFormData({ ...formData, preferredStyle: style });
  };

  const handleBudgetSelect = (budget: string) => {
    setFormData({ ...formData, budgetRange: budget });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.email) {
      alert("Please provide your name and email.");
      return;
    }

    setIsSubmitting(true);
    await submitConsultation(formData);
    setIsSubmitting(false);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#B89467", "#FAF8F5", "#2B231D"],
      });
    } catch (e) {}
  };

  return (
    <section id="consultation-wizard" className="bg-japandi-dark text-japandi-bg py-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-bold tracking-luxury text-japandi-brass uppercase block mb-1">
            Bespoke Architectural Studio
          </span>
          <h2 className="font-display-luxury text-4xl sm:text-5xl font-normal text-white">
            Interior Design Consultation Wizard
          </h2>
          <p className="text-xs sm:text-sm text-[#BFB5A8] max-w-lg mx-auto font-sans leading-relaxed">
            Complete 4 quick steps to receive a customized virtual 3D room concept, material moodboard, and turnaround estimate.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[#362D26] rounded-2xl border border-[#4D4036] p-6 sm:p-10 shadow-2xl">
          
          {/* Progress Tracker */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#4D4036] text-xs">
            {[
              { num: 1, label: "Target Space" },
              { num: 2, label: "Aesthetic" },
              { num: 3, label: "Scope & Budget" },
              { num: 4, label: "Confirmation" },
            ].map((s, idx) => {
              const isCurrent = step === s.num;
              const isCompleted = step > s.num;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs transition-colors ${
                        isCurrent || isCompleted
                          ? "bg-japandi-brass text-japandi-dark"
                          : "bg-[#4D4036] text-[#A69C90]"
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </span>
                    <span className={`hidden sm:inline ${isCurrent ? "font-semibold text-white tracking-wide" : "text-[#A69C90]"}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && <div className="w-8 sm:w-16 h-px bg-[#4D4036]" />}
                </React.Fragment>
              );
            })}
          </div>

          {/* STEP 1: Select Space */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-display-luxury text-2xl font-normal text-[#EDE8DF]">
                What space are you looking to design or furnish?
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: "Living Room", icon: "🛋️" },
                  { name: "Master Bedroom", icon: "🛏️" },
                  { name: "Modular Kitchen", icon: "🍳" },
                  { name: "Home Workspace", icon: "💻" },
                  { name: "Dining Space", icon: "🍷" },
                  { name: "Entire Residence", icon: "🏛️" },
                ].map((item) => {
                  const isSelected = formData.roomType === item.name;
                  return (
                    <div
                      key={item.name}
                      onClick={() => setFormData({ ...formData, roomType: item.name })}
                      className={`cursor-pointer border p-4 rounded-xl flex flex-col items-center text-center transition-all ${
                        isSelected
                          ? "border-japandi-brass bg-[#2E251F] ring-1 ring-japandi-brass"
                          : "border-[#4D4036] bg-[#2E251F]/60 hover:border-[#6B5A4D]"
                      }`}
                    >
                      <span className="text-2xl mb-2">{item.icon}</span>
                      <span className="text-xs font-semibold text-[#EDE8DF]">{item.name}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-japandi-brass text-japandi-dark text-xs font-bold hover:bg-japandi-brassHover transition-colors tracking-wide"
                >
                  Continue to Step 2
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Aesthetic */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-display-luxury text-2xl font-normal text-[#EDE8DF]">
                Select your preferred interior design aesthetic:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Japandi Serenity",
                    desc: "Warm white oak, natural woven textures, quiet Japanese simplicity.",
                    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    title: "Italian Modern Luxury",
                    desc: "Smoked dark timber, architectural linear lighting, travertine stone accents.",
                    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80",
                  },
                  {
                    title: "Organic Earthy Studio",
                    desc: "Hand-caned rattan, warm terracotta pigments, and botanical warmth.",
                    img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=400&q=80",
                  },
                ].map((style) => {
                  const isSelected = formData.preferredStyle === style.title;
                  return (
                    <div
                      key={style.title}
                      onClick={() => handleStyleSelect(style.title)}
                      className={`cursor-pointer border p-4 rounded-xl space-y-2.5 transition-all ${
                        isSelected
                          ? "border-japandi-brass bg-[#2E251F] ring-1 ring-japandi-brass"
                          : "border-[#4D4036] bg-[#2E251F]/60 hover:border-[#6B5A4D]"
                      }`}
                    >
                      <div className="relative h-28 rounded-lg overflow-hidden">
                        <Image src={style.img} alt={style.title} fill className="object-cover" />
                      </div>
                      <span className="block font-display-luxury text-base font-normal text-[#EDE8DF]">{style.title}</span>
                      <span className="block text-[11px] text-[#A69C90] leading-tight">{style.desc}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[#4D4036] text-[#EDE8DF] text-xs font-semibold hover:bg-[#2E251F]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-japandi-brass text-japandi-dark text-xs font-bold hover:bg-japandi-brassHover"
                >
                  Continue to Step 3
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Scope & Budget in Rupees */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-display-luxury text-2xl font-normal text-[#EDE8DF]">
                What is your estimated furniture &amp; design budget?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { range: "₹2.5 Lakh – ₹5 Lakh", desc: "Curated key furniture pieces & decorative lighting plan." },
                  { range: "₹5 Lakh – ₹15 Lakh", desc: "Full room transformation with custom millwork & 3D styling." },
                  { range: "₹15 Lakh+", desc: "Multi-room architectural renovation & bespoke heirloom joinery." },
                ].map((b) => {
                  const isSelected = formData.budgetRange === b.range;
                  return (
                    <div
                      key={b.range}
                      onClick={() => handleBudgetSelect(b.range)}
                      className={`cursor-pointer border p-4 rounded-xl flex flex-col transition-all ${
                        isSelected
                          ? "border-japandi-brass bg-[#2E251F] ring-1 ring-japandi-brass"
                          : "border-[#4D4036] bg-[#2E251F]/60 hover:border-[#6B5A4D]"
                      }`}
                    >
                      <span className="font-display-luxury text-lg font-normal text-[#EDE8DF]">{b.range}</span>
                      <span className="text-[11px] text-[#A69C90] mt-1 leading-relaxed">{b.desc}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs text-[#EDE8DF] font-medium block">
                  Project Notes or Room Dimensions (Optional):
                </label>
                <textarea
                  rows={2}
                  value={formData.projectNotes}
                  onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                  placeholder="e.g. 5m x 4m room with north light, need kid-friendly bouclé fabric..."
                  className="w-full bg-[#2E251F] border border-[#4D4036] rounded-xl p-3 text-xs text-[#EDE8DF] focus:outline-none focus:border-japandi-brass"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[#4D4036] text-[#EDE8DF] text-xs font-semibold hover:bg-[#2E251F]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-japandi-brass text-japandi-dark text-xs font-bold hover:bg-japandi-brassHover"
                >
                  Generate Estimate
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Estimate & Submission */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              {!isSuccess ? (
                <>
                  <div className="bg-[#2E251F] border border-[#4D4036] rounded-xl p-6 text-center space-y-3">
                    <span className="w-10 h-10 rounded-full bg-japandi-brass/20 text-japandi-brass inline-flex items-center justify-center text-lg font-bold">
                      ✓
                    </span>
                    <h4 className="font-display-luxury text-3xl font-normal text-[#EDE8DF]">Project Scope Estimate</h4>
                    
                    <div className="grid grid-cols-3 gap-3 text-left py-4 border-y border-[#4D4036] text-xs">
                      <div>
                        <span className="block text-[9px] uppercase tracking-luxury text-[#A69C90]">Selected Space</span>
                        <span className="font-bold text-[#EDE8DF]">{formData.roomType}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-luxury text-[#A69C90]">Design Vibe</span>
                        <span className="font-bold text-[#EDE8DF]">{formData.preferredStyle}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-luxury text-[#A69C90]">Turnaround</span>
                        <span className="font-bold text-japandi-brass">3 – 5 Weeks</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#EDE8DF] block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          placeholder="e.g. Sasidharan"
                          className="w-full bg-[#2E251F] border border-[#4D4036] rounded-lg p-2.5 text-xs text-[#EDE8DF] focus:outline-none focus:border-japandi-brass"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#EDE8DF] block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@example.com"
                          className="w-full bg-[#2E251F] border border-[#4D4036] rounded-lg p-2.5 text-xs text-[#EDE8DF] focus:outline-none focus:border-japandi-brass"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-5 py-2.5 rounded-lg border border-[#4D4036] text-[#EDE8DF] text-xs font-semibold hover:bg-[#2E251F]"
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3 px-8 rounded-lg bg-japandi-brass text-japandi-dark text-xs font-bold hover:bg-japandi-brassHover transition-colors shadow-lg disabled:opacity-50 tracking-wide"
                      >
                        {isSubmitting ? "Transmitting to Studio API..." : "Confirm & Book Complimentary Consultation"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-japandi-brass text-japandi-dark flex items-center justify-center text-2xl mx-auto shadow-lg">
                    ✓
                  </div>
                  <h3 className="font-display-luxury text-4xl font-normal text-white">Consultation Booked!</h3>
                  <p className="text-xs text-[#BFB5A8] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.customerName}</strong>. Our interior design studio has received your inquiry for the <strong>{formData.roomType}</strong>. Our architect will email your custom 3D moodboard concept within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setStep(1);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-lg border border-japandi-brass text-japandi-brass text-xs font-semibold hover:bg-japandi-brass hover:text-japandi-dark transition-colors tracking-wide"
                  >
                    Submit Another Room Inquiry
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
