"use client"

import React, { useState } from 'react';
import styles from './settings.module.css';

// 1. Definição das Interfaces para os estados
interface WorkingHours {
  monday: { start: string; end: string; };
  tuesday: { start: string; end: string; };
  wednesday: { start: string; end: string; };
  thursday: { start: string; end: string; };
  friday: { start: string; end: string; };
  saturday: { start: string; end: string; };
  sunday: { start: string; end: string; };
}

interface BusinessProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  workingHours: WorkingHours;
}

interface Notifications {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  marketingEmails: boolean;
  newClientAlerts: boolean;
}

interface PaymentSettings {
  currency: string;
  taxRate: number;
  allowOnlinePayments: boolean;
  paymentMethods: string[];
}


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: 'Salão da Maria',
    email: 'contato@salaodamaria.com',
    phone: '+244 912 345 678',
    address: 'Rua Principal, 123 - Luanda',
    description: 'Salão de beleza especializado em cortes modernos e tratamentos capilares.',
    workingHours: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: { start: '', end: '' }
    }
  });

  const [notifications, setNotifications] = useState<Notifications>({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    marketingEmails: false,
    newClientAlerts: true
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    currency: 'AOA',
    taxRate: 14,
    allowOnlinePayments: true,
    paymentMethods: ['cash', 'card', 'transfer']
  });

  // Tipagem explícita para field e value
  const handleProfileChange = <K extends keyof BusinessProfile>(field: K, value: BusinessProfile[K]) => {
    setBusinessProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkingHoursChange = (day: keyof WorkingHours, field: 'start' | 'end', value: string) => {
    setBusinessProfile(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleNotificationChange = (setting: keyof Notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Tipagem explícita para field e value em paymentSettings
  const handlePaymentChange = <K extends keyof PaymentSettings>(field: K, value: PaymentSettings[K]) => {
    setPaymentSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <h1>Configurações</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Perfil do Negócio
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notificações
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'payments' ? styles.active : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Pagamentos
          </button>
        </div>

        <div className={styles.settingsContent}>
          {activeTab === 'profile' && (
            <div className={styles.section}>
              <h2>Perfil do Negócio</h2>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Nome do Negócio</label>
                  <input 
                    type="text"
                    value={businessProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input 
                    type="email"
                    value={businessProfile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Telefone</label>
                  <input 
                    type="tel"
                    value={businessProfile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Endereço</label>
                  <input 
                    type="text"
                    value={businessProfile.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Descrição</label>
                  <textarea 
                    value={businessProfile.description}
                    onChange={(e) => handleProfileChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <h3>Horário de Funcionamento</h3>
                {Object.entries(businessProfile.workingHours).map(([day, hours]) => (
                  <div key={day} className={styles.workingHours}>
                    <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                    <div className={styles.timeInputs}>
                      <input 
                        type="time"
                        value={hours.start}
                        onChange={(e) => handleWorkingHoursChange(day as keyof WorkingHours, 'start', e.target.value)}
                        disabled={day === 'sunday'}
                      />
                      <span>até</span>
                      <input 
                        type="time"
                        value={hours.end}
                        onChange={(e) => handleWorkingHoursChange(day as keyof WorkingHours, 'end', e.target.value)}
                        disabled={day === 'sunday'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.section}>
              <h2>Notificações</h2>
              <div className={styles.notificationSettings}>
                {Object.entries(notifications).map(([setting, value]) => (
                  <div key={setting} className={styles.notificationOption}>
                    <label>
                      <input 
                        type="checkbox"
                        checked={value as boolean} // Casting to boolean as Object.entries returns [string, unknown]
                        onChange={() => handleNotificationChange(setting as keyof Notifications)}
                      />
                      <span>{setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className={styles.section}>
              <h2>Configurações de Pagamento</h2>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Moeda</label>
                  <select 
                    value={paymentSettings.currency}
                    onChange={(e) => handlePaymentChange('currency', e.target.value)}
                  >
                    <option value="AOA">AOA - Kwanza Angolano</option>
                    <option value="USD">USD - Dólar Americano</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Taxa de Imposto (%)</label>
                  <input 
                    type="number"
                    value={paymentSettings.taxRate}
                    onChange={(e) => handlePaymentChange('taxRate', parseFloat(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>
                    <input 
                      type="checkbox"
                      checked={paymentSettings.allowOnlinePayments}
                      onChange={(e) => handlePaymentChange('allowOnlinePayments', e.target.checked)}
                    />
                    Permitir Pagamentos Online
                  </label>
                </div>
                <div className={styles.formGroup}>
                  <label>Métodos de Pagamento Aceitos</label>
                  <div className={styles.paymentMethods}>
                    <label>
                      <input 
                        type="checkbox"
                        checked={paymentSettings.paymentMethods.includes('cash')}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...paymentSettings.paymentMethods, 'cash']
                            : paymentSettings.paymentMethods.filter(m => m !== 'cash');
                          handlePaymentChange('paymentMethods', methods);
                        }}
                      />
                      Dinheiro
                    </label>
                    <label>
                      <input 
                        type="checkbox"
                        checked={paymentSettings.paymentMethods.includes('card')}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...paymentSettings.paymentMethods, 'card']
                            : paymentSettings.paymentMethods.filter(m => m !== 'card');
                          handlePaymentChange('paymentMethods', methods);
                        }}
                      />
                      Cartão
                    </label>
                    <label>
                      <input 
                        type="checkbox"
                        checked={paymentSettings.paymentMethods.includes('transfer')}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...paymentSettings.paymentMethods, 'transfer']
                            : paymentSettings.paymentMethods.filter(m => m !== 'transfer');
                          handlePaymentChange('paymentMethods', methods);
                        }}
                      />
                      Transferência
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button className={styles.saveButton}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
