import { useState } from 'react';
import {
    Button,
    Confirm,
    useRecordContext,
    useDelete,
} from 'react-admin';
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";

const DeleteButton = ({ param }: { param: string }) => {
    const record = useRecordContext();
    const [open, setOpen] = useState(false);

    const [remove, { isLoading }] = useDelete(
        'posts',
        { id: record && record.id }
    );

    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleConfirm = () => {
        remove();
        setOpen(false);
    };

    return (
        <>
            <Button
                label="Delete"
                onClick={handleClick}
                variant="contained"
                startIcon={<DeleteIcon style={{ color: '#E51187' }} />}
                sx={{ color: '#E51187', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
            />
            <Confirm
                isOpen={open}
                loading={isLoading}
                title={`Xóa ${param} #${record && record.id}`}
                content={`Bạn có chắc chắn muốn xóa ${param} này?`}
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </>
    );
};

export default DeleteButton;
