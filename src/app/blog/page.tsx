'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Search, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/components/providers/i18n-provider'

// Mock data for blog posts - replace with actual API call
const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Maasai Mara Safari',
    excerpt: 'Discover everything you need to know about planning your dream safari adventure in Kenya\'s most famous wildlife reserve.',
    content: 'Full content here...',
    slug: 'ultimate-guide-maasai-mara-safari',
    category: 'Safari Guides',
    author: 'Sarah Johnson',
    readTime: '8 min read',
    createdAt: new Date('2024-01-15'),
    image: '/images/blog/maasai-mara-safari.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Best Time to Visit Tanzania',
    excerpt: 'Planning your Serengeti adventure? Learn about the best seasons, weather patterns, and wildlife migration timing.',
    content: 'Full content here...',
    slug: 'best-time-visit-tanzania',
    category: 'Travel Tips',
    author: 'Michael Chen',
    readTime: '6 min read',
    createdAt: new Date('2024-01-10'),
    image: '/images/blog/tanzania-guide.jpg',
    featured: false,
  },
  {
    id: 3,
    title: '10 Must-Visit Places in Marrakech',
    excerpt: 'From bustling souks to serene gardens, explore the most enchanting corners of Morocco\'s red city.',
    content: 'Full content here...',
    slug: '10-must-visit-places-marrakech',
    category: 'Destinations',
    author: 'Emma Williams',
    readTime: '7 min read',
    createdAt: new Date('2024-01-05'),
    image: '/images/blog/marrakech-travel.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'Cape Town: A Complete Travel Guide',
    excerpt: 'Everything you need to know about visiting South Africa\'s Mother City, from Table Mountain to the Waterfront.',
    content: 'Full content here...',
    slug: 'cape-town-complete-travel-guide',
    category: 'Destinations',
    author: 'David Thompson',
    readTime: '10 min read',
    createdAt: new Date('2024-01-01'),
    image: '/images/blog/cape-town-guide.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'Safari Photography Tips for Beginners',
    excerpt: 'Capture stunning wildlife photos on your African safari with these essential photography tips and camera settings.',
    content: 'Full content here...',
    slug: 'safari-photography-tips-beginners',
    category: 'Safari Guides',
    author: 'Lisa Anderson',
    readTime: '5 min read',
    createdAt: new Date('2023-12-28'),
    image: '/images/blog/safari-photography.jpg',
    featured: false,
  },
  {
    id: 6,
    title: 'Seychelles Island Hopping Guide',
    excerpt: 'Discover the pristine beaches and crystal-clear waters of the Seychelles archipelago with our comprehensive guide.',
    content: 'Full content here...',
    slug: 'seychelles-island-hopping-guide',
    category: 'Island Escapes',
    author: 'Robert Martinez',
    readTime: '9 min read',
    createdAt: new Date('2023-12-20'),
    image: '/images/blog/seychelles-islands.jpg',
    featured: false,
  },
]

const categories = ['All', 'Safari Guides', 'Travel Tips', 'Destinations', 'Island Escapes']

export default function BlogPage() {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  useEffect(() => {
    let filtered = blogPosts

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchQuery])

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)',
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-600 hover:bg-amber-700">Travel Blog</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Stories & Guides
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Expert travel tips, destination guides, and inspiring stories from around the world
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Post */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Featured Article
              </h2>
            </div>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-600">{featuredPost.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.createdAt)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </section>
        )}

        {/* Blog Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
            </h2>
            <p className="text-gray-500">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border">
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white text-gray-900 hover:bg-white">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {post.author}</span>
                        <div className="flex items-center gap-2 text-sm text-amber-600 font-medium group-hover:gap-3 transition-all">
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-2 border-dashed">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
                variant="outline"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50"
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </section>

        {/* Load More */}
        {regularPosts.length >= 6 && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 hover:border-amber-600 hover:text-amber-600"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
