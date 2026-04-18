// ─── Supabase Client ──────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://breyjyhqrfsorofeixvr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZXlqeWhxcmZzb3JvZmVpeHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTQzMTYsImV4cCI6MjA5MTg3MDMxNn0.ZyFc1YcJ1abQNZC2P-yMbuWtqvO31Xj0BoVjDEG5BCI';

const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// Redirect to login if not authenticated (call on protected pages)
async function requireAuth() {
  const { data: { session } } = await db.auth.getSession();
  if (!session) window.location.href = 'login.html';
  return session;
}

// Format BRL currency
function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Format USD currency
function formatUSD(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
