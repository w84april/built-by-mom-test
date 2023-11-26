import { ReactNode } from 'react';
import { TopNav } from './top-nav';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="sticky top-0">
        <TopNav />
      </div>
      <main className="relative flex flex-col grow">{children}</main>
    </>
  );
};
