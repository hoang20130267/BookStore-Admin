import * as React from 'react';
import {ContactSearch} from "./ContactSearch";
import { EditButton } from 'react-admin';
import {
    ExportButton,
    TopToolbar,
    SelectColumnsButton,DatagridConfigurable, BulkUpdateButton, BulkDeleteButton
} from 'react-admin';
import {
    List,
    TextField,
    DateField,
    BooleanField
} from "react-admin";
import DeleteButton from "../../layout/DeleteButton";

const VisitorListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const ContactList = () => (
    <List sort={{field: 'id', order: 'ASC'}} perPage={5}
          actions={<VisitorListActions/>}
          filters={<ContactSearch/>}
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
            <TextField source="fullName" label="Họ và tên "/>
            <TextField source="email" label="Email"/>
            <TextField source="title" label="Tiêu đề"/>
            <BooleanField
                source="reply"
                label="Đã trả lời"
                sx={{ mt: -0.5, mb: -0.5 }}
            />
            <DateField source="createdDate" label="Ngày tạo" showDate showTime={false}/>
            <EditButton/>
            <DeleteButton param={"liên lạc"}/>
        </DatagridConfigurable>
    </List>
);