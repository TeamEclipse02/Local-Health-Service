import { createClient } from '@supabase/supabase-js';

// Ve a tu panel de Supabase (el de la pestaña verde del navegador) y copia tus datos:
const supabaseUrl = 'https://ajokwbvxdesbpoxlzguv.supabase.co'; // Este ID lo saqué de tu URL de la captura anterior
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqb2t3YnZ4ZGVzYnBveGx6Z3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDMzMzUsImV4cCI6MjA5NzExOTMzNX0.rG_TnKYDuypyQP8FITmzKXLw35Iw9EtU1JjvTOSDvdk'; // Búscala en Project Settings > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);