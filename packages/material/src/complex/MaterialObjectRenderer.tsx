/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import {
  findUISchema,
  GroupLayout,
  isObjectControl,
  isPlainLabel,
  RankedTester,
  rankWith,
  StatePropsOfControlWithDetail,
} from '@jsonforms/core';
import { JsonFormsDispatch, RefResolver, withJsonFormsDetailProps } from '@jsonforms/react';
import { Hidden } from '@material-ui/core';
import React from 'react';

const MaterialObjectRenderer = ({
  renderers,
  uischemas,
  schema,
  label,
  path,
  visible,
  uischema,
  rootSchema,
}: StatePropsOfControlWithDetail) => {
  return (
    <RefResolver schema={schema} pointer={uischema.scope}>
      {(resolvedSchema: any) => {
        const detailUiSchema = findUISchema(
          uischemas,
          resolvedSchema,
          uischema.scope,
          path,
          'Group',
          uischema,
          rootSchema
        );

        if (isEmpty(path)) {
          detailUiSchema.type = 'VerticalLayout';
        } else {
          detailUiSchema.type = 'Group';
          (detailUiSchema as GroupLayout).label = startCase(
            isPlainLabel(label) ? label : label.default
          );
        }
        return (
          <Hidden xsUp={!visible}>
            <JsonFormsDispatch
              visible={visible}
              schema={resolvedSchema}
              uischema={detailUiSchema}
              path={path}
              renderers={renderers}
            />
          </Hidden>
        );
      }}
    </RefResolver>
  );
};

export const materialObjectControlTester: RankedTester = rankWith(
  2,
  isObjectControl
);
export default withJsonFormsDetailProps(MaterialObjectRenderer);
