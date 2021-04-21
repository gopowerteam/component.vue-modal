
interface IModalComponentOption {
    component: any
    props: { [key: string]: any }
}

interface IModalWindowOption {
    closable?: boolean
    maskClosable?: boolean
    title?: string
    header?: boolean
}

export interface IModalOption extends IModalComponentOption,IModalWindowOption {}

export interface IModal extends IModalComponentOption {
    id: string;
    resolve: any;
    config: IModalWindowOption
}
