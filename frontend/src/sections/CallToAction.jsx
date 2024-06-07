import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Earn money with us.
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            We offer an affiliate program with a 50% commission. Which means you earn $49 per sale.
          </p>
          <div className="mt-8 flex justify-center">
          </div>
        </div>
      </Container>
    </section>
  )
}
