"use client"

import React, { useState } from 'react';
import styles from './profile.module.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '+244 912 345 678',
    role: 'Proprietária',
    bio: 'Especialista em cortes modernos e tratamentos capilares com mais de 10 anos de experiência.',
    specialties: ['Corte de Cabelo', 'Coloração', 'Tratamentos Capilares'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvailabilityChange = (day) => {
    setEditedProfile(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: !prev.availability[day]
      }
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h1>Meu Perfil</h1>
        {!isEditing ? (
          <button 
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Editar Perfil
          </button>
        ) : (
          <div className={styles.editActions}>
            <button 
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button 
              className={styles.saveButton}
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        )}
      </div>

      <div className={styles.profileContent}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              <span>{profile.name.charAt(0)}</span>
            </div>
            <div className={styles.profileInfo}>
              <h2>{profile.name}</h2>
              <p className={styles.role}>{profile.role}</p>
            </div>
          </div>

          <div className={styles.profileDetails}>
            <div className={styles.detailGroup}>
              <h3>Informações Pessoais</h3>
              {isEditing ? (
                <>
                  <div className={styles.formGroup}>
                    <label>Nome</label>
                    <input 
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input 
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Telefone</label>
                    <input 
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Email</span>
                    <span className={styles.value}>{profile.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Telefone</span>
                    <span className={styles.value}>{profile.phone}</span>
                  </div>
                </>
              )}
            </div>

            <div className={styles.detailGroup}>
              <h3>Biografia</h3>
              {isEditing ? (
                <div className={styles.formGroup}>
                  <textarea 
                    value={editedProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                </div>
              ) : (
                <p className={styles.bio}>{profile.bio}</p>
              )}
            </div>

            <div className={styles.detailGroup}>
              <h3>Especialidades</h3>
              {isEditing ? (
                <div className={styles.formGroup}>
                  <input 
                    type="text"
                    value={editedProfile.specialties.join(', ')}
                    onChange={(e) => handleInputChange('specialties', e.target.value.split(', '))}
                    placeholder="Digite as especialidades separadas por vírgula"
                  />
                </div>
              ) : (
                <div className={styles.specialties}>
                  {profile.specialties.map((specialty, index) => (
                    <span key={index} className={styles.specialtyTag}>
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.detailGroup}>
              <h3>Disponibilidade</h3>
              <div className={styles.availability}>
                {Object.entries(profile.availability).map(([day, available]) => (
                  <div key={day} className={styles.availabilityDay}>
                    {isEditing ? (
                      <label>
                        <input 
                          type="checkbox"
                          checked={editedProfile.availability[day]}
                          onChange={() => handleAvailabilityChange(day)}
                        />
                        <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                      </label>
                    ) : (
                      <>
                        <span className={styles.dayName}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>
                        <span className={`${styles.status} ${available ? styles.available : styles.unavailable}`}>
                          {available ? 'Disponível' : 'Indisponível'}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>Estatísticas</h3>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>156</span>
                <span className={styles.statLabel}>Agendamentos</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>4.8</span>
                <span className={styles.statLabel}>Avaliação</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>45</span>
                <span className={styles.statLabel}>Clientes</span>
              </div>
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Conta</h3>
            <div className={styles.accountActions}>
              <button className={styles.accountButton}>
                Alterar Senha
              </button>
              <button className={styles.accountButton}>
                Configurações de Notificação
              </button>
              <button className={styles.accountButton}>
                Privacidade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 