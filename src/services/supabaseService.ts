import { createClient } from '@supabase/supabase-js';
import { SubmissionData } from '../types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Stores user and weather data in Supabase
 * @param data The data to store
 * @returns The result of the database operation
 */
export const storeSubmissionData = async (data: SubmissionData) => {
  try {
    const { error } = await supabase
      .from('weather_reports')
      .insert([
        {
          full_name: data.name,
          email: data.email,
          city: data.city,
          email_valid: data.emailValid,
          temperature: data.temperature,
          condition: data.condition,
          api: data.aqi,
          created_at: data.timestamp
        }
      ]);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error storing data:', error);
    return { 
      success: false, 
      error: 'Failed to store data in the database.' 
    };
  }
};