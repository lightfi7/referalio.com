import clsx from 'clsx'
import { Logomark } from '@/components/Logo'
import { Button } from '@/components/Button'
import { CheckIcon } from '@/assets/icons/'

export default function Plan({
    name,
    price,
    description,
    button,
    features,
    logomarkClassName,
    featured = false,
}) {
    return (
        <section
            className={clsx(
                'flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5',
                featured ? 'order-first bg-gray-900 lg:order-none' : 'bg-white',
            )}
        >
            <h3
                className={clsx(
                    'flex items-center text-sm font-semibold',
                    featured ? 'text-white' : 'text-gray-900',
                )}
            >
                <Logomark className={clsx('h-6 w-6 flex-none', logomarkClassName)} />
                <span className="ml-4">{name}</span>
            </h3>
            <p
                className={clsx(
                    'mt-3 text-sm',
                    featured ? 'text-gray-300' : 'text-gray-700',
                )}
            >
                {description}
            </p>
            <div className="order-last mt-6">
                <ul
                    role="list"
                    className={clsx(
                        '-my-2 divide-y text-sm',
                        featured
                            ? 'divide-gray-800 text-gray-300'
                            : 'divide-gray-200 text-gray-700',
                    )}
                >
                    {features.map((feature) => (
                        <li key={feature} className="flex py-2">
                            <CheckIcon
                                className={clsx(
                                    'h-6 w-6 flex-none',
                                    featured ? 'text-white' : 'text-cyan-500',
                                )}
                            />
                            <span className="ml-4">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Button
                href={button.href}
                color={featured ? 'cyan' : 'gray'}
                className="mt-6"
                aria-label={`Get started with the ${name} plan for ${price}`}
            >
                {button.label}
            </Button>
        </section>
    )
}