import React, { useState } from 'react';
import { SearchContext } from './searchContext';

export const SearchProvider = (props) => {

    const [params, setParams] = useState({
        text: '',
        niches: [],
        platform: [],
        geolocation: [],
        hideInter: false,
        minPercent: null,
        maxPercent: null,
        minAmount: null,
        maxAmount: null,
        easytoJoin: 0,
        relationShip: 0,
        payment: 0,
        type: '',
        productType: '',
        hide: true,
        direct: false,
        isPromoted: false,
    });

    const setSearchParam = (data) => {
        let newParam = { ...params, ...data };
        setParams(newParam);
    };

    return (
        <SearchContext.Provider value={{ params, setSearchParam }}>
            {props.children}
        </SearchContext.Provider>
    );
};