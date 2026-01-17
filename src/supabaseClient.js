import { createClient } from '@supabase/supabase-js'

// بيانات مشروعك الحقيقية
const supabaseUrl = 'https://fbpbxadohkekcqhaqmis.supabase.co'
const supabaseAnonKey = 'sb_publishable_oGlf8-KiMQ7CfhmtVwYpvA_-l6AWnrW' // بنستخدم الـ Publishable/Anon key هنا

export const supabase = createClient(supabaseUrl, supabaseAnonKey)