// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qybsnspujkgoulssvrvh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5YnNuc3B1amtnb3Vsc3N2cnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzM5MjAsImV4cCI6MjA2OTkwOTkyMH0.1ITJyQYpHhDy5Vwc5zmYo5x-fArn8Hx_Jktpknwg3lw'
export const supabase = createClient(supabaseUrl, supabaseKey)