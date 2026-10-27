import { supabase } from '../utils/superbase';

async function ensureRestaurant(placeId) {
  const { error } = await supabase
    .from('restaurants')
    .upsert({ id: placeId }, { onConflict: 'id', ignoreDuplicates: true });

  if (error) throw error;
}

export async function insertMyReview(review) {
  await ensureRestaurant(review.storeId);

  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        place_id: review.storeId,
        rating: review.rating,
        good_points: review.tags.join(','),
        content: review.content,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}
