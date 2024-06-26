import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "antd";
const { Title } = Typography;
import moment from "moment";
import "../styles/styles.css";

import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
const URL = "https://6661248863e6a0189fe89795.mockapi.io/api/v1/courses";
const { Option } = Select;
const initialState = {
  title: "",
  desc: "",
  number_of_weeks: "",
  image: "",
  start_date: moment(),
  active: "",
};

// const error_init = {
//   title_err: "",
//   desc_err: "",
//   number_of_weeks_err: "",
//   image_err: "",
//   Start_date_err: "",
//   active_err: "",
// };

export const DashboardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  // const { title, desc, number_of_weeks, image, Start_date, active } = state;
  // const [errors, setErrors] = useState(error_init);

  const getOneCourse = async (id) => {
    const res = await axios.get(`${URL}/${id}`);
    // console.log(res.data);
    if (res.status === 200) {
      setState({ ...res.data, start_date: moment(res.data.start_date) });
    }
  };

  useEffect(() => {
    if (id) getOneCourse(id);
  }, [id]);

  const updateCourse = async (courseID, data) => {
    const res = await axios.put(`${URL}/${courseID}`, data);
    if (res.status === 200) {
      toast.success(`Updated course with ID: ${courseID} successfully`);
      navigate("/dashboard");
    }
  };

  const addNewCourse = async (data) => {
    const res = await axios.post(`${URL}`, data);
    if (res.status === 200 || res.status === 201) {
      toast.success("New Course has been added successfully ~");
      navigate("/dashboard");
    }
  };

  const handleSubmit = (values) => {
    const { start_date, ...rest } = values;
    const data = {
      ...rest,
      start_date: start_date ? start_date.toISOString() : null,
      active: rest.active === "true" ? true : false,
    }; // Ensure active is boolean };
    if (id) updateCourse(id, data);
    else addNewCourse(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  };
  const handleDateChange = (date) => {
    setState((prevState) => ({ ...prevState, start_date: date }));
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  return (
    <Form
      {...formItemLayout}
      variant="filled"
      initialValues={{ ...state, start_date: state.start_date }}
      style={{
        maxWidth: 600,
      }}
      onFinish={handleSubmit}
    >
      <Title level={3}>{id ? "Update Form" : "Add New Staff"}</Title>
      <Form.Item
        label="Title"
        name="title"
        // value={state.title}
        rules={[
          {
            required: true,
            message: "Please input title!",
          },
        ]}
      >
        <Input value={state.title} onChange={handleInputChange} />
      </Form.Item>
      <Form.Item
        label="Desc"
        name="desc"
        rules={[
          {
            required: true,
            message: "Please input desc!",
          },
        ]}
      >
        <Input value={state.desc} onChange={handleInputChange} />
      </Form.Item>
      <Form.Item
        label="Number of Weeks"
        name="number_of_weeks"
        rules={[
          {
            required: true,
            message: "Please input number of weeks!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
          value={state.number_of_weeks}
          onChange={handleInputChange}
        />
      </Form.Item>

      <Form.Item
        label="Image URL"
        name="image"
        rules={[
          {
            required: true,
            message: "Please input image url!",
          },
        ]}
      >
        <Input value={state.image} onChange={handleInputChange} />
      </Form.Item>
      <Form.Item
        label="Start date"
        name="start_date"
        // value={new Date(state.createdAt * 1000).toLocaleDateString()}

        rules={[
          {
            required: true,
            message: "Please choose start date!",
          },
        ]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          onChange={handleDateChange}
          value={state.start_date}
        />
      </Form.Item>
      <Form.Item
        label="Active"
        name="active"
        rules={[{ required: true, message: "Please input active status!" }]}
      >
        {/* <Input value={state.active.toString()} onChange={handleInputChange} /> */}
        <Select
          value={state.active.toString()}
          onChange={handleInputChange}
        >
          <Option value="true">true</Option>
          <Option value="false">false</Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
