import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import fondo from "../../../assets/img/fondo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "").toUpperCase();
    if (role.includes("ADMIN")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-sans overflow-hidden">
      
      {/* Capa de fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo})` }}
      />
      
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

      {/* Tarjeta Contenedora Principal */}
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500">
        <div className="p-10 md:p-12">
          
          {/* Logo y Nombre unificado */}
          <div className="text-center mb-8">
             <h1 className="text-4xl font-bold text-[#115e8d] tracking-tight">
               Kinal<span className="text-[#3fa1cc]">Prax</span>
             </h1>
          </div>

          <h2 className="text-left font-bold text-gray-800 mb-6 text-lg">
            {isLogin ? "Iniciar Sesión" : "Recuperar Contraseña"}
          </h2>

          {/* Formulario Dinámico */}
          <div className="min-h-[250px] animate-in fade-in duration-500">
            {isLogin ? (
              <LoginForm 
                onForgot={() => setIsLogin(false)} 
                onRegister={() => console.log("Ir a registro")} 
              />
            ) : (
              <ForgotPasswordForm onSwitch={() => setIsLogin(true)} />
            )}
          </div>

          {/* Opciones de pie de página (Solo cuando es Login) */}
          {isLogin && (
            <div className="mt-6 flex flex-col items-center gap-4 border-t border-gray-100 pt-6">
               <button
                type="button"
                className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider hover:text-blue-600 transition-colors"
                onClick={() => setIsLogin(false)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {!isLogin && (
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm font-bold text-[#3fa1cc] hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export { AuthPage };