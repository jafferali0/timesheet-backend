import dotenv from "dotenv";
dotenv.config();

import { createClient } from '@supabase/supabase-js';


const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAOAL = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

const supabase = createClient(supabaseURL, supabaseAOAL);

export default supabase;
