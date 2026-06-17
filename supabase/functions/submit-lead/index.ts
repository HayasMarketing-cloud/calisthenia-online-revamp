import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface LeadPayload {
  name?: string;
  age?: number | string;
  goal?: string;
  phone?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as LeadPayload;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const goal = typeof body.goal === "string" ? body.goal.trim() : "";
    const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
    const ageNum = typeof body.age === "number" ? body.age : parseInt(String(body.age ?? ""), 10);

    // Strict server-side validation
    if (!name || name.length < 2 || name.length > 100) {
      return json({ error: "Nombre no válido" }, 400);
    }
    if (!goal || goal.length < 2 || goal.length > 500) {
      return json({ error: "Objetivo no válido" }, 400);
    }
    if (!Number.isFinite(ageNum) || ageNum < 10 || ageNum > 100) {
      return json({ error: "Edad no válida" }, 400);
    }
    // Phone: allow digits, spaces, +, -, parentheses; 6-20 chars after stripping
    const phoneClean = phoneRaw.replace(/[\s\-()]/g, "");
    if (!/^\+?\d{6,20}$/.test(phoneClean)) {
      return json({ error: "Teléfono no válido" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    // Basic anti-spam: reject if same phone submitted in last 5 minutes
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recent } = await supabase
      .from("leads")
      .select("id")
      .eq("phone", phoneClean)
      .gte("created_at", fiveMinAgo)
      .limit(1);
    if (recent && recent.length > 0) {
      return json({ ok: true, duplicate: true });
    }

    const { error } = await supabase.from("leads").insert({
      name: name.slice(0, 100),
      age: ageNum,
      goal: goal.slice(0, 500),
      phone: phoneClean.slice(0, 20),
    });

    if (error) {
      console.error("Insert error:", error);
      return json({ error: "No se pudo guardar" }, 500);
    }

    return json({ ok: true });
  } catch (e) {
    console.error("submit-lead error:", e);
    return json({ error: "Solicitud inválida" }, 400);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
