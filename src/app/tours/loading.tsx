import { TourCardSkeleton } from '@/components/ui/skeleton'

export default function ToursLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6 mb-12">
        <div className="h-12 w-64 bg-gray-200 animate-pulse rounded mx-auto" />
        <div className="h-6 w-96 bg-gray-200 animate-pulse rounded mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <TourCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
