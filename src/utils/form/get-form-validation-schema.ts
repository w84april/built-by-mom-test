import * as Yup from 'yup';

export const getFormValidationSchema = () =>
  Yup.object().shape({
    address: Yup.string().required('Required'),
    amount: Yup.number().moreThan(0, 'Must be higher than 0').required('Required'),
    token: Yup.string().required('Required'),
  });
