import { useContext } from "react"
import { navigation } from "@/assets/data"
import { Accordion, AccordionItem } from "@nextui-org/react"
import SearchNiches from "./searchNiches"
import SearchPlatform from "./searchPlatform"
import SearchGeo from "./searchGeo"
import Rating from "react-star-rating-component"
import { useEffect, useState } from "react"
import { SearchContext } from "@/provider/searchContext";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const type = [
    { id: 1, name: "All" },
    { id: 2, name: "One time" },
    { id: 3, name: "Recurring" },
];

const productType = [
    { id: 1, name: "All" },
    { id: 2, name: "Digital service" },
    { id: 3, name: "Physical product" },
    { id: 4, name: "Physical service" },
    { id: 5, name: "Digital product" },
];
export const Navbar = () => {
    const context = useContext(SearchContext)

    const searchData = (type) => {
        if (type == "All") {
            context.setSearchParam({ text: null })
        }
        else {
            context.setSearchParam({ text: null })
        }
    }
    return (
        <nav className="flex flex-1 flex-col" aria-label="Sidebar">
            <ul role="listproProductType" className="-mx-2 space-y-1">
                {navigation.map((item, i) => (
                    <li key={i}>
                        <button
                            onClick={() => { searchData(item.name) }}
                            className={classNames(
                                item.current ? 'bg-white text-cyan-600' : 'text-gray-700 hover:text-cyan-600 hover:bg-white',
                                'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
                            )}
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav >
    )
}

export const FilterBar = () => {
    const context = useContext(SearchContext)

    const [minPercent, setMinPercent] = useState(null)
    const [maxPercent, setMaxPercent] = useState(null)
    const [minAmount, setMinAmount] = useState(null)
    const [maxAmount, setMaxAmount] = useState(null)
    const [easy, setEasy] = useState(0)
    const [relationship, setRelationship] = useState(0)
    const [payment, setPayment] = useState(0)
    const [programType, setProgramType] = useState("")
    const [proProductType, setProProductType] = useState("")
    const [hide, setHide] = useState(true)
    const [direct, setDirect] = useState(false)
    const [easyChecked, setEasyChecked] = useState(true)
    const [relChecked, setRelChecked] = useState(true)
    const [payChecked, setPayChecked] = useState(true)

    useEffect(() => {
        setMinPercent(null)
        setMaxPercent(null)
        setMinAmount(null)
        setMaxAmount(null)
        setEasy(0)
        setRelationship(0)
        setPayment(0)
        setProgramType("")
        setProProductType("")
        setHide(true)
        setDirect(false)
    }, [])

    useEffect(() => {
        context.setSearchParam(
            {
                minPercent: minPercent,
                maxPercent: maxPercent,
                minAmount: minAmount,
                maxAmount: maxAmount,
                easytoJoin: easy,
                relationShip: relationship,
                payment: payment,
                type: programType,
                productType: proProductType,
                hide: hide,
                direct: direct

            })
    }, [minPercent, maxPercent, minAmount, maxAmount, easy, relationship, payment, programType, proProductType, hide, direct])

    return (
        <>
            <Accordion selectionMode="multiple">
                <AccordionItem key="1" aria-label="Niches" title={<p className="text-sm text-gray-900">Niches</p>}>
                    <div><SearchNiches /></div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion 2" title={<p className="text-sm">Affiliate Program</p>}>
                    <div><SearchPlatform /></div>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Accordion 3" title={<p className="text-sm">Geolocation</p>}>
                    <div><SearchGeo /></div>
                </AccordionItem>
                <AccordionItem key="4" aria-label="Accordion 4" title={<p className="text-sm">Commmission</p>}>
                    <div className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Commission (%):</label>
                            <div>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">Min</span>
                                    <input type="number" min="0" max="100" onChange={(e) => setMinPercent(e.target.value)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300" placeholder="0%"></input>
                                </div>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">Max</span>
                                    <input type="number" min="0" max="100" onChange={(e) => setMaxPercent(e.target.value)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300" placeholder="100%"></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Commission amount:</label>
                            <div>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">Min</span>
                                    <input type="number" min="0" max="100" onChange={(e) => setMinAmount(e.target.value)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300" placeholder="$0"></input>
                                </div>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">Max</span>
                                    <input type="number" min="0" max="100" onChange={(e) => setMaxAmount(e.target.value)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300" placeholder="$100"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem key="5" aria-label="Accordion 5" title={<p className="text-sm">Reviews</p>}>
                    <div className="space-y-2">
                        <div className="space-y-2 mt-2" style={{ fontSize: '25px' }}>
                            <p className='font-small text-sm text-gray-900'>Easy to Join</p>
                            <div className="flex items-center h-5 gap-x-2">
                                <Rating name="rate1" value={easy} onStarClick={(nextValue, prevValue, name) => { setEasy(nextValue); nextValue > 0 ? setEasyChecked(false) : setEasyChecked(null) }} />
                                <input id="resetEasy" name="resetEasy" checked={easyChecked} type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" onClick={(e) => { setEasyChecked(true); e.target.checked == true ? setEasy(0) : setEasy(easy) }} readOnly />
                                <p className='font-small text-sm text-gray-900'>Reset</p>
                            </div>
                        </div>
                        <div className="space-y-2 mt-2" style={{ fontSize: '25px' }}>
                            <p className='font-small text-sm text-gray-900'>Relationship with affiliates</p>
                            <div className="flex items-center h-5 gap-x-2">
                                <Rating name="rate2" value={relationship} onStarClick={(nextValue, prevValue, name) => { setRelationship(nextValue); nextValue > 0 ? setRelChecked(false) : setRelChecked(null) }} />
                                <input id="resetRelation" name="resetRelation" checked={relChecked} type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" onClick={(e) => { setRelChecked(true); e.target.checked == true ? setRelationship(0) : setRelationship(relationship) }} readOnly />
                                <p className='font-small text-sm text-gray-900'>Reset</p>
                            </div>
                        </div>
                        <div className="space-y-2 mt-2" style={{ fontSize: '25px' }}>
                            <p className='font-small text-sm text-gray-900'>Payment deadline</p>
                            <div className="flex items-center h-5 gap-x-2">
                                <Rating name="rate3" value={payment} onStarClick={(nextValue, prevValue, name) => { setPayment(nextValue); nextValue > 0 ? setPayChecked(false) : setPayChecked(true) }} />
                                <input id="resetPayment" name="resetPayment" checked={payChecked} type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" onClick={(e) => { setPayChecked(true); e.target.checked == true ? setPayment(0) : setPayment(payment) }} readOnly />
                                <p className='font-small text-sm text-gray-900'>Reset</p>
                            </div>
                        </div>
                    </div>
                </AccordionItem >
                <AccordionItem key="6" aria-label="Accordion 6" title={<p className="text-sm">Type</p>}>
                    <div className="space-y-2">
                        {type.map((item, index) => (
                            <div className="flex items-center p-2" key={index}>
                                <input id={"product" + index} type="radio" name="programType" defaultChecked={index === 0} className="focus:ring-cyan-400 h-4 w-4 text-cyan-500 border-gray-300" onClick={() => setProgramType(item.name)} />
                                <label htmlFor={"product" + index} className="ml-3 block text-sm font-medium text-gray-700">{item.name}</label>
                            </div>
                        ))}
                    </div>
                </AccordionItem>
                <AccordionItem key="7" aria-label="Accordion 7" title={<p className="text-sm">Product Type</p>}>
                    <div className="space-y-2">
                        {productType.map((item, index) => (
                            <div className="flex items-center p-2" key={index}>
                                <input id={"product" + index} type="radio" name="productType" defaultChecked={index === 0} className="focus:ring-cyan-400 h-4 w-4 text-cyan-500 border-gray-300" onClick={() => setProProductType(item.name)} />
                                <label htmlFor={"product" + index} className="ml-3 block text-sm font-medium text-gray-700">{item.name}</label>
                            </div>
                        ))}
                    </div>
                </AccordionItem>
            </Accordion>
            < div className="relative px-2 flex items-start py-6 mt-4 border-t border-gray-200" >
                <div className="flex items-center h-5">
                    <input id="direct-only" name="direct-only" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" onClick={(e) => { setDirect(e.target.checked) }} />
                </div>
                <div className="ml-3 text-sm w-[280px]">
                    <label htmlFor="direct-only" className="font-medium text-gray-700">Show only direct program</label>
                    <p className="text-gray-500">Hide affiliate programs comes from affiliate platforms and only shows direct programs.</p>
                </div>
            </div >
        </>
    )
}
export default function SearchContent(props) {

    return (
        <>
            <Navbar />
            <FilterBar setData={props.setData} />
        </>
    )
}