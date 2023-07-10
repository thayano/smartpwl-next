/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      reactStrictMode: true,
        RECAPTCHA_SITE_KEY: "6LdoGDclAAAAAH8XoTgZd4f0JyGhqJwsYBjxucLP",
        MAPS_KEY:"AIzaSyDMvPYuHLuEaJtDBZBqGyMsr45UtglskTU",
        API_URL: "https://smartowl.com.br/api",
        NEXTAUTH_URL:'https://smartowl.com.br/api'
      },
}

module.exports = nextConfig
