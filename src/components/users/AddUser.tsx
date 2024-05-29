import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    SelectInput,
    email, ImageField, ImageInput,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.username) {
        errors.username = 'Vui lòng nhập tên tài khoản';
    }
    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên';
    }
    if (!values.phone) {
        errors.phone = 'Vui lòng nhập số điện thoại';
    }
    if (!values.image) {
        errors.image = 'Vui lòng nhập đường dẫn ảnh đại diện';
    }
    if (!values.password) {
        errors.password = 'Vui lòng nhập mật khẩu';
    }
    if (!values.email) {
        errors.email = 'Vui lòng nhập đúng định dạng email';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    if (values.password && values.password !== values.confirm_password) {
        errors.confirm_password =
            'Mật khẩu không khớp. Vui lòng nhập lại mật khẩu.';
    }
    return errors;
};
export const AddUser = () => (
    <Create>
        <SimpleForm
            sx={{ maxWidth: 500 }}

            validate={validateForm}
        >
            <SectionTitle label="Thông tin cá nhân" />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="username" isRequired fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="fullName" isRequired fullWidth />
                </Box>
            </Box>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <TextInput type="phone" source="phone" isRequired fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput type="email" source="email" isRequired fullWidth />
                </Box>
            </Box>
            <ImageInput source="image" accept="image/*" label="Link hình ảnh" placeholder={<p>Chọn ảnh</p>}>
                <ImageField source={"src"} title=""/>
            </ImageInput>
            <Separator />
            <SectionTitle label="Chức năng" />
                <SelectInput
                    source="role"
                    choices={[
                        { id: 1, name: 'ADMIN' },
                        { id: 2, name: 'MODERATOR' },
                        { id: 3, name: 'USER' },
                    ]}
                    defaultValue={3}
                />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <SelectInput
                        source="locked"
                        choices={[
                            { id: false, name: 'Unlocked' },
                            { id: true, name: 'Locked' },
                        ]}
                        defaultValue={1}
                    />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.1em' }}>
                    <SelectInput
                        source="isSocial"
                        choices={[
                            { id: false, name: 'No' },
                            { id: true, name: 'Yes' },
                        ]}
                        defaultValue={1}
                    />
                </Box>
            </Box>
            <Separator />
            <SectionTitle label="Mật khẩu" />
            <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <PasswordInput source="password" fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <PasswordInput source="confirm_password" fullWidth />
                </Box>
            </Box>
        </SimpleForm>
    </Create>
);
const SectionTitle = ({ label }: { label: string }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};
const Separator = () => <Box pt="1em" />;