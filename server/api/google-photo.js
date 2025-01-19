// api/google-photo.js
import { defineEventHandler, getQuery, createError, setHeader } from 'h3';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default defineEventHandler(async (event) => {
  const { photo_url } = getQuery(event);

  if (!photo_url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The "photo_url" query parameter is required.',
    });
  }

  try {
    console.log('[Google Photo Proxy] Fetching photo from:', photo_url);

    const response = await fetch(photo_url);

    if (!response.ok) {
      console.error(`[Google Photo Proxy] Failed to fetch image: ${response.statusText}`);
      throw createError({
        statusCode: response.status,
        statusMessage: `Google API Error: ${response.statusText}`,
      });
    }

    const imageBuffer = await response.arrayBuffer();

    const storage = getStorage();
    const filename = `kitchens/${Date.now()}-photo.jpg`;
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, Buffer.from(imageBuffer), {
      contentType: response.headers.get("Content-Type") || "image/jpeg",
    });

    const firebaseUrl = await getDownloadURL(storageRef);

    console.log('[Google Photo Proxy] Photo successfully uploaded to Firebase:', firebaseUrl);

    return { firebaseUrl };
  } catch (error) {
    console.error('[Google Photo Proxy Error]', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch or process image from Google Photo URL.',
    });
  }
});
