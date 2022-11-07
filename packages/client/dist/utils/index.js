export const server = process.env.NODE_ENV === "production"
    ? "https://nexys.app/api"
    : "http://localhost:8080/api";
