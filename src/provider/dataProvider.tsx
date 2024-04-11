import {DataProvider, fetchUtils} from 'react-admin'

const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson

// @ts-ignore
export const dataProvider: DataProvider = {
    // @ts-ignore
    getList: async () => {
        try {
            const { json } = await httpClient(`${apiUrl}/blog/all`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            });

            return {
                data: json,
                total: json.length,
            };

        } catch (err: any) {

        }
    },
    getOne: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        }).then(({json}) => {
            return ({
                data: json
            })
        }),
    // @ts-ignore
    create: async (resource: any, params: any) => {
        console.log(params)
        // try {
        const {json} = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),

            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        })
        window.location.href = `/#/${resource}`
        return Promise.resolve({data: json});
    }
    ,
    update: async (resource: any, params: any) => {
        console.log(params)
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        })
        return Promise.resolve({data: json});
    },
}

// export default dataProvider
