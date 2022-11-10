export const server = process.env.NODE_ENV === "production"
    ? "https://api.nexys.app"
    : "http://localhost:80";
