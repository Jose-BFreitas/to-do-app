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

const ArrowSvg = styled(Arrow)`
  transition: all 0.2s ease;
  transform: ${(props) =>
    props.active_item === "true" ? "rotate(90deg)" : ""};
  fill: ${(props) =>
    props.active_item === "false" ? props.theme.secondary : ""};

  &:hover {
    fill: ${(props) => props.theme.secondary};
  }
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
  const [openSubTopic, setOpenSubTopic] = useState([]);

  const activeHandler = (item) => {
    //item -> subtopic information
    setActiveSubTopic(item);

    setOpenSubTopic([item.id]);

    if (openSubTopic[0] === item.id) {
      setActiveSubTopic([]);
    }
  };

  const [topicArray, setTopicArray] = useState([]);
  const [subTopicArray, setSubTopicArray] = useState([]);
  const [taskArray, setTaskArray] = useState([]);
  const [subTaskArray, setSubTaskArray] = useState([]);
  const [topicDeleteArray, setTopicDeleteArray] = useState([]);

  const [topicText, setTopicText] = useState("");

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

  const addTopicHandler = (id) => {
    let array = topicDeleteArray;
    setTopicDeleteArray([array, id]);
  };

  const Topic = () => {
    const [openTopic, setOpenTopic] = useState([]);

    const [editTopic, setEditTopic] = useState([]);

    const [topicInput, setTopicInput] = useState("");

    const openTopicHandler = (id) => {
      setOpenTopic([id]);
    };

    const editTopicHandler = (id) => {
      setEditTopic([id]);
    };

    return topicArray?.map((item, index) => {
      let filteredSubTopic = subTopicArray.filter((e) => e.topicID === item.id);

      return (
        <TopicContainer key={item.id}>
          <TopicHeader>
            {item?.name}

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
                      <Cross onClick={() => setEditTopic([])} />
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

            {filteredSubTopic?.map((item, index1) => {
              return (
                <SubTopicContainer
                  key={item.name + index1}
                  //onClick={() => activeHandler(item)}
                >
                  <Item>
                    <span>{item.name}</span>
                    {!editTopic.includes(index) ? (
                      <ArrowSvg
                        active_item={
                          activeSubTopic.id === item.id ? "false" : "true"
                        }
                      />
                    ) : (
                      <Trash onClick={addTopicHandler(item.id)} />
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

  // const handleSubmitTask = async (id, name) => {
  //   const usersRef = collection(db, "tasks");

  //   try {
  //     await setDoc(doc(usersRef), {
  //       userUID: user.uid,
  //       subTopicID: id,
  //       name: name,
  //     });
  //     setTaskArray([]);
  //     getTopics("tasks", setTaskArray);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  // const Task = () => {
  //   const [openTask, setOpenTask] = useState(false);

  //   const [taskInput, setTaskInput] = useState("");

  //   let filteredSubTopic = taskArray.filter(
  //     (e) => e.subTopicID === activeSubTopic.id
  //   );
  //   return (
  //     <>
  //       <TopicContainer>
  //         <TopicHeader style={{ justifyContent: "flex-end" }}>
  //           <ButtonsContainer>
  //             <Pencil />
  //             <Add onClick={() => setOpenTask(true)} />
  //           </ButtonsContainer>
  //         </TopicHeader>

  //         <TopicItemsContainer>
  //           {openTask && (
  //             <InputContainer>
  //               <Input
  //                 value={taskInput}
  //                 onChange={(e) => setTaskInput(e.currentTarget.value)}
  //               />
  //             </InputContainer>
  //           )}
  //           {filteredSubTopic?.map((item, index) => {
  //             return (
  //               <SubTopicContainer
  //                 key={item.id}
  //                 onClick={() => setActiveTask(item)}
  //               >
  //                 <Item>
  //                   <span>{item.name}</span>
  //                   <ArrowSvg />
  //                 </Item>
  //                 <Line />
  //               </SubTopicContainer>
  //             );
  //           })}
  //         </TopicItemsContainer>
  //       </TopicContainer>
  //     </>
  //   );
  // };

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////                           /////////////////////////
  ///////////////////////          SUBTASK          /////////////////////////
  ///////////////////////                           /////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // const handleSubmitSubTask = async (id, name, description) => {
  //   const usersRef = collection(db, "subTasks");

  //   try {
  //     await setDoc(doc(usersRef), {
  //       userUID: user.uid,
  //       taskID: id,
  //       name: name,
  //       description: description,
  //       state: false,
  //     });
  //     setSubTaskArray([]);
  //     getTopics("subTasks", setSubTaskArray);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  // const handleSubTaskState = async (id, state) => {
  //   const ref = doc(db, `subTasks/`, id);
  //   try {
  //     await updateDoc(ref, {
  //       state: !state,
  //     });
  //     setSubTaskArray([]);

  //     getTopics("subTasks", setSubTaskArray);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const SubTask = () => {
  //   const [openSubTask, setOpenSubTask] = useState(false);

  //   const [subTaskInput, setSubTaskInput] = useState("");

  //   const [description, setDescription] = useState("");

  //   let filteredSubTask = subTaskArray.filter(
  //     (e) => e.taskID === activeTask.id
  //   );
  //   return (
  //     <TopicContainer>
  //       <TopicHeader style={{ justifyContent: "flex-end" }}>
  //         <ButtonsContainer>
  //           <Pencil
  //             onClick={() =>
  //               handleSubmitSubTask(activeTask.id, subTaskInput, description)
  //             }
  //           />
  //           <Add onClick={() => setOpenSubTask(true)} />
  //         </ButtonsContainer>
  //       </TopicHeader>
  //       <TaskItemsContainer>
  //         {openSubTask && (
  //           <InputContainer>
  //             <Input
  //               value={subTaskInput}
  //               onChange={(e) => setSubTaskInput(e.currentTarget.value)}
  //             />
  //             <Input
  //               value={description}
  //               onChange={(e) => setDescription(e.currentTarget.value)}
  //             />
  //           </InputContainer>
  //         )}
  //         {filteredSubTask?.map((item, index, row) => {
  //           return (
  //             <div
  //               key={item.id}
  //               style={{ display: "flex", flexDirection: "column" }}
  //             >
  //               <TaskTitleContainer>
  //                 <State
  //                   onClick={() => handleSubTaskState(item.id, item.state)}
  //                 >
  //                   <StateCircle state={item.state} />
  //                 </State>
  //                 <TaskTitle>{item.name}</TaskTitle>
  //               </TaskTitleContainer>

  //               <TaskDescription>{item.description}</TaskDescription>
  //               {index + 1 !== row.length ? <Line /> : null}
  //             </div>
  //           );
  //         })}
  //       </TaskItemsContainer>
  //     </TopicContainer>
  //   );
  // };

  return (
    <>
      <Page>
        <SideMenu />
        <Container>
          <WelcomeText onClick={() => console.log(topicDeleteArray)}>
            Good morning!
          </WelcomeText>
          <h2>Topics</h2>
          <input onChange={(e) => setTopicText(e.currentTarget.value)} />
          <button onClick={handleSubmitTopic}>Submit</button>

          <WelcomeText> Enjoy your planning!</WelcomeText>
          <div style={{ display: "flex" }}>
            <TopicSection>
              <Topic />
            </TopicSection>
            {/* {activeSubTopic?.name?.length > 0 ? (
              <TopicSection>
                <Task />
              </TopicSection>
            ) : null} */}

            {/* {activeTask?.name?.length > 0 ? (
              <TopicSection>
                <SubTask />
              </TopicSection>
            ) : null} */}
          </div>
        </Container>
      </Page>
    </>
  );
};

export default Todo;
