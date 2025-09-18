import { useEffect, useState } from 'react';
import api from '../services/api';
import { CreateDemandForm } from '../components/CreateDemandForm';
import { CreateProviderForm } from '../components/CreateProviderForm'; 
import { DemandsList } from '../components/DemandsList';


interface Provider {
  id: string;
  companyName: string;
}
interface Demand {
  id: string;
  title: string;
  status: string;
  provider: Provider;
  description: string; 
  providerId: string;  
}

export function HomePage() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]); 

  async function fetchDemands() {
    const response = await api.get('/demands');
    setDemands(response.data);
  }

  
  async function fetchProviders() {
    const response = await api.get('/providers');
    setProviders(response.data);
  }

  useEffect(() => {
    fetchDemands();
    fetchProviders(); 
  }, []);

  return (
    <>
      <h1>Gestão de Demandas de Provedores</h1>

      <div className="forms-container">
        <CreateProviderForm onProviderCreated={fetchProviders} />
        <CreateDemandForm providers={providers} onDemandCreated={fetchDemands} />
      </div>

      <hr />
      
      <DemandsList demands={demands} providers={providers} />
    </>
  );
}