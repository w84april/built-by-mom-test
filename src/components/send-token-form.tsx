'use client';
import { Form, Formik } from 'formik';
import { FormSelectToken } from './form-parts/form-select-token';
import { useGetSupportedTokens } from '@/hooks/use-get-supported-tokens';
import { useAccount } from 'wagmi';
import { useGetMultipleBalances } from '@/hooks/use-get-multiple-balances';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { FormInputAddress } from './form-parts/form-input-address';
import { FormInputNumber } from './form-parts/form-input-number';
import { Button } from './common/button';
import { EvmAddress } from '@/types/common';

export type FormFields = { address: string; amount: number; token: EvmAddress | undefined };

export const SendTokenForm = () => {
  const { address } = useAccount();

  const supportedTokens = useGetSupportedTokens();
  const selectOptions = supportedTokens.map((token) => ({
    value: token.address,
    title: token.symbol,
  }));

  const initialValues: FormFields = {
    address: '',
    amount: 0,
    token: supportedTokens.at(0)?.address,
  };

  const { balances } = useGetMultipleBalances({
    address,
    tokens: supportedTokens,
  });

  const isMounted = useIsMounted(); // A hack to prevent hydration errors occuring in FormSelectToken

  return (
    <div className="flex h-full flex-col grow items-center justify-center p-24">
      <div className="bg-white p-12 rounded-3xl shadow-md max-w-lg w-full">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className="space-y-6" id={'send-token-form'}>
              <FormSelectToken
                name={'token'}
                label={'Token'}
                options={isMounted() ? selectOptions : []}
                balances={balances}
                handleChange={handleChange}
              />
              <FormInputAddress
                name={'address'}
                value={values.address}
                label={'Recipient Address/ENS Name'}
                handleChange={handleChange}
              />
              <FormInputNumber
                label="Amount"
                name={'amount'}
                value={values.amount}
                shouldDisplayPercentButtons
                handleChange={handleChange}
                balances={balances}
              />
              <Button type="submit" className="w-full">
                Send
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
