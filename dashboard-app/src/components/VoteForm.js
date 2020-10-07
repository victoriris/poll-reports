import { message, Row } from "antd";
import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import axios from "axios";


function VoteForm() {
	const [form] = Form.useForm();

	return (
		<Row
			type="flex"
			justify="space-around"
			align="top"
			gutter={24}
			style={{
				padding: "0 12px 12px 12px",
				margin: "25px 8px",
            }}
		>
			<Form
				layout="inline"
                form={form}
                onFinish={async (values) => {
                    try {
                        await axios.get('http://localhost:4000/vote', {
                            params: {
                                name: values.name
                            }
                        });
                        form.resetFields();
                        message.success("Voted successfully!")
                    } catch (error) {
                        message.error("Invalid candidate name")
                    }
                    
                }}
			>
				<Form.Item label="Candidate Name" name="name">
					<Input placeholder="firstname lastname" required/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">Vote!</Button>
				</Form.Item>
			</Form>
		</Row>
	);
}

export default VoteForm;
