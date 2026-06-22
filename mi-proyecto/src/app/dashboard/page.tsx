export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tight">Dashboard del Proyecto</h1>
        </div>
        <p className="text-slate-400 text-sm">
          Esta pantalla se creó automáticamente gracias al sistema de carpetas de Next.js. Sin configurar librerías externas.
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-indigo-600/20">
          Explorar Métricas
        </button>
      </div>
    </div>
  );
}