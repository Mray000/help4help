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
    if (hl === "h") {
      if (LessonsForHelping.length < 5) {
        setLessonsForHelping((lastData) => {
          return [...lastData, DraggingElData];
        });
      }
    }
    if (hl === "l") {
      if (LessonsForLearning.length < 5) {
        setLessonsForLearning((lastData) => {
          return [...lastData, DraggingElData];
        });
      }
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
      >
        <span>{e.lesson}</span>
      </div>
    );
  };

  const DroppableElement = ({ hl }) => {
    let massForLH = hl === "h" ? LessonsForHelping : LessonsForLearning;
    return (
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
            <div draggable="true" className="draggable">
              {e}
            </div>
          );
        })}
        {massForLH.length === 0 &&
          (hl === "h" ? "What you know very good?" : "What you want learn?")}
      </div>
    );
  };

  return (
    <div className="lessons_choice_container">
      <section className="draggable_elements">
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
