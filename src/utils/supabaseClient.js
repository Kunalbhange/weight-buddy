import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yguremfshazxizbwsmfk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jyV4ihVkx4TdhmFQk6WeJg_UB-Xhr0d';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
