import * as React from 'react';
import {BlogAside} from "./BlogAside";
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    SelectColumnsButton,DatagridConfigurable, BulkUpdateButton, BulkDeleteButton
} from 'react-admin';
import {
    List,
    ImageField,
    TextField,
    DateField
} from "react-admin";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const BlogList = () => (
    <List sort={{field: 'title', order: 'DESC'}} perPage={5}
          actions={<VisitorListActions/>}
        aside={<BlogAside/>}>
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
            <TextField source="blogCate.name" label="Danh mục"/>
            <ImageField source="image" label="Hình ảnh" sx={{ '& img': { maxWidth: 100, maxHeight: 50, objectFit: 'contain' } }}/>
            <TextField source="creator.username" label="Người tạo"/>
            <TextField source="title" label="Tiêu đề"/>
            <DateField source="created_at" label="Ngày tạo"/>
        </DatagridConfigurable>
    </List>
);