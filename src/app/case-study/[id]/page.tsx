'use client';

import { CaseStudy } from '../../libs/interfaces';
import data from '../../data.json';
import * as React from 'react';
const case_studies: CaseStudy[] = data.case_studies;

import Overview from '@components/CaseStudy/Overview';
import Navigator from '@components/CaseStudy/Navigator';
import Content from '@components/CaseStudy/Content';
import DynamicContent from '@components/CaseStudy/DynamiContent';

interface DynamicRouteProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: DynamicRouteProps) {
  const currentCaseStudy = case_studies.filter(
    (item) => params.id === item.uid,
  )[0];
  return (
    <div className='app-container bg-body-black py-10 px-10'>
      <div className=''>
        <Navigator
          content={currentCaseStudy.content}
          dynamic_content={currentCaseStudy.dynamic_content}
        />
        <Overview data={currentCaseStudy} />
        <Content data={currentCaseStudy.content} />
        <DynamicContent data={currentCaseStudy.dynamic_content} />
      </div>
    </div>
  );
}
