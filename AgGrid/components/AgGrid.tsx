/*
 * MyAgGridComponent.tsx
 * Description: React component for displaying data using Ag Grid in TypeScript
 * Author: Dixit Joshi
 * Version: 1.2.0
 * License: MIT
 */

import React, { useState, useEffect, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme CSS
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import Theme from './Theme';
import {option} from './Theme';
import '../css/grid.css'

interface MyAgGridProps {
    apiUrl: string | null;
    enableRowGroupColumns: string | null;
    pivotColumns: string | null;
    aggFuncColumns: string | null;
}

const AgGrid: React.FC<MyAgGridProps> = React.memo(({ apiUrl, enableRowGroupColumns, pivotColumns, aggFuncColumns }) => {
    console.log('AG Grid')
    const [divClass, setDivClass] = useState('ag-theme-alpine');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [rowData, setRowData] = useState<any[]>([]);
    const [autoDefName, setAutoDefName] = useState("athlete");
    const [columnDefs, setColumnDefs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let data;
            // const response = await fetch('https://www.ag-grid.com/example-assets/olympic-winners.json');
            try {
                const response = await fetch(`${apiUrl}`);
                data = await response.json();
                setRowData(data);
            } catch (error) {
                setRowData([]);
                console.log('error')
            }

            if (data && data.length > 0) {
                const headers = Object.keys(data[0]);
                setAutoDefName(headers[0]);

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
    const autoGroupColumnDef = useMemo(() => {
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

    return (
        <div className={divClass} style={{ width: '100%', height: '80vh' }}>
            <Theme options={option} onSelect={handleThemeChange} />
            < AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                autoGroupColumnDef={autoGroupColumnDef}
                gridOptions={gridOptions}
                rowGroupPanelShow='always'
                pagination={true}
                rowSelection={'multiple'}
                groupSelectsChildren={true}
                pivotPanelShow='always'
                tooltipShowDelay={500}
            />
        </div>
    );
});

export default AgGrid;