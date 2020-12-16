import { Button } from "@material-ui/core";
import React, { useState } from "react";

const DnD = ({ fade, setFade, setPageNumber }) => {
  const [LessonsForHelping, setLessonsForHelping] = useState([]);
  const [LessonsForLearning, setLessonsForLearning] = useState([]);
  const lessons = [
    { id: 1, lesson: "Math", img: "" },
    { id: 2, lesson: "Lang", img: "" },
    { id: 3, lesson: "Phith", img: "" },
    { id: 4, lesson: "Biology", img: "" },
    { id: 5, lesson: "Chemistry", img: "" },
    { id: 6, lesson: "PCScince", img: "" },
    { id: 7, lesson: "Aue", img: "" },
    { id: 8, lesson: "PE", img: "" },
    { id: 9, lesson: "History", img: "" },
    { id: 10, lesson: "Social", img: "" },
    { id: 11, lesson: "English", img: "" },
    { id: 12, lesson: "Music", img: "" },
  ];
  const draggable_elements = [3, 6, 9, 12];
  const DragStart = (ev, e) => {
    ev.dataTransfer.setData("id", e.id);
  };
  const DragOver = (ev) => {
    ev.preventDefault();
  };
  const Drop = (ev, hl) => {
    ev.preventDefault();
    let DraggingEl = lessons.find(
      (l) => l.id === Number(ev.dataTransfer.getData("id"))
    );
    let massForHL = hl === "h" ? LessonsForHelping : LessonsForLearning;
    let setMassForFilter =
      hl === "h" ? setLessonsForLearning : setLessonsForHelping;
    let setMassForHL =
      hl === "h" ? setLessonsForHelping : setLessonsForLearning;
    if (
      hl !== "r" &&
      DraggingEl &&
      massForHL.length < 6 &&
      !massForHL.find((e) => e.id === DraggingEl.id)
    ) {
      setMassForFilter((lastData) => {
        return lastData.filter((e) => e.id !== DraggingEl.id);
      });
      setMassForHL((lastData) => {
        return [...lastData, DraggingEl];
      });
    }
    if (hl === "r") {
      if (DraggingEl) {
        setLessonsForHelping((lastData) => {
          return lastData.filter((e) => e.id !== DraggingEl.id);
        });
        setLessonsForLearning((lastData) => {
          return lastData.filter((e) => e.id !== DraggingEl.id);
        });
      }
    }
  };
  const DraggableElement = ({ e }) => {
    return (
      <div
        className={`draggable ${
          LessonsForHelping.find((i) => i.id === e.id) ||
          LessonsForLearning.find((i) => i.id === e.id)
            ? "dragged"
            : null
        }`}
        draggable={`${
          !LessonsForHelping.find((i) => i.id === e.id) &&
          !LessonsForLearning.find((i) => i.id === e.id)
        }`}
        onDragStart={(ev) => {
          DragStart(ev, e);
        }}
      >
        <span>{e.lesson}</span>
      </div>
    );
  };

  const DroppableElement = ({ hl }) => {
    let massForLH = hl === "h" ? LessonsForHelping : LessonsForLearning;
    let massForElContainer1 = massForLH.slice(0, 3);
    let massForElContainer2 = massForLH.slice(3, 6);
    return (
      <div className="droppable">
        <span className="droppable_t">
          {hl === "h" ? "What you know very good?" : "What you want learn?"}
        </span>
        <div className="droppable_e_g_container">
          <div
            className="droppable_e_container_1"
            onDragOver={(ev) => {
              DragOver(ev);
            }}
            onDrop={(ev) => {
              Drop(ev, hl);
            }}
          >
            {massForElContainer1.map((e) => {
              return (
                <div
                  draggable="true"
                  className="draggable"
                  style={{
                    borderRight:
                      massForElContainer1.indexOf(e) === 2 ? "none" : "",
                  }}
                  onDragStart={(ev) => DragStart(ev, e)}
                >
                  {e.lesson}
                </div>
              );
            })}
          </div>
          <div
            className="droppable_e_container_2"
            onDragOver={(ev) => {
              DragOver(ev);
            }}
            onDrop={(ev) => {
              Drop(ev, hl);
            }}
          >
            {massForElContainer2.map((e) => {
              return (
                <div
                  draggable="true"
                  className="draggable"
                  style={{
                    borderRight:
                      massForElContainer2.indexOf(e) === 2 ? "none" : "",
                    borderBottom: "none",
                  }}
                  onDragStart={(ev) => DragStart(ev, e)}
                >
                  {e.lesson}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`lessons_choice_container ${!fade ? "fade" : ""}`}>
      <div className="tittle">Сhoose a lessons</div>
      <section
        className="draggable_elements"
        onDragOver={(ev) => {
          DragOver(ev);
        }}
        onDrop={(ev) => {
          Drop(ev, "r");
        }}
      >
        {draggable_elements.map((i) => {
          return (
            <div className="draggable_elements_i">
              {lessons
                .filter((e) => e.id > i - 3 && e.id <= i)
                .map((e) => {
                  return <DraggableElement e={e} />;
                })}
            </div>
          );
        })}
      </section>
      <section className="droppable_elements">
        <DroppableElement hl="h" />
        <DroppableElement hl="l" />
      </section>
      <div className="buttons_container">
        <Button
          onClick={() => {
            setFade(false);
            setTimeout(() => {
              setPageNumber(1);
            }, 1000);
          }}
        >
          Go back
        </Button>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default DnD;
