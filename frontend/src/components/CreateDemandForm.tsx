import { useState } from 'react';
import api from '../services/api';

interface Provider {
  id: string;
  companyName: string;
}

interface CreateDemandFormProps {
  providers: Provider[]; 
  onDemandCreated: () => void;
}


export function CreateDemandForm({ providers, onDemandCreated }: CreateDemandFormProps) {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [providerId, setProviderId] = useState('');
  
  

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title || !description || !providerId) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await api.post('/demands', {
        title,
        description,
        providerId,
        type: 'Diagnóstico',
        status: 'Pendente',
      });

      alert('Demanda criada com sucesso!');
      
      setTitle('');
      setDescription('');
      setProviderId('');
      
      onDemandCreated();
    } catch (error) {
      console.error('Erro ao criar demanda:', error);
      alert('Erro ao criar demanda.');
    }
  }

  return (
    <div className="form-section">
      <h3>Registrar Nova Demanda</h3>
      <form onSubmit={handleSubmit}>
        <select value={providerId} onChange={e => setProviderId(e.target.value)} required>
          <option value="">Selecione um Provedor</option>

          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.companyName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Título da Demanda"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição detalhada"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button type="submit">Criar Demanda</button>
      </form>
    </div>
  );
}