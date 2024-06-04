# TikTik - A Short Video App

## Description

TikTik is a captivating short video application inspired by the widely popular TikTok. It empowers users to:

- <b>Create</b> engaging short videos and express their creativity.
- <b>Share</b> their videos with the world and connect with a vibrant community.
- <b>Discover</b> a boundless stream of exciting content based on their interests.

## Key Features

- <b>Seamless:</b> User Authentication: Effortlessly sign in using Google OAuth, ensuring a smooth and secure login experience.
- <b>Intuitive:</b> Video Uploads: Effortlessly upload your short video creations and share your moments with the world.
- <b>Engaging Interactions:</b> Like, comment, and share videos to engage with the community and foster connections.
- <b>Powerful Search:</b> Effortlessly search for specific videos and users based on video titles and usernames, making it easy to discover content you'll love.

## Technology Stack

- <b>Frontend:</b> React - The industry-standard library for building dynamic and interactive user interfaces.
- <b>Server-Side Rendering & Routing:</b> Next.js - Leverages React's capabilities while providing server-side rendering (SSR) and routing for enhanced performance and SEO.
- <b>Backend & Storage:</b> Sanity CMS - A powerful and flexible headless CMS that empowers you to manage your content with ease.
- <b>Third-Party Libraries:</b>
    - <code>react-google-login:</code> Simplifies Google OAuth integration for user authentication.
    - <code>react-icons:</code> Provides an extensive set of beautiful icons to enhance your UI.
    - <code>axios:</code> A popular HTTP client that makes API calls a breeze.
    - <code>uuidv4:</code> Generates unique identifiers for video management.
- <b>State Management:</b> Zustand - A lightweight and efficient state management solution for your Next.js application
 
  ## Getting Started

   1. <b>Clone the Repository:</b>
       
       ```bash
       git clone https://github.com/GamerQuanTuM/TikTik
       ```
  2. <b>Install Dependencies:</b>
       
       ```bash
        cd tiktik
        npm install
       ```
  3. <b>Configure Environment Variables: Create a .env.local file at the root of your project and add the following environment variables (replace with your actual values):</b>
       
        ```bash
        NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
        NEXT_PUBLIC_SANITY_DATASET=your-dataset
       ```
  4. <b>Run the Development Server:</b>

       ```bash
        npm run dev
       ```
  
