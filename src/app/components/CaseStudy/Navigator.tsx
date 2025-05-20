import { CaseStudyContent, CaseStudyDynamicContent } from '@libs/interfaces';
import Link from 'next/link';

interface Props {
  content: CaseStudyContent[];
  dynamic_content: CaseStudyDynamicContent[];
}

export default function Navigator({ content, dynamic_content }: Props) {
  return (
    <aside className='fixed top-40 right-20 h-lvh hidden lg:visible'>
      <ul className='styled-list'>
        {content.map((item, index) => (
          <li key={`case-study-nav-content-item-${index}`} className='p-4'>
            <Link className='hover:text-accent' href={`#${item.name}`}>
              {item.title}
            </Link>
          </li>
        ))}
        {dynamic_content.map((item, index) => (
          <li key={`case-study-nav-dynamic-content-item-${index}`} className='p-4'>
            <Link className='hover:text-accent' href={`#${item.name}`}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
