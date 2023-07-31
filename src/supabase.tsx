import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vwtqojpmqrvrowwsrwci.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dHFvanBtcXJ2cm93d3Nyd2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0ODAxNjAsImV4cCI6MTk4NzA1NjE2MH0.Lu8Z0L9yxBYwWjoqKJxJsdL9GgMKaXDUVqa65Xun2Dc";

export const supabase = createClient(supabaseUrl, supabaseKey);