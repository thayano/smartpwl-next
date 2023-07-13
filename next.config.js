/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      reactStrictMode: true,
        RECAPTCHA_SITE_KEY: "6LdoGDclAAAAAH8XoTgZd4f0JyGhqJwsYBjxucLP",
        MAPS_KEY:"AIzaSyDMvPYuHLuEaJtDBZBqGyMsr45UtglskTU",
        API_URL: "https://smartowl.com.br/api",
        NEXT_CRYPTO:'eea38c6baa5adfcd69201dd688b71be4',
        // NEXTAUTH_SECRET:'your-secret-password'

      },
      experimental: {
        serverActions: true,
      },

}

module.exports = nextConfig
