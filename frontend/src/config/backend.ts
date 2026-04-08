// Backend configuration — toggle between Supabase (Lovable Cloud) and Spring Boot
// Set USE_SPRING_BOOT to true when your external Spring Boot server is ready

export const USE_SPRING_BOOT = import.meta.env.VITE_USE_SPRING_BOOT === "true";

export const SPRING_API_BASE_URL =
  import.meta.env.VITE_SPRING_API_URL || "http://localhost:8085";

// When USE_SPRING_BOOT is true:
//   - Auth goes through Spring Boot JWT (/api/auth/*)
//   - Problems, progress, profiles use Spring Boot REST endpoints
//   - Code validation uses Spring Boot endpoint
// When false:
//   - Everything uses Lovable Cloud (Supabase) as before
