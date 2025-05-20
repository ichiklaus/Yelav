import { CaseStudy } from '@libs/interfaces';
import Navigator from './Navigator';

interface Props {
  data: CaseStudy;
}

export default function Overview({ data }: Props) {
  return (
    <section className='h-lvh w-full xl:w-1/2 mx-auto flex flex-col justify-center'>
      <h1 className='mb-8'>{data.project_title}</h1>

      <div className='text-left lg:px-10'>
        <div className='flex justify-stretch gap-x-6'>
          <p className='font-bold'>Role</p>
          <div>
            {data.role.map((item, index) => (
              <p key={`role-${index}`}>{item}</p>
            ))}
          </div>
        </div>
        <div className='flex justify-stretch gap-x-6'>
          <p className='font-bold'>Tools</p>
          <div>
            {data.stack.map((item, index) => (
              <p key={`stack-${index}`}>{item}</p>
            ))}
          </div>
        </div>
        <div className='flex justify-stretch gap-x-6'>
          <p className='font-bold'>Project Type</p>
          <p> {data.project_type}</p>
        </div>
      </div>
    </section>
  );
}
