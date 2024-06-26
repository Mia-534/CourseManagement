
import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Button, Table, Modal} from "antd";
import { toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css';
import moment from 'moment'; 
const URL = 'https://6661248863e6a0189fe89795.mockapi.io/api/v1/courses';
export const Dashboard = () => {
  const [course, setCourse] = useState([]);
//   const [delCourse, setDelCourse] = React.useState();
  const getListCourses = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
        setCourse(res.data);
    }
}

useEffect(() => {
    getListCourses();
}, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "3",
      title: "Desc",
      dataIndex: "desc",
    },
    {
      key: "4",
      title: "Number of weeks",
      dataIndex: "number_of_weeks",
    },
      {
        key: "5",
        title: "Image",
        dataIndex: "image",
      },
      {
        key: "6",
        title: "Start date",
        dataIndex: "start_date",
        render: (date) => moment(date).format('DD/MM/YYYY'), // Format date using moment
      },
      {
        key: "7",
        title: "Active",
        dataIndex: "active",
        render: (active) => (active ? "true" : "false"), // Render "true" or "false"
      },
      
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <> 
          <Link to={`/update/${record.id}`}><EditOutlined/></Link>
            <DeleteOutlined
              onClick={() => {
                onDeleteCourse(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];


  const onDeleteCourse = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this course?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        handleDelete(record.id)
      },
    });
  };
  const handleDelete = async (id) => {
    // if (window.confirm(`Are you sure that you want to delete a staff with ID: ${id}`)) {
    const res = await axios.delete(`${URL}/${id}`);
    // console.log(res.status);
    if (res.status === 200) {
        getListCourses();
        toast.success("Deleted Successfully ~");
    } else {
        toast.error("Delete: Error!");
    }
  
}

  return (
    <div className="App">
      <header className="App-header">
        <Link to={'/add/'}><Button>Add a new Course</Button></Link>
        {/* <div className="table-container"> */}
        <Table columns={columns} dataSource={course} style={{marginTop:'20px'}}  > </Table>
        {/* </div> */}
      </header>
    </div>
  );
};