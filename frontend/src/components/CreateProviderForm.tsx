import { useState } from 'react';
import api from '../services/api';

interface CreateProviderFormProps {
  onProviderCreated: () => void; 
}

export function CreateProviderForm({ onProviderCreated }: CreateProviderFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!companyName || !contactName || !contactInfo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await api.post('/providers', {
        companyName,
        contactName,
        contactInfo,
      });

      alert('Provedor criado com sucesso!');
      
      
      setCompanyName('');
      setContactName('');
      setContactInfo('');
      
      onProviderCreated(); 
    } catch (error) {
      console.error('Erro ao criar provedor:', error);
      alert('Erro ao criar provedor.');
    }
  }

  return (
    <div className="form-section">
      <h3>Registrar Novo Provedor</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome Fantasia do Provedor"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome do Responsável"
          value={contactName}
          onChange={e => setContactName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Informação de Contato (email, telefone)"
          value={contactInfo}
          onChange={e => setContactInfo(e.target.value)}
          required
        />
        <button type="submit">Criar Provedor</button>
      </form>
    </div>
  );
}