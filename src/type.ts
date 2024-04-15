import {RaRecord} from "react-admin";

export interface Category extends RaRecord{
    id: number;
    name: string;
    parentId: number|null;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;

}