import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './ContactPage.scss';
import { IContactFormInputs } from '@interfaces/Contact/Contact.types';

export const ContactPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'page.ContactPage' });
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IContactFormInputs>();
  const [formSent, setFormSent] = useState(false);

  const onSubmit = (data: IContactFormInputs) => {
    setFormSent(true);
    console.log(data);
  };

  const isFormValid = watch('name') && watch('dob') && watch('city') && watch('email') && watch('phone');

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('contactFormTitle')}</h2>

        <div className="form-group">
          <label htmlFor="name">{t('name')}</label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: t('nameRequired'),
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dob">{t('dob')}</label>
          <input
            type="date"
            id="dob"
            {...register('dob', { required: t('dobRequired') })}
          />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="city">{t('city')}</label>
          <input
            type="text"
            id="city"
            {...register('city', { required: t('cityRequired') })}
          />
          {errors.city && <p className="error">{errors.city.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: t('emailRequired'),
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: t('emailInvalid'),
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">{t('phone')}</label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              required: t('phoneRequired'),
              pattern: {
                value: /^(\+34|0034|34)?[6-9][0-9]{8}$/,
                message: t('phoneInvalid'),
              },
            })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        {formSent && <p className="success-message">{t('formSent')}</p>}

        <button type="submit" className="submit-button" disabled={!isFormValid}>
          {t('submit')}
        </button>
      </form>
    </div>
  );
};
