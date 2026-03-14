import { auth } from "@src/libs";
import { User } from "next-auth";

/** Use for Server Action return values so only plain objects are sent to the client. */
export function toPlainObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export async function withAuth<TArgs, TResult>(
  args: TArgs,
  fn: (args: TArgs, user: User) => TResult | Promise<TResult>
): Promise<TResult> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return fn(args, session.user as User);
}

export const makeBlogSlug = (title: string, id: number): string => {
  const slugTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${slugTitle}-${id}`;
};

export const parseBlogSlug = (slug: string): number | null => {
  const parts = slug.split("-");
  const id = parts.pop();
  return id && !isNaN(Number(id)) ? Number(id) : null;
};
