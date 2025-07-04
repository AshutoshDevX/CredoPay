import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm({ className, ...props }) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/user/signup", {
                full_name: fullName,
                phone,
                email,
                password,
                user_type: userType === "customer" ? "customer" : "banker",
            });

            console.log(res)

            toast.success("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/signin"), 1500);
        } catch (err) {
            const msg = err.response?.data?.message || "Signup failed";
            toast.error(msg);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-[#0a0039] text-white border-gray-600">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Fill the details below to register
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    maxLength={10}
                                    minLength={10}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Account Type</Label>
                                <div>
                                    <input
                                        id="customer"
                                        type="radio"
                                        name="type"
                                        value="customer"
                                        checked={userType === "customer"}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                        required
                                    />
                                    <label htmlFor="customer">Customer</label>
                                </div>
                                <div>
                                    <input
                                        id="banker"
                                        type="radio"
                                        name="type"
                                        value="banker"
                                        checked={userType === "banker"}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="banker">Banker</label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-300">
                                Sign Up
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/signin" className="underline underline-offset-4">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
