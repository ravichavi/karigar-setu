export type Product = {
  id: string;
  name: string;
  price: number;
  artisan: string;
  location: string;
  category: string;
  rating: number;
  description: string;
  material: string;
  craftType: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Handcrafted Blue Pottery",
    price: 899,
    artisan: "Ramesh Crafts",
    location: "Jaipur, Rajasthan",
    category: "Pottery",
    rating: 4.8,
    description:
      "Beautiful handcrafted blue pottery made by skilled local artisans using traditional techniques.",
    material: "Traditional Ceramic",
    craftType: "Blue Pottery",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000",
  },

  {
    id: "2",
    name: "Traditional Handwoven Bag",
    price: 699,
    artisan: "Meera Handlooms",
    location: "Varanasi, Uttar Pradesh",
    category: "Textiles",
    rating: 4.7,
    description:
      "A beautiful handwoven bag crafted by local artisans using traditional weaving techniques.",
    material: "Handwoven Fabric",
    craftType: "Handloom",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1000",
  },

  {
    id: "3",
    name: "Terracotta Decorative Pot",
    price: 549,
    artisan: "Mitti Art",
    location: "Khurja, Uttar Pradesh",
    category: "Decor",
    rating: 4.6,
    description:
      "Handcrafted terracotta pot made from natural clay and finished by skilled artisans.",
    material: "Terracotta",
    craftType: "Pottery",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1000",
  },

  {
    id: "4",
    name: "Handmade Tribal Jewellery",
    price: 1299,
    artisan: "Asha Creations",
    location: "Bastar, Chhattisgarh",
    category: "Jewellery",
    rating: 4.9,
    description:
      "Unique handmade tribal jewellery inspired by traditional Indian craftsmanship.",
    material: "Metal & Beads",
    craftType: "Tribal Jewellery",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000",
  },
];
