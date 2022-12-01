/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['wallpapercave.com','lh3.googleusercontent.com','imagevars.gulfnews.com']
  }
}

module.exports = nextConfig
