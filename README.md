# Weather Automation System

A beautiful and modern weather application that provides real-time weather updates, air quality information, and email notifications.

## Features

- Real-time weather data fetching
- Air Quality Index (AQI) monitoring
- Email notifications with weather summaries
- Beautiful, responsive UI with animations
- Form validation and error handling
- Process status tracking
- Data persistence with Supabase

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your API keys:
   ```
   VITE_WEATHER_API_KEY=your_weather_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## How to Use

1. Enter your information in the form:
   - Full Name
   - Email Address
   - City

2. Click "Get Weather Updates" to start the process:
   - Email validation
   - Weather data fetching
   - Database storage
   - Email notification

3. View your weather summary and process status in real-time

4. Click "Start Over" to begin a new request

## Tech Stack

- React
- Vite
- Tailwind CSS
- WeatherAPI.com
- Supabase
- React Hot Toast
- Lucide React Icons

## Project Structure

```
src/
├── components/         # React components
├── services/          # API and service functions
├── utils/             # Utility functions
└── App.jsx            # Main application component
```

## Environment Variables

- `VITE_WEATHER_API_KEY`: Your WeatherAPI.com API key
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Database Schema

The application uses Supabase with the following schema:

```sql
create table weather_reports (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Required',
  email text default 'Required',
  city text default 'Required',
  email_valid boolean,
  temperature double precision,
  condition text default 'Required',
  api double precision,
  created_at timestamptz default now()
);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request#   W e a t h e r - A p p  
 