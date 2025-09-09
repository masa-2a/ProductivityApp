"use client";
import { useMemo, useState } from "react";
import styles from "./mainpage.module.css";
type Project = { id: string; name: string };
type Task = { id: string; name: string; notes?: string };
function ProjectsColumn({
  projects,
  selectedId,
  onSelect,
  onAdd,
}: {
  projects: Project[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
}) {
  const [draftName, setDraftName] = useState("");
  return (
    <div className={styles.col}>
      <div className={styles.colHeader}>Projects</div>
      <div className={styles.colBody}>
        {projects.map((p) => (
          <div
            key={p.id}
            className={`${styles.item} ${p.id === selectedId ? styles.active : ""}`}
            onClick={() => onSelect(p.id)}
          >
            {p.name}
          </div>
        ))}
        <input
          className={styles.textInput}
          placeholder="new project name"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
        />
        <button
          className={styles.addBtn}
          onClick={() => {
            const name = draftName.trim();
            if (!name) return;
            onAdd(name);
            setDraftName("");
          }}
        >
          + add project
        </button>
      </div>
    </div>
  );
}
function TasksColumn({
  tasks,
  selectedTaskId,
  onSelectTask,
  onAddTask,
}: {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelectTask: (id: string) => void;
  onAddTask: (name: string) => void;
}) {
  const [draftTask, setDraftTask] = useState("");
  return (
    <div className={styles.col}>
      <div className={styles.colHeader}>Tasks</div>
      <div className={styles.colBody}>
        {tasks.map((t) => (
          <div
            key={t.id}
            className={`${styles.item} ${t.id === selectedTaskId ? styles.active : ""}`}
            onClick={() => onSelectTask(t.id)}
          >
            {t.name}
          </div>
        ))}
        <input
          className={styles.textInput}
          placeholder="new task name"
          value={draftTask}
          onChange={(e) => setDraftTask(e.target.value)}
        />
        <button
          className={styles.addBtn}
          onClick={() => {
            const name = draftTask.trim();
            if (!name) return;
            onAddTask(name);
            setDraftTask("");
          }}
        >
          + add task
        </button>
      </div>
    </div>
  );
}
function DetailsColumn({
  task,
  onUpdateNotes,
  onStart,
  onStartMultiple,
}: {
  task: Task | null;
  onUpdateNotes: (notes: string) => void;
  onStart: () => void;
  onStartMultiple: () => void;
}) {
  return (
    <div className={styles.col}>
      <div className={styles.rightSplit}>
        <div className={styles.details}>
          <div
            className={styles.colHeader}
            style={{ borderBottom: "none", padding: 0 }}
          >
            {task ? task.name : "Select a task"}
          </div>
          {task ? (
            <>
              <label style={{ display: "block", marginTop: 8, marginBottom: 6 }}>
                Notes
              </label>
              <textarea
                className={styles.notes}
                value={task.notes ?? ""}
                onChange={(e) => onUpdateNotes(e.target.value)}
                placeholder="add notes related to this task…"
              />
              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.primary}`} onClick={onStart}>
                  start
                </button>
                <button className={styles.btn} onClick={onStartMultiple}>
                  start on multiple
                </button>
              </div>
            </>
          ) : (
            <div style={{ color: "#666", marginTop: 12 }}>
              choose a task to see details
            </div>
          )}
        </div>
        <div className={styles.shelfPlaceholder}>🪴 future plant shelves area</div>
      </div>
    </div>
  );
}
export default function Mainpage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "p1", name: "Study – Math" },
    { id: "p2", name: "Read – Biology" },
  ]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>("p1");
  const [tasksByProject, setTasksByProject] = useState<Record<string, Task[]>>({
    p1: [
      { id: "t1", name: "Chapter 1 summary", notes: "" },
      { id: "t2", name: "Exercises 1–10", notes: "" },
    ],
    p2: [{ id: "t3", name: "Cells overview", notes: "" }],
  });
  const tasks = tasksByProject[selectedProjectId ?? ""] ?? [];
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(
    tasks[0]?.id ?? null
  );
  const selectedTask = useMemo(
    () => tasks.find((t) => t.id === selectedTaskId) || null,
    [tasks, selectedTaskId]
  );
  function addProject(name: string) {
    const id = "p" + Math.random().toString(36).slice(2, 8);
    const next = [...projects, { id, name }];
    setProjects(next);
    setTasksByProject({ ...tasksByProject, [id]: [] });
    setSelectedProjectId(id);
    setSelectedTaskId(null);
  }
  function addTask(name: string) {
    if (!selectedProjectId) return;
    const id = "t" + Math.random().toString(36).slice(2, 8);
    const nextTasks = [...(tasksByProject[selectedProjectId] ?? []), { id, name, notes: "" }];
    setTasksByProject({ ...tasksByProject, [selectedProjectId]: nextTasks });
    setSelectedTaskId(id);
  }
  function updateNotes(nextNotes: string) {
    if (!selectedProjectId || !selectedTaskId) return;
    const list = tasksByProject[selectedProjectId] ?? [];
    const nextList = list.map((t) => (t.id === selectedTaskId ? { ...t, notes: nextNotes } : t));
    setTasksByProject({ ...tasksByProject, [selectedProjectId]: nextList });
  }
  function handleStart() {
    alert(`Starting: ${selectedTask?.name ?? "No task selected"}`);
  }
  function handleStartMultiple() {
    alert("Starting on multiple (placeholder)");
  }
  return (
    <>
      <ProjectsColumn
        projects={projects}
        selectedId={selectedProjectId}
        onSelect={(id) => {
          setSelectedProjectId(id);
          setSelectedTaskId(null);
        }}
        onAdd={addProject}
      />
      <TasksColumn
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        onSelectTask={setSelectedTaskId}
        onAddTask={addTask}
      />
      <DetailsColumn
        task={selectedTask}
        onUpdateNotes={updateNotes}
        onStart={handleStart}
        onStartMultiple={handleStartMultiple}
      />
    </>
  );
}