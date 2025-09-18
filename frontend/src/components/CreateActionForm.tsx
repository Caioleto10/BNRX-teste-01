import { useState } from 'react';
import api from '../services/api';

interface CreateActionFormProps {
  demandId: string;
  onActionCreated: () => void; 
}

export function CreateActionForm({ demandId, onActionCreated }: CreateActionFormProps) {
  const [description, setDescription] = useState('');
  const [technicianName, setTechnicianName] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!description || !technicianName) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      
      await api.post(`/demands/${demandId}/actions`, {
        description,
        technicianName,
      });

      alert('Ação registrada com sucesso!');
      setDescription('');
      setTechnicianName('');
      onActionCreated(); 
    } catch (error) {
      console.error('Erro ao registrar ação:', error);
      alert('Erro ao registrar ação.');
    }
  }

  return (
    <div className="form-section action-form">
      <h3>Adicionar Nova Ação</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Técnico"
          value={technicianName}
          onChange={e => setTechnicianName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição da ação realizada"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button type="submit">Registrar Ação</button>
      </form>
    </div>
  );
}