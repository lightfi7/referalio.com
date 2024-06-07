import { CursorArrowRaysIcon, ReceiptPercentIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function Stats(props) {

    const stats = [
        {
            name: 'Per Sale',
            stat: props.data.commission_in_percentage_formatted || '--',
            icon: ReceiptPercentIcon
        },
        {
            name: 'Amount',
            stat: props.data.commission_amount_formatted || '--',
            icon: CurrencyDollarIcon
        },
        {
            name: 'Cookie',
            stat: props.data.duration ? props.data.duration.replace('_', ' ') + ' duration' : '--',
            icon: CursorArrowRaysIcon
        },
    ]

    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            <div className="absolute rounded-md bg-cyan-500 p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline">{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
