import { getUploadSignedUrl } from '$lib/server/s3.js';
import { error, json } from '@sveltejs/kit';


export async function GET({ url, locals: {user} }) {
  if (!user) {
    throw error(401, 'Unauthorized');
  }

  let filename = url.searchParams.get('name');
  if (!filename) {
    throw error(400, 'Missing filename');
  }

  filename = user.id + '/' + filename;

  const contentType = url.searchParams.get('contentType') ?? 'application/octet-stream';

  if (!filename) {
    return json({ error: 'Missing filename' }, { status: 400 });
  }

  const signedUrl = await getUploadSignedUrl(filename, contentType)
  return json({ url: signedUrl });
}
