'use client';
import { Form, Formik } from 'formik';

export const SendTokenForm = () => {
  const initialValues = {
    address: '',
    amount: 0,
  };
  return (
    <div className="flex h-full flex-col grow items-center justify-center p-24">
      <div className="bg-white p-12 rounded-3xl shadow-md max-w-lg w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className="space-y-6" id={'send-token-form'}>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Recipient Address/ENS Name
                </label>
                <div className="mt-2">
                  <input
                    name="address"
                    required
                    value={values.address}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 !outline-none sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Amount
                  </label>
                  <div className="flex gap-1">
                    <button className="rounded-md bg-pink-400 px-1.5 py-1 text-sm text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-pink-400">
                      25%
                    </button>
                    <button className="rounded-md bg-pink-400 px-1.5 py-1 text-sm text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-pink-400">
                      50%
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    name="amount"
                    required
                    value={values.amount}
                    onChange={handleChange}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 !outline-none sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

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
