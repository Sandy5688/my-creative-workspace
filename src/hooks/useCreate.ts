'use client';

import { useState } from 'react';
import { CreatePayload, CreateResponse, Draft, Block } from '@/types/api';
import { generateId } from '@/lib/utils';

// Smart content templates based on keywords
const contentTemplates = {
  coffee: {
    heading: 'Artisan Coffee Experience',
    subheading: 'Where Every Cup Tells a Story',
    text: 'Discover our carefully curated selection of single-origin beans, roasted to perfection. From the misty highlands of Ethiopia to the volcanic soils of Colombia, each cup transports you to coffee paradise.',
    cta: 'Explore Our Menu',
    color: '#8B4513',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=600&fit=crop',
  },
  tech: {
    heading: 'Building The Future of Technology',
    subheading: 'Innovation Meets Excellence',
    text: 'Leveraging cutting-edge AI and cloud infrastructure to deliver scalable solutions. Our platform processes millions of requests daily with 99.99% uptime, trusted by Fortune 500 companies worldwide.',
    cta: 'Start Free Trial',
    color: '#0ea5e9',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
  },
  restaurant: {
    heading: 'Culinary Excellence Redefined',
    subheading: 'Farm-to-Table Dining Experience',
    text: 'Award-winning chefs craft seasonal menus using locally-sourced ingredients. Each dish is a masterpiece, combining traditional techniques with modern innovation to create unforgettable flavors.',
    cta: 'Reserve Your Table',
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop',
  },
  fitness: {
    heading: 'Transform Your Body & Mind',
    subheading: 'Personalized Training That Delivers Results',
    text: 'Science-backed workouts and nutrition plans tailored to your goals. Join thousands who have achieved remarkable transformations with our certified trainers and state-of-the-art facilities.',
    cta: 'Start Your Journey',
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop',
  },
  ecommerce: {
    heading: 'Shop The Latest Trends',
    subheading: 'Curated Collections for Modern Living',
    text: 'Discover premium products from top brands, all in one place. Free shipping on orders over $50, hassle-free returns, and exceptional customer service that puts you first.',
    cta: 'Shop Now',
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
  },
  saas: {
    heading: 'Streamline Your Workflow',
    subheading: 'The All-in-One Productivity Platform',
    text: 'Automate repetitive tasks, collaborate in real-time, and scale effortlessly. Trusted by over 10,000 teams worldwide to increase productivity by 40% on average.',
    cta: 'Get Started Free',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
  },
  default: {
    heading: 'Welcome to Your Creative Workspace',
    subheading: 'Where Ideas Come to Life',
    text: 'Transform your vision into reality with our intelligent platform. Whether you\'re building a brand, launching a product, or sharing your story, we provide the tools to make it extraordinary.',
    cta: 'Get Started',
    color: '#0ea5e9',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop',
  },
};

// Detect template based on keywords
function detectTemplate(prompt: string): typeof contentTemplates.default {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('espresso')) {
    return contentTemplates.coffee;
  }
  if (lower.includes('tech') || lower.includes('software') || lower.includes('ai') || lower.includes('startup')) {
    return contentTemplates.tech;
  }
  if (lower.includes('restaurant') || lower.includes('food') || lower.includes('dining') || lower.includes('chef')) {
    return contentTemplates.restaurant;
  }
  if (lower.includes('fitness') || lower.includes('gym') || lower.includes('workout') || lower.includes('health')) {
    return contentTemplates.fitness;
  }
  if (lower.includes('shop') || lower.includes('store') || lower.includes('ecommerce') || lower.includes('product')) {
    return contentTemplates.ecommerce;
  }
  if (lower.includes('saas') || lower.includes('platform') || lower.includes('productivity') || lower.includes('workflow')) {
    return contentTemplates.saas;
  }
  
  return contentTemplates.default;
}

export function useCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreatePayload): Promise<CreateResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get smart template based on prompt
      const template = detectTemplate(payload.prompt);
      const draftId = generateId();

      // Generate smart blocks based on template
      const mockBlocks: Block[] = [
        {
          id: generateId(),
          type: 'heading',
          content: template.heading,
          style: {
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: template.color,
            margin: '2rem 0 1rem',
          },
        },
        {
          id: generateId(),
          type: 'text',
          content: template.subheading,
          style: {
            fontSize: '1.5rem',
            textAlign: 'center',
            color: '#64748b',
            margin: '0 0 3rem',
            fontWeight: '500',
          },
        },
        {
          id: generateId(),
          type: 'image',
          content: template.image,
        },
        {
          id: generateId(),
          type: 'text',
          content: template.text,
          style: {
            fontSize: '1.125rem',
            textAlign: 'center',
            color: '#475569',
            margin: '3rem auto',
            padding: '0 2rem',
          },
        },
        {
          id: generateId(),
          type: 'text',
          content: `✨ ${template.cta}`,
          style: {
            fontSize: '1.25rem',
            textAlign: 'center',
            color: template.color,
            fontWeight: '600',
            padding: '1rem 2rem',
            backgroundColor: `${template.color}15`,
            borderRadius: '1rem',
            margin: '2rem auto',
          },
        },
      ];

      const previewData: Draft = {
        id: draftId,
        title: `${template.heading} - ${new Date().toLocaleDateString()}`,
        blocks: mockBlocks,
        lastEdited: new Date().toISOString(),
        status: 'draft',
        createdAt: new Date().toISOString(),
      };

      const response: CreateResponse = {
        success: true,
        draftId,
        previewData,
        message: '✨ Content generated successfully!',
      };

      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create draft';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { create, isLoading, error };
}