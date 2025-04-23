"use client";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<Readonly<{ token: string }>>;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const { token } = await params;
      console.log("Token recebido:", token);
      setToken(token);
    };

    fetchToken();
  }, [params]);

  useEffect(() => {
    if (token) {
      // Redireciona para o aplicativo com o deep link
      window.location.href = `myapp://reset-password/${token}`;
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Redefinindo sua senha...
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Estamos redirecionando você para o aplicativo.
        </p>
        <p className="text-center text-gray-600">
          Se o redirecionamento não ocorrer automaticamente,{" "}
          <a
            href={`myapp://reset-password/${token}`}
            className="text-blue-600 hover:underline"
          >
            clique aqui
          </a>
          .
        </p>
      </div>
    </div>
  );
}
