'use client';
import { Form, Formik } from 'formik';
import { FormSelectToken } from './form-parts/form-select-token';
import { useGetSupportedTokens } from '@/hooks/use-get-supported-tokens';
import { FormInput } from './form-parts/form-input';
import { useAccount } from 'wagmi';
import { useGetMultipleBalances } from '@/hooks/use-get-multiple-balances';
import { useIsMounted } from '@/hooks/use-is-mounted';

export const SendTokenForm = () => {
  const { address } = useAccount();

  const supportedTokens = useGetSupportedTokens();
  const selectOptions = supportedTokens.map((token) => ({
    value: token.address,
    title: token.symbol,
  }));

  const initialValues = {
    address: '',
    amount: 0,
    token: supportedTokens.at(0)?.address,
  };

  const { balances, isLoading, error } = useGetMultipleBalances({
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

              <FormInput
                name={'address'}
                value={values.address}
                label={'Recipient Address/ENS Name'}
                handleChange={handleChange}
              />

              <FormInput
                label="Amount"
                name={'amount'}
                value={values.amount}
                type="number"
                shouldDisplayPercentButtons
                handleChange={handleChange}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-pink-600"
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
