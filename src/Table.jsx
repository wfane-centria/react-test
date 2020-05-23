import React, {useState} from 'react';
import {useResizeObserver} from "./Hooks";
import _ from 'lodash';

const sortData = (data, fields, sortOn, sortAscending) => {
    if (!sortOn) {
        return data;
    }

    const sortField = _.find(fields, {name: sortOn});

    const sortFn = _.get(sortField, 'comparator');

    const path = _.get(sortField, 'path', sortField);

    let sortedData;

    if (sortFn) {
        sortedData = [...data].sort((a, b) => {
            return sortFn(a, b);
        })
    } else {
        sortedData = _.sortBy(data, (item) => {
            const d = _.get(item, path);
            if (typeof d === 'string') {
                return d.toLowerCase()
            }

            return d;
        });
    }

    if (!sortAscending) {
        return sortedData.reverse();
    }

    return sortedData;
};

export const HeaderField = (props) => {
    const {field, handleSort, sortOn, sortAscending, headerStyle, width} = props;
    const hStyle = {...headerStyle, width: width};
    const sortable = _.get(field, 'sortable', false);
    const style = _.get(field, 'style');
    const name = _.get(field, 'name', typeof field === 'string' ? field : null);

    return (
        <th
            role="columnheader"
            scope="col"
            id={name ? _.replace(name, ' ', '') : ''}
            className={`table--header-field${sortable ? ' sortable' : ''}${sortable && sortOn === name ? ' sorted' : ''}`}
            style={headerStyle? hStyle: style}
        >
            <div
                onClick={sortable ? () => {
                    handleSort(name)
                } : null}
                className='table--header-field--content'
                data-testid={`header-field${_.isEmpty(name) ? '-controls' : '-' + _.lowerCase(name)}`}
            >
                <span>{name}</span>
                {sortable && <div className="table--sort-icons">
                    {sortOn === name && !sortAscending && <div className='arrow-down'/>}
                    {sortOn === name && sortAscending && <div className='arrow-up'/>}
                    {sortOn !== name && <div className="arrow-both">
                        <div className='arrow-up'/>
                        <div className='arrow-down'/>
                    </div>}
                </div>}
            </div>
        </th>
    )

};

export const HeaderRow = ({fields, handleSort, sortOn, sortAscending, headerStyle}) => {

    return (
        <thead>
        <tr role="row">
            {_.map(fields, field => <HeaderField
                field={field}
                key={_.get(field, 'name', 'controls')}
                handleSort={handleSort}
                sortOn={sortOn}
                sortAscending={sortAscending}
                headerStyle={headerStyle}
                width={_.get(field, 'width')}
            />)}
        </tr>
        </thead>
    )
};

export const AccessibilityRowHeader = ({colHeader, name, data, field }) => {
    const DataComponent = _.get(field, 'component', null);
    const style = _.get(field, "style");
    return (
        <th
            role="rowheader"
            scope="row"
            headers={colHeader}
            data-testid={`rowheader${_.isEmpty(name) ? '' : '-' + _.lowerCase(name)}`}
            style={style}
        >
                <span className="table--col-header" aria-hidden="true" style={style}>
                    {name}
                </span>
            {DataComponent ? <DataComponent data={data}/> : data}
        </th>
    )
};

export const TableData = ({rowId, colHeader, name, data, field}) => {
    const DataComponent = _.get(field, 'component', null);
    const style = _.get(field, "style");
    return (<td
        role="cell"
        headers={`${_.isNil(rowId) ? '' : rowId} ${colHeader}`}
        className={`table--data-field`}
        data-testid={`data-field${_.isEmpty(name) ? '-controls' : '-' + _.lowerCase(name)}`}
        style={style}
    >
        {DataComponent ? <DataComponent data={data}/> : data}
    </td>)
};

export const DataField = (props) => {
    const {data, field, header, rowId} = props;
    const name = _.get(field, 'name', typeof field === 'string' ? field : null);
    const colHeader = name ? _.replace(name, ' ', '') : '';

    return <TableData rowId={rowId} colHeader={colHeader} name={name} data={data} field={field} />
};

export const DataRow = ({highlights, fields, row, rowHeaderField}) => {
    let rowId;

    const highlightClassNames = highlights.map(highlight => {
        let val = _.get(row, highlight.field, "");
        return (val === highlight.condition) ? highlight.className : "";
    })
        .filter(cn => cn !== "")
        .join(" ");

    return (
        <tr role="row" className={`table--data-row ${highlightClassNames}`} >
            {_.map(fields, (field, columnIndex) => {
                    // This will use the first column value as the index for accessibility requirements when the table is in responsive mode.
                    if (rowHeaderField) {
                        rowId = _.get(row, rowHeaderField)
                    } else if (columnIndex === 0) {
                        let firstColumnValue = _.get(row, _.get(field, 'path', field), row);
                        if (typeof firstColumnValue !== 'object') {
                            rowId = firstColumnValue;
                        }
                    }
                    return (
                        <DataField
                            key={columnIndex}
                            header={columnIndex === 0}
                            rowId={rowId}
                            data={_.get(row, _.get(field, 'path', field), row)}
                            field={field}
                        />)
                }
            )
            }
        </tr>
    )
};

export const Table = ({config, headerStyle, miniWidth}) => {

    const [sortOn, setSortOn] = useState(null);
    const [sortAscending, setSortAscending] = useState(true);
    const [ref, width,] = useResizeObserver();

    const handleSort = (newSort) => {
        setSortOn(newSort);
        setSortAscending(sortOn === newSort ? !sortAscending : sortAscending)
    };

    const fields = _.get(config, 'fields', []);
    const data = sortData(_.get(config, 'data', []), fields, sortOn, sortAscending);
    const highlights = _.get(config, 'highlights', []);

    return (
        <table role="table" className={`table${width < (miniWidth || 700) ? ' mini' : ''}`} ref={ref} data-testid="table">
            <HeaderRow headerStyle={headerStyle} fields={fields} handleSort={handleSort} sortOn={sortOn} sortAscending={sortAscending}/>
            <tbody>
            {_.map(data, (d, i) => <DataRow highlights={highlights} key={i} fields={fields} row={d} rowHeaderField={_.get(config, 'rowHeaderField')}/>)}
            </tbody>
        </table>
    )
};
