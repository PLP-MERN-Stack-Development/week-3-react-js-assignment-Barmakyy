import { useState, useEffect, useRef, useCallback } from 'react'
import useFetch from '../hooks/useFetch'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Loader2, Search, AlertCircle } from 'lucide-react'

const POSTS_PER_PAGE = 10

function Posts() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const observer = useRef()
  const loadingRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`
  )

  useEffect(() => {
    if (data) {
      setAllPosts(prevPosts => [...prevPosts, ...data])
    }
  }, [data])

  useEffect(() => {
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchQuery, allPosts])

  const hasMore = data && data.length === POSTS_PER_PAGE

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <Card className="max-w-2xl mx-auto border-destructive">
          <CardContent className="p-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-destructive">Error</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button
                variant="outline"
                className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="pl-10 w-full transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-200 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground mt-2">Loading posts...</p>
            </div>
          )}

          {/* Load More Trigger */}
          {!loading && hasMore && (
            <div ref={loadingRef} className="h-10" />
          )}

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">No posts found matching your search.</p>
            </div>
          )}

          {/* End of Results */}
          {!loading && !hasMore && filteredPosts.length > 0 && (
            <div className="text-center py-8 text-muted-foreground animate-fade-in">
              <p>No more posts to load.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Posts 