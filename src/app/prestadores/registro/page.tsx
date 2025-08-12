"use client";

import React, { useMemo, useState } from 'react';
import { provinces } from '@/data/angolaLocations';
import PrestadoresHeader from '@/components/prestadores/PrestadoresHeader';
import { useRouter } from 'next/navigation';

export default function ProviderRegistrationFormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

  const municipalities = useMemo(() => {
    const prov = provinces.find(p => p.name === selectedProvince);
    return prov ? prov.municipalities : [];
  }, [selectedProvince]);

  const communes = useMemo(() => {
    const mun = municipalities.find(m => m.name === selectedMunicipality);
    return mun ? mun.communes : [];
  }, [municipalities, selectedMunicipality]);

  // neighborhoods list is not used in this version (bairro campo livre)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const raw = new FormData(form);
      const get = (k: string) => (raw.get(k)?.toString() || '').trim();

      const name = get('name');
      const email = get('email');
      const phone = get('phone').replace(/\D+/g, '');
      const password = get('password');
      const documentNumber = get('documentNumber');
      const nifNumber = get('nifNumber');
      const addressName = get('addressName');
      const state = get('state');
      const city = get('city');
      const commune = get('commune');
      const neighborhood = get('neighborhood');

      if (name.length < 3) throw new Error('Nome inválido');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('E-mail inválido');
      if (phone.length < 8) throw new Error('Telefone inválido');
      if (password.length < 6) throw new Error('Senha deve ter pelo menos 6 caracteres');
      if (!state || !city || !commune) throw new Error('Selecione Província, Município e Comuna');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      if (documentNumber) formData.append('documentNumber', documentNumber);
      if (nifNumber) formData.append('nifNumber', nifNumber);
      if (addressName) formData.append('addressName', addressName);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('commune', commune);
      if (neighborhood) formData.append('neighborhood', neighborhood);

      const profileImage = raw.get('profileImage') as File | null;
      const commercialCertificate = raw.get('commercialCertificate') as File | null;
      if (profileImage && profileImage.size) formData.append('profileImage', profileImage);
      if (commercialCertificate && commercialCertificate.size) formData.append('commercialCertificate', commercialCertificate);

      const response = await fetch('/api/v1/users/providers/register', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        
        // Mostrar mensagem de sucesso
        setSuccess(result.message || 'Prestador registrado com sucesso!');
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          router.push('/login?message=' + encodeURIComponent('Prestador registrado com sucesso! Faça login para continuar.'));
        }, 2000);
        
      } else {
        const data = await response.json().catch(() => ({ message: 'Erro ao registrar prestador' }));
        const message = (data as { message?: string }).message || 'Erro ao registrar prestador';
        throw new Error(message);
      }

      form.reset();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PrestadoresHeader />
      <div className="container py-5">
      <h1 className="mb-4" style={{ color: '#6b7280' }}>Registro de Prestador</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>Nome do Comerciante</label>
            <input name="name" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>E-mail do Comerciante</label>
            <input type="email" name="email" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>Telefone do Comerciante</label>
            <input name="phone" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>Senha do Comerciante</label>
            <input type="password" name="password" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>Número de BI/Passaporte do Representante Legal</label>
            <input name="documentNumber" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>NIF</label>
            <input name="nifNumber" className="form-control" />
          </div>
          

          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>Foto de Perfil</label>
            <input type="file" name="profileImage" className="form-control" accept="image/*" />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>Certidão Comercial (apenas empresa)</label>
            <input type="file" name="commercialCertificate" className="form-control" accept="image/*,.pdf" />
          </div>

          <hr className="mt-4" />
          <div className="col-12">
            <h5 style={{ color: '#6b7280' }}>Endereço do Prestador</h5>
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#6b7280' }}>Endereço</label>
            <input name="addressName" className="form-control" />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Bairro</label>
            <input name="neighborhood" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ color: '#6b7280' }}>Província</label>
            <select
              name="state"
              className="form-select"
              value={selectedProvince}
              onChange={(e) => { setSelectedProvince(e.target.value); setSelectedMunicipality(''); setSelectedCommune(''); }}
              required
            >
              <option value="" disabled>Selecione a província</option>
              {provinces.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ color: '#6b7280' }}>Município</label>
            <select
              name="city"
              className="form-select"
              value={selectedMunicipality}
              onChange={(e) => { setSelectedMunicipality(e.target.value); setSelectedCommune(''); }}
              required
              disabled={!selectedProvince}
            >
              <option value="" disabled>{selectedProvince ? 'Selecione o município' : 'Selecione a província primeiro'}</option>
              {municipalities.map(m => (
                <option key={m.name} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ color: '#6b7280' }}>Comuna</label>
            <select
              name="commune"
              className="form-select"
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              required
              disabled={!selectedMunicipality}
            >
              <option value="" disabled>{selectedMunicipality ? 'Selecione a comuna' : 'Selecione o município primeiro'}</option>
              {communes.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Registando...' : 'Fazer Registo'}
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}


