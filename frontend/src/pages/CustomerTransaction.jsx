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
            const res = await axios.get("https://credopay.onrender.com/transactions/transaction-history", {
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
                `https://credopay.onrender.com/transactions/${action}`,
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
                <div key={account.account_id} className="space-y-6 mb-12">
                    {/* Account Info Card */}
                    <div className="bg-[#131c4b] p-5 rounded-xl shadow-md border border-[#1e2b60]">
                        <h3 className="text-xl font-bold text-white">Account: {account.account_number}</h3>
                        <p className="text-sm text-indigo-300">Type: {account.account_type}</p>
                        <p className="text-base mt-1 font-semibold text-green-400">
                            Balance: ₹{account.balance}
                        </p>
                    </div>

                    {/* Deposit / Withdraw Card */}
                    <div className="bg-[#10193b] p-5 rounded-xl shadow-md border border-[#1d2958] flex gap-4 flex-wrap">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700"
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
                                    <DialogTitle className="text-white">Deposit to Account</DialogTitle>
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
                                    className="bg-gray-600 hover:bg-gray-700 text-white"
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
                                    <DialogTitle className="text-white">Withdraw from Account</DialogTitle>
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

                    {/* Transaction History Card */}
                    <div className="bg-[#0e1538] p-5 rounded-xl shadow-md border border-[#253163]">
                        <h4 className="text-indigo-400 text-lg font-semibold mb-3">Transaction History</h4>
                        <ul className="text-sm text-gray-200 space-y-1 pl-4 list-disc">
                            {account.transactions?.length === 0 && <li>No transactions yet.</li>}
                            {account.transactions?.map((tx) => (
                                <li key={tx.transaction_id}>
                                    <span className="text-gray-400">{tx.timestamp.slice(0, 10)}</span> —{" "}
                                    <span className="font-bold text-white">{tx.type.toUpperCase()}</span> — ₹{tx.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}


        </div>
    );
}
