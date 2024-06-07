import React, { useEffect, useState } from "react"
import HeadInfo from "./components/headInfo";
import BreadCrumb from "./components/breadCrumb";
import Stats from "./components/stats";
import Description from "./components/description";
import Reviews from "./components/reviews";
import { getProgramInfo } from "@/api";
import { IsLogined } from "@/utils/utils";
import { useRouter } from "next/navigation";

export default function Popup(props) {

    const [data, setData] = useState([])
    const [reviewdata, setReviewdata] = useState([])
    const router = useRouter()

    const getFromId = async () => {
        try {
            if (props.id != undefined) {
                await getProgramInfo(props.id).then(res => {
                    setData(res.data.data);
                    let reviewTemp = []
                    res.data.data.average_ratings.map((item, index) => {
                        reviewTemp.push({
                            "EasyToJoin": item.easy_to_join,
                            "PaymentDeadline": item.payment_deadline,
                            "Relationship": item.relationship
                        })
                        setReviewdata(reviewTemp)
                    })
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setData([])
        setReviewdata([])
        if (IsLogined()) {
            if (props.id != "") {
                getFromId();
                if (typeof window !== 'undefined') { // This condition is to prevent issues because window is not defined in server side rendering
                    if (props.show) {
                        window.document.body.style.overflow = 'hidden';
                    } else {
                        window.document.body.style.overflow = 'show';
                    }
                }
            }
        } else {
            router.push('/sign-in')
        }

        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                props.setShow(false);
                window.document.body.style.overflow = 'auto';
            }
        };
        window.addEventListener('keydown', handleEsc);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [props.id])

    // props.id

    return (
        <div>
            {props.show && (
                (<div style={{ backgroundColor: props.show ? 'rgba(0,0,0,0.8)' : 'transparent' }} className="fixed z-50 inset-0 overflow-y-auto py-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="px-4 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span
                            type="button"
                            className="w-auto inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-cyan-400 text-base font-medium text-white hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:text-sm cursor-pointer rounded-full"
                            onClick={() => { props.setShow(false); window.document.body.style.overflow = 'auto'; }}>&times;</span>
                    </div>
                    <div className="relative bg-white p-6 rounded-lg max-w-4xl mx-auto border border-gray-200">
                        <HeadInfo id={props.id} data={data} />
                        <div className='pt-4 p-4'>
                            <BreadCrumb name={data ? data.name : ""} />
                            <Stats data={data} />
                            <div className='flex flex-col md:flex-row pt-16'>
                                <div className='flex-auto pr-4'><Description data={data} /></div>
                                <Reviews data={reviewdata} />
                            </div>
                        </div>
                    </div>
                </div>)
            )
            }
        </div>
    );
}