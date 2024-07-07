// components/Detail.tsx (or wherever your Detail component is located)
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
// import { headers } from "next/headers"
import { cookies } from "next/headers";
import { readPayloadJose } from "@/lib/jwt";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductModel } from '@/db/models/product';
import AddToWishlistButton from "@/components/client/AddtoWishlistButton";
import { getProductAndUserId } from "./action";



// const fetchProduct = async (slug: string): Promise<ProductModel | null> => {
//   const response = await fetch(`http://localhost:3000/api/products/${slug}`, {
//     cache: 'no-store',
//     // headers: {
//     //   Cookie: cookies().toString(),
//     // }
//   });

//   // console.log(cookies().toString());

//   if (!response.ok) {
//     throw new Error('Failed to fetch product');
//   }

//   const data = await response.json();
//   console.log(data);

//   return data.data || null;
// };

const Detail = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { product, userId } = await getProductAndUserId(slug);
  console.log(userId, "user id page detail");

  // const product = await fetchProduct(slug);
  // console.log(userId);

  // console.log(cookies().get("userId")?.value, "ini cookies");




  // const requestHeaders = headers();
  // console.log(requestHeaders);

  // const userId = requestHeaders.get("x-user-id");


  // Get headers set by the middleware
  // const requestHeaders = cookies().getAll()[0];
  // console.log(requestHeaders, "log headers");

  // const tokenData = await readPayloadJose<{ id: string; email: string }>(
  //   requestHeaders.value
  // );

  // const userId = tokenData.id

  // console.log(userId, "<<<<<<<<<< userId");


  // const userId = requestHeaders.get("x-user-id");
  // const userId = "nganu"
  // console.log(userId, "INI USER ID PAGE SERVER");

  // const userEmail = requestHeaders.get("x-user-email");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href={"/products"}>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {product?.name}
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                In stock
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                {/* Client Component for Adding to Wishlist */}
                {userId && (
                  <AddToWishlistButton userId={userId || ""} productId={product?._id.toString() || ""} />
                )}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Brief</CardTitle>
                    <CardDescription>
                      {product?.excerpt}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Price</CardTitle>
                    <CardDescription>
                      Rp. {product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                    <CardDescription className="mt-20">
                      {product?.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card x-chunk="dashboard-07-chunk-0">
                  <div className="flex rounded-md space-x-2 px-6 text-sm p-2 bg-blue-600 text-white">
                    <h1>Tags: </h1>
                    {product?.tags?.map(tag => (
                      <div key={tag} className="block">
                        <h1 className="font-light">{tag}</h1>
                      </div>
                    ))}
                  </div>
                </Card>
                {/* <Card x-chunk="dashboard-07-chunk-2">

                </Card> */}
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <img src={product?.thumbnail} alt="" className="rounded-md" />
                </Card>
                <Card
                  className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                >
                  <img src={product?.images[1]} alt="" className="rounded-md" />
                </Card>
                {!product?.images[2] === undefined ? (
                  <Card
                    className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                  >
                    <img src={product?.images[1]} alt="" className="rounded-md" />
                  </Card>
                ) : (
                  <></>
                )}

              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Detail
