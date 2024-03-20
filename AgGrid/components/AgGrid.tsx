/*
 * MyAgGridComponent.tsx
 * Description: React component for displaying data using Ag Grid in TypeScript
 * Author: Dixit Joshi
 * Version: 1.2.0
 * License: MIT
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme CSS
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import {
    GridApi, ColDef,
    ColGroupDef,
    GridReadyEvent,
    ModuleRegistry,
} from 'ag-grid-community';
import { IOlympicData } from './interfaces';
import Theme from './Theme';

import '../css/grid.css'
export interface Options {
    [key: string]: string
}
interface MyAgGridProps {
    apiUrl: string | null;
    enableRowGroupColumns: string | null;
    pivotColumns: string | null;
    aggFuncColumns: string | null;
}

const AgGrid: React.FC<MyAgGridProps> = ({ apiUrl, enableRowGroupColumns, pivotColumns, aggFuncColumns }) => {
    console.log("dixit : ", apiUrl)
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [divClass, setDivClass] = useState('ag-theme-alpine');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [rowData, setRowData] = useState<IOlympicData[]>();
    const [autoDefName, setAutoDefName] = useState<keyof IOlympicData>("athlete");
    const [columnDefs, setColumnDefs] = useState<(ColDef<IOlympicData, any> | ColGroupDef<IOlympicData>)[]>([
        // { field: 'athlete',  enableRowGroup: true,},
        // { field: 'age',  },
        // { field: 'country' ,enablePivot:true},
        // { field: 'year' },
        // { field: 'date', },
        // { field: 'sport',enableRowGroup: true, },
        // { field: 'gold',aggFunc:'count' },
        // { field: 'silver',aggFunc:'count' },
        // { field: 'bronze',aggFunc:'count' },
        // { field: 'total', aggFunc:'count'},
    ]);
    useEffect(() => {
        const fetchData = async () => {
            let data;
            // const response = await fetch('https://www.ag-grid.com/example-assets/olympic-winners.json');
            try {
                const response = await fetch(`${apiUrl}`);
                console.log("response : ", response)
                data = await response.json();
                console.log("data : ", data)
                setRowData(data);
            } catch (error) {
                setRowData([]);
                console.log('error')
            }

            if (data && data.length > 0) {
                const headers = Object.keys(data[0]);
                setAutoDefName(headers[0] as keyof IOlympicData);
                // check if the json data is valid

                const enableRowGroup: string[] = enableRowGroupColumns?.split(";") || [];
                const enablePivot: string[] = pivotColumns?.split(";") || [];
                const aggFunc: string[] = aggFuncColumns?.split(";") || [];

                const dynamicColumnDefs: any = headers.map(header => ({
                    field: header,
                    enableRowGroup: enableRowGroup.includes(header),
                    enablePivot: enablePivot.includes(header),
                    aggFunc: aggFunc.includes(header) ? 'sum' : null,
                }));
                setColumnDefs(dynamicColumnDefs);
            }
        }
        fetchData();

    }, [apiUrl, enableRowGroupColumns, pivotColumns, aggFuncColumns])
    console.log(columnDefs)
    // const defaultColDef = useMemo<ColDef | any>(() => {
    //     return {
    //         width: 150,
    //     };
    // }, []);
    const autoGroupColumnDef: ColDef<IOlympicData, any> = useMemo(() => {
        return {
            minWidth: 270,
            field: autoDefName,
            headerCheckboxSelection: true,
            cellRendererParams: {
                checkbox: true,
            },
        };
    }, [autoDefName]);

    const gridOptions = {
        sideBar: true,
        columnDefs: columnDefs,
        suppressAggFuncInHeader: true,
        defaultColDef: {
            flex: 1,
            minWidth: 150,
            filter: true,
            floatingFilter: true,
            resizable: true,
            editable: true,
        },
        enableRangeSelection: true,
        statusBar: {
            statusPanels: [
                { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                { statusPanel: 'agTotalRowCountComponent', align: 'center' },
                { statusPanel: 'agFilteredRowCountComponent' },
                { statusPanel: 'agSelectedRowCountComponent' },
                { statusPanel: 'agAggregationComponent' },
            ]
        },
    };
    const handleThemeChange = (selectedOption: string) => {
        setSelectedOption(selectedOption)
        setDivClass(selectedOption);
    };
    const option: Options = {
        Alpine: "ag-theme-alpine",
        Custom: "ag-theme-quartz",
        Balham: "ag-theme-balham",
    }
    return (
        <div className={divClass} style={{ width: '100%', height: '80vh' }}>
            <Theme options={option} onSelect={handleThemeChange} />
            < AgGridReact<IOlympicData>
                rowData={rowData}
                columnDefs={columnDefs}
                autoGroupColumnDef={autoGroupColumnDef}
                gridOptions={gridOptions}
                rowGroupPanelShow='always'
                pagination={true}
                rowSelection={'multiple'}
                groupSelectsChildren={true}
                pivotPanelShow='always'
                // defaultColDef={defaultColDef}
                tooltipShowDelay={500}
            // onGridReady={onGridReady}
            />
        </div>
    );
};

export default AgGrid;