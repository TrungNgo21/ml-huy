import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploader } from './image-uploader';

interface TabsContainerProps {
  children?: React.ReactNode;
}

export function TabsContainer({ children }: TabsContainerProps) {
  return (
    <Tabs defaultValue='task1' className='w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='task1'>Task 1</TabsTrigger>
        <TabsTrigger value='task2'>Task 2</TabsTrigger>
        <TabsTrigger value='task3'>Task 3</TabsTrigger>
      </TabsList>
      <TabsContent value='task1' className='mt-6'>
        <div className='rounded-lg border p-4'>
          <h2 className='text-lg font-semibold mb-4'>
            Task 1: Disease Detection
          </h2>
          <ImageUploader
            endpoint='https://desktop-63tcgu5.tail2cfad2.ts.net/task1/predict'
            isTask3={false}
          />
        </div>
      </TabsContent>
      <TabsContent value='task2' className='mt-6'>
        <div className='rounded-lg border p-4'>
          <h2 className='text-lg font-semibold mb-4'>
            Task 2: Disease Detection
          </h2>
          <ImageUploader
            endpoint='https://desktop-63tcgu5.tail2cfad2.ts.net/task2/predict'
            isTask3={false}
          />
        </div>
      </TabsContent>
      <TabsContent value='task3' className='mt-6'>
        <div className='rounded-lg border p-4'>
          <h2 className='text-lg font-semibold mb-4'>
            Task 3: Age prediction
          </h2>
          <ImageUploader
            endpoint='https://desktop-63tcgu5.tail2cfad2.ts.net/task3/predict'
            isTask3={true}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
