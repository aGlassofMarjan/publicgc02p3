import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ClientFlashComponent from '@/components/client/ClientAlertComponent';
// import loginImage from '@/'
import { doLogin } from './action';
// import { AlertCircle } from "lucide-react"
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@/components/ui/alert"

const LoginPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <form action={doLogin} className='mx-auto grid gap-6'>
            <div className='flex w-auto justify-center items-center'>
              <Image
                src="/logoblibliblue.svg"
                alt="Image"
                width="12"
                height="12"
                className="w-24 object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            <div className="grid gap-2 text-center">
              {/* <h1 className="text-3xl font-bold">Login</h1> */}
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name='email'
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href=""
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name='password' />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                <Image
                  src="/google_logo.webp"
                  alt="Image"
                  width="14"
                  height="14"
                  className="h-auto w-auto mr-2 object-cover dark:brightness-[0.2] dark:grayscale"
                />
                Login with Google
              </Button>
              <ClientFlashComponent />
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            Belum punya akun?
            {' '}
            <Link href="/register" className="underline">
              Daftar, yuk!
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/login.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
