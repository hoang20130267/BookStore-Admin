import * as React from 'react';
import {
    BulkDeleteButton, BulkUpdateButton,
    Count, CreateButton,
    DatagridConfigurable,
    DateField,  EditButton,
    ExportButton,
    List,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    useListContext,
} from 'react-admin';
import { Fragment, useCallback } from 'react';
import { Divider, Tabs, Tab} from '@mui/material';
import DeleteButton from "../../layout/DeleteButton";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const PromotionList = () => (
    <List sort={{field: 'id', order: 'ASC'}} perPage={5}
          actions={<VisitorListActions/>}
          sx={{
              '& .column-title': {
                  maxWidth: '16em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
              },
              '& .column-commentable': {
                  maxWidth: '4em',
              },
          }}
    >
        <TabbedDatagrid />
    </List>
);
const tabs = [
    { id: '0', name: 'Discount Product' },
    { id: '1', name: 'Voucher' },
];
const TabbedDatagrid = () => {
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
            setFilters(
                { ...filterValues, isCode: value },
                displayedFilters,
                false
            );
        },
        [displayedFilters, filterValues, setFilters]
    );

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.isCode}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            <span>
                            {choice.name} (
                            <Count
                                filter={{
                                    ...filterValues,
                                    isCode: choice.id,
                                }}
                                sx={{ lineHeight: 'inherit' }}
                            />
                            )
                        </span>
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {filterValues.isCode === '0' && (
                <DatagridConfigurable
                    rowClick="show"
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                            <BulkDeleteButton/>
                        </>
                    }
                >
                    <TextField source="id" label="ID"/>
                    <TextField source="product.title" label="Tên sản phẩm "/>
                    <TextField source="discount" label="Giảm giá"/>
                    <DateField source="startDate" label="Ngày bắt đầu" showDate showTime={false}/>
                    <DateField source="endDate" label="Ngày kết thúc" showDate showTime={false}/>
                    <EditButton/>
                    <DeleteButton param={"khuyến mãi"}/>
                </DatagridConfigurable>
            )}
            {filterValues.isCode === '1' && (
                <DatagridConfigurable
                    rowClick="show"
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                            <BulkDeleteButton/>
                        </>
                    }
                >
                    <TextField source="id" label="ID"/>
                    <TextField source="code" label="Mã giảm giá"/>
                    <TextField source="discount" label="Giảm giá"/>
                    <DateField source="startDate" label="Ngày bắt đầu" showDate showTime={false}/>
                    <DateField source="endDate" label="Ngày kết thúc" showDate showTime={false}/>
                    <EditButton/>
                    <DeleteButton param={"khuyến mãi"}/>
                </DatagridConfigurable>
            )}
        </Fragment>
    );
};