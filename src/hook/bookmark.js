import { supabase } from '../utils/superbase';
import { ensureRestaurant } from './review';

export async function insertBookmark({ userId, placeId, placeName, content }) {
  ensureRestaurant({ placeId, placeName });

  const { data, error } = await supabase
    .from('bookmarks')
    .insert([
      {
        user_id: userId,
        place_id: placeId,
        place_name: placeName,
        content,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}
