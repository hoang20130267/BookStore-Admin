import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
} from 'react-admin';
import {Box, Typography} from '@mui/material';
import {useEffect} from "react";
import {RichTextInput} from 'ra-input-rich-text';
import {useParams} from 'react-router-dom';

export const validateForm = (values: Record<string, any>): Record<string, any> => {
    const errors = {} as any;
    if (!values.contentReply) {
        errors.contentReply = 'Vui lòng nhập nội dung trả lời';
    }
    return errors;
};
export const ReplyContact = () => {
    const {id} = useParams<{ id: string }>();
    const response = new Request(`${process.env.REACT_APP_ENDPOINT_API}/contact/check-reply/${id}`, {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'}),
    });
    fetch(response)
        .then(async response => {
            const responseBody = await response.text();
            if (response.status === 200 && responseBody === "Replied") {
                window.location.href = `/#/contact`;
                return Promise.reject({message: 'Bạn đã trả lời email này rồi'});
            }
            return {status: response.status};
        })
        .catch((error) => {
            console.error(error.message);
        });
    return (
        <Edit>
            <SimpleForm
                sx={{maxWidth: 800}}
                validate={validateForm}
            >
                <SectionTitle label="Trả lời"/>
                <TextInput source="id" disabled fullWidth/>
                <TextInput type="email" source="email" label="Email" disabled fullWidth/>
                <TextInput type="title" source="title" label="Tiêu đề" disabled fullWidth/>
                <RichTextInput type="content" source="content" label="Nội dung" disabled fullWidth/>
                <Separator/>
                <RichTextInput type="contentReply" source="contentReply" label="Nội dung" isRequired fullWidth/>
            </SimpleForm>
        </Edit>
    );
};
const SectionTitle = ({label}: { label: string }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};
const Separator = () => <Box pt="1em"/>;