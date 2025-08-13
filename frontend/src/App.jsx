import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './setores/login/login.jsx';
import Home_lg from './setores/logistica/home/home.jsx';
import Rotas_lg from './setores/logistica/rotas/rotas.jsx';
import Checklist from './setores/logistica/checklist/checklist.jsx';
import Veiculos from './setores/logistica/veiculos/veiculos.jsx';
import Novo_Veiculo from './setores/logistica/cad_veiculos/cad_veiculos.jsx';
import VeiculoChecklists from "./setores/logistica/VeiculoChecklist/VeiculoChecklist.jsx";
import ChecklistDetalhe from './setores/logistica/ChecklistDetalhe/ChecklistDetalhe.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/logistica/home" element={<ProtectedRoute><Home_lg /></ProtectedRoute>} />
      <Route path="/logistica/rotas" element={<ProtectedRoute><Rotas_lg /></ProtectedRoute>} />
      <Route path="/logistica/veiculos" element={<ProtectedRoute><Veiculos /></ProtectedRoute>} />
      <Route path="/logistica/checklist" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
      <Route path="/logistica/novo_veiculo" element={<ProtectedRoute><Novo_Veiculo /></ProtectedRoute>} />
      <Route path="/logistica/veiculo/:placa" element={<VeiculoChecklists />} />
      <Route path="/logistica/checklist_detalhe/:id" element={<ProtectedRoute><ChecklistDetalhe /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
