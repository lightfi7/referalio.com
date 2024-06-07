import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { heros } from '@/assets/data'

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 font-extrabold	">
              {heros.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              {heros.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button
                href="/list"
                variant="outline"
              >
                <span>{heros.try}</span>
              </Button>
              <Button
                color="cyan"
                href="/payment"
              >
                <span>{heros.free}</span>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
            </div>
          </div>
        </div>
      </Container >
    </div >
  )
}
