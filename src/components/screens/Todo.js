import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";

import styled from "styled-components";
import SideMenu from "../SideMenu";
import Pencil from "../../icons/Pencil";
import Add from "../../icons/Add";
import Arrow from "../../icons/Arrow";
import DotCircle from "../../icons/DotCircle";
import Circle from "../../icons/Circle";
import Ok from "../../icons/Ok";
import Cross from "../../icons/Cross";
import Trash from "../../icons/Trash";

import { taskConst } from "../../constants/constants";
import { useEffectOnce } from "../../hooks/useEffectOnce";

const Page = styled.div`
  height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
  background-color: ${(props) => props.theme.primary};
`;

const Container = styled.div`
  margin-left: 5rem;
  padding-left: 3rem;
  padding-top: 2rem;
`;

const WelcomeText = styled.h2`
  padding: 0.2rem 0;

  font-weight: 600;
  &:first-of-type {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 100;
  }
`;

const TopicSection = styled.div`
  margin-top: 1.5rem;
  width: 20rem;
  margin-right: 2.5rem;
`;

const TopicContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const TopicHeader = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: ${(props) => props.theme.fontlg};
  padding: 0.5rem 0;
`;

const ButtonsContainer = styled.div`
  & > * {
    margin: 0 0.5rem;
  }
`;

const TopicItemsContainer = styled.div`
  background-color: ${(props) => props.theme.greenSecondary};
  box-shadow: 2px 2px 0 ${(props) => props.theme.secondary};
  padding-bottom: 1rem;
  padding-top: 0.5rem;
`;

const SubTopicContainer = styled.div`
  padding: 0.3rem 1rem;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;

  justify-content: space-between;
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.white};
  font-weight: 100;
  padding: 0.3rem 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.white};
`;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  align-self: center;
  background-color: ${(props) => props.theme.primary};
  border: none;
  outline: none;
  height: 2rem;
  width: 85%;
  padding: 0 0.5rem;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.black};
`;

const SubTopicText = styled.span`
  color: ${(props) => (props.selected ? "black" : "none")};
  text-decoration: ${(props) => (props.selected ? "line-through" : "none")};
  text-decoration-color: ${(props) => (props.selected ? "black" : "none")};
  text-decoration-thickness: ${(props) => (props.selected ? "3px" : "none")};
`;
const ArrowSvg = styled(Arrow)`
  transition: all 0.2s ease;
  /* transform: ${(props) =>
    props.active_item === "true" ? "rotate(90deg)" : ""};
  fill: ${(props) =>
    props.active_item === "false" ? props.theme.secondary : ""}; */

  &:hover {
    fill: ${(props) => props.theme.secondary};
  }
`;

const TrashSVG = styled(Trash)`
  fill: ${(props) => (props.selected ? "black" : "white")};
`;

const TaskItemsContainer = styled.div`
  background-color: ${(props) => props.theme.greenSecondary};
  box-shadow: 2px 2px 0 ${(props) => props.theme.secondary};
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  min-width: 25vw;
  color: white;
  word-wrap: break-word;
`;

const TaskTitleContainer = styled.div`
  display: flex;
  align-items: center;
  word-break: break-all;
  padding-top: 0.5rem;
`;

const State = styled.h2`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const TaskTitle = styled.h2`
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 500;
`;
const TaskDescription = styled.p`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: ${(props) => props.theme.fontmd};
`;

const StateCircle = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => (props.state ? `red` : "transparent")};
  border: 2px solid red;
  border-radius: 50%;

  transition: all 0.2s ease;
`;

const Todo = () => {
  const { user } = UserAuth();

  const [activeSubTopic, setActiveSubTopic] = useState([]);
  const [activeTask, setActiveTask] = useState([]);
  const [activeSubTask, setActiveSubTask] = useState([]);

  const [topicArray, setTopicArray] = useState([]);
  const [subTopicArray, setSubTopicArray] = useState([]);
  const [taskArray, setTaskArray] = useState([]);
  const [subTaskArray, setSubTaskArray] = useState([]);

  const [topicText, setTopicText] = useState("");

  const activeSubTopicHandler = (item) => {
    if (item == activeSubTopic) {
      setActiveSubTopic([]);
      setActiveTask([]);
    } else {
      setActiveSubTopic(item);
      setActiveTask([]);
    }
    //item -> subtopic information
  };

  const activeTaskHandler = (item) => {
    if (item == activeTask) {
      setActiveTask([]);
    } else {
      setActiveTask(item);
    }
    //item -> subtopic information
  };

  const getTopics = async (collectionString, setValue) => {
    if (user.uid) {
      const q = query(
        collection(db, collectionString),
        where("userUID", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setValue((oldArray) => [...oldArray, { id: doc.id, ...doc.data() }]);
      });
    }
  };

  useEffectOnce(() => {
    getTopics("topics", setTopicArray);
    getTopics("subTopics", setSubTopicArray);
    getTopics("tasks", setTaskArray);
    getTopics("subTasks", setSubTaskArray);
  }, []);

  const handleSubmitTopic = async () => {
    const usersRef = collection(db, "topics");

    try {
      await setDoc(doc(usersRef), {
        userUID: user.uid,
        name: topicText,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmitSubTopic = async (id, name) => {
    const usersRef = collection(db, "subTopics");

    try {
      if (!name || name === "") {
        return;
      }
      await setDoc(doc(usersRef), {
        userUID: user.uid,
        topicID: id,
        name: name,
      });
      setSubTopicArray([]);
      getTopics("subTopics", setSubTopicArray);
    } catch (e) {
      console.log(e.message);
    }
  };

  const Topic = () => {
    const [openTopic, setOpenTopic] = useState([]);

    const [editTopic, setEditTopic] = useState([]);

    const [topicInput, setTopicInput] = useState("");

    const [topicDeleteArray, setTopicDeleteArray] = useState([]);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const openTopicHandler = (id) => {
      setTopicDeleteArray([]);
      setOpenTopic([id]);
      setEditTopic([]);
      setDeleteOpen(false);
    };

    const editTopicHandler = (id) => {
      setDeleteOpen(true);
      setTopicDeleteArray([]);
      setEditTopic([id]);
      setOpenTopic([]);
    };

    const addTopicHandler = (id) => {
      if (topicDeleteArray.includes(id)) {
        setTopicDeleteArray(topicDeleteArray.filter((item) => item !== id));
      } else {
        setTopicDeleteArray((oldArray) => [...oldArray, id]);
      }
    };

    const deleteAndCloseEditerHandler = () => {
      setTopicDeleteArray([]);
      setEditTopic([]);
      setDeleteOpen(false);
    };

    const selectOrDelete = (item, index) => {
      if (deleteOpen && editTopic.includes(index)) {
        addTopicHandler(item.id);
      } else {
        activeSubTopicHandler(item);
      }
    };

    return topicArray?.map((item, index) => {
      let filteredSubTopic = subTopicArray.filter((e) => e.topicID === item.id);

      return (
        <TopicContainer key={item.id}>
          <TopicHeader>
            <span onClick={() => console.log(topicDeleteArray)}>
              {item?.name}
            </span>

            <ButtonsContainer>
              {!openTopic.includes(index) ? (
                <>
                  {!editTopic.includes(index) ? (
                    <>
                      <Pencil onClick={() => editTopicHandler(index)} />
                      <Add onClick={() => openTopicHandler(index)} />
                    </>
                  ) : (
                    <>
                      <Ok onClick={() => console.log("ola")} />
                      <Cross onClick={deleteAndCloseEditerHandler} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <Ok
                    onClick={() => handleSubmitSubTopic(item.id, topicInput)}
                  />
                  <Cross onClick={() => setOpenTopic([])} />
                </>
              )}
            </ButtonsContainer>
          </TopicHeader>
          <TopicItemsContainer>
            {openTopic.includes(index) && (
              <InputContainer>
                <Input
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.currentTarget.value)}
                />
              </InputContainer>
            )}

            {filteredSubTopic?.map((item1, index1) => {
              return (
                <SubTopicContainer
                  key={item1.name + index1}
                  onClick={() => selectOrDelete(item1, index)}
                >
                  <Item>
                    <SubTopicText
                      selected={topicDeleteArray.includes(item1.id)}
                    >
                      {item1.name}
                    </SubTopicText>

                    {!editTopic.includes(index) ? (
                      <ArrowSvg
                        active_item={
                          activeSubTopic.id === item1.id ? "false" : "true"
                        }
                      />
                    ) : (
                      <TrashSVG
                        selected={topicDeleteArray.includes(item1.id)}
                        onClick={() => addTopicHandler(item1.id)}
                      />
                    )}
                  </Item>
                  <Line />
                </SubTopicContainer>
              );
            })}
          </TopicItemsContainer>
        </TopicContainer>
      );
    });
  };

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////                           /////////////////////////
  ///////////////////////           TASK            /////////////////////////
  ///////////////////////                           /////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  const handleSubmitTask = async (id, name) => {
    const usersRef = collection(db, "tasks");

    try {
      await setDoc(doc(usersRef), {
        userUID: user.uid,
        subTopicID: id,
        name: name,
      });
      setTaskArray([]);
      getTopics("tasks", setTaskArray);
    } catch (e) {
      console.log(e.message);
    }
  };

  const Task = () => {
    const [openInputTask, setOpenInputTask] = useState(false);

    const [editTask, setEditTask] = useState(false);

    const [taskInput, setTaskInput] = useState("");

    const [taskDeleteArray, setTaskDeleteArray] = useState([]);

    const addTaskHandler = (id) => {
      if (taskDeleteArray.includes(id)) {
        setTaskDeleteArray(taskDeleteArray.filter((item) => item !== id));
      } else {
        setTaskDeleteArray((oldArray) => [...oldArray, id]);
      }
    };

    const editTaskHandler = () => {
      setEditTask(true);
      setOpenInputTask(false);
      setTaskDeleteArray([]);
    };

    const deleteAndCloseEditerHandler = () => {
      setTaskDeleteArray([]);
      setEditTask(false);
    };

    const selectOrDelete = (item) => {
      if (editTask) {
        addTaskHandler(item.id);
      } else {
        activeTaskHandler(item);
      }
    };

    let filteredSubTopic = taskArray.filter(
      (e) => e.subTopicID === activeSubTopic.id
    );
    return (
      <>
        <TopicContainer>
          <TopicHeader style={{ justifyContent: "flex-end" }}>
            <ButtonsContainer>
              {!openInputTask ? (
                <>
                  {!editTask ? (
                    <>
                      <Pencil onClick={() => editTaskHandler()} />
                      <Add onClick={() => setOpenInputTask(true)} />
                    </>
                  ) : (
                    <>
                      <>
                        <Ok onClick={() => console.log("Okay - edit")} />
                        <Cross onClick={deleteAndCloseEditerHandler} />
                      </>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Ok
                    onClick={() => {
                      handleSubmitTask(activeSubTopic.id, taskInput);
                    }}
                  />
                  <Cross onClick={() => setOpenInputTask(false)} />
                </>
              )}
            </ButtonsContainer>
          </TopicHeader>

          <TopicItemsContainer>
            {openInputTask && (
              <InputContainer>
                <Input
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.currentTarget.value)}
                />
              </InputContainer>
            )}
            {filteredSubTopic?.map((item, index) => {
              return (
                <SubTopicContainer
                  key={item.id}
                  onClick={() => selectOrDelete(item, index)}
                >
                  <Item>
                    <SubTopicText selected={taskDeleteArray.includes(item.id)}>
                      {item.name}
                    </SubTopicText>

                    {!editTask ? (
                      <ArrowSvg />
                    ) : (
                      <TrashSVG
                        selected={taskDeleteArray.includes(item.id)}
                        onClick={() => addTaskHandler(item.id)}
                      />
                    )}
                  </Item>
                  <Line />
                </SubTopicContainer>
              );
            })}
          </TopicItemsContainer>
        </TopicContainer>
      </>
    );
  };

  const SubTask = () => {
    const [openInputSubTask, setOpenInputSubTask] = useState(false);

    const [editSubTask, setEditSubTask] = useState(false);

    const [subTaskInput, setSubTaskInput] = useState("");

    const [description, setDescription] = useState("");

    const [subTaskDeleteArray, setSubTaskDeleteArray] = useState([]);

    const addSubTaskHandler = (id) => {
      if (subTaskDeleteArray.includes(id)) {
        setSubTaskDeleteArray(subTaskDeleteArray.filter((item) => item !== id));
      } else {
        setSubTaskDeleteArray((oldArray) => [...oldArray, id]);
      }
    };

    const editSubTaskHandler = () => {
      setEditSubTask(true);
      setOpenInputSubTask(false);
      setSubTaskDeleteArray([]);
    };

    const deleteAndCloseEditerHandler = () => {
      setSubTaskDeleteArray([]);
      setEditSubTask(false);
    };

    const selectOrDelete = (item) => {
      if (editSubTask) {
        addSubTaskHandler(item.id);
      } else {
        setActiveSubTask(item);
      }
    };

    let filteredSubTask = subTaskArray.filter(
      (e) => e.taskID === activeTask.id
    );
    return (
      <TopicContainer>
        <TopicHeader style={{ justifyContent: "flex-end" }}>
          <ButtonsContainer>
            {!openInputSubTask ? (
              <>
                {!editSubTask ? (
                  <>
                    <Pencil onClick={() => editSubTaskHandler()} />
                    <Add onClick={() => setOpenInputSubTask(true)} />
                  </>
                ) : (
                  <>
                    <>
                      <Ok onClick={() => console.log("Okay - edit")} />
                      <Cross onClick={deleteAndCloseEditerHandler} />
                    </>
                  </>
                )}
              </>
            ) : (
              <>
                <Ok
                  onClick={() => {
                    console.log("Okay Input");
                  }}
                />
                <Cross onClick={() => setOpenInputSubTask(false)} />
              </>
            )}
          </ButtonsContainer>
        </TopicHeader>
        <TaskItemsContainer>
          {openInputSubTask && (
            <InputContainer>
              <Input
                value={subTaskInput}
                onChange={(e) => setSubTaskInput(e.currentTarget.value)}
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </InputContainer>
          )}
          {filteredSubTask?.map((item, index, row) => {
            return (
              <div
                key={item.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TaskTitleContainer>
                  <State>
                    <StateCircle state={item.state} />
                  </State>
                  <TaskTitle>{item.name}</TaskTitle>
                </TaskTitleContainer>

                <TaskDescription>{item.description}</TaskDescription>
                {index + 1 !== row.length ? <Line /> : null}
              </div>
            );
          })}
        </TaskItemsContainer>
      </TopicContainer>
    );
  };

  return (
    <Page>
      <SideMenu />
      <Container>
        <WelcomeText onClick={(e) => console.log(activeSubTopic)}>
          Good morning!
        </WelcomeText>
        <WelcomeText> Enjoy your planning!</WelcomeText>

        <input onChange={(e) => setTopicText(e.currentTarget.value)} />
        <button onClick={handleSubmitTopic}>Submit</button>

        <div style={{ display: "flex" }}>
          <TopicSection>
            <Topic />
          </TopicSection>
          {activeSubTopic?.name?.length > 0 && (
            <TopicSection>
              <Task />
            </TopicSection>
          )}

          {activeTask?.name?.length > 0 ? (
            <TopicSection>
              <SubTask />
            </TopicSection>
          ) : null}
        </div>
      </Container>
    </Page>
  );
};

export default Todo;
