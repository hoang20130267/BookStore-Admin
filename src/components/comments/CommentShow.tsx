import * as React from 'react';
import {
    TextInput,
    SimpleForm,
    DateField,
    ShowProps,
    Labeled,
    TextField, ShowBase,
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Comment } from '../../types';
import RatingField from './RatingField';

interface Props extends ShowProps<Comment> {
    onCancel: () => void;
}

const CommentShow = ({ id, onCancel }: Props) => {
    return (
        <ShowBase id={id}>
            <Box pt={5} width={{ xs: '100vW', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {"Chi tiết bình luận"}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<></>}
                >
                    <Grid container rowSpacing={1} mb={1}>
                        <Grid item xs={6}>
                            <Labeled label="Khách hàng">
                                <Typography
                                    variant="body2"
                                    display="flex"
                                    flexWrap="nowrap"
                                    alignItems="center"
                                    component="div"
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mr: 1,
                                        }}
                                    >
                                        <Avatar
                                            src={`user.userInfo.avatar`}
                                            style={{ width: 25, height: 25 }}
                                            alt="user.userInfo.fullName"
                                        />
                                    </Box>
                                    <TextField source="user.userInfo.fullName" />
                                </Typography>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Sản phẩm">
                                <TextField source="product.title" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Ngày đánh giá">
                                <DateField source="created_at" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Đánh giá">
                                <RatingField />
                            </Labeled>
                        </Grid>
                    </Grid>
                    <TextInput
                        source="cmtDetail"
                        maxRows={15}
                        label={"Nội dung"}
                        multiline
                        fullWidth
                        readOnly={true}
                    />
                </SimpleForm>
            </Box>
        </ShowBase>
    );
};

export default CommentShow;
