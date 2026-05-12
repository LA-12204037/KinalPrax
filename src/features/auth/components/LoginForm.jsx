import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Mail, Lock } from "lucide-react";

export const LoginForm = ({ onForgot, onRegister }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 🔥 VALIDACIÓN (Lógica Anterior)
    if (!emailOrUsername.trim() || !password.trim()) {
      toast.error("Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const authBaseUrl = import.meta.env.VITE_AUTH_URL ?? "http://localhost:5277";
      const authUrl =
        import.meta.env.VITE_AUTH_API_URL ??
        `${authBaseUrl.replace(/\/$/, "")}/auth/login`;

      const response = await axios.post(authUrl, {
        emailOrUsername: emailOrUsername.trim(),
        password: password.trim(),
      });

      const data = response.data;
      const role = data?.userDetails?.role ?? "";
      const isAdmin = role.toUpperCase().includes("ADMIN");

      // ❌ fallo backend (Lógica Anterior)
      if (!data?.success) {
        toast.error(data?.message || "Inicio de sesión falló.");
        return;
      }

      // ❌ no admin (Lógica Anterior)
      if (!isAdmin) {
        toast.error("Acceso restringido: solo administradores.");
        return;
      }

      // ✅ guardar datos (Lógica Anterior)
      localStorage.setItem("authToken", data.token ?? "");
      localStorage.setItem("userRole", role);
      localStorage.setItem(
        "userName",
        data?.userDetails?.username ?? "Administrador"
      );

      toast.success("Bienvenido administrador");

      // 🔥 REDIRECCIÓN (Lógica Anterior)
      navigate("/dashboard", { replace: true });

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Error al iniciar sesión.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* INPUT EMAIL / USUARIO (Diseño Nuevo) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="bg-gray-200 p-1.5 rounded-md">
            <Mail className="h-4 w-4 text-gray-500" />
          </div>
        </div>
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="Correo o Usuario"
          className="block w-full pl-12 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-gray-400 text-gray-700"
        />
      </div>

      {/* INPUT PASSWORD (Diseño Nuevo) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="bg-[#3fa1cc] p-1.5 rounded-md">
            <Lock className="h-4 w-4 text-white" />
          </div>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="block w-full pl-12 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-gray-400 text-gray-700"
        />
      </div>

      {/* BOTÓN (Diseño Nuevo con Lógica de Carga) */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-gradient-to-r from-[#0f4c75] to-[#1b4965] hover:from-[#1b4965] hover:to-[#0f4c75] text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Verificando..." : "Iniciar Sesión"}
      </button>

      {/* FOOTER (Diseño Unificado) */}
      <div className="pt-4 text-center">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          ¿No tienes cuenta?{" "}
          <button 
            type="button" 
            onClick={onRegister}
            className="text-gray-700 font-bold hover:underline ml-1"
          >
            Regístrate
          </button>
        </p>
      </div>
    </form>
  );
};