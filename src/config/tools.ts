import { ToolItem } from '../types';

export const TOOLS: ToolItem[] = [
  // PDF Tools
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    shortDescription: 'Convert JPG, PNG, WebP images to high-quality PDF files instantly.',
    fullDescription: 'Combine single or multiple images into a clean, organized PDF document. Customize page orientation, paper sizing (A4, Letter, Fit to Image), and margins with 100% private in-browser generation.',
    category: 'pdf',
    path: '/tools/image-to-pdf',
    icon: 'Images',
    popular: true,
    badge: 'Popular',
    tags: ['image', 'pdf', 'converter', 'jpg to pdf', 'png to pdf', 'document']
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    shortDescription: 'Combine multiple PDF documents into a single organized file in seconds.',
    fullDescription: 'Merge two or more PDF files seamlessly. Reorder your documents with intuitive drag-and-drop or order controls and download one unified PDF. Fast and secure, processed entirely inside your browser.',
    category: 'pdf',
    path: '/tools/merge-pdf',
    icon: 'Combine',
    popular: true,
    badge: 'Fast',
    tags: ['pdf', 'merge', 'combine', 'join', 'document']
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    shortDescription: 'Extract specific pages or split your PDF into individual separate documents.',
    fullDescription: 'Extract a single page, a custom page range (e.g. 1-3, 5), or split every single page into separate downloadable PDF files with optional one-click ZIP packaging.',
    category: 'pdf',
    path: '/tools/split-pdf',
    icon: 'Scissors',
    popular: false,
    tags: ['pdf', 'split', 'extract', 'pages', 'document', 'cut']
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    shortDescription: 'Reduce PDF file size by stripping metadata and optimizing document structure.',
    fullDescription: 'Optimize PDF files to reduce storage footprints for email attachments and web upload limits. Utilizes genuine client-side PDF stream optimization and metadata stripping with transparent explanations of document structure.',
    category: 'pdf',
    path: '/tools/compress-pdf',
    icon: 'FileArchive',
    popular: true,
    tags: ['pdf', 'compress', 'reduce size', 'optimize', 'shrink']
  },

  // Image Tools
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    shortDescription: 'Compress JPG, PNG, and WebP images with adjustable quality without visible loss.',
    fullDescription: 'Drastically reduce image file sizes while preserving crisp visual fidelity. Features real-time interactive quality sliders, dimension scaling, before-and-after file size comparisons, and instant downloads.',
    category: 'image',
    path: '/tools/image-compressor',
    icon: 'Minimize2',
    popular: true,
    badge: 'Must Have',
    tags: ['image', 'compress', 'optimize', 'shrink', 'jpg', 'png', 'webp', 'size']
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    shortDescription: 'Resize images by pixel dimensions or percentages with aspect ratio lock.',
    fullDescription: 'Quickly resize pictures for social media, avatars, websites, or email signatures. Toggle aspect ratio constraints, choose output formats (PNG, JPEG, WebP), and set exact dimensions.',
    category: 'image',
    path: '/tools/image-resizer',
    icon: 'Maximize2',
    popular: false,
    tags: ['image', 'resize', 'scale', 'dimensions', 'width', 'height']
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG Converter',
    shortDescription: 'Convert JPG/JPEG images to lossless PNG format directly in your browser.',
    fullDescription: 'Convert standard JPG photos into clean, lossless PNG format with high fidelity. Perfect for preserving raster graphics without generational compression artifacts.',
    category: 'image',
    path: '/tools/jpg-to-png',
    icon: 'FileType',
    popular: false,
    tags: ['jpg', 'png', 'converter', 'image format']
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG Converter',
    shortDescription: 'Convert PNG images to compact JPG format with customizable background color.',
    fullDescription: 'Transform heavy PNG graphics into lightweight JPG files. Choose your background fill color (white, black, or custom hex) for transparent areas and fine-tune output quality.',
    category: 'image',
    path: '/tools/png-to-jpg',
    icon: 'FileImage',
    popular: false,
    tags: ['png', 'jpg', 'jpeg', 'converter', 'transparent to jpg']
  },

  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDescription: 'Format, validate, beautify, and minify JSON data with instant error detection.',
    fullDescription: 'Clean up ugly minified JSON strings or validate nested payloads. Features 2-space, 4-space, and tab indentation, one-click minification, sample data presets, copy to clipboard, and instant syntax error line detection.',
    category: 'developer',
    path: '/tools/json-formatter',
    icon: 'Code2',
    popular: true,
    badge: 'Popular',
    tags: ['json', 'formatter', 'validator', 'beautify', 'minify', 'developer']
  },
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    shortDescription: 'Encode and decode plain text or binary files to and from Base64 strings.',
    fullDescription: 'Convert UTF-8 text or upload small images and binary files to generate standard Base64 data URIs. Decode Base64 strings back to readable text or preview decoded image files instantly.',
    category: 'developer',
    path: '/tools/base64-encoder-decoder',
    icon: 'Binary',
    popular: true,
    tags: ['base64', 'encode', 'decode', 'binary', 'text', 'developer', 'data uri']
  }
];

export const CATEGORIES = [
  {
    id: 'pdf' as const,
    name: 'PDF Tools',
    path: '/pdf-tools',
    description: 'Convert, merge, split, and compress PDF documents securely in your browser.',
    icon: 'FileText',
    color: 'from-blue-600 to-indigo-600',
    count: 4
  },
  {
    id: 'image' as const,
    name: 'Image Tools',
    path: '/image-tools',
    description: 'Compress, resize, and convert images between JPG and PNG without loss.',
    icon: 'ImageIcon',
    color: 'from-indigo-600 to-violet-600',
    count: 4
  },
  {
    id: 'developer' as const,
    name: 'Developer Tools',
    path: '/developer-tools',
    description: 'Format JSON, encode Base64 strings, and streamline everyday coding tasks.',
    icon: 'Code',
    color: 'from-violet-600 to-purple-600',
    count: 2
  }
];

