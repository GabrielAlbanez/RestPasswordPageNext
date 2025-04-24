"use client";

import { useEffect, useState, useTransition } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Page({
  params,
}: {
  params: Promise<Readonly<{ token: string }>>;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchToken = async () => {
      const { token } = await params;
      console.log(token);
      setToken(token);
    };
    fetchToken();
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!token || !password) return;

    startTransition(async () => {
      try {
        const res = await fetch(
          `http://172.16.6.11:5000/auth/reset-password/${token}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message ?? "Erro ao redefinir senha");

        toast.success(data.message ?? "Senha redefinida com sucesso!");
        setPassword("");
      } catch (err: any) {
        toast.error(err.message ?? "Erro inesperado");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Redefinir Senha
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Digite sua nova senha abaixo:
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className={`bg-blue-600 text-white font-semibold py-2 rounded transition ${
              isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isPending ? "Enviando..." : "Redefinir senha"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}
