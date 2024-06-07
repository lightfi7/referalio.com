import { Chip } from "@nextui-org/react"

export default function Description(props) {
    return (
        <div className='pb-12'>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div className="mt-6 border-t border-gray-100 p-4">
                <dl className="divide-y divide-gray-100">
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Affiliation Type</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.commission_type == null ? "--" : props.data.commission_type.machine_name}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Affiliation Platform</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.platform == null ? "--" : props.data.platform.name}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Product Type</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.product_type == null ? "--" : props.data.product_type.machine_name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Geolocation</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">
                            {props.data && props.data.is_international == 1 ? "International" :
                                (props.data && props.data.langs ? props.data.langs.map((country) => country.country_code).join(', ') : '')}
                        </dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Commission (%)</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.commission_in_percentage_formatted == null ? "--" : props.data.commission_in_percentage_formatted}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Commission</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.commission_amount_formatted == null ? "--" : props.data.commission_amount_formatted}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Cash Limit</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.cash_limit == null ? "--" : props.data.cash_limit}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Cash Limit (Per Referral)</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.cash_limit_per_referal == null ? "--" : props.data.cash_limit_per_referal}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Cookie Duration</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.duration == null ? "--" : props.data.duration.replace('_', ' ')}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Contact Email</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 font-bold sm:col-span-2 sm:mt-0">{props.data.contact_email == null ? "--" : props.data.contact_email}</dd>
                    </div>  
                </dl>
            </div>
        </div>
    )
}
