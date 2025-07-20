import React from 'react';
import { plans } from '../../types/PlanTypes';
import styles from './HowAPPWork.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const HowAPPWork: React.FC = () => {
  return (
    <section id="como-funciona" className={styles.pricingSection}>
      <h2 className={styles.sectionTitle}>Como Funciona</h2>
      <p className={styles.sectionSubtitle}>4 passos simples para agendar qualquer serviço</p>

      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <div key={plan.id} className={styles.planCard}>
            <h3 className={styles.planName}>{plan.name}</h3>
            <p className={styles.planDescription}>{plan.description}</p>
            <div className={styles.planPrice}>
              <span className={styles.priceValue}>{plan.price}</span>
              <span className={styles.priceUnit}>{plan.priceUnit}</span>
            </div>
            <ul className={styles.featuresList}>
              {plan.features.map((feature, index) => (
                <li key={index} className={feature.included ? styles.featureIncluded : styles.featureExcluded}>
                  {feature.included ? <FaCheckCircle className={styles.featureIcon} /> : <FaTimesCircle className={styles.featureIcon} />}
                  {feature.text}
                </li>
              ))}
            </ul>
            <button className={styles.startButton}>Experimentar</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowAPPWork;