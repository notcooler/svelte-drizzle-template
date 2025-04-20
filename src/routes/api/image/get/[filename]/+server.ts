import { getImageSignedUrl } from '$lib/server/s3';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ params }) {
  if (!params.filename || params.filename.length < 1) {
    throw error(400, 'Filename is required')
  }
  
  const url = await getImageSignedUrl(params.filename);
  throw redirect(302, url);
}
