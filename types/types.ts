// types.ts

export interface Variant {
  id: number; // Variant IDs are numbers based on API
  sku: string;
  cost: number;
  price: number;
  title: string;
  options: number[]; // Array of IDs referring to options
  is_enabled: boolean;
  is_available: boolean;
  is_default?: boolean;
}

export interface OptionValue {
  id: number;
  title: string;
  colors?: string[]; // Optional for color codes
}

export interface Option {
  id: number;
  name: string;
  values: OptionValue[];
}

export interface Images {
  id: number;
  src: string;
  position: string;
  variant_ids: number[]; // IDs of variants the image is linked to
  alt?: string;
  is_default?: boolean;
}

export interface Product {
  id: string; // Product IDs are strings
  title: string;
  description: string;
  tags: string[];
  options: Option[];
  variants: Variant[];
  images: Images[];
  color?: OptionValue;
  imageSrc?: string;
  is_default?: boolean;
}

export interface PageProps {
  params?: Promise<{ id: string }>;
  searchParams?: Promise<any>; // If you use searchParams, ensure it's a Promise too
}
