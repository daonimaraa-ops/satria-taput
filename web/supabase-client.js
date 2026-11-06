/* SATRIA TAPUT — SUPABASE CLIENT */
(function () {
  "use strict";

  const SUPABASE_URL =
    "https://cgtyqihpldwctpezazdt.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_kE9Mcl_0TgO0-utqn2Hg_HJtfLMV2";

  if (!window.supabase || !window.supabase.createClient) {
    console.error("Supabase SDK belum dimuat.");
    return;
  }

  if (window.satriaSupabase) {
    console.info("Supabase SATRIA TAPUT sudah terhubung.");
    return;
  }

  window.satriaSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

  console.info("SATRIA TAPUT: Supabase client siap.");
})();
