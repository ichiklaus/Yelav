import { CaseStudyContentLinks } from '@libs/interfaces';

interface Props {
  links: CaseStudyContentLinks[] | undefined;
}

export default function ExternalLinks({ links }: Props) {
  return (
    <>
      {!links || links.length < 1 ? null : (
        <div className='mb-20'>
          <p>Previews:</p>
          <ul className='styled-list'>
            {links.map((link, index) => (
              <li key={`case-study-content-inks-${index}`}>
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
