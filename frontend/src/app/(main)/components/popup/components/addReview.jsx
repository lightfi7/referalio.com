import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Rating from 'react-star-rating-component'

export default function AddReview(props) {

    const [join, setJoin] = useState("")
    const [relationship, setRelationship] = useState("")
    const [deadline, setDeadline] = useState("")

    return (
        <Transition.Root show={props.show} as={Fragment} style={{ zIndex: 999999 }}>
            <Dialog as="div" className="relative z-10" onClose={props.setShow}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Review Extreme Simulator:
                                        </Dialog.Title>
                                        <div className="mt-2" style={{ fontSize: '40px' }}>
                                            <p className='font-small text-sm text-gray-900'>Easy to Join</p>
                                            <Rating name="rate1" onStarClick={(nextValue, prevValue, name) => { setJoin(nextValue) }} />
                                        </div>
                                        <div style={{ fontSize: '40px' }}>
                                            <p className='font-small text-sm text-gray-900'>Relationship with affiliates</p>
                                            <Rating name="rate2" onStarClick={(nextValue, prevValue, name) => { setRelationship(nextValue) }} />
                                        </div>
                                        <div style={{ fontSize: '40px' }}>
                                            <p className='font-small text-sm text-gray-900'>Payment deadline</p>
                                            <Rating name="rate3" onStarClick={(nextValue, prevValue, name) => { setDeadline(nextValue) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => props.setShow(false)}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
