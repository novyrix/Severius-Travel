import { del } from '@vercel/blob';

export async function deleteBlogImages(urlsOrPathnames: string[]) {
  const uniqueTargets = Array.from(
    new Set(urlsOrPathnames.map((value) => value.trim()).filter(Boolean))
  );

  if (uniqueTargets.length === 0) {
    return;
  }

  await del(uniqueTargets);
}