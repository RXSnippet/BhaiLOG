/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Idea, DeveloperProject } from './types';

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'neural-link-bci',
    title: 'NeuralLink: Decentralized Brain-Computer Interface API',
    description: 'Developing a secure, privacy-first protocol for BCI data sharing among research labs. Looking for 2 Rust engineers and a Neurobiologist advisor.',
    problemStatement: 'Brain-Computer Interface data is highly sensitive and currently siloed across individual research teams. There is no open, encrypted channel to share training sets globally, which slows diagnostic models down.',
    status: 'HIGH PRIORITY',
    upvotes: 1240,
    hasUpvoted: false,
    category: 'AI',
    tags: ['BCI', 'Rust', 'Cryptography', 'API'],
    author: {
      name: 'Dr. Raymond Carver',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Neuro-Engineering Lead'
    },
    createdAt: '1 day ago',
    activeContributorsCount: 4,
    needsRoles: ['2 Rust Engineers', '1 Neurobiologist Advisor'],
    roadmap: [
      'Define zero-knowledge schema for raw EEG telemetry pulses.',
      'Construct standard REST/gRPC handshake boundaries for local node pairing.',
      'Deploy testnet nodes with simulated telemetry sets.',
      'Initiate peer review with international neuroscience institutes.'
    ]
  },
  {
    id: 'sustainable-supply-chain',
    title: 'Sustainable Supply Chain AI',
    description: 'A logistics optimization tool that calculates carbon footprint per SKU in real-time using existing ERP datasets.',
    problemStatement: 'Global supply chains struggle to aggregate scope 3 emissions data dynamically, relying on slow quarterly estimates rather than active transactional calculations.',
    status: 'OPEN',
    upvotes: 482,
    hasUpvoted: false,
    category: 'AI',
    tags: ['AI', 'Logistics', 'Sustainability', 'ERP'],
    author: {
      name: 'Sarah Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Sustainability Czar'
    },
    createdAt: '3 days ago',
    activeContributorsCount: 1,
    needsRoles: ['ML Engineer', 'Fullstack Engineer'],
    roadmap: ['Map common ERP api outputs', 'Develop SKU carbon co-efficient model', 'Beta dashboard deployment']
  },
  {
    id: 'ecoswap-marketplace',
    title: 'EcoSwap Marketplace',
    description: 'Hyper-local app for swapping garden produce and zero-waste household items to reduce neighborhood landfill contributions.',
    problemStatement: 'Suburban communities generate massive organic waste from home gardens and throw away valuable household items simply due to a lack of immediate, high-trust hyper-local sharing frameworks.',
    status: 'IN DEVELOPMENT',
    upvotes: 256,
    hasUpvoted: false,
    category: 'App',
    tags: ['Mobile App', 'Sustainability', 'React Native'],
    author: {
      name: 'Marcus Thorne',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'Community Architect'
    },
    createdAt: '5 hours ago',
    activeContributorsCount: 3,
    needsRoles: ['React Native Expert', 'UI/UX Designer'],
    roadmap: ['Draft interactive Geo-fenced map logic', 'Define security/escrow rules', 'Launch closed beta']
  },
  {
    id: 'retro-gaming-engine',
    title: 'Retro-Gaming Engine',
    description: 'A modern C++ engine designed specifically for creating authentic 16-bit style games with zero-asset hot-reloading.',
    problemStatement: 'Modern game engines have high friction for developers who want to write nostalgic, highly structured pixel art titles without loading gigabytes of unused editor features.',
    status: 'CLAIMED',
    upvotes: 189,
    hasUpvoted: false,
    category: 'Web',
    tags: ['Gaming', 'Systems', 'C++', 'WebAssembly'],
    author: {
      name: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      role: 'Indie Game Dev'
    },
    createdAt: '2 days ago',
    activeContributorsCount: 2,
    needsRoles: ['C++ Audio Engineer', 'Lead Tech Artist'],
    roadmap: ['Refine Vulkan rendering bindings', 'Implement tilemap asset interpreter', 'Assemble standard template project']
  },
  {
    id: 'privacy-first-crm',
    title: 'Privacy-First CRM',
    description: 'A CRM tool that uses zero-knowledge proofs to store customer data, ensuring complete regulatory compliance without local risk.',
    problemStatement: 'Small-to-medium businesses leak private customer communications or violate GDPR requirements because of standard centralized storage risks.',
    status: 'OPEN',
    upvotes: 734,
    hasUpvoted: false,
    category: 'Web',
    tags: ['Web', 'Privacy', 'Cryptography', 'Next.js'],
    author: {
      name: 'Elena Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      role: 'Privacy Advocate'
    },
    createdAt: '1 week ago',
    activeContributorsCount: 1,
    needsRoles: ['ZKP Researcher', 'Next.js UI Builder'],
    roadmap: ['Integrate zk-SNARKS logic on client database layers', 'Design CRM dashboard layouts', 'Construct CSV data exporter']
  },
  {
    id: 'nextgen-education-portal',
    title: 'NextGen Education Portal',
    description: 'An immersive AR-based educational platform that turns history lessons into interactive 3D field trips. We have secured initial partnerships with 3 museums.',
    problemStatement: 'Remote education feels flat and disengaged. Traditional history curricula struggle to engage digital-native teenagers through printed text and simple 2D screen portals.',
    status: 'HIGH PRIORITY',
    upvotes: 912,
    hasUpvoted: false,
    category: 'Social',
    tags: ['EdTech', 'AR/VR', 'Education', '3D UI'],
    author: {
      name: 'Prof. Julia Roberts',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Curriculum Director'
    },
    createdAt: '10 hours ago',
    activeContributorsCount: 11,
    needsRoles: ['Three.js Developer', '3D Character Modeler', 'K-12 Educational Advisor'],
    roadmap: ['Prototype immersive Colosseum tour model', 'Optimize VR browser compression rules', 'Run sandbox test with partner museum'],
    collaborators: [
      { name: 'Sarah Chen', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
      { name: 'Marcus Thorne', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Alex Rivera', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' }
    ]
  },
  {
    id: 'neuralpath-ai-roadmap',
    title: 'NeuralPath: AI-Driven Learning Roadmap',
    description: 'A browser extension that generates personalized, interactive learning paths for any documentation site using local context analysis.',
    problemStatement: 'Engineers landing on massive documentation sites face "information dread," struggling to locate the sequential concepts relevant to their custom skill targets.',
    status: 'HIGH PRIORITY',
    upvotes: 482,
    hasUpvoted: false,
    category: 'Web',
    tags: ['React', 'OpenAI API', 'TypeScript', 'Intermediate'],
    author: {
      name: 'Clara Oswald',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      role: 'Technical Educator'
    },
    createdAt: '2 days ago',
    activeContributorsCount: 6,
    needsRoles: ['Chrome Extension Specialist', 'Copywriter'],
    roadmap: ['Document scraping algorithm refinement', 'Connect custom API proxies', 'Design interactive visual path overlay']
  },
  {
    id: 'rust-asset-sync',
    title: 'Rust-based Real-time Asset Sync',
    description: 'High-performance synchronization engine for creative teams working with large 3D assets across different locations.',
    problemStatement: '3D modeling files are heavy and suffer slow network pipelines, holding up team collaboration and causing version conflicts.',
    status: 'IN DEVELOPMENT',
    upvotes: 215,
    hasUpvoted: false,
    category: 'Web',
    tags: ['Rust', 'gRPC', 'Expert', '3D Graphics'],
    author: {
      name: 'James Watson',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      role: 'Systems Architect'
    },
    createdAt: '5 hours ago',
    activeContributorsCount: 4,
    needsRoles: ['2 Backend (Rust)', '1 DevOps Specialist'],
    roadmap: ['Optimize delta-compression algorithms', 'Build gRPC signaling server', 'Docker container architecture validation']
  },
  {
    id: 'sustainable-logistics-api',
    title: 'Sustainable Logistics API',
    description: 'An open-source API for calculating and optimizing the carbon footprint of last-mile delivery routes.',
    problemStatement: 'Small delivery companies want to offset logistics footprints but lack a simple, free-to-integrate carbon-routing model.',
    status: 'OPEN',
    upvotes: 89,
    hasUpvoted: false,
    category: 'App',
    tags: ['Python', 'FastAPI', 'Beginner Friendly', 'Logistics'],
    author: {
      name: 'Mia Wong',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
      role: 'Green Advocate'
    },
    createdAt: '12 minutes ago',
    activeContributorsCount: 12,
    needsRoles: ['Python Dev', 'GeoData Analyst'],
    roadmap: ['Integrate OpenStreetMap data', 'Calculate standard diesel coefficients', 'Release public REST endpoint']
  }
];

export const INITIAL_MY_PROJECTS: DeveloperProject[] = [
  {
    id: 'dev-connect-cli',
    title: 'DevConnect CLI',
    status: 'IN PROGRESS',
    progress: 65,
    milestone: 'Milestone 4'
  },
  {
    id: 'auth-guard-sdk',
    title: 'AuthGuard SDK',
    status: 'PLANNING',
    progress: 5,
    milestone: 'Kickoff Soon'
  }
];

export const SKILL_SPOTLIGHT = [
  'WebAssembly',
  'GraphQL',
  'Solidity',
  'PyTorch',
  'Next.js 14',
  'Three.js',
  'Rust',
  'Tailwind v4'
];

export const APP_STATS = {
  ideasPitched: '1,240+',
  buildersActive: '850+',
  projectsLaunched: '420',
  fundingRaised: '$2.4M'
};
