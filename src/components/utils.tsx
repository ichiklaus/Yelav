import * as React from 'react';
import { useId } from 'react';

function splitLine(content: string | null) {
  // Split the content by new lines and map it to JSX
  if (!content) return;

  const lines = content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      <p>{line}</p>
    </React.Fragment>
  ));

  return <>{lines}</>;
}

function renderContentType({
  type,
  content,
}: {
  type: string;
  content: string | string[];
}) {
  if (type === 'p') {
    return <p>{content === 'string' ? splitLine(content) : content}</p>;
  } else if (type === 'ul' && typeof content === 'object') {
    return (
      <ol className='styled-list'>
        {content.map((item) => (
          <li key={useId()}>{item}</li>
        ))}
      </ol>
    );
  }
}

function addLeadingZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export { splitLine, renderContentType, addLeadingZero };
