export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Supabase's current browser-safe key is the publishable key. The anon key is
// retained as a fallback for projects created before this naming change.
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
