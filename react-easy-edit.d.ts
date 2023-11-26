declare module "react-easy-edit" {
    import * as React from "react";

    export interface EditableProps {
        type: string;
        saveButtonLabel?: React.ReactElement;
        cancelButtonLabel: string;
        instructions?: string;
        onSave: (value: any) => void;
        onCancel?: () => void;
        editComponent?: React.ReactElement;
    }

    const Editable: React.FC<EditableProps>;

    export default Editable;
}
