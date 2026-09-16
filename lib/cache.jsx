import { getMessages } from "next-intl/server";
import { cacheLife, cacheTag } from "next/cache";

export async function getCachedMessages(locale) {
  "use cache";
  cacheLife("hours");
  cacheTag(`messages-${locale}`);
  return getMessages({ locale });
}
