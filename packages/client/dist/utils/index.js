export const server = process.env.NODE_ENV === "production"
    ? "https://speedlog.io/api"
    : "http://localhost:8080/api";
