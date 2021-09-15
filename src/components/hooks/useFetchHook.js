import { useState, useEffect } from "react";
import axios from 'axios';
import { csvToJSON } from '../utils/csvToJson';

export const useFetchCSVHook = (URL) => {
    const [data, setData] = useState([]);
    const [headers , setHeaders] = useState([]);

    useEffect(() => {
        if (!URL) return;

        const fetchData = async () => {
            const res = await axios.get(
                URL
            );
            let d = res.data;
            const { result, headers } = await csvToJSON(d);
            setHeaders(headers);
            setData(result);
        };

        
        fetchData();
    }, [URL]);

    return { headers, data , setData };
};
