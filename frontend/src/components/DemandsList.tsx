import { useState } from 'react';
import { Link } from 'react-router-dom'; 

interface Provider {
  id: string;
  companyName: string;
}
interface Demand {
  id: string;
  title: string;
  description: string;
  status: string;
  provider: Provider;
  providerId: string;
}

interface DemandsListProps {
    demands: Demand[];
    providers: Provider[];
}

export function DemandsList({ demands, providers }: DemandsListProps) {

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProviderId, setSelectedProviderId] = useState('');

  const filteredDemands = demands.filter(demand => {
    const statusMatch = selectedStatus ? demand.status === selectedStatus : true;
    const providerMatch = selectedProviderId ? demand.providerId === selectedProviderId : true;
    return statusMatch && providerMatch;
  });

  return (
    <div className="demands-section">
      <h2>Demandas</h2>

      <div className="filters">
        <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
          <option value="">Filtrar por Status</option>
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluída">Concluída</option>
        </select>

        <select value={selectedProviderId} onChange={e => setSelectedProviderId(e.target.value)}>
          <option value="">Filtrar por Provedor</option>
          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.companyName}
            </option>
          ))}
        </select>
      </div>

      <div className="demands-list">
        {filteredDemands.length > 0 ? (
          filteredDemands.map(demand => (
            <Link to={`/demands/${demand.id}`} key={demand.id} className="demand-card-link">
              <div className="demand-card">
                <h3>{demand.title}</h3>
                <p><strong>Provedor:</strong> {demand.provider.companyName}</p>
                <div className="demand-status">
                <strong>Status:</strong>
                <span className={`status-badge status-${demand.status.toLowerCase().replace(' ', '-')}`}>
                    {demand.status}
                </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Nenhuma demanda encontrada com os filtros selecionados.</p>
        )}
      </div>
    </div>
  );
}