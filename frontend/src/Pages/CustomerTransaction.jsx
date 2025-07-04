import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function CustomerTransactions() {
    const [accounts, setAccounts] = useState([]);
    const [activeAccount, setActiveAccount] = useState(null);
    const [action, setAction] = useState(""); // "deposit" or "withdraw"
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const fetchTransactions = async () => {
        try {
            const res = await axios.get("http://localhost:3000/transactions/transaction-history", {
                headers: {
                    Authorization: localStorage.getItem("access_token"),
                },
            });
            setAccounts(res.data);
        } catch (err) {
            toast.error("Failed to load transactions");
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.clear();
                navigate("/signin");
            }
        }
    };

    const handleTransaction = async () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        try {
            await axios.post(
                `http://localhost:3000/transactions/${action}`,
                {
                    account_id: activeAccount.account_id,
                    amount: Number(amount),
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token"),
                    },
                }
            );

            toast.success(`${action === "deposit" ? "Deposit" : "Withdrawal"} successful`);
            setAmount("");
            fetchTransactions();
        } catch (err) {
            const msg = err.response?.data?.message || "Transaction failed";
            toast.error(msg);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_type");
        localStorage.removeItem("full_name");
        toast.success("Logged out successfully");
        navigate("/signin");
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="p-6 bg-[#0a0f3c] min-h-screen text-white">
            {/* Top bar with logout */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Your Accounts & Transactions</h2>
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                    Logout
                </Button>
            </div>

            {accounts.map((account) => (
                <div
                    key={account.account_id}
                    className="mb-8 border p-4 rounded-lg bg-[#131c4b]"
                >
                    <h3 className="text-lg font-bold">Account: {account.account_number}</h3>
                    <p>Type: {account.account_type}</p>
                    <p className="mb-4">Balance: ₹{account.balance}</p>

                    <div className="flex gap-4 mb-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setAction("deposit");
                                        setActiveAccount(account);
                                    }}
                                >
                                    Deposit
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Deposit to Account</DialogTitle>
                                </DialogHeader>
                                <Input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <Button onClick={handleTransaction}>Submit</Button>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setAction("withdraw");
                                        setActiveAccount(account);
                                    }}
                                >
                                    Withdraw
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Withdraw from Account</DialogTitle>
                                </DialogHeader>
                                <Input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <Button onClick={handleTransaction}>Submit</Button>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Transactions:</h4>
                        <ul className="text-sm space-y-1">
                            {account.transactions?.length === 0 && <li>No transactions yet.</li>}
                            {account.transactions?.map((tx) => (
                                <li key={tx.transaction_id}>
                                    {tx.timestamp.slice(0, 10)} - {tx.type.toUpperCase()} - ₹{tx.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
