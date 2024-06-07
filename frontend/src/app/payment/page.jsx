'use client'

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Faqs } from "@/components/Faqs";
import { CheckIcon } from '@heroicons/react/20/solid'
import { PayPalButton } from "react-paypal-button-v2";
import { useRouter } from 'next/navigation'
import { Footer } from "@/components/Footer";
import { getMemberShipInfo, updatePremiumStatus } from "@/api";
import { jwtDecode } from "../(auth)/utils";

const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
]

const Payment = () => {

    const router = useRouter();
    const [price, setPrice] = useState(0)
    const [key, setKey] = useState("")

    useEffect(() => {
        localStorage.removeItem('path');
        const currentUserToken = localStorage.getItem('accessToken');
        getMemberShipInfo().then(res => {
            setPrice(res.data.data.price);
            setKey(res.data.data.key);
        }).catch(err => {
            console.error(err)
        })
        if (!currentUserToken) {
            localStorage.setItem('redirect_url', '/payment');
            router.push("/sign-in");
        }
    }, [key, price]);

    const updateStatus = async () => {
        const currentUserEmail = jwtDecode(localStorage.getItem('accessToken')).sub;
        const response = await updatePremiumStatus({ email: currentUserEmail });
    }

    return (
        <>
            <Header />
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
                            in. Explicabo id ut laborum.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
                            <p className="mt-6 text-base leading-7 text-gray-600">
                                Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
                                repellendus etur quidem assumenda.
                            </p>
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                                <div className="h-px flex-auto bg-gray-100" />
                            </div>
                            <ul
                                role="list"
                                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                            >
                                {includedFeatures.map((feature, index) => (
                                    <li key={index} className="flex gap-x-3">
                                        <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-indigo-600">${price}</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-indigo-600">USD</span>
                                    </p>
                                    <br />
                                    <PayPalButton
                                        amount={10}
                                        currency={"USD"}
                                        onSuccess={(details, data) => {
                                            alert("Transaction completed by " + details.payer.name.given_name);
                                            // return fetch("/paypal-transaction-complete", {
                                            //     method: "post",
                                            //     body: JSON.stringify({
                                            //         orderID: data.orderID
                                            //     })
                                            // });
                                            return updateStatus();
                                        }}
                                    />
                                    <p className="mt-6 text-xs leading-5 text-gray-600">
                                        Invoices and receipts available for easy company reimbursement
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Faqs />
            <Footer />
        </>
    )
}

export default Payment