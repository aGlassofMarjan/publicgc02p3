// pages/wishlist/page.tsx
import WishlistTable from "@/components/client/WishlistTable";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Wishlist = () => {
  const userId = cookies().get("userId")?.value;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Your Dream, on One Page.</CardDescription>
            </CardHeader>
            <CardContent>
              <WishlistTable userId={userId || ""} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Wishlist;
