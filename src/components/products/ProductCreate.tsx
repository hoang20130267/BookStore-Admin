import * as React from "react";
import {useEffect, useState} from "react";
import {Category} from "../../type";
import {
    Create,
    DateInput,
    ImageField,
    ImageInput, minValue,
    NumberInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    useGetList
} from "react-admin";
import {RichTextInput} from "ra-input-rich-text";
import {Grid, Typography} from "@mui/material";

export const ProductCreate = () => {
    const [mainCategories, setMainCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);

    console.log(selectedMainCategory)
    const {data: mainData}: any = useGetList<Category>('categories', {
        filter: {parentCategory: 1, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });
    const {data: subData} = useGetList('categories', {
        filter: {parentCategory: selectedMainCategory, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });


    useEffect(() => {
        if (mainData) {
            setMainCategories(mainData);
        }
    }, [mainData]);

    useEffect(() => {
        if (subData) {
            setSubCategories(subData);
        }
    }, [subData, selectedMainCategory]);

    const validateMainImage = [required('Ảnh chính không được để trống')];

    const validateSubImages = (value: string | any[]) => {
        if (value && value.length > 4) {
            return 'Danh sách ảnh phụ không được vượt quá 4 ảnh';
        }
        return undefined;
    };
    return (
        <Create title="Thêm sản phẩm">
            <TabbedForm>
                <TabbedForm.Tab label="Thông tin cơ bản">
                    <Grid container>
                        <Grid item xs={12}>
                            <SelectInput
                                sx={{marginRight: '20px'}}
                                source="parentCategory.id"
                                label="Danh mục cha"
                                choices={mainCategories}
                                onChange={(e) => setSelectedMainCategory(e.target.value)}
                            />
                            <SelectInput
                                source="category.id"
                                label="Danh mục"
                                choices={subCategories}
                                value={req}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput source="title" label="Tên sản phẩm" value={req}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageInput source="image" label="Ảnh chính" accept="image/*" validate={validateMainImage}>
                                <ImageField source="src"/>
                            </ImageInput>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageInput source="images" label="Danh sách ảnh phụ" accept="image/*" multiple
                                        validate={validateSubImages}>
                                <ImageField source="src"/>
                            </ImageInput>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Chi tiết sản phẩm">
                    <Grid container columnSpacing={{xs: 1, sm: 2}}>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.supplier" label="Nhà cung cấp"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.publisher" label="Nhà xuất bản"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DateInput source="detail.publishYear" label="Năm xuất bản"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.author" label="Tác giả"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.brand" label="Thương hiệu"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.origin" label="Xuất xứ"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.color" label="Màu sắc"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.weight" label="Trọng lượng"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput source="detail.size" label="Kích cỡ"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <NumberInput source="detail.quantityOfPage" label="Số trang" validate={[minValue(1)]}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <RichTextInput source="detail.description" label="Mô tả sản phẩm" fullWidth/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};
const req = [required()];