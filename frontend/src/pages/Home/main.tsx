/**
 * @page HomePage
 * @summary Home page - welcome screen
 * @domain core
 * @type page-component
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sistema de Provas de Geografia</h1>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma de avaliação para alunos do 6º ano do Ensino Fundamental
        </p>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bem-vindo!</h2>
          <p className="text-gray-600 mb-6">
            Este sistema permite a criação, aplicação e correção de provas de geografia com recursos
            multimídia e análise de desempenho.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-primary-700 mb-2">Criar Provas</h3>
              <p className="text-sm text-gray-600">
                Monte avaliações personalizadas com banco de questões
              </p>
            </div>
            <div className="p-4 bg-secondary-50 rounded-lg">
              <h3 className="font-semibold text-secondary-700 mb-2">Aplicar Online</h3>
              <p className="text-sm text-gray-600">
                Aplique provas digitalmente com recursos multimídia
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Analisar Resultados</h3>
              <p className="text-sm text-gray-600">
                Acompanhe o desempenho com relatórios detalhados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
