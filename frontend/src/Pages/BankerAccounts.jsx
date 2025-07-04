import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function BankerAccounts() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/banker/customers", {
                headers: {
                    Authorization: localStorage.getItem("access_token"),
                },
            });
            setCustomers(res.data);
        } catch (err) {
            toast.error("Failed to load customers");
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.clear();
                navigate("/signin");
            }
        }
    };

    const fetchCustomerTransactions = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3000/banker/customer/${userId}`, {
                headers: {
                    Authorization: localStorage.getItem("access_token"),
                },
            });

            setSelectedCustomer(res.data);
        } catch (err) {
            toast.error("Could not load transaction history");
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/signin");
    };

    return (
        <div className="p-6 bg-[#0a0f3c] text-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">All Customer Accounts</h2>
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                    Logout
                </Button>
            </div>


            {customers.map((customer) => (
                <div
                    key={customer.user_id}
                    className="mb-6 border p-4 rounded-lg bg-[#1a2357]"
                >
                    <h3 className="text-lg font-semibold">{customer.full_name}</h3>
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone}</p>

                    {customer.accounts.map((acc) => (
                        <div key={acc.account_id} className="mt-2 ml-4">
                            <p>Account #: {acc.account_number}</p>
                            <p>Type: {acc.account_type}</p>
                            <p>Balance: ₹{acc.balance}</p>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        size="sm"
                                        className="mt-2 bg-blue-500 hover:bg-blue-600"
                                        onClick={() => fetchCustomerTransactions(customer.user_id)}
                                    >
                                        View Transactions
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Transactions for {selectedCustomer?.full_name}
                                        </DialogTitle>
                                    </DialogHeader>
                                    {selectedCustomer?.accounts.map((acc) => (
                                        <div key={acc.account_id} className="mb-4">
                                            <p className="text-sm text-gray-300">
                                                Account #: {acc.account_number}
                                            </p>
                                            {acc.transactions?.length > 0 ? (
                                                <ul className="text-sm ml-2 mt-1">
                                                    {acc.transactions.map((tx) => (
                                                        <li key={tx.transaction_id}>
                                                            {tx.timestamp.slice(0, 10)} -{" "}
                                                            {tx.type.toUpperCase()} - ₹{tx.amount}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-gray-400 ml-2">No transactions</p>
                                            )}
                                        </div>
                                    ))}
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
