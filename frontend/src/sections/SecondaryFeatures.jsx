import { Container } from '@/components/Container'
import { features } from '@/assets/data'

export function SecondaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for building a portfolio"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            Latest trendy niches
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Discover the latest trendy niches available on Referalio
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 p-8"
            >
              <h2 className="mt-6 font-semibold text-gray-900">
                {feature.name}
              </h2>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
