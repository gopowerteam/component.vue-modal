
interface IModalComponentOption {
    component: any
    props: { [key: string]: any }
}

export interface IModalWindowOption {
    closable?: boolean
    maskClosable?: boolean
    title?: string
    header?: boolean,
    width?: number
}

export interface IModalOption extends IModalComponentOption, IModalWindowOption { }

export interface IModal extends IModalComponentOption {
    id: string;
    resolve: any;
    config: IModalWindowOption
}
