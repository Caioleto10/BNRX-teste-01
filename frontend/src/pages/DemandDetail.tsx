import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CreateActionForm } from '../components/CreateActionForm';

interface Provider {
  companyName: string;
}
interface Action {
  id: string;
  description: string;
  technicianName: string;
  createdAt: string;
}
interface Demand {
  id: string;
  title: string;
  description: string;
  status: string;
  provider: Provider;
  actions: Action[];
}

export function DemandDetail() {
  const { id } = useParams<{ id: string }>();
  const [demand, setDemand] = useState<Demand | null>(null);

  async function fetchDemandDetail() {
    try {
      const response = await api.get(`/demands/${id}`);
      setDemand(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da demanda:', error);
      alert('Demanda não encontrada.');
    }
  }

  useEffect(() => {
    fetchDemandDetail();
  }, [id]);

  async function handleUpdateStatus(newStatus: string) {
    if (!demand) return;

    try {
      await api.put(`/demands/${demand.id}`, { status: newStatus });
      alert('Status atualizado com sucesso!');
      fetchDemandDetail(); 
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Falha ao atualizar o status.');
    }
  }


  if (!demand) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="detail-container">
      <Link to="/">&larr; Voltar para a lista</Link>
      <h1>{demand.title}</h1>
      <p><strong>Provedor:</strong> {demand.provider.companyName}</p>
      <p className="status-indicator">
  <strong>Status: </strong>
  <span className={`status-badge status-${demand.status.toLowerCase().replace(' ', '-')}`}>
    {demand.status}
  </span>
</p>
      <p><strong>Descrição:</strong> {demand.description}</p>

      <div className="status-updater">
        <span>Alterar status para: </span>
        {demand.status === 'Pendente' && (
          <button onClick={() => handleUpdateStatus('Em Andamento')}>Em Andamento</button>
        )}
        {demand.status !== 'Concluída' && (
          <button onClick={() => handleUpdateStatus('Concluída')}>Concluída</button>
        )}
      </div>
      
      <hr />

      <CreateActionForm demandId={demand.id} onActionCreated={fetchDemandDetail} />
      
      <hr />

      <h2>Histórico de Ações</h2>
      <div className="actions-list">
        {demand.actions.length > 0 ? (
          demand.actions.map(action => (
            <div key={action.id} className="action-card">
              <p><strong>Técnico:</strong> {action.technicianName}</p>
              <p>{action.description}</p>
              <small>Em: {new Date(action.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>Nenhuma ação registrada para esta demanda.</p>
        )}
      </div>
    </div>
  );
}