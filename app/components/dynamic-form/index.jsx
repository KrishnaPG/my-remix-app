import React from "react";
import { Form } from "@formily/antd-v5";
import SchemaField from "../dynamic-form/util-schema-field";

const DefFormProps = {
  labelCol: 6,
  wrapperCol: 10,
  layout: "horizontal",
};

const DefSchema = {
  type: "object",
  properties: {
    lrnnw3mf0z1: {
      type: "string",
      "x-component": "Text",
      "x-component-props": {
        content: "Its Working !",
        mode: "h1",
        style: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "space-around",
          alignItems: "center",
        },
      },
      "x-designable-id": "lrnnw3mf0z1",
      "x-index": 2,
    },
    ri9m7npar4a: {
      type: "string",
      "x-component": "Text",
      "x-component-props": {
        content:
          "This is just placeholder. Design your form schema with https://designable-antd.formilyjs.org/",
        mode: "p",
        style: {
          display: "flex",
          justifyContent: "center",
        },
      },
      "x-designable-id": "ri9m7npar4a",
      "x-index": 3,
      name: "",
    },
  },
  "x-designable-id": "v1a8kki7baf",
};

/**
 * Design the schema at: https://designable-antd.formilyjs.org/
 * Usage:
		import { createForm, onFormValuesChange } from "@formily/core";
		import { Form, FormButtonGroup, Submit } from "@formily/antd";

   	const DynamicForm = React.lazy(() =>import("../dynamic-form"));
			
		export default () => {
			const formRef = useMemo(() => createForm());
			return 
				<DynamicForm
					form={formRef}
					schema={schema}
					extraItems={
						<FormButtonGroup.FormItem>
							<Submit onSubmit={console.log} onSubmitSuccess={() => {}} onSubmitFailed={() => {}}>Submit</Submit>
						</FormButtonGroup.FormItem>
					}
				/>
		};
 */
export default ({
  form,
  formProps = DefFormProps,
	schema = DefSchema,
	scope = {},
  extraItems,
}) => (
  <Form form={form} {...formProps}>
    <SchemaField schema={schema}  scope={scope}/>
    {extraItems}
  </Form>
);
