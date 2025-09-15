export default function BlogPostSkeleton() {
  return (
    <div className="bg-black min-h-screen text-gray-300 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] flex overflow-hidden">
        <div className="absolute inset-0 bg-gray-800" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/70" />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 h-full flex flex-col justify-between">
          <div className="pt-8">
            <div className="w-32 h-4 bg-gray-700 rounded" />
          </div>

          <div className="pb-8 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <div className="w-24 h-6 bg-gray-700 rounded-full" />
                <div className="w-32 h-6 bg-gray-700 rounded-full" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-3/4 h-12 bg-gray-700 rounded" />
                <div className="w-1/2 h-6 bg-gray-700 rounded mt-2" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full" />
              <div>
                <div className="w-32 h-4 bg-gray-700 rounded mb-1" />
                <div className="w-24 h-3 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="w-full h-20 bg-gray-800 rounded-lg" />
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 lg:flex-[2]">
              <section className="mb-4">
                <article className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  {/* Article content skeleton */}
                  <div className="space-y-6">
                    <div className="w-full h-4 bg-gray-700 rounded" />
                    <div className="w-3/4 h-4 bg-gray-700 rounded" />
                    <div className="w-5/6 h-4 bg-gray-700 rounded" />
                    <div className="w-2/3 h-4 bg-gray-700 rounded" />
                    
                    {/* Heading skeleton */}
                    <div className="w-1/2 h-8 bg-gray-700 rounded mt-8" />
                    <div className="w-full h-4 bg-gray-700 rounded" />
                    <div className="w-4/5 h-4 bg-gray-700 rounded" />
                    
                    {/* List skeleton */}
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-700 rounded" />
                      <div className="w-5/6 h-4 bg-gray-700 rounded" />
                      <div className="w-4/5 h-4 bg-gray-700 rounded" />
                    </div>
                    
                    {/* Another paragraph */}
                    <div className="w-full h-4 bg-gray-700 rounded" />
                    <div className="w-3/4 h-4 bg-gray-700 rounded" />
                  </div>
                  
                  {/* Intermediate banner skeleton */}
                  <div className="my-12">
                    <div className="w-full h-32 bg-gray-700 rounded-lg" />
                  </div>
                  
                  {/* More content skeleton */}
                  <div className="space-y-6">
                    <div className="w-full h-4 bg-gray-700 rounded" />
                    <div className="w-5/6 h-4 bg-gray-700 rounded" />
                    <div className="w-4/5 h-4 bg-gray-700 rounded" />
                    
                    {/* Blockquote skeleton */}
                    <div className="border-l-4 border-gray-600 pl-4 py-2">
                      <div className="w-full h-4 bg-gray-700 rounded" />
                      <div className="w-3/4 h-4 bg-gray-700 rounded mt-2" />
                    </div>
                    
                    <div className="w-full h-4 bg-gray-700 rounded" />
                    <div className="w-2/3 h-4 bg-gray-700 rounded" />
                  </div>
                </article>
              </section>

              {/* Related articles skeleton */}
              <div className="my-12">
                <div className="text-center mb-10">
                  <div className="w-48 h-8 bg-gray-700 rounded mx-auto mb-4" />
                  <div className="w-64 h-4 bg-gray-700 rounded mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-gray-800 rounded-2xl overflow-hidden">
                      <div className="h-48 bg-gray-700" />
                      <div className="p-6 space-y-3">
                        <div className="w-24 h-4 bg-gray-700 rounded" />
                        <div className="w-full h-6 bg-gray-700 rounded" />
                        <div className="w-3/4 h-4 bg-gray-700 rounded" />
                        <div className="w-1/2 h-4 bg-gray-700 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author section skeleton */}
              <div className="mt-4">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gray-700 rounded-full" />
                    <div className="flex-1 space-y-3">
                      <div className="w-32 h-4 bg-gray-700 rounded" />
                      <div className="w-full h-4 bg-gray-700 rounded" />
                      <div className="w-3/4 h-4 bg-gray-700 rounded" />
                      <div className="w-24 h-4 bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-[320px] relative flex-shrink-0">
              <div className="sticky top-8 z-10 bg-gray-900/95 backdrop-blur-sm rounded-2xl p-2">
                <div className="bg-gray-800 rounded-lg p-4 h-[300px]">
                  <div className="text-center mb-3">
                    <div className="w-32 h-3 bg-gray-700 rounded mx-auto" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gray-700 rounded mx-auto mb-2" />
                      <div className="w-32 h-4 bg-gray-700 rounded mx-auto mb-2" />
                      <div className="w-24 h-3 bg-gray-700 rounded mx-auto mb-2" />
                      <div className="w-20 h-4 bg-gray-700 rounded mx-auto" />
                    </div>
                    <div className="w-full h-10 bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
              
              <div className="relative z-20 mt-8">
                <div className="bg-gray-800 rounded-lg p-4 h-48">
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-700 rounded" />
                    <div className="w-3/4 h-4 bg-gray-700 rounded" />
                    <div className="w-full h-10 bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Newsletter skeleton */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative mt-16 rounded-3xl overflow-hidden">
          <div className="relative bg-gray-800 rounded-3xl text-center py-10 px-6">
            <div className="w-64 h-8 bg-gray-700 rounded mx-auto mb-3" />
            <div className="w-96 h-4 bg-gray-700 rounded mx-auto mb-6" />
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 h-12 bg-gray-700 rounded-xl" />
              <div className="w-32 h-12 bg-gray-700 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 