import crypto from 'crypto';
import slugify from 'slugify';

export default function makeSlug(title: string) {
  const randomBytes = crypto.randomBytes(4).toString('hex');
  const newTitle = `${title.substring(0, 83)}-${randomBytes}`;
  return slugify(newTitle, { lower: true, strict: true });
}
