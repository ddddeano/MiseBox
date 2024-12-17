// api/google-photo.js
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

    setHeader(event, 'Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    setHeader(event, 'Cache-Control', 'public, max-age=3600');  // Cache for 1 hour

    return Buffer.from(imageBuffer);
  } catch (error) {
    console.error('[Google Photo Proxy Error]', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch image from the provided photo_url.',
    });
  }
});
