'use client';
import { FormSelectToken } from './form-parts/form-select-token';
import { getSupportedTokens } from '@/utils/token/get-supported-tokens';
import { useAccount, useNetwork } from 'wagmi';
import { useGetMultipleBalances } from '@/hooks/use-get-multiple-balances';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { FormInputAddress } from './form-parts/form-input-address';
import { FormInputNumber } from './form-parts/form-input-number';
import { FormSendButton } from './form-parts/form-send-button';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ErrorMessage } from './common/error-message';
import { useEffect, useMemo } from 'react';

export const SendTokenForm = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const supportedTokens = getSupportedTokens(chain?.id);
  const selectOptions = supportedTokens
    ? supportedTokens.map((token) => ({
        value: token.address,
        title: token.symbol,
      }))
    : [];

  const defaultValues = useMemo(
    () => ({
      recipient: '',
      amount: 0,
      token: supportedTokens.at(0)?.address,
    }),
    [supportedTokens],
  );

  const methods = useForm({ defaultValues, mode: 'onChange' });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const { balances } = useGetMultipleBalances({
    address,
    tokens: supportedTokens,
  });

  const isMounted = useIsMounted(); // A hack to prevent hydration errors occuring in FormSelectToken

  const onSubmit = (data: FieldValues) => console.log(data);

  // Reset form when network or account changes
  useEffect(() => {
    console.log('here');
    reset(defaultValues);
  }, [chain?.id, address, reset, defaultValues]);

  return (
    <div className="flex h-full flex-col grow items-center justify-center p-2 sm:p-24">
      <div className="bg-white p-12 rounded-3xl shadow-md sm:max-w-lg w-full max-w-full">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormSelectToken
                label={'Token'}
                name={'token'}
                options={isMounted() ? selectOptions : []}
                balances={balances}
              />
              <ErrorMessage error={errors.token} />
            </div>
            <div>
              <FormInputAddress label={'Address/ENS Name'} name={'recipient'} />
              <ErrorMessage error={errors.recipient} />
            </div>
            <div>
              <FormInputNumber
                label="Amount"
                name={'amount'}
                shouldDisplayPercentButtons
                balances={balances}
              />
              <ErrorMessage error={errors.amount} />
            </div>
            <FormSendButton balances={balances} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
