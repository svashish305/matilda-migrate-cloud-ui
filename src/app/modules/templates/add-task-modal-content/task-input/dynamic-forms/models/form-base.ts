

export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FormBase {
    label?: string;
    key?: string;
    controlType?: string;
    inputType?: string;
    options?: any[];
    value?: any;
    actionId?: any;
    validations?: Validator[];
}