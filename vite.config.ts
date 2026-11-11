import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "")
  // The linked Supabase integration is authoritative when VITE aliases point at a different project.
  const supabaseUrl = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || env.VITE_SUPABASE_URL
  const supabaseAnonKey = env.SUPABASE_ANON_KEY
    || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    || env.VITE_SUPABASE_ANON_KEY

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(supabaseAnonKey),
    },
    server: {
      host: "0.0.0.0",
    },
  }
})
