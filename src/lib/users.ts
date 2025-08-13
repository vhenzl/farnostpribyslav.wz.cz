import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';

const dir = path.join(process.cwd(), 'data', 'user');

const UserSchema = z.object({
  id: z.number(),
  jmeno: z.string(),
  prijmeni: z.string(),
  email: z.string().default('todo@example.com'),
});

export type User = z.infer<typeof UserSchema>;

export type Publisher = { id: number; name: string; email: string };

async function readUserFile(file: string): Promise<User> {
  const filePath = path.join(dir, file);
  const raw = await fs.readFile(filePath, { encoding: 'utf8' });
  const { data: user } = matter(raw);
  const fileId = parseInt(file.replace('.md', ''), 10);

  try {
    return UserSchema.parse(user);
  } catch (e) {
    console.error(`Validation failed for user ${fileId}:`, e);
    throw e;
  }
}

export async function getPublisherById(id: number): Promise<Publisher | null> {
  const user = await readUserFile(`${id}.md`);
  return { id: user.id, name: `${user.jmeno} ${user.prijmeni}`.trim(), email: user.email };
}
