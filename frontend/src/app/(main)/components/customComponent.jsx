import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import Rating from 'react-star-rating-component';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip, Spinner } from "@nextui-org/react";
import { TextField } from "@/components/Fields";
import { jwtDecode } from "@/app/(auth)/utils";
import { countRate } from "@/utils/utils";
import { columns } from "@/assets/data";
import { getProgramByPage } from "@/api";
import SearchDrawer from "./searchDrawer";
import SearchContent from "./searchContent";
import { SearchContext } from "@/provider/searchContext";
import { Alert } from "@/components/Alert";
import Popup from "./popup";

export default function CustomComponent() {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [totalNum, setTotalNum] = useState(0);
    const [items, setItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    const [loadingState, setLoadingState] = useState(false);
    const [selectedTag, setSelectedTag] = useState([]);
    const context = useContext(SearchContext);
    const params = context.params
    let hasPremium = false;
    let premiumExpired = false;
    const onSearchData = (text) => {
        context.setSearchParam({ text: text });
    }

    const onSearchNiches = (e, data) => {
        e.stopPropagation();
        let niches = [...selectedTag]; // Create a copy of the selectedTag array to avoid direct mutation

        // Check if the niche already exists based on the name property
        const isNicheExists = niches.some(niche => niche.name === data.name);

        // If it doesn't exist, add it to the array
        if (!isNicheExists) {
            niches.push({ name: data.name });
            setSelectedTag(niches); // This function should update the state and trigger a re-render
            context.setSearchParam({ niches: niches });
        }
    }

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="justify-between gap-3">
                    <div className="relative mt-2 shadow-sm">
                        <TextField label="Search" onInput={(e) => {
                            onSearchData(e.target.value);
                        }} />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {totalNum} datas</span>
                </div>
                <div className="flex flex-wrap gap-1">{selectedTag.map((tag, index) => (
                    <Chip key={index} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }} onClose={() => { context.setSearchParam({ niches: [...selectedTag.slice(0, index), ...selectedTag.slice(index + 1)] }); setSelectedTag([...selectedTag.slice(0, index), ...selectedTag.slice(index + 1)]) }} size="sm" className="m-[4px]">{tag.name}</Chip>
                ))}</div>
            </div>
        );
    }, [
        items.length,
        selectedTag.length,
        totalNum,
    ]);

    const renderCell = useCallback((data, columnKey) => {
        const cellValue = data[columnKey];
        return cellValue;
    }, []);

    useEffect(() => {
        hasPremium = false;
        if (jwtDecode(localStorage.getItem('accessToken'))) {
            hasPremium = jwtDecode(localStorage.getItem('accessToken')).hasPremium
            premiumExpired = jwtDecode(localStorage.getItem('accessToken')).premiumExpired
            if (hasPremium === false) {
                setShowAlert(true)
            }
        }
        getData(page);
    }, [
        context.params.text,
        context.params.niches.length,
        context.params.platform.length,
        context.params.geolocation.length,
        context.params.hideInter,
        context.params.minPercent,
        context.params.maxPercent,
        context.params.minAmount,
        context.params.maxAmount,
        context.params.easytoJoin,
        context.params.relationShip,
        context.params.payment,
        context.params.type,
        context.params.productType,
        context.params.hide,
        context.params.direct,
    ])

    const getData = async (page) => {
        setLoadingState(true);
        if (localStorage.getItem('accessToken')) {
            hasPremium = jwtDecode(localStorage.getItem('accessToken')).hasPremium
            premiumExpired = jwtDecode(localStorage.getItem('accessToken')).premiumExpired
            if (hasPremium === false || premiumExpired == false) {
                setShowAlert(true)
            }
            const response = await getProgramByPage({ page, hasPremium, params, premiumExpired });
            let tableData = [];
            for (let i = 0; i < response.data.data.length; i++) {
                const responseData = response.data.data[i];
                tableData.push({
                    id: responseData._id,
                    name: (
                        <div key={i}>
                            <p className="font-extrabold">{responseData.promoted == 1 ? responseData.name + ' 🔥' : responseData.name}</p>
                            <p>Platform: {responseData.platform === null ? "--" : responseData.platform.name}</p>
                            <p>Commission type:{responseData.commission_type === null ? "--" : responseData.commission_type.machine_name}</p>
                            <Rating
                                key={i}
                                name={'rating' + i}
                                value={countRate(responseData.average_ratings)}
                                starCount={5}
                                starColor={'#ffb400'}
                                emptyStarColor={'#ccc'}
                            />
                            <div className="flex gap-1">{responseData.tags.map((data, j) => {
                                return <Chip key={j} style={{ backgroundColor: data.color, color: "white" }} onClick={(e) => { onSearchNiches(e, data) }} size="sm">{data.name}</Chip>
                            })}</div>
                        </div>
                    ),
                    commissionPercent: <p className="font-extrabold">{responseData.commission_in_percentage_formatted === null ? "--" : responseData.commission_in_percentage_formatted}</p>,
                    commission: <p className="font-extrabold">{responseData.commission_amount_formatted === null ? "--" : responseData.commission_amount_formatted}</p>,
                    cookie: < p className="font-extrabold" > {responseData.duration === null ? "--" : responseData.duration.replace("_", " ")}</p>
                });
            }
            setItems(tableData);
            setPage(1);
            setPages(response.data.pages);
            setTotalNum(response.data.total);
            setLoadingState(false);
        }
    }

    return (
        <div className="p-2 lg:p-24">
            <div className="relative flex items-baseline justify-between pb-6 border-b border-gray-200">
                <h1 className="font-black text-3xl">💸 Affiliate Programs List</h1>
            </div >
            <Alert show={showAlert} />
            <div className="flex justify-center mt-8 gap-2 cursor-pointer lg:hidden" onClick={() => setDrawerOpen(!drawerOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#aaa" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                </svg>
                <span>Show Filters</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#aaa" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                </svg>
            </div>

            <SearchDrawer open={drawerOpen} setOpen={setDrawerOpen} />

            <div className="flex pt-8 lg:gap-[30px]">
                <div className="hidden lg:block lg:min-w-[300px]">
                    <SearchContent />
                </div>
                <div className="flex-1 px-1 overflow-auto overflow-y-hidden">
                    <Table
                        isHeaderSticky
                        aria-label="Example table with client side pagination"
                        topContent={topContent}
                        topContentPlacement="outside"
                        bottomContentPlacement="inside"
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => getData(page)}
                                />
                            </div>
                        }
                        classNames={{
                            wrapper: "min-h-[222px]",
                        }}
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                    align={column.uid === "actions" ? "center" : "start"}
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={items} loadingContent={<Spinner />} isLoading={loadingState} label="Loading...">
                            {(item, index) => (
                                <TableRow key={index} onClick={() => {
                                    setId(item.id);
                                    setShow(true);
                                }} className="border-b border-gray-200 py-6 hover:bg-gray-100 cursor-pointer">
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <span className="flex justify-center pt-4">Some links may be affiliate links.</span>
                </div>
            </div>
            <Popup show={show} id={id} setShow={setShow} />
        </div >
    );
}