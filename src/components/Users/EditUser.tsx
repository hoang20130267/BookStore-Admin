import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    email, DateInput,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
export const validateForm = (values: Record<string, any>): Record<string, any> => {
    const errors = {} as any;
    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên';
    }
    if (!values.phone) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại';
    }
    if (!values.avatar) {
        errors.avatar = 'Vui lòng nhập đường dẫn ảnh đại diện';
    }
    if (!values.email) {
        errors.email = 'Vui lòng nhập đúng định dạng email';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = 'Vui lòng nhập đúng ngày sinh';
    }
    return errors;
};
export const EditUser = () => {
    return (
        <Edit>
            <SimpleForm
                sx={{ maxWidth: 500 }}
                defaultValues={{
                    dateOfBirth: new Date(),
                }}
                validate={validateForm}
            >
                <SectionTitle label="Thông tin cá nhân" />
                <TextInput source="id" disabled fullWidth />
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="username" source="username" disabled fullWidth/>
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="fullName" source="fullName" label="Họ và tên" isRequired fullWidth/>
                    </Box>
                </Box>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="phone" source="phone" label="Số điện thoại" isRequired fullWidth />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <TextInput type="avatar" source="avatar" label="Avatar url" isRequired fullWidth />
                    </Box>
                </Box>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput type="email" source="email" isRequired fullWidth />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                <DateInput type="dateOfBirth" source="dateOfBirth" label="Ngày sinh" fullWidth/>
                    </Box>
                </Box>
                <SelectInput
                    source="gender"
                    label="Giới tính"
                    choices={[
                        { id: "male", name: 'Nam' },
                        { id: "female", name: 'Nữ' },
                    ]}
                />
                <Separator />
                <SectionTitle label="Chức năng" />
                <SelectInput
                    source="role"
                    label="Role"
                    choices={[
                        { id: 1, name: 'ADMIN' },
                        { id: 2, name: 'MODERATOR' },
                        { id: 3, name: 'USER' },
                    ]}
                />
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <SelectInput
                            source="locked"
                            label="Khóa tài khoản"
                            choices={[
                                { id: false, name: 'Unlocked' },
                                { id: true, name: 'Locked' },
                            ]}
                        />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.1em' }}>
                        <SelectInput
                            source="isSocial"
                            choices={[
                                { id: false, name: 'No' },
                                { id: true, name: 'Yes' },
                            ]}
                        />
                    </Box>
                </Box>
            </SimpleForm>
        </Edit>
    );
};
const SectionTitle = ({ label }: { label: string }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};
const Separator = () => <Box pt="1em" />;