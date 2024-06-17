import * as React from 'react';
import {UserSearch} from "./UserSearch";
import {ArrayField, EditButton, ShowButton} from 'react-admin';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    SelectColumnsButton, DatagridConfigurable, BulkUpdateButton, BulkDeleteButton
} from 'react-admin';
import {
    List,
    TextField,
    DateField,
    BooleanField
} from "react-admin";
import {Avatar, Box} from '@mui/material';
const adminInfo = JSON.parse(localStorage.getItem('auth') || '{}');

const VisitorListActions = () => (
    <TopToolbar>
        {adminInfo.roles[0].description === 'ADMIN' && <CreateButton/>}
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const UserList = () => (
    <List sort={{field: 'id', order: 'ASC'}} perPage={5}
          actions={<VisitorListActions/>}
          filters={<UserSearch/>}
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
            rowClick={false}
            bulkActionButtons={
                <>
                    <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                    <BulkDeleteButton/>
                </>
            }
        >
            <TextField source="id" label="ID"/>
            <TextField source="userInfo.fullName" label="Họ và tên "/>
            <Avatar
                src="avatar"
                style={{width: parseInt("25", 10), height: parseInt("25", 10)}}
            />
            <TextField source="email" label="Email"/>
            <TextField source="userInfo.phoneNumber" label="Số điện thoại"/>
            <BooleanField
                source="locked"
                sx={{mt: -0.5, mb: -0.5}}
            />
            <BooleanField
                source="isSocial"
                sx={{mt: -0.5, mb: -0.5}}
            />
            <DateField source="createdAt" label="Ngày tạo" showDate showTime={false}/>
            <DateField source="updatedAt" label="Ngày cập nhật" showDate showTime={false}/>
            <ArrayField label={"Hành động"} textAlign={"center"}>
                <Box display={{xs: 'block', sm: 'flex', width: '100%'}}>
                    <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                        <ShowButton/>
                    </Box>
                    {adminInfo.roles[0].description === 'ADMIN' &&
                    <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                        <EditButton/>
                    </Box>
                    }
                </Box>
            </ArrayField>
        </DatagridConfigurable>
    </List>
);