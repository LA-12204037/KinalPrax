import { Mail } from "lucide-react";

export const ForgotPasswordForm = ({ onSwitch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de envío de correo
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Texto de ayuda */}
      <p className="text-sm text-gray-500 text-left mb-2 px-1">
        Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
      </p>

      {/* Campo Email */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="bg-gray-200 p-1.5 rounded-md">
            <Mail className="h-4 w-4 text-gray-500" />
          </div>
        </div>
        <input
          type="email"
          required
          placeholder="Correo Electrónico"
          className="block w-full pl-12 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-gray-400 text-gray-700"
        />
      </div>

      {/* Botón submit con el degradado del login */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#0f4c75] to-[#1b4965] hover:from-[#1b4965] hover:to-[#0f4c75] text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98]"
      >
        Enviar Correo
      </button>

      {/* Volver a login - Estilo minimalista del footer */}
      <div className="pt-4 text-center">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          ¿Recordaste tu contraseña?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-[#3fa1cc] font-bold hover:underline ml-1"
          >
            Iniciar Sesión
          </button>
        </p>
      </div>

    </form>
  );
};