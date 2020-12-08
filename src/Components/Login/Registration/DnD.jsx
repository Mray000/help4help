import React, { useState } from "react";

const DnD = () => {
  const [LessonsForHelping, setLessonsForHelping] = useState([]);
  const [LessonsForLearning, setLessonsForLearning] = useState([]);
  const [lessons, setLessons] = useState([
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
  ]);
  const DragStart = (ev, e) => {
    console.log("data start...");
    ev.dataTransfer.setData("text", e);
  };
  const DragOver = (ev) => {
    ev.preventDefault();
  };
  const Drop = (ev, hl) => {
    ev.preventDefault();
    let DraggingElData = ev.dataTransfer.getData("text");
    let massForHL = hl === "h" ? LessonsForHelping : LessonsForLearning;
    let setMassForFilter =
      hl === "h" ? setLessonsForLearning : setLessonsForHelping;
    let setMassForHL =
      hl === "h" ? setLessonsForHelping : setLessonsForLearning;
    if (massForHL.length < 5 && !massForHL.find((i) => i === DraggingElData)) {
      setMassForFilter((lastData) => {
        return lastData.filter((i) => i !== DraggingElData);
      });
      setMassForHL((lastData) => {
        return [...lastData, DraggingElData];
      });
    }
    if (hl === "r") {
      setLessonsForHelping((lastData) => {
        return lastData.filter((e) => e !== DraggingElData);
      });
      setLessonsForLearning((lastData) => {
        return lastData.filter((e) => e !== DraggingElData);
      });
    }
  };
  const DraggableElement = ({ e }) => {
    return (
      <div
        className={`draggable ${
          LessonsForHelping.find((i) => i === e.lesson) ||
          LessonsForLearning.find((i) => i === e.lesson)
            ? "dragged"
            : null
        }`}
        draggable={`${
          !LessonsForHelping.find((i) => i === e.lesson) &&
          !LessonsForLearning.find((i) => i === e.lesson)
        }`}
        onDragStart={(ev) => {
          DragStart(ev, e.lesson);
        }}
        style={{
          marginRight:
            lessons.indexOf(e) === 4 || lessons.indexOf(e) === 9 ? "0" : "",
        }}
      >
        <span>{e.lesson}</span>
      </div>
    );
  };

  const DroppableElement = ({ hl }) => {
    let massForLH = hl === "h" ? LessonsForHelping : LessonsForLearning;
    return (
      <>
        <span>
          {hl === "h" ? "What you know very good?" : "What you want learn?"}{" "}
        </span>
        <div
          className="droppable"
          onDragOver={(ev) => {
            DragOver(ev);
          }}
          onDrop={(ev) => {
            Drop(ev, hl);
          }}
        >
          {massForLH.map((e) => {
            return (
              <div
                draggable="true"
                className="draggable"
                style={{
                  borderRight: massForLH.indexOf(e) === 4 ? "none" : "",
                }}
                onDragStart={(ev) => DragStart(ev, e)}
              >
                {e}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="lessons_choice_container">
      <section
        className="draggable_elements"
        onDragOver={(ev) => {
          DragOver(ev);
        }}
        onDrop={(ev) => {
          Drop(ev, "r");
        }}
      >
        <div className="draggable_elements_1">
          {lessons
            .filter((e) => e.id <= 5)
            .map((e) => {
              return <DraggableElement e={e} />;
            })}
        </div>
        <div className="draggable_elements_2">
          {lessons
            .filter((e) => e.id > 5 && e.id <= 10)
            .map((e) => {
              return <DraggableElement e={e} />;
            })}
        </div>
      </section>
      <section className="droppable_elements">
        <DroppableElement hl="h" />
        <DroppableElement hl="l" />
      </section>
    </div>
  );
};

export default DnD;
