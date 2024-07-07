import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from "next/navigation";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import ClientFlashComponent from '@/components/client/ClientAlertComponent';

const RegisterPage = () => {

	// FUNCTION: handleRegister
	const handleRegister = async (formData: FormData) => {
		"use server"
		type MyResponse<T> = {
			statusCode: number
			message?: string
			data?: T
			error?: string
		}

		const response = await fetch("http://localhost:3000/api/user", {
			method: "POST",
			body: JSON.stringify({
				name: formData.get("name"),
				username: formData.get("username"),
				email: formData.get("email"),
				password: formData.get("password"),
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});

		// console.log(response);

		const responseJson: MyResponse<unknown> = await response.json();

		if (!response.ok) {
			let message = responseJson.error ?? "Something went wrong!"
			return redirect(`/register?error=${encodeURIComponent(message)}`);
		}

		return redirect("/login");
	}

	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="grid gap-4">
					<div className='flex w-auto justify-center items-center'>
						<Image
							src="/logoblibliblue.svg"
							alt="Image"
							width="12"
							height="12"
							className="w-24 mb-4 object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
					{/* ELEMENT: FORM HandleRegister */}
					<form className='grid gap-4' action={handleRegister}>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" name="name" placeholder="ex: Rayhan Wijaya" />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="username">Username</Label>
								<Input id="username" name="username" placeholder="ex: rayhanwijaya" />
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="m@example.com"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" />
						</div>
						{/* ACTION: FORM Submit */}
						<Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
							Create an account
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
					</form>


					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Sign in
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

export default RegisterPage;
