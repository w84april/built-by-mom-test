import { Header } from './components/header';
import { SendTokenForm } from './components/send-token-form';

export default function Home() {
  return (
    <main className="h-full min-h-full flex flex-col">
      <Header />
      <SendTokenForm />
    </main>
  );
}
