// Mock data untuk fitur komunitas dengan gambar real dari wardrobe
export const communityOutfits = [
  {
    id: 1,
    title: "Rainy Day Casual",
    description: "Comfortable and practical for light rain. Perfect for everyday activities!",
    image: "/images/wardrobe/tops/baju.png", // Menggunakan gambar outfit utama
    user: {
      id: 1,
      name: "Sarah Johnson",
      username: "sarahj_style",
      avatar: "/images/wardrobe/accessories/kacamata.png", // Placeholder avatar
      isVerified: true,
      followers: 1250,
      isFollowing: false
    },
    items: {
      top: { name: "Casual Top", image: "/images/wardrobe/tops/baju.png" },
      bottom: { name: "Casual Bottom", image: "/images/wardrobe/bottoms/celana_sport.png" },
      shoes: { name: "Comfortable Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
      accessory: { name: "Casual Accessory", image: "/images/wardrobe/accessories/kacamata.png"}
    },
    likes: 45,
    comments: 8,
    tags: ["casual", "rainy", "comfortable", "everyday"],
    occasion: "Casual",
    weather: 22,
    rating: 4.8,
    createdAt: "2024-06-09T10:30:00Z",
    isLiked: false,
    isSaved: false
  },
  {
    id: 2,
    title: "Urban Explorer",
    description: "Perfect for city walks in light rain. Stylish and practical urban outfit.",
    image: "/images/wardrobe/tops/hoodie_hitam.png",
    user: {
      id: 2,
      name: "Alex Urban",
      username: "alex_explorer",
      avatar: "/images/wardrobe/accessories/topi.png",
      isVerified: false,
      followers: 890,
      isFollowing: true
    },
    items: {
      top: { name: "Relaxed Hoodie", image: "/images/wardrobe/tops/hoodie_hitam.png" },
      bottom: { name: "Urban Bottom", image: "/images/wardrobe/bottoms/celana_skena.png" },
      shoes: { name: "Walking Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
      accessory: { name: "Urban Cap", image: "/images/wardrobe/accessories/topi.png" }
    },
    likes: 67,
    comments: 12,
    tags: ["urban", "casual", "hoodie", "streetwear"],
    occasion: "Casual",
    weather: 18,
    rating: 4.6,
    createdAt: "2024-06-09T08:15:00Z",
    isLiked: true,
    isSaved: false
  },
  {
    id: 3,
    title: "Professional Rainy Day",
    description: "Stay professional even in the rain. Perfect for business meetings.",
    image: "/images/wardrobe/tops/Kemeja.png",
    user: {
      id: 3,
      name: "Emily Professional",
      username: "emily_biz",
      avatar: "/images/wardrobe/accessories/kalung_emas.png",
      isVerified: true,
      followers: 2340,
      isFollowing: false
    },
    items: {
      top: { name: "Business Shirt", image: "/images/wardrobe/tops/Kemeja.png" },
      bottom: { name: "Formal Chinos", image: "/images/wardrobe/bottoms/celana_cino.png" },
      shoes: { name: "Professional Flats", image: "/images/wardrobe/shoes/flat_shoes.png" },
      accessory: { name: "Gold Necklace", image: "/images/wardrobe/accessories/kalung_emas.png" }
    },
    likes: 89,
    comments: 15,
    tags: ["professional", "business", "formal", "meeting"],
    occasion: "Business",
    weather: 16,
    rating: 4.9,
    createdAt: "2024-06-08T19:45:00Z",
    isLiked: false,
    isSaved: true
  },
  {
    id: 4,
    title: "Business Elegant",
    description: "Sophisticated look for business meetings. Classic and timeless style.",
    image: "/images/wardrobe/tops/baju.png",
    user: {
      id: 4,
      name: "Isabella Martinez",
      username: "bella_elegant",
      avatar: "/images/wardrobe/shoes/sepatu_hitam.png",
      isVerified: false,
      followers: 567,
      isFollowing: true
    },
    items: {
      top: { name: "Formal Top", image: "/images/wardrobe/tops/baju.png" },
      bottom: { name: "Business Chinos", image: "/images/wardrobe/bottoms/celana_cino.png" },
      shoes: { name: "Formal Shoes", image: "/images/wardrobe/shoes/sepatu_hitam.png" },
      accessory: { name: "Elegant Necklace", image: "/images/wardrobe/accessories/kalung_emas.png" }
    },
    likes: 34,
    comments: 6,
    tags: ["business", "elegant", "sophisticated", "formal"],
    occasion: "Business",
    weather: 20,
    rating: 4.7,
    createdAt: "2024-06-08T16:20:00Z",
    isLiked: false,
    isSaved: false
  },
  {
    id: 5,
    title: "Rainy Day Workout",
    description: "Stay active even when it's raining. Perfect sporty look for any weather.",
    image: "/images/wardrobe/tops/hoodie_hitam.png",
    user: {
      id: 5,
      name: "Marcus Athlete",
      username: "marcus_fit",
      avatar: "/images/wardrobe/accessories/topi.png",
      isVerified: true,
      followers: 3210,
      isFollowing: false
    },
    items: {
      top: { name: "Sport Hoodie", image: "/images/wardrobe/tops/hoodie_hitam.png" },
      bottom: { name: "Sport Pants", image: "/images/wardrobe/bottoms/celana_sport.png" },
      shoes: { name: "Athletic Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
      accessory: { name: "Sport Cap", image: "/images/wardrobe/accessories/topi.png" }
    },
    likes: 156,
    comments: 28,
    tags: ["sporty", "workout", "athletic", "active"],
    occasion: "Sports",
    weather: 15,
    rating: 4.7,
    createdAt: "2024-06-08T14:10:00Z",
    isLiked: true,
    isSaved: true
  },
  {
    id: 6,
    title: "Active Lifestyle",
    description: "Perfect for outdoor activities in any weather. Comfortable and stylish.",
    image: "/images/wardrobe/tops/baju.png",
    user: {
      id: 6,
      name: "Sofia Active",
      username: "sofia_lifestyle",
      avatar: "/images/wardrobe/shoes/sepatu_skena.png",
      isVerified: false,
      followers: 1120,
      isFollowing: true
    },
    items: {
      top: { name: "Active Top", image: "/images/wardrobe/tops/baju.png" },
      bottom: { name: "Sport Pants", image: "/images/wardrobe/bottoms/celana_sport.png" },
      shoes: { name: "Running Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
      accessory: { name: "Sport Accessory", image: "/images/wardrobe/accessories/topi.png" }
    },
    likes: 78,
    comments: 9,
    tags: ["active", "lifestyle", "sporty", "outdoor"],
    occasion: "Sports",
    weather: 23,
    rating: 4.5,
    createdAt: "2024-06-08T11:30:00Z",
    isLiked: false,
    isSaved: false
  },
  {
    id: 7,
    title: "Stylish Evening",
    description: "Look great for indoor events during rainy weather. Perfect party outfit.",
    image: "/images/wardrobe/tops/baju.png",
    user: {
      id: 7,
      name: "Luna Party",
      username: "luna_style",
      avatar: "/images/wardrobe/accessories/kalung_emas.png",
      isVerified: false,
      followers: 445,
      isFollowing: false
    },
    items: {
      top: { name: "Party Top", image: "/images/wardrobe/tops/baju.png" },
      bottom: { name: "Stylish Pants", image: "/images/wardrobe/bottoms/celana_skena.png" },
      shoes: { name: "Party Shoes", image: "/images/wardrobe/shoes/sepatu_skena.png" },
      accessory: { name: "Statement Glasses", image: "/images/wardrobe/accessories/kacamata.png" }
    },
    likes: 23,
    comments: 4,
    tags: ["party", "evening", "stylish", "event"],
    occasion: "Party",
    weather: 19,
    rating: 4.8,
    createdAt: "2024-06-07T20:15:00Z",
    isLiked: false,
    isSaved: false
  },
  {
    id: 8,
    title: "Night Out Chic",
    description: "Trendy and fashionable for evening events. Perfect for special occasions.",
    image: "/images/wardrobe/tops/baju.png",
    user: {
      id: 8,
      name: "Rachel Chic",
      username: "rachel_night",
      avatar: "/images/wardrobe/shoes/sepatu_hitam.png",
      isVerified: true,
      followers: 1890,
      isFollowing: true
    },
    items: {
      top: { name: "Chic Top", image: "/images/wardrobe/tops/baju.png" },
      bottom: { name: "Fashion Pants", image: "/images/wardrobe/bottoms/celana_sport.png" },
      shoes: { name: "Fashion Shoes", image: "/images/wardrobe/shoes/sepatu_hitam.png" },
      accessory: { name: "Trendy Necklace", image: "/images/wardrobe/accessories/kalung_emas.png" }
    },
    likes: 52,
    comments: 7,
    tags: ["chic", "trendy", "night-out", "fashionable"],
    occasion: "Party",
    weather: 21,
    rating: 4.6,
    createdAt: "2024-06-07T09:45:00Z",
    isLiked: true,
    isSaved: false
  }
];

// Mock data untuk trending hashtags
export const trendingTags = [
  { tag: "summer2024", count: 1234 },
  { tag: "minimalist", count: 987 },
  { tag: "vintage", count: 765 },
  { tag: "boho", count: 654 },
  { tag: "streetwear", count: 543 },
  { tag: "professional", count: 432 },
  { tag: "date-night", count: 321 },
  { tag: "casual", count: 876 }
];

// Mock data untuk featured users
export const featuredUsers = [
  {
    id: 1,
    name: "Fashion Guru Maya",
    username: "maya_fashion",
    avatar: "/images/placeholders/maya.jpg",
    followers: 15000,
    isVerified: true,
    speciality: "Minimalist Style"
  },
  {
    id: 2,
    name: "Street Style Joe",
    username: "joe_street",
    avatar: "/images/placeholders/joe.jpg",
    followers: 8900,
    isVerified: true,
    speciality: "Urban Fashion"
  },
  {
    id: 3,
    name: "Boho Belle",
    username: "belle_boho",
    avatar: "/images/placeholders/belle.jpg",
    followers: 12500,
    isVerified: true,
    speciality: "Bohemian Chic"
  }
];