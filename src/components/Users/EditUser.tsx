import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    EditButton,
    email,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên';
    }
    if (!values.phone) {
        errors.phone = 'Vui lòng nhập số điện thoại';
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
    return errors;
};
export const EditUser = () => (
    <Edit>
        <SimpleForm
            sx={{ maxWidth: 500 }}
            // Here for the GQL provider
            defaultValues={{
                birthday: new Date(),
                first_seen: new Date(),
                last_seen: new Date(),
                has_ordered: false,
                latest_purchase: new Date(),
                has_newsletter: false,
                groups: [],
                nb_commands: 0,
                total_spent: 0,
            }}
            validate={validateForm}
        >
            <SectionTitle label="Thông tin cá nhân" />
            <TextInput source="id" disabled fullWidth />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="username" disabled isRequired fullWidth />
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
                    <TextInput type="avatar" source="avatar" isRequired fullWidth />
                </Box>
            </Box>
            <TextInput type="email" source="email" isRequired fullWidth />
            <Separator />
            <SectionTitle label="Chức năng" />
            <SelectInput
                source="role"
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
                        defaultValue={1}
                    />
                </Box>
            </Box>
        </SimpleForm>
    </Edit>
);
const SectionTitle = ({ label }: { label: string }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};
const Separator = () => <Box pt="1em" />;