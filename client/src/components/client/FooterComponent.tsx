import Image from "next/image"

const FooterComponent = () => {
  return (
    <>
      <div className="w-full justify-center items-center text-center border-t-2">
        <div className="grid grid-cols-5 h-auto py-8 w-full">
          <div className="">
            <div className="">
              <p className="text-2xl mb-3">Customer Care</p>
              <p className="text-sm">Telepon</p>
              <p className="font-semibold">0804-1-871-871</p>
            </div>
            <p>Email</p>
            <p className="font-semibold">customer.care@blibli.com</p>
            <p>Bantuan</p>
            <p>Pusat Bantuan</p>
          </div>
          <div>
            <p className="text-2xl mb-3">Info Blibli</p>
            <p>Tentang Blibli</p>
            <p>Blog Blibli Friends</p>
            <p>Siaran Pers</p>
            <p>Kabar Terbaru</p>
            <p>Karir</p>
            <p>Ketentuan & Kebijakan Privasi</p>
            <p>Hak Kekayaan Intelektual</p>
            <p>Sahabat Ibu Pintar</p>
            <p>Sahabat Perjalananmu</p>
            <p>Sahabat Main</p>
            <p>Blibli Cinta Bumi</p>
          </div>
          <div>
            <p className="text-2xl mb-3">Kerja Sama</p>
            <p>Affiliate Program</p>
            <p>Jual di Blibli</p>
            <p>B2B Program</p>
          </div>
          <div>
            <p className="text-2xl mb-3">Download Aplikasi</p>
            <div className="flex w-auto justify-center">
              <Image
                src="/googleplay.png"
                alt="Image"
                width="1920"
                height="1080"
                className="h-14 w-auto object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            <div className="flex w-auto justify-center">
              <Image
                src="/appstore.png"
                alt="Image"
                width="1920"
                height="1080"
                className="h-11 w-auto object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            <div className="flex w-auto justify-center">
              <Image
                src="/appgalery.png"
                alt="Image"
                width="1920"
                height="1080"
                className="h-10 w-auto object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </div>
          <div>
            <Image
              src="/cart.webp"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>

    </>
  )
}

export default FooterComponent