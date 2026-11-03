export type ToolCategory = 'pdf' | 'image' | 'developer';

export interface ToolItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ToolCategory;
  path: string;
  icon: string;
  popular?: boolean;
  badge?: string;
  tags: string[];
}

export type ProcessingStatus = 'idle' | 'processing' | 'success' | 'error';

export interface FileItem {
  id: string;
  file: File;
  previewUrl?: string;
  size: number;
  name: string;
  type: string;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AdUnitConfig {
  enabled: boolean;
  publisherId: string;
  slots: {
    toolHeader?: string;
    toolSidebar?: string;
    toolFooter?: string;
    homeMiddle?: string;
  };
}

