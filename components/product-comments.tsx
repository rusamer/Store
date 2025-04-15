"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface Comment {
  id: string
  productId: string
  userId: string
  userName: string
  userImage?: string
  rating: number
  text: string
  date: string
}

interface ProductCommentsProps {
  productId: string
}

export function ProductComments({ productId }: ProductCommentsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("productComments") || "[]")
    const productComments = savedComments.filter((comment: Comment) => comment.productId === productId)
    setComments(productComments)
  }, [productId])

  // Handle comment submission
  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to leave a comment.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Create new comment
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      productId,
      userId: user?.id || "unknown",
      userName: user?.name || "Anonymous",
      userImage: user?.profilePicture,
      rating,
      text: newComment,
      date: new Date().toISOString(),
    }

    // Get existing comments
    const existingComments = JSON.parse(localStorage.getItem("productComments") || "[]")

    // Add new comment
    const updatedComments = [...existingComments, comment]

    // Save to localStorage
    localStorage.setItem("productComments", JSON.stringify(updatedComments))

    // Update state
    setComments([...comments, comment])
    setNewComment("")
    setRating(5)

    toast({
      title: "Comment Added",
      description: "Your comment has been added successfully.",
    })

    setIsSubmitting(false)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {/* Comment form for logged-in users */}
      {isAuthenticated ? (
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">Write a Review</h3>

          {/* Star rating */}
          <div className="flex items-center space-x-1">
            <span className="text-sm mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-5 w-5 ${
                    star <= (hoveredStar || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Share your thoughts about this product..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
          />

          <Button onClick={handleSubmitComment} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      ) : (
        <div className="bg-muted p-4 rounded-lg text-center">
          <p className="mb-2">Please log in to leave a review.</p>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review this product!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={comment.userImage || ""} alt={comment.userName} />
                  <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h4 className="font-medium mr-2">{comment.userName}</h4>
                    <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                  </div>

                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= comment.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
