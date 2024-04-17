import { directus } from "@/lib/directus";
import { createItem } from "@directus/sdk";

interface SubscribeUserProps {
  email: string;
  onSuccess?: () => void;
  onError?: () => void;
}
export const subscribeUser = async ({
  email,
  onSuccess,
  onError,
}: SubscribeUserProps) => {
  try {
    // TODO: get rid of ts-ignore
    //@ts-ignore
    await directus.request(createItem("subscribers", { email }));

    onSuccess?.();
  } catch (error) {
    console.error(error);
    onError?.();
  }
};

export const getSubscribersCount = async () => {
  try {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
      {
        next: {
          tags: ["subscribers-count"],
        },
      },
    )
      .then((res) => res.json())
      .then((res) => res.meta.total_count);
  } catch (error) {
    console.error(error);
  }
};
