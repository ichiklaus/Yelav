export interface CaseStudy {
  index: number;
  project_title: string;
  uid: string;
  ref: string;
  role: string[];
  stack: string[];
  project_type: string;
  duration: string;
  content: CaseStudyContent[];
  dynamic_content: CaseStudyDynamicContent[];
}

export interface CaseStudyContentLinks {
  url: string;
  name: string;
}

export interface CaseStudyContent {
  title: string;
  name: string;
  description: string;
  image_urls?: ImageMap[];
  links?: CaseStudyContentLinks[];
}

export interface CaseStudyDynamicContent {
  title: string;
  name: string;
  description: string | string[] | DescriptionExtended[];
  image_urls?: ImageMap[];
  links?: CaseStudyContentLinks[];
  steps?: CaseStudyDynamicContentSteps[];
}

export interface CaseStudyDynamicContentSteps {
  title: string;
  description: string | string[] | DescriptionExtended[];
  image_urls?: ImageMap[];
  showFinalVersion: boolean;
}

export type DescriptionExtended = {
  [key: string]: string | string[] | DescriptionExtendedItem;
};

export type DescriptionExtendedItem = {
  type: string;
  content: string | string[];
};

export interface ImageMap {
  alt: string;
  url: string;
}

export interface PortfolioLinks {
  repo?: {
    isExternal: boolean;
    url: string;
  };
  site?: {
    isExternal: boolean;
    url: string;
  };
  case_study?: {
    isExternal: boolean;
    url: string;
  };
}

export interface PortfolioProps {
  projects: Array<{
    index: number;
    uid: string;
    title: string;
    role: string;
    content: string;
    stack: string[];
    links: PortfolioLinks;
    img: string[];
  }>;
}
