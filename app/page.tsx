import { PageHeader } from '@/components/page-header';
import { TabsContainer } from '@/components/tabs-container';

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-8 max-w-4xl'>
      <PageHeader
        title='Multi-Task Application'
        description='Select a task from the tabs below'
      />
      <div className='mt-8'>
        <TabsContainer />
      </div>
    </main>
  );
}
