import {DataProvider, fetchUtils} from 'react-admin'

const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson
const adminInfo = JSON.parse(localStorage.getItem('auth') || '{}');
// @ts-ignore
export const dataProvider: DataProvider = {
    // @ts-ignore
    getList: async (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
            sort: field,
            order: order,
            page: page - 1,
            perPage: perPage,
        };
        try {
            let url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
            const {json} = await httpClient(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            });
            return {
                data: json.content,
                total: parseInt(json.totalElements, 10),
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    },
    getOne: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include',
        }).then(({json}) => {
            if (resource === 'blog') {
                json.imageShow = json.image;
                json.blogCate = json.blogCate.id;
            }
            if (resource === 'user') {
                json.avatarShow = json.avatar;
            }
            return ({
                data: json
            })
        }),
    getMany: async (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            filter: JSON.stringify({
                ...fetchUtils.flattenObject(params.filter),
                [params.target]: params.id,
            }),
            sort: field,
            order: order,
            page: page - 1,
            perPage: perPage,
        };
        try {
            const {json} = await httpClient(`${apiUrl}/${resource}/id?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include',
            });
            return {
                data: json.content,
                total: parseInt(json.totalElements, 10),
            };
        } catch (error: any) {
            console.log(error)
            return Promise.reject({message: error.response.data.message});
        }
    },
    create: async (resource: any, params: any) => {
        try {
            const url = `${apiUrl}/${resource}/add`;
            let imageUrl = '';
            if (params.data.image && params.data.image.rawFile instanceof File) {
                const formData = new FormData();

                formData.append('image', params.data.image.rawFile);

                const response = await fetch('https://api.imgbb.com/1/upload?key=c383fa3727851be15a713c4c41085099', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                imageUrl = data.data.url;
            }
            if (resource === 'blog') {
                const {json} = await httpClient(url, {
                    method: 'POST',
                    body: JSON.stringify({...params.data, image: imageUrl}),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                });
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            }
            if (resource === 'blogCate') {
                const {json} = await httpClient(url, {
                    method: 'POST',
                    body: JSON.stringify({...params.data, createBy: adminInfo.id, updateBy: adminInfo.id}),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                });
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            }
            if (resource === 'user') {
                const {json} = await httpClient(url, {
                    method: 'POST',
                    body: JSON.stringify({...params.data, avatar: imageUrl}),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                });
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            }
            if (resource === 'inventories') {
                const {json} = await httpClient(url, {
                    method: 'POST',
                    body: JSON.stringify(params.data.InventoryRequest),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                });
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            } else {
                const {json} = await httpClient(url, {
                    method: 'POST',
                    body: JSON.stringify(params.data),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                });
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // @ts-ignore
            throw new Error(`Error fetching data: ${error.message}`);
        }
    },
    update: async (resource: any, params: any) => {
        try {
            let imageUrl = '';
            if (params.data.image && params.data.image.rawFile instanceof File) {
                console.log(params.data.image.rawFile)
                const formData = new FormData();

                formData.append('image', params.data.image.rawFile);

                const response = await fetch('https://api.imgbb.com/1/upload?key=c383fa3727851be15a713c4c41085099', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                imageUrl = data.data.url;
            }
            let response;
            if (resource === 'blog') {
                response = await httpClient(`${apiUrl}/${resource}/edit/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({...params.data, image: imageUrl}),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                    credentials: 'include'
                })
            }
            if (resource === 'blogCate') {
                response = await httpClient(`${apiUrl}/${resource}/edit/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({...params.data, updateBy: adminInfo.id}),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                    credentials: 'include'
                })
            }
            if (resource === 'user') {
                response = await httpClient(`${apiUrl}/${resource}/edit/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({...params.data, avatar: imageUrl}),
                    headers: new Headers({
                        'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }),
                    credentials: 'include'
                })
            }
            if (response) {
                const data = await response.json;
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: {id: params.id, ...data}});
            } else {
                throw new Error('Response is undefined');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            return Promise.resolve({data: {id: params.id}});
        }
    },

    updateMany: (resource: any, params: any) => Promise.resolve({data: []}),

    delete: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/delete/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        }).then(({json}) => ({
            data: json,
        })),
    deleteMany: (resource: any, params: any) => Promise.resolve({data: []}),
}
// export default dataProvider
