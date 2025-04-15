export default function MinimalFooter() {
  return (
    <footer className="bg-background border-t py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} SAMEH STORE. All rights reserved.
      </div>
    </footer>
  )
}
