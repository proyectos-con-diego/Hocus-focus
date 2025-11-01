export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] flex overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 h-full flex flex-col justify-between">
          <div className="pt-8">
            <div className="w-32 h-8 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
          <div className="pb-8 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="w-20 h-6 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="w-24 h-6 bg-gray-800 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-3/4 h-12 bg-gray-800 rounded-lg animate-pulse"></div>
                <div className="w-full h-6 bg-gray-800 rounded animate-pulse"></div>
                <div className="w-5/6 h-6 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="w-32 h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="w-24 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:flex-[2]">
            <div className="space-y-6">
              {/* Loading message */}
              <div className="text-center py-16">
                <div className="inline-flex items-center gap-3 text-purple-400 text-lg font-semibold">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                  <span>Cargando el artículo...</span>
                </div>
              </div>
              
              {/* Content paragraphs skeleton */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="w-full h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="w-4/5 h-4 bg-gray-800 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar Skeleton */}
          <aside className="w-full lg:w-[320px] flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 bg-gray-700 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="w-24 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
                    <div className="w-32 h-3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="w-full h-10 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

