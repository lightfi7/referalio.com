import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export function Alert(props) {
    return (
        props.show ?
            (<div className="border-l-4 border-cyan-400 bg-cyan-50 p-4 mt-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-cyan-700"> You are currently on the demo list. <strong>This list changes every month</strong>. In order to <strong>unlock 16K+ programs across 673 niches</strong>, you need to buy your license by <a className="font-medium underline text-cyan-700 hover:text-cyan-600" href="/payment">clicking here.</a></p>
                    </div>
                </div>
            </div>)
            : (<></>)
    );
}