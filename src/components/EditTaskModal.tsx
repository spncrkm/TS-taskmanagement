import React, { useEffect, FormEvent, useDebugValue } from "react";
import { Modal, Button, Form, Dropdown, ButtonGroup } from "react-bootstrap";
import { Task } from "../interface/Task";
import { updateTask } from "../features/taskSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface updateProps {
  updateModalShow: boolean;
  setUpdateModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUpdatedTask: Task;
}

const EditTaskModal = ({
  updateModalShow,
  setUpdateModalShow,
  selectedUpdatedTask,
}: updateProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newTask, setNewTask] = React.useState<Task>({
    id: null,
    name: "",
    description: "",
    priority: "",
    dueDate: "",
    email: "",
  });

  useEffect(() => {
    if (selectedUpdatedTask) {
      setNewTask({
        id: selectedUpdatedTask.id,
        name: selectedUpdatedTask.name,
        description: selectedUpdatedTask.description,
        priority: selectedUpdatedTask.priority,
        dueDate: selectedUpdatedTask.dueDate,
        email: selectedUpdatedTask.email,
      });
    }
  }, [selectedUpdatedTask]);
  const handleChange = (e: any) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handlePriority = (e: any) => {
    setNewTask({ ...newTask, priority: e });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateTask(newTask));
    navigate("/dashboard");
    setUpdateModalShow(false);
  };

  return (
    <div>
      <Modal
        show={updateModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit "{selectedUpdatedTask.name}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="border p-5 bg-light" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task"
                required
                name="name"
                value={newTask.name || ""}
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
                value={newTask.description || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Dropdown
                as={ButtonGroup}
                className="my-3"
                name="priority"
                value={newTask.priority || ""}
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
                value={newTask.dueDate || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setUpdateModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTaskModal;
