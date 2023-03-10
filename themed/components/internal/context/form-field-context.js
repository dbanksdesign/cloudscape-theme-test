// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useContext, createContext } from 'react';
export var FormFieldContext = createContext({});
function applyDefault(fields, defaults, keys) {
    var result = {};
    keys.forEach(function (key) {
        result[key] = fields[key] === undefined ? defaults[key] : fields[key];
    });
    return result;
}
export function useFormFieldContext(props) {
    var context = useContext(FormFieldContext);
    return applyDefault(props, context, [
        'invalid',
        'controlId',
        'ariaLabelledby',
        'ariaDescribedby',
        '__useReactAutofocus',
    ]);
}
//# sourceMappingURL=form-field-context.js.map