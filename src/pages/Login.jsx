import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const URL = "https://6661248863e6a0189fe89795.mockapi.io/api/v1/users";
  // Fetch users from the mock API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      if (username === "admin" && password === "123456") {
        setIsAdmin(true);
        navigate("/dashboard");
      } else {
        setIsAdmin(false);
        navigate("/");
      }
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
