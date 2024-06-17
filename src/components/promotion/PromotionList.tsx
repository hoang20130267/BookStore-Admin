import * as React from 'react';
import {
    ArrayField,
    BulkDeleteButton, BulkUpdateButton,
    Count, CreateButton,
    DatagridConfigurable,
    DateField, EditButton,
    ExportButton,
    List,
    SelectColumnsButton, ShowButton,
    TextField,
    TopToolbar,
    useListContext,
} from 'react-admin';
import {Fragment, useCallback} from 'react';
import {Divider, Tabs, Tab, Box} from '@mui/material';
import DeleteButton from "../../layout/DeleteButton";
import { makeStyles } from '@mui/styles';

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
const useStyles = makeStyles({
    selectedTab: {
        backgroundColor: '#ff1493',
    },
});
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
        <TabbedDatagrid/>
    </List>
);
const tabs = [
    {id: '0', name: 'Discount Product'},
    {id: '1', name: 'Voucher'},
];
const TabbedDatagrid = () => {
    const classes = useStyles();
    const listContext = useListContext();
    const {filterValues, setFilters, displayedFilters} = listContext;

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
            setFilters(
                {...filterValues, isCode: value},
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
                                sx={{lineHeight: 'inherit'}}
                            />
                            )
                        </span>
                        }
                        value={choice.id}
                        classes={{ selected: classes.selectedTab }}
                    />
                ))}
            </Tabs>
            <Divider/>
            {filterValues.isCode === '0' && (
                <DatagridConfigurable
                    rowClick={false}
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
                    <ArrayField label={"Hành động"} textAlign={"center"}>
                        <Box display={{xs: 'block', sm: 'flex', width: '100%'}}>
                            <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                <ShowButton/>
                            </Box>
                            <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                <EditButton/>
                            </Box>
                            <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                                <DeleteButton param={"khuyến mãi"}/>
                            </Box>
                        </Box>
                    </ArrayField>
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
                    <ArrayField label={"Hành động"} textAlign={"center"}>
                        <Box display={{xs: 'block', sm: 'flex', width: '100%'}}>
                            <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                <ShowButton/>
                            </Box>
                            <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                                <EditButton/>
                            </Box>
                            <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                                <DeleteButton param={"khuyến mãi"}/>
                            </Box>
                        </Box>
                    </ArrayField>
                </DatagridConfigurable>
            )}
        </Fragment>
    );
};