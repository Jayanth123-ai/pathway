"use client";

import { useState } from "react";

declare global { interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void }; } }

async function loadCheckout() {
  if (window.Razorpay) return true;
  return new Promise<boolean>((resolve) => { const script = document.createElement("script"); script.src = "https://checkout.razorpay.com/v1/checkout.js"; script.onload = () => resolve(true); script.onerror = () => resolve(false); document.body.appendChild(script); });
}

export function SubscribeButton({ plan }: { plan: "momentum" | "premium" }) {
  const [coupon, setCoupon] = useState(""); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  const subscribe = async () => { setLoading(true); setMessage(""); try { const response = await fetch("/api/payments/razorpay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, coupon }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error);
      if (!(await loadCheckout()) || !window.Razorpay) throw new Error("Could not load Razorpay Checkout.");
      new window.Razorpay({ key: data.razorpayKey, subscription_id: data.subscriptionId, name: "PATHWAY", description: `${plan} plan`, theme: { color: "#173d31" }, handler: async (payment: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string }) => { const verify = await fetch("/api/payments/razorpay/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payment) }); if (!verify.ok) setMessage("Payment verification failed. Please contact support."); else setMessage("Payment verified. Your PATHWAY plan is active!"); } }).open();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not start checkout."); } finally { setLoading(false); } };
  return <div className="subscribe"><label>Promo code (optional)<input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Enter code" /></label><button className="button" onClick={subscribe} disabled={loading}>{loading ? "Opening checkout…" : `Choose ${plan}`}</button>{message && <p>{message}</p>}</div>;
}
