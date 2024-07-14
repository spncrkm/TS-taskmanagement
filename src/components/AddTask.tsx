import React, { FormEvent, SelectHTMLAttributes, useState } from "react";
import {
  Container,
  Form,
  Button,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { addTask } from "../features/taskSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuth0();
  const [newTask, setNewTask] = useState({
    id: Date.now(),
    name: "",
    description: "",
    priority: "",
    dueDate: "",
    email: user?.email,
  });

  const handleChange = (e: any) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handlePriority = (e: any) => {
    setNewTask({ ...newTask, priority: e });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTask(newTask));
    navigate("/dashboard");
  };

  // task name -- description -- priority -- date

  return (
    <Container className="w-50 mt-5">
      <Form onSubmit={handleFormSubmit} className="border p-5 bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task"
            required
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder=""
            required
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Dropdown
            as={ButtonGroup}
            className="my-3"
            name="priority"
            onChange={handleChange}
            onSelect={handlePriority}
          >
            <Button variant="primary">Select Priority</Button>
            <Dropdown.Toggle
              split
              variant="primary"
              id="dropdown-custom-1"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
              <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
              <Dropdown.Item eventKey="High">High</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>{" "}
          {newTask.priority}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date:</Form.Label>
          <Form.Control
            type="date"
            required
            name="dueDate"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddTask;
