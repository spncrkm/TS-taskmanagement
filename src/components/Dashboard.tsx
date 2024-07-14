import { useAuth0 } from "@auth0/auth0-react";
import { Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { TaskState, Task } from "../interface/Task";
import React, { useState } from "react";
import { deleteTask } from "../features/taskSlice";
import EditTaskModal from "./EditTaskModal";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const { tasks } = useSelector((state: TaskState) => state.tasks);
  const userTasks = tasks.filter((item: Task) => item.email === user?.email);
  const [modalShow, setModalShow] = React.useState(false);
  const [updateModalShow, setUpdateModalShow] = React.useState(false);

  const [selectedTask, setSelectedTask] = React.useState({
    name: "",
    description: "",
  });

  const [selectedUpdatedTask, setSelectedUpdatedTask] = React.useState({});

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleModal = (task: Task) => {
    setModalShow(true);
    setSelectedTask(task);
  };

  const handleUpdateModal = (task: Task) => {
    console.log(task);
    setUpdateModalShow(true);
    setSelectedUpdatedTask(task);
  };

  return (
    <Container className="mt-5">
      <h1>Dashboard</h1>
      <Row>
        {userTasks.map((task: Task) => (
          <Col key={task.id} className="my-2">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>
                  {/* {task.description.substring(0, 50) + "..."} */}
                  {task.description}
                </Card.Text>
                <Card.Text>
                  <b>Due Date: </b>
                  {task.dueDate}
                </Card.Text>
                <Card.Text>
                  <b>Priority: </b>
                  {task.priority}
                </Card.Text>
                <div className="d-flex justify-content-between mt-5">
                  <div>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleModal(task)}
                    >
                      Details
                    </Button>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleUpdateModal(task)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDelete(task.id)}
                    >
                      <i className="bi bi-x-circle-fill"></i>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedTask.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedTask.description}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <EditTaskModal
        updateModalShow={updateModalShow}
        setUpdateModalShow={setUpdateModalShow}
        selectedUpdatedTask={selectedUpdatedTask}
      />
    </Container>
  );
};

export default Dashboard;
