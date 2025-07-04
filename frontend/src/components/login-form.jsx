import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/user/signin", {
        email,
        password,
      });

      const { access_token, user_type, full_name } = res.data;

      // Store data
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_type", user_type);
      localStorage.setItem("full_name", full_name);

      toast.success("Login successful!");

      // Redirect based on role
      if (user_type === "customer") {
        navigate("/transactions");
      } else if (user_type === "banker") {
        navigate("/banker");
      }
    } catch (err) {
      console.log(err)
      const msg = err.response?.data?.message || "Login failed";
      if (msg == "User not found") {
        toast.error("User does not have an account. Redirecting to signup...");
        setTimeout(() => navigate("/signup"), 2000);
      } else {
        toast.error(msg);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#0a0039] text-white border-gray-600">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
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
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-300"
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
