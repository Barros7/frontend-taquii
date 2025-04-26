import React from 'react';
import { plans } from '../../types/PlanTypes';
import styles from './PricingPlans.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PricingPlans: React.FC = () => {
  return (
    <section id="planos" className={styles.pricingSection}>
      <h2 className={styles.sectionTitle}>Planos</h2>
      <p className={styles.sectionSubtitle}>Temos planos que se encaixam para cada cenário.</p>

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
            <button className={styles.startButton}>Começar</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlans;