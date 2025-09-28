import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedProducts } from "@/components/featured-products"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}
