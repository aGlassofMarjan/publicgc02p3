import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import * as React from "react"

// import {
//   ChevronLeft,
//   Home,
//   LineChart,
//   Package,
//   Package2,
//   PanelLeft,
//   PlusCircle,
//   Search,
//   Settings,
//   ShoppingCart,
//   Upload,
//   Users2,
// } from "lucide-react"

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Upload,
  Search,
  ShoppingBag,
  ScanEye,
} from "lucide-react"

// import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// import { GET } from '@/app/api/products/route'
import { getProducts } from '@/db/models/product'
import Navbar from "@/components/client/Navbar"
import FooterComponent from "@/components/client/FooterComponent"
import { ProductModel } from "@/db/models/product"

// ?? cari 10 data random
const shuffleAndLimit = (array: ProductModel[], limit: number) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, limit);
};


const LandingPage = async () => {

  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  const products: ProductModel[] = data.data;

  const limitedProducts = shuffleAndLimit(products, 10);

  // console.log(limitedProducts);




  return (
    <>
      <div className="bg-white flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          {/** * // ?? header *****/}
          <Navbar />
          {/* ELEMENT: BANNER */}
          <div className="w-screen bg-blue-50 flex justify-center items-center">
            <Carousel className="w-2/3 md:h-48 sm:h-32 lg:h-80 py-5">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <Image
                      src="/banner1.webp"
                      alt="Image"
                      width="1920"
                      height="1080"
                      className="h-auto w-full object-cover rounded-md"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Image
                      src="/banner2.webp"
                      alt="Image"
                      width="1920"
                      height="1080"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Image
                      src="/banner3.webp"
                      alt="Image"
                      width="1920"
                      height="1080"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Image
                      src="/banner4.webp"
                      alt="Image"
                      width="1920"
                      height="1080"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Image
                      src="/banner5.webp"
                      alt="Image"
                      width="1920"
                      height="1080"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Image
                      src="/banner6.webp"
                      alt="Image"
                      width="1920"
                      height="1080"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          {/* ELEMENT: CARD FEATURES */}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex justify-around">
                <div className="rounded-full w-56">
                  <Image
                    src="/bliblimartgratisongkir.webp"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="rounded-full w-56">
                  <Image
                    src="/elektronikcicilan0.webp"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="rounded-full w-56">
                  <Image
                    src="/fashionbeautyoriginal.webp"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="rounded-full w-56">
                  <Image
                    src="/travelingmudahmurah.webp"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              </div>
              {/* // ELEMENT: SMALL ICON CAROUSEL */}
              <div className="w-full">
                <Carousel>
                  <CarouselContent>
                    <CarouselItem className="flex w-full items-center justify-center">
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/lihatsemua.svg"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center">
                          <h1 className="text-xs text-gray-600">Lihat Semua</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/new-all-promo.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center">
                          <h1 className="text-xs text-gray-600">Semua Promo</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/tagihanisiulang.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center text-center">
                          <h1 className="text-xs text-gray-600">Tagihan & Isi Ulang</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/blu.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center text-center">
                          <h1 className="text-xs text-gray-600">Cashback 25rb</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/paylater.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center">
                          <h1 className="text-xs text-gray-600">Hemat 1.1Jt</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/quest.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center">
                          <h1 className="text-xs text-gray-600">Misi Berhadiah</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/mola.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center">
                          <h1 className="text-xs text-gray-600">Gratis 3 Bulan</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/keuangan.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center">
                          <h1 className="text-xs text-gray-600">Keuangan</h1>
                        </div>
                      </div>
                      <div className="items-center w-24">
                        <div className="w-full flex justify-center">
                          <Image
                            src="/officialstore.webp"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-8 w-8 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-full flex justify-center">
                          <h1 className="text-xs text-gray-600">Official Store</h1>
                        </div>
                      </div>
                    </CarouselItem>
                    {/* <CarouselItem className="w-auto h-full flex justify-center items-center">
                    <p className="font-mono">udah kak gausah di slide lagi :(</p>
                  </CarouselItem>
                  <CarouselItem className="w-auto h-full flex justify-center items-center">
                    <p className="font-mono">kak stop</p>
                  </CarouselItem>
                  <CarouselItem className="w-auto h-full flex justify-center items-center">
                    <p className="font-mono font-bold text-xl">KAK</p>
                  </CarouselItem> */}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              {/* ELEMENT: PROMO */}
              <div className="block w-full h-auto p-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="flex justify-between w-full mb-5">
                  <p className="text-white text-2xl font-semibold">Zona Member Baru</p>
                  <p className="text-white">Lihat Semua</p>
                </div>
                <div className="flex justify-between w-full">
                  <div className="w-32 rounded-lg p-2 text-xs h-auto bg-blue-200">
                    <div>
                      <h1 style={{ fontSize: 10 }}>Zona Member Baru</h1>
                      <h1 className="text-md font-semibold">Cashback 99%</h1>
                    </div>
                    <div className="bg-blue-700 text-white p-1 rounded-lg text-center bottom-0">
                      <p className="font-mono">PELANGGANBARU</p>
                    </div>
                  </div>
                  <div className="w-32 rounded-lg p-2 text-xs h-auto bg-blue-200">
                    <h1 style={{ fontSize: 10 }}>New Cust HOM CB 10%</h1>
                    <h1 className="text-md font-semibold">Cashback 10%</h1>
                    <div className="bg-blue-700 text-white p-1 rounded-lg text-center">
                      <p className="font-mono">NTUHOM-JUL24</p>
                    </div>
                  </div>
                  <div className="w-32 rounded-lg p-2 text-xs h-auto bg-blue-200">
                    <h1 style={{ fontSize: 10 }}>Pelanggan Baru Paylater</h1>
                    <h1 className="text-md font-semibold">Diskon 9%</h1>
                    <div className="bg-blue-700 text-white p-1 rounded-lg text-center">
                      <p className="font-mono">CE-NEWPAYLATER</p>
                    </div>
                  </div>
                  <div className="w-32 rounded-lg p-2 text-xs h-auto bg-blue-200">
                    <h1 style={{ fontSize: 10 }}>Pelanggan Baru Paylater</h1>
                    <h1 className="text-md font-semibold">Diskon 50%</h1>
                    <div className="bg-blue-700 text-white p-1 rounded-lg text-center">
                      <p className="font-mono">NEWBLI-242</p>
                    </div>
                  </div>
                  <div className="w-32 rounded-lg p-2 text-xs h-auto bg-blue-200">
                    <h1 style={{ fontSize: 10 }}>Blibli Paylater New User</h1>
                    <h1 className="text-md font-semibold">Diskon 6%</h1>
                    <div className="bg-blue-700 text-white p-1 rounded-lg text-center">
                      <p className="font-mono">NEWBLIBLICICIL</p>
                    </div>
                  </div>
                  <div className="w-32 rounded-lg p-2 text-xs h-auto bg-blue-200">
                    <h1 style={{ fontSize: 10 }}>Blibli Paylater New User</h1>
                    <h1 className="text-md font-semibold">Diskon 8%</h1>
                    <div className="bg-blue-700 text-white p-1 rounded-lg text-center">
                      <p className="font-mono">NEWBLIBLI2</p>
                    </div>
                  </div>

                </div>
              </div>
              {/* FUNCTION: LEFT SIDE */}
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  {/* <Card>
                    <CardContent>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.jpg"
                        width="300"
                      />
                    </CardContent>
                  </Card> */}
                  <Card x-chunk="dashboard-07-chunk-0">
                    <Link href={"/products"}>
                      <div className="flex items-center justify-center p-5 relative bg-gradient-to-b from-red-600 to-yellow-500 w-auto h-32 rounded-md">
                        <h1 className="text-4xl font-black text-white">Mulai Belanja!</h1>

                        <div className="shadow-lg flex items-center justify-center p-5 opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full rounded-md bg-gradient-to-b from-blue-400 to-blue-900">
                          <h1 className="text-4xl font-black text-white">Mulai Belanja!</h1>
                        </div>
                      </div>
                    </Link>

                  </Card>

                  <Card x-chunk="dashboard-07-chunk-0" className="p-5 bg-blue-50">
                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h1 className="text-2xl">Intip Sedikit</h1>
                        <ScanEye />
                      </div>
                      <h1 className="text-gray-600 font-light">Barang barang original kami 100%</h1>
                    </div>
                    <div className="flex justify-center items-center">
                      <Carousel className="w-full max-w-xs">

                        <CarouselContent>
                          {limitedProducts.map(data => {
                            return (
                              <CarouselItem key={data._id.toString()}>
                                <Card>
                                  <CardHeader>
                                    <img
                                      src={data.thumbnail}
                                      alt="Thumbnail"
                                      // width="1920"
                                      // height="1080"
                                      className="h-48 w-full object-cover rounded-md border-gray-100"
                                    />
                                  </CardHeader>
                                  <CardContent className="">
                                    <h1 className="text-2xl font-semibold ">{data.name}</h1>
                                    <h1 className="text-md font-light ">{data.excerpt}</h1>
                                  </CardContent>
                                  <CardFooter className="flex justify-between">
                                    <button className="w-32 p-3 bg-blue-500 hover:bg-blue-600 duration-100 rounded-lg text-white font-light">Detail</button>
                                    <div className="align-baseline">
                                      <p className="text-gray-600 ">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                      <p className="text-gray-600 text-xs">on Rupiah</p>
                                    </div>
                                  </CardFooter>
                                  <CardFooter>

                                  </CardFooter>
                                </Card>


                              </CarouselItem>
                            )
                          })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>

                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <div className="marquee py-4">
                      <div className="marquee-content">
                        {products.map(data => {
                          return (
                            <div key={data._id.toString()} className="marquee-item text-lg text-gray-800">
                              <img src={data.thumbnail} className="w-24 h-24 object-cover" alt="Images" />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </Card>
                </div>
                {/* FUNCTION: RIGHT SIDE */}
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src="/indodana.webp"
                      width="300"
                    />
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-3">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src="/matepad.webp"
                      width="300"
                    />
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-3">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src="/bcaipon.webp"
                      width="300"
                    />
                  </Card>

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

      <FooterComponent />
    </>


  )
}

export default LandingPage;