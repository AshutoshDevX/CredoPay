import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUpForm({
    className,
    ...props
}) {
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
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">FullName</Label>
                                <Input id="name" type="text" placeholder="John Doe" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Phone</Label>
                                <Input id="name" type="text" required maxlength="10" minlength="10" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div>
                                <p>Type:</p>
                                <input id="user" type="radio" name="type" value="user" required className="mr-2" />
                                <label htmlFor="user">User</label>
                                <br />
                                <input id="employee" type="radio" name="type" value="employee" required className="mr-2" />
                                <label htmlFor="employee">Employee</label>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-300">
                                    SignUp
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account{" "}
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
