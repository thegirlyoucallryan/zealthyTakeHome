import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ogdqsskhywpcjgdaychu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZHFzc2toeXdwY2pnZGF5Y2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMzQ4ODMsImV4cCI6MjAxOTkxMDg4M30.uzczAs1OXNAhw14fDGiqLHnLy2NDCdS6MotoVzN60lk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
