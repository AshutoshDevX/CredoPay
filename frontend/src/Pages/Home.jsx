import { Button } from "@/components/ui/button"
import mobile from "../assets/mobile.png"
import { Header } from "../components/Header";
import { Feature } from "../components/Feature";
import { FaCreditCard, FaLock, FaChartLine } from "react-icons/fa";
import { Link } from "react-router";
export function Home() {
    return (
        <div className="relative min-h-screen bg-[#0a0f3c] overflow-hidden text-white">
            <Header />

            {/* Background glow */}
            <div className="absolute w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px] opacity-30 -top-40 left-40 z-0"></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 pt-20 gap-16 lg:gap-0 top-20">

                {/* Left Content */}
                <div className="max-w-xl space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                        Earn, Borrow and <br /> Trade with CredoPay
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg">
                        CredoPay allows you to earn interest, borrow and trade cryptos while ensuring maximum security.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/signup">
                            <button className="bg-blue-600 px-6 py-3 rounded-md text-white font-semibold">
                                Open an account
                            </button>
                        </Link>
                        <button className="border px-6 py-3 rounded-md border-white text-white">
                            See our yields
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row gap-8 pt-8 text-white/80 text-sm font-medium items-center sm:items-start justify-center lg:justify-start">
                        <div>
                            <div className="text-2xl font-bold">+$500M</div>
                            <div>in assets under management</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">+30M</div>
                            <div>in monthly trading volume</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">+8</div>
                            <div>years in fintech</div>
                        </div>
                    </div>
                </div>

                {/* Right Content - Mobile Image */}
                <div className="flex justify-center lg:justify-end w-full lg:w-auto">
                    <img
                        src={mobile}
                        className="w-[260px] sm:w-[320px] md:w-[400px] lg:w-[460px] xl:w-[500px] rounded-xl"
                        alt="App UI"
                    />
                </div>
            </div>

            <section id="features" className="py-20 px-6 mt-25 md:px-12 lg:px-20 bg-[#0a0f3c] text-white">
                <h3 className="text-center text-3xl font-semibold mb-14">Our Features</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <Feature
                        h4="Easy Payments"
                        feature={<FaCreditCard className="text-white text-5xl mx-auto" />}
                        p="Make payments securely and quickly using our app from anywhere in the world."
                    />
                    <Feature
                        h4="Secure Banking"
                        feature={<FaLock className="text-white text-5xl mx-auto" />}
                        p="Your privacy is our priority. We use advanced encryption for your safety."
                    />
                    <Feature
                        h4="Financial Insights"
                        feature={<FaChartLine className="text-white text-5xl mx-auto" />}
                        p="Track your expenses and get valuable insights into your financial habits."
                    />
                </div>
            </section>
            <section id="pricing" className="py-24 bg-[#0e1329] text-white px-6 md:px-12 lg:px-20">
                <h3 className="text-center text-3xl font-semibold mb-12">Pricing Plans</h3>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        { title: "Basic", price: "Free", features: ["Basic Features", "Account Balance", "Email Support"], cta: "Start Free" },
                        { title: "Premium", price: "$9.99/month", features: ["All Features", "Unlimited Transfers", "Priority Support"], cta: "Try Premium" },
                        { title: "Enterprise", price: "Contact Us", features: ["Customized Solutions", "Dedicated Support", "Advanced Security"], cta: "Contact Us" }
                    ].map((plan, index) => (
                        <div key={index} className="bg-[#22263e] p-6 rounded-xl shadow-lg text-center hover:shadow-blue-500/20 transition">
                            <h4 className="text-2xl font-semibold mb-2">{plan.title}</h4>
                            <p className="text-blue-300 mb-4">{plan.price}</p>
                            <ul className="text-gray-300 mb-6 space-y-1">
                                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                            <Link to="/#" className="bg-blue-600 text-white px-6 py-2 rounded-full inline-block hover:bg-blue-700 transition">{plan.cta}</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="bg-[#0a0f3c] text-white py-24 px-6 flex flex-col items-center text-center">
                <h3 className="text-3xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-gray-400 mb-6">Have any questions? Reach out to us, and we’ll be happy to help.</p>
                <Link to="mailto:tranzixsupport@gmail.com" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">Email Us</Link>
            </section>


            <footer className="bg-[#0e1329] text-gray-400 py-10 px-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white">CredoPay</h4>
                        <p>Your trusted partner in banking and finance. Secure, fast, and easy to use.</p>
                        <div className="space-x-4 text-lg">
                            <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white">Contact</h4>
                        <p>123 Bank St., Suite 100, Financial City</p>
                        <p>Email: <a href="mailto:support@credopay.com" className="hover:text-white">support@credopay.com</a></p>
                        <p>Phone: <a href="tel:+123456789" className="hover:text-white">+1 234 567 89</a></p>
                    </div>
                </div>
                <div className="text-center mt-12 text-sm">
                    <p>&copy; 2025 CredoPay. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}



