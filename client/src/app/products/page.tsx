"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductModel } from "@/db/models/product";
import { debounce } from "@/db/utils/debounce";
import { useState, useEffect, ChangeEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AddToWishlistButton from "@/components/client/AddtoWishlistButton";
import { fetchProducts, fetchSuggestions } from "./action";

export interface ApiResponse<T> {
  data: T;
}

type StoreProps = {
  userId: string;
};

const Store = ({ userId }: StoreProps) => {
  const [dataArray, setDataArray] = useState<ProductModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductModel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreData = async () => {
    const data = await fetchProducts(page);
    if (data.data.length === 0) {
      setHasMore(false);
    } else {
      setDataArray((prev) => [...prev, ...data.data]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const debouncedFetchSuggestions = debounce(async (query: string) => {
    const result = await fetchSuggestions(query);
    setSuggestions(result.data);
  }, 300);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSuggestions([]);
    } else {
      debouncedFetchSuggestions(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
                </Link>
                <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                  <Package className="h-4 w-4" />
                  Products{" "}
                </Link>
                <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <Users className="h-4 w-4" />
                  Customers
                </Link>
                <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-primary transition-all hover:text-primary">Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other
                      components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It&apos;s animated by default, but you can disable it if you
                      prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
                  </Link>
                  <Link href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                    <Users className="h-5 w-5" />
                    Customers
                  </Link>
                  <Link href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-md z-10">
                      {suggestions.map((product) => (
                        <div key={product._id.toString()} className="p-2 border-b hover:bg-gray-100">
                          <Link href={`/product/${product.slug}`}>
                            {product.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold md:text-3xl">Store</h1>
            </div>
            <InfiniteScroll
              dataLength={dataArray.length}
              next={loadMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p>No more products</p>}
              className="flex-1 p-5 grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-5 overflow-auto rounded-lg border border-dashed shadow-sm"
            >
              {dataArray.length > 0 ? (
                dataArray.map(data => (
                  <Card key={data._id.toString()} className="">
                    <CardHeader>
                      <img
                        src={data.thumbnail}
                        alt="Image"
                        className="h-52 w-full object-cover rounded-md mb-5"
                      />
                      <CardTitle>{data.name}</CardTitle>
                      <CardDescription>{data.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">Rp. {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                      <div className="flex items-center mt-2 gap-1 text-gray-500 text-xs">
                        <Image src="/officialstore.webp" alt="image" width={24} height={24} className="object-cover" />
                        Handled with care by Blibli
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                      <Link href={`/products/${data.slug}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">Detail</Button>
                      </Link>
                      <AddToWishlistButton userId={userId} productId={data._id.toString()} />
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src={"/loadinganim.gif"}
                    height={24}
                    width={24}
                    alt="Loading..."
                    className="w-auto h-auto object-cover"
                  />
                </div>
              )}
            </InfiniteScroll>
          </main>
        </div>
      </div>
    </>
  );
};

export default Store;
