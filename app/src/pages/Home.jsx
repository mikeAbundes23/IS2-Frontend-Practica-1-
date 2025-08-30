import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../api/useApi";

export default function Home() {
  const { getUserTasks, createTask } = useApi();
  const [isCreating, setIsCreating] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("Fetching tasks...");
    const fetchTasks = async () => {
      const response = await getUserTasks();
      setTasks(response.data);
      console.log(response.data);
    };
    fetchTasks();
  }, []);

  function AddTaskForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
      console.log("Task created:", data);
      await createTask(data);
      setTasks([...tasks, data]);

      setIsCreating(false);
    };
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full flex justify-between"
      >
        <div className="flex">
          <div className="flex flex-col space-y-2 justify-center">
            <span className="font-bold mr-2">Titulo: </span>
            <span className="mr-2">Descripcion: </span>
          </div>
          <div className="flex flex-col space-y-2 justify-center w-full">
            <input
              className="border-2"
              type="text"
              name="title"
              {...register("title", { required: true })}
              placeholder="Titulo de la tarea"
            />
            <input
              className="border-2 w-100"
              type="text"
              name="description"
              {...register("description", { required: true })}
              placeholder="Descripcion de la tarea"
            />
          </div>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="flex items-center mx-2 my-4 px-4 py-2 bg-emerald-400 text-white font-bold rounded-md shadow hover:bg-emerald-500 transition text-base"
          >
            ✓
          </button>
          <button
            onClick={() => setIsCreating(false)}
            className="flex items-center my-4 px-4 py-2 bg-red-500 text-white font-bold rounded-md shadow hover:bg-red-600 transition text-lg"
          >
            x
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold mb-6">Tareas Pendientes</h2>
      <div className="mt-2">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center my-4 px-4 py-2 bg-indigo-800 text-white font-semibold rounded-lg shadow hover:bg-indigo-900 transition"
        >
          <span className="text-xl mr-2">+</span>
          Nueva Tarea
        </button>
      </div>
      <ul className="space-y-2">
        {isCreating && <AddTaskForm />}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div className="flex flex-col">
              <span className="font-bold">{task.title}</span>
              <div>{task.description}</div>
            </div>
            <span
              className={`px-2 py-1 rounded ${
                task.status ? "bg-emerald-400 text-white" : "bg-gray-300"
              }`}
            >
              {task.status ? "Completada" : "Pendiente"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
